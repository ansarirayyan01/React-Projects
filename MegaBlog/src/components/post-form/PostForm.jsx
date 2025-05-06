import React, { useCallback, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import FALLBACK_IMAGES from '../../utils/fallbackImages';

export default function PostForm({ post }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageSelected, setImageSelected] = useState(!!post?.featuredImage);
  const fileInputRef = useRef(null);
  
  // Get a fallback image index using post ID or a random one if no post
  const getFallbackImageIndex = (postId) => {
    if (!postId) return Math.floor(Math.random() * FALLBACK_IMAGES.length);
    return Math.abs(postId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % FALLBACK_IMAGES.length;
  };
  
  const [preview, setPreview] = useState(
    post?.featuredImage 
      ? appwriteService.getFilePreview(post.featuredImage) 
      : FALLBACK_IMAGES[getFallbackImageIndex(post?.$id)]
  );
  
  const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    setLoading(true);
    setError("");
    
    console.log("Form submission started", data);
    console.log("Image selected status:", imageSelected);
    console.log("Image field value:", data.image);
    console.log("File input element:", fileInputRef.current);
    
    try {
      // Check if user is logged in
      if (!userData) {
        setError("You must be logged in to create or edit posts");
        console.log("User not logged in");
        return;
      }
      
      if (post) {
        // Handle post update
        console.log("Updating existing post");
        
        let featuredImage = post.featuredImage;
        
        // Check if new image was uploaded
        if (data.image && data.image[0]) {
          console.log("Uploading new image for existing post");
          try {
            const file = await appwriteService.uploadFile(data.image[0]);
            if (file) {
              featuredImage = file.$id;
              console.log("New image uploaded successfully", file);
              
              // Delete old image
              if (post.featuredImage) {
                await appwriteService.deleteFile(post.featuredImage);
                console.log("Old image deleted");
              }
            }
          } catch (imageError) {
            console.error("Image upload error:", imageError);
            setError("Image upload failed: " + imageError.message);
            setLoading(false);
            return;
          }
        }

        // Update post with or without new image
        console.log("Updating post with data:", {
          ...data,
          featuredImage,
        });
        
        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage,
        });

        if (dbPost) {
          console.log("Post updated successfully", dbPost);
          navigate(`/post/${dbPost.$id}`);
        } else {
          throw new Error("Failed to update post");
        }
      } else {
        // Handle new post creation
        console.log("Creating new post");
        
        // Check if image is provided
        if (!data.image || !data.image[0]) {
          console.log("Image field value at validation:", data.image);
          console.log("FileList length:", data.image ? data.image.length : 0);
          console.log("File input files:", fileInputRef.current?.files);
          
          setError("Featured image is required for new posts");
          console.log("No image provided for new post");
          setLoading(false);
          return;
        }
        
        // Upload image
        let fileId = null;
        try {
          console.log("Uploading image for new post");
          console.log("Image data:", data.image[0]);
          const file = await appwriteService.uploadFile(data.image[0]);
          if (file) {
            fileId = file.$id;
            console.log("Image uploaded successfully", file);
          } else {
            throw new Error("File upload returned empty result");
          }
        } catch (imageError) {
          console.error("Image upload error:", imageError);
          setError("Image upload failed: " + imageError.message);
          setLoading(false);
          return;
        }
        
        if (!fileId) {
          setError("Failed to upload image. Please try again.");
          setLoading(false);
          return;
        }
        
        // Create post with uploaded image - remove author field
        const postData = {
          title: data.title,
          slug: data.slug,
          content: data.content,
          featuredImage: fileId,
          status: data.status,
          userId: userData.$id,
        };
        
        console.log("Creating post with data:", postData);
        
        try {
          const dbPost = await appwriteService.createPost(postData);

          if (dbPost) {
            console.log("Post created successfully", dbPost);
            navigate(`/post/${dbPost.$id}`);
          } else {
            throw new Error("Failed to create post");
          }
        } catch (postError) {
          console.error("Post creation error:", postError);
          // If post creation fails, delete the uploaded image to avoid orphaned files
          if (fileId) {
            try {
              await appwriteService.deleteFile(fileId);
              console.log("Cleaned up uploaded image after post creation failure");
            } catch (cleanupError) {
              console.error("Failed to clean up image:", cleanupError);
            }
          }
          throw postError;
        }
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageSelected(true);
      console.log("Image selected:", file.name, file.type, file.size);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      console.log("No file selected in onChange handler");
      setImageSelected(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 lg:p-10">
      <h1 className="text-3xl font-bold text-secondary-900 mb-6">
        {post ? "Edit Post" : "Create New Post"}
      </h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(submit)} className="space-y-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 space-y-6">
            <div>
              <Input
                label="Post Title"
                placeholder="Enter a descriptive title"
                className="mb-2"
                {...register("title", { 
                  required: "Title is required",
                  minLength: {
                    value: 5,
                    message: "Title must be at least 5 characters"
                  }
                })}
                error={errors.title?.message}
              />
            </div>
            
            <div>
              <Input
                label="Post Slug"
                placeholder="post-url-slug"
                className="mb-2"
                {...register("slug", { 
                  required: "Slug is required",
                  pattern: {
                    value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                    message: "Slug can only contain lowercase letters, numbers, and hyphens"
                  }
                })}
                error={errors.slug?.message}
                onInput={(e) => {
                  setValue("slug", slugTransform(e.currentTarget.value), {
                    shouldValidate: true,
                  });
                }}
              />
              <p className="text-xs text-secondary-500 mt-1">
                This will be used for the post URL. Auto-generated from title but can be edited.
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Post Content
              </label>
              <div className="border border-secondary-200 rounded-lg overflow-hidden">
                <RTE
                  name="content"
                  control={control}
                  defaultValue={getValues("content")}
                />
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/3 space-y-6">
            <div className="bg-secondary-50 p-6 rounded-lg space-y-4">
              <div>
                <p className="text-sm font-medium text-secondary-700 mb-1">Featured Image</p>
                <div className={`border-2 border-dashed ${errors.image ? 'border-red-200' : 'border-secondary-300'} rounded-lg overflow-hidden`}>
                  <div className="relative">
                    <img
                      src={preview}
                      alt="Featured image preview"
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <label 
                        htmlFor="image-upload"
                        className="bg-white/90 text-primary-700 px-4 py-2 rounded-md font-medium cursor-pointer transform transition-transform hover:scale-105 hover:shadow-lg"
                      >
                        {post ? "Change Image" : "Select Image"}
                      </label>
                    </div>
                  </div>
                  
                  <input
                    type="file"
                    id="image-upload"
                    className="hidden"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { 
                      required: !post,
                      onChange: handleImageChange 
                    })}
                    ref={(e) => {
                      register("image", { required: !post }).ref(e);
                      fileInputRef.current = e;
                    }}
                  />
                  
                  <div className="px-4 py-3 bg-white">
                    <p className="text-xs text-secondary-500 text-center">
                      {imageSelected ? "Image selected. Click to change." : "No image selected. Click to select an image."}
                    </p>
                    {errors.image && (
                      <p className="text-xs text-red-600 text-center mt-1 font-medium">Featured image is required</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Post Status
                </label>
                <Select
                  options={[
                    { value: "active", label: "Published" },
                    { value: "inactive", label: "Draft" }
                  ]}
                  className="w-full"
                  {...register("status", { required: "Status is required" })}
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                className="w-1/2"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-1/2"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {post ? "Updating..." : "Creating..."}
                  </span>
                ) : (
                  post ? "Update Post" : "Create Post"
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
