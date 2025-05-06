import React, { useState, useEffect } from 'react'
import appWriteService from '../appwrite/config'
import {Link} from "react-router-dom"
import FALLBACK_IMAGES from '../utils/fallbackImages'

function PostCard(props) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Handle both receiving individual props or a post object
  const {
    $id, 
    title, 
    featuredImage, 
    content, 
    author, 
    $createdAt
  } = props.post || props;
  
  // Generate a consistent but random index for this post ID to always show the same fallback image
  const fallbackIndex = $id ? 
    Math.abs($id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % FALLBACK_IMAGES.length : 
    Math.floor(Math.random() * FALLBACK_IMAGES.length);

  useEffect(() => {
    if (featuredImage) {
      console.log(`PostCard ${$id}: Featured image ID:`, featuredImage);
    } else {
      console.log(`PostCard ${$id}: No featured image, using fallback`);
    }
  }, [featuredImage, $id]);

  // Create a truncated version of content if available
  const excerpt = content ? 
    content.replace(/<[^>]*>/g, '').substring(0, 150) + (content.length > 150 ? '...' : '') 
    : '';
  
  // Format date if available
  const formattedDate = $createdAt ? 
    new Date($createdAt).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }) : '';

  if (!$id || !title) return null;

  // Get image URL with proper error handling
  const getImageUrl = () => {
    if (!featuredImage) {
      console.log(`PostCard ${$id}: No featuredImage ID provided, using fallback`);
      return FALLBACK_IMAGES[fallbackIndex];
    }
    
    try {
      const imageUrl = appWriteService.getFileView(featuredImage);
      console.log(`PostCard ${$id}: Generated image URL:`, imageUrl);
      if (!imageUrl) {
        console.log(`PostCard ${$id}: No valid URL returned, using fallback`);
        return FALLBACK_IMAGES[fallbackIndex];
      }
      return imageUrl;
    } catch (error) {
      console.error(`PostCard ${$id}: Error generating image URL:`, error);
      return FALLBACK_IMAGES[fallbackIndex];
    }
  };

  const handleImageError = (e) => {
    console.error(`PostCard ${$id}: Image failed to load, using fallback`);
    e.target.onerror = null;
    e.target.src = FALLBACK_IMAGES[fallbackIndex];
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log(`PostCard ${$id}: Image loaded successfully`);
    setImageLoaded(true);
  };

  return (
    <Link to={`/post/${$id}`} className="block h-full group">
        <div className='h-full bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col border border-secondary-200'>
            <div className='relative pb-[56%] overflow-hidden bg-secondary-100'>
                <img 
                  src={getImageUrl()}
                  alt={title}
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                  className='absolute inset-0 h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out'
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70"></div>
                {author && (
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-white/90 text-primary-700 flex items-center justify-center font-bold mr-2 text-sm shadow-md">
                        {author.charAt(0).toUpperCase()}
                      </div>
                      <div className="text-white text-sm font-medium drop-shadow-sm">{author}</div>
                    </div>
                  </div>
                )}
            </div>
            <div className='p-5 flex-grow flex flex-col'>
                <h2 className='text-xl font-bold text-secondary-800 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2'>{title}</h2>
                {excerpt && (
                  <p className='text-secondary-600 text-sm mb-4 line-clamp-3'>{excerpt}</p>
                )}
                <div className='mt-auto pt-4 border-t border-secondary-100 flex items-center justify-between text-xs text-secondary-500'>
                  {formattedDate && (
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formattedDate}
                    </span>
                  )}
                  <span className='bg-primary-100 text-primary-800 px-2 py-1 rounded-full font-medium flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    Read more
                  </span>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default PostCard
