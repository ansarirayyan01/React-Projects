import React, { useState, useEffect } from "react";
import AppwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    AppwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-secondary-50 to-secondary-100 py-16">
        <Container>
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-primary-200 h-12 w-12"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-primary-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-primary-200 rounded"></div>
                  <div className="h-4 bg-primary-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-primary-50 to-white py-16">
      <Container>
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-secondary-900 mb-3">All Posts</h1>
          <p className="text-secondary-600 max-w-2xl mx-auto">Discover all the amazing content from our writers.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
          {posts.map((post) => (
            <div key={post.$id} className="h-full">
              <PostCard post={post} />
            </div>
          ))}
        </div>
        
        {posts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">😢</div>
            <h2 className="text-2xl font-bold text-secondary-700 mb-2">No posts found</h2>
            <p className="text-secondary-500">There are no posts available right now. Check back later!</p>
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
