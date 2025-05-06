import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      setLoading(true);
      appwriteService.getPost(slug)
        .then((post) => {
          if (post) {
            setPosts(post);
          } else {
            setError("Post not found");
            setTimeout(() => navigate("/"), 2000);
          }
        })
        .catch((err) => {
          setError(err.message || "Something went wrong");
          setTimeout(() => navigate("/"), 2000);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-secondary-50 to-white py-12">
        <Container>
          <div className="text-center py-8">
            <div className="animate-pulse max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 lg:p-10">
              <div className="h-10 bg-primary-100 rounded-lg w-1/3 mx-auto mb-8"></div>
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3 space-y-4">
                  <div className="h-10 bg-primary-100 rounded-lg"></div>
                  <div className="h-10 bg-primary-100 rounded-lg"></div>
                  <div className="h-40 bg-primary-100 rounded-lg"></div>
                </div>
                <div className="lg:w-1/3 space-y-4">
                  <div className="h-60 bg-primary-100 rounded-lg"></div>
                  <div className="h-10 bg-primary-100 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-secondary-50 to-white py-12">
        <Container>
          <div className="text-center py-8">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
              <div className="text-red-500 text-5xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-secondary-900 mb-2">Error Loading Post</h2>
              <p className="text-secondary-600 mb-6">{error}</p>
              <p className="text-sm text-secondary-500">Redirecting you to the home page...</p>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return post ? (
    <div className="min-h-screen bg-gradient-to-b from-secondary-50 to-white py-12">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 text-center">Edit Post</h1>
          <p className="text-center text-secondary-600 mt-2 max-w-2xl mx-auto">Update your post content and settings</p>
        </div>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
