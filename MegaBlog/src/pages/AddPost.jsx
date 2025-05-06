import React from "react";
import { Container, PostForm } from "../components";

function AddPost() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-50 to-white py-12">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 text-center">Create New Post</h1>
          <p className="text-center text-secondary-600 mt-2 max-w-2xl mx-auto">Share your thoughts, ideas, and stories with the world</p>
        </div>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
