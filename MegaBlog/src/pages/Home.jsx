import React, { useEffect, useState } from "react";
import AppwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import FALLBACK_IMAGES from '../utils/fallbackImages';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  // FORCE ENHANCED UI FOR TESTING
  const FORCE_ENHANCED_UI = true; 

  useEffect(() => {
    document.title = "MegaBlog - Home";
    
    // Add scrollbar hiding style
    const style = document.createElement('style');
    style.textContent = `
      .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
    `;
    document.head.appendChild(style);
    
    // Load posts
    setLoading(true);
    AppwriteService.getPosts().then((post) => {
      if (post) {
        setPosts(post.documents);
      }
      setLoading(false);
    });
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Always show enhanced UI during testing
  if (FORCE_ENHANCED_UI) {
    console.log("FORCING ENHANCED UI FOR TESTING");
    return (
      <div className="w-full min-h-screen">
        {/* Hero section */}
        <div className="bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 text-white min-h-[80vh] flex items-center">
          <Container>
            <div className="py-16 sm:py-24 flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
                <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">Discover Stories That Matter</h1>
                <p className="text-lg mb-8 text-primary-100 max-w-xl">A modern blogging platform for creators and readers alike. Explore thoughtful stories, ideas, and perspectives from diverse voices.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/signup" className="bg-white text-primary-700 px-6 py-3 rounded-md font-medium hover:bg-primary-50 transition-colors inline-flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Start Writing
                  </Link>
                  <Link to="/login" className="border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors inline-flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Sign In
                  </Link>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 to-primary-300 rounded-lg blur opacity-25"></div>
                  <div className="relative overflow-hidden bg-white p-6 rounded-lg shadow-xl">
                    {/* Blog UI mockup content */}
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to MegaBlog</h2>
                    <p className="text-gray-600 mb-4">Your new home for amazing content and stories.</p>
                    
                    {/* Featured image mockup */}
                    <div className="mb-4 relative rounded-lg overflow-hidden">
                      <img 
                        src={FALLBACK_IMAGES[0]}
                        alt="Blog Feature Illustration" 
                        className="w-full h-40 object-cover rounded-md" 
                      />
                      
                    </div>
                    
                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">Technology</span>
                      <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">Health</span>
                      <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-medium">Travel</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
        
        {/* Today's Picks Section - Simplified */}
        <div className="bg-white py-16">
          <Container>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-secondary-900 mb-3">Today's Picks</h2>
              <p className="text-secondary-600 max-w-2xl mx-auto">Handpicked stories you shouldn't miss</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Web Development Article */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col border border-secondary-100">
                <div className="h-40 relative">
                  <img 
                    src={FALLBACK_IMAGES[2]} 
                    alt="Web Development" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute top-2 left-2 bg-primary-600/90 text-white text-xs px-2 py-1 rounded">Technology</div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-secondary-900 mb-2">Modern React Patterns for 2023</h3>
                  <p className="text-secondary-600 text-sm mb-3">Explore the latest patterns and best practices in React development, including hooks, state management, and performance optimization.</p>
                  <div className="mt-auto flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold mr-2">A</div>
                    <div>
                      <p className="text-xs font-medium text-secondary-900">Alex Johnson</p>
                      <p className="text-xs text-secondary-500">5 min read</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* AI Article */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col border border-secondary-100">
                <div className="h-40 relative">
                  <img 
                    src={FALLBACK_IMAGES[1]} 
                    alt="AI Technology" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute top-2 left-2 bg-indigo-600/90 text-white text-xs px-2 py-1 rounded">AI</div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-secondary-900 mb-2">How AI is Transforming Content Creation</h3>
                  <p className="text-secondary-600 text-sm mb-3">Discover how artificial intelligence tools are revolutionizing the way we create, edit, and distribute content across platforms.</p>
                  <div className="mt-auto flex items-center">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold mr-2">M</div>
                    <div>
                      <p className="text-xs font-medium text-secondary-900">Maya Patel</p>
                      <p className="text-xs text-secondary-500">8 min read</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Design Article */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col border border-secondary-100">
                <div className="h-40 relative">
                  <img 
                    src={FALLBACK_IMAGES[3]} 
                    alt="UI Design" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute top-2 left-2 bg-pink-600/90 text-white text-xs px-2 py-1 rounded">Design</div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-secondary-900 mb-2">UI/UX Trends That Will Dominate 2023</h3>
                  <p className="text-secondary-600 text-sm mb-3">From glassmorphism to micro-interactions, these design trends are shaping the future of digital interfaces and user experiences.</p>
                  <div className="mt-auto flex items-center">
                    <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-700 font-bold mr-2">L</div>
                    <div>
                      <p className="text-xs font-medium text-secondary-900">Liam Rodriguez</p>
                      <p className="text-xs text-secondary-500">6 min read</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Newsletter section - Simplified */}
        <div className="bg-primary-800 text-white py-16">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-primary-100 mb-6">Stay updated with the latest stories and tips</p>
              <div className="flex flex-col sm:flex-row max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow bg-white/10 border border-primary-600 sm:rounded-l-md rounded-t-md sm:rounded-tr-none py-3 px-4 text-white placeholder-primary-300 focus:outline-none" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={() => {
                    // Check if user is logged in
                    if (authStatus) {
                      navigate("/all-posts");
                    } else {
                      // If not logged in, store email in localStorage and redirect to login
                      if (email) {
                        localStorage.setItem("subscriberEmail", email);
                        navigate("/login");
                      } else {
                        alert("Please enter a valid email address");
                      }
                    }
                  }}
                  className="bg-white text-primary-700 py-3 px-6 sm:rounded-r-md rounded-b-md sm:rounded-bl-none font-medium hover:bg-primary-50 transition-colors"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-primary-200 text-sm mt-4">By subscribing, you'll get access to our latest content</p>
            </div>
          </Container>
        </div>
      </div>
    );
  }

  // Original code for logged-in users with posts
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
    <div className="w-full min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 text-white py-16">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">MegaBlog</h1>
            <p className="text-lg mb-6 text-primary-100">Discover stories, thinking, and expertise from writers on any topic.</p>
          </div>
        </Container>
      </div>
      
      <div className="py-16">
        <Container>
          <div className="relative mb-16 text-center">
            <h2 className="text-3xl font-bold text-center text-secondary-900 mb-3 relative z-10">Latest Posts</h2>
            <p className="text-center text-secondary-600 mb-6 max-w-2xl mx-auto relative z-10">Explore fresh perspectives and insightful stories from our community.</p>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary-100 rounded-full -z-0 blur-xl"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
            {posts.map((post) => (
              <div key={post.$id} className="h-full">
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Home;
