import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import FALLBACK_IMAGES from '../utils/fallbackImages';

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  // Generate a consistent fallback image for this post
  const getFallbackImage = (postId) => {
    if (!postId) return FALLBACK_IMAGES[0];
    const fallbackIndex = Math.abs(postId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % FALLBACK_IMAGES.length;
    return FALLBACK_IMAGES[fallbackIndex];
  };

  useEffect(() => {
    if (slug) {
      setLoading(true);
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
        setLoading(false);
      });
    } else navigate("/");
  }, [slug, navigate]);

  // Log featured image info when post loads
  useEffect(() => {
    if (post) {
      console.log("Post view: Post data loaded:", {
        id: post.$id,
        title: post.title,
        featuredImage: post.featuredImage
      });
      
      if (post.featuredImage) {
        console.log("Post view: Featured image ID:", post.featuredImage);
      } else {
        console.log("Post view: No featured image found for post");
      }
    }
  }, [post]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  // Get image URL with proper error handling
  const getImageUrl = () => {
    if (!post || !post.featuredImage) {
      console.log("Post view: Using fallback image (no featuredImage)");
      return getFallbackImage(post?.$id);
    }
    
    try {
      const imageUrl = appwriteService.getFileView(post.featuredImage);
      console.log("Post view: Generated image URL:", imageUrl);
      if (!imageUrl) {
        console.log("Post view: No valid URL returned, using fallback");
        return getFallbackImage(post.$id);
      }
      return imageUrl;
    } catch (error) {
      console.error("Post view: Error generating image URL:", error);
      return getFallbackImage(post.$id);
    }
  };

  const handleImageError = (e) => {
    console.error("Post view: Image failed to load, using fallback");
    e.target.onerror = null;
    e.target.src = getFallbackImage(post.$id);
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log("Post view: Image loaded successfully");
    setImageLoaded(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-secondary-50 to-white py-16">
        <Container>
          <div className="animate-pulse max-w-4xl mx-auto">
            <div className="h-[400px] bg-primary-100 rounded-xl mb-8"></div>
            <div className="h-10 bg-primary-100 rounded-lg w-3/4 mb-6"></div>
            <div className="h-5 bg-primary-100 rounded mb-4"></div>
            <div className="h-5 bg-primary-100 rounded mb-4"></div>
            <div className="h-5 bg-primary-100 rounded mb-4"></div>
            <div className="h-5 bg-primary-100 rounded w-2/3"></div>
          </div>
        </Container>
      </div>
    );
  }

  return post ? (
    <div className="min-h-screen bg-gradient-to-b from-secondary-50 to-white">
      <div className="w-full bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 h-[300px] md:h-[400px] relative">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-secondary-50 to-transparent"></div>
      </div>
      
      <Container className="-mt-64 relative z-10 pb-20">
        <article className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-xl shadow-xl overflow-hidden mb-8">
            <div className="relative h-[300px] md:h-[400px] overflow-hidden">
              <img
                src={getImageUrl()}
                alt={post.title}
                className="w-full h-full object-cover"
                onError={handleImageError}
                onLoad={handleImageLoad}
              />
              {imageError && (
                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  Using fallback image
                </div>
              )}

              {isAuthor && (
                <div className="absolute right-4 top-4 flex space-x-2">
                  <Link to={`/edit-post/${post.$id}`}>
                    <Button variant="outline" className="bg-white/90 hover:bg-white border-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </Button>
                  </Link>
                  <Button variant="danger" className="bg-red-600/90 hover:bg-red-600" onClick={deletePost}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
              {post.title}
            </h1>
            
            <div className="flex items-center mb-8 pb-6 border-b border-secondary-100">
              {post.author && (
                <div className="flex items-center mr-6">
                  <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-lg mr-3">
                    {post.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-secondary-900 font-medium">{post.author}</p>
                  </div>
                </div>
              )}
              
              <div className="text-secondary-500 text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(post.$createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none prose-headings:text-secondary-900 prose-p:text-secondary-700 prose-a:text-primary-600 prose-strong:text-secondary-800">
              {parse(post.content)}
            </div>
            
            <div className="mt-10 pt-6 border-t border-secondary-100">
              <Link to="/" className="text-primary-600 hover:text-primary-700 inline-flex items-center font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to all posts
              </Link>
            </div>
          </div>
        </article>
      </Container>
    </div>
  ) : null;
}
