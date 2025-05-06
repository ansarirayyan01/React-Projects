import React, { useState, useRef } from "react";
import { Container } from "../components";
import appwriteService from "../appwrite/config";

function TestUpload() {
  const [file, setFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("File selected:", selectedFile);
    setFile(selectedFile);
    setError(null);
    setUploadResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    setLoading(true);
    setError(null);
    setUploadResult(null);

    try {
      console.log("Starting file upload...");
      console.log("File details:", {
        name: file.name,
        type: file.type,
        size: file.size
      });

      const result = await appwriteService.uploadFile(file);
      console.log("Upload result:", result);
      setUploadResult(result);
    } catch (err) {
      console.error("Upload failed:", err);
      setError(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-50 to-white py-12">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 text-center">Test File Upload</h1>
          <p className="text-center text-secondary-600 mt-2 max-w-2xl mx-auto">
            This is a test page to diagnose file upload issues with Appwrite
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 lg:p-10 max-w-xl mx-auto">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {uploadResult && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
              <p>Upload successful!</p>
              <pre className="mt-2 bg-white p-2 rounded-md overflow-auto text-xs">
                {JSON.stringify(uploadResult, null, 2)}
              </pre>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Select a file to upload
              </label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="block w-full text-sm text-secondary-900 
                  file:mr-4 file:py-2 file:px-4 
                  file:rounded-md file:border-0 
                  file:text-sm file:font-medium 
                  file:bg-primary-50 file:text-primary-700 
                  hover:file:bg-primary-100"
              />
              <p className="mt-1 text-xs text-secondary-500">
                {file 
                  ? `Selected: ${file.name} (${(file.size / 1024).toFixed(2)} KB)` 
                  : "No file selected"}
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || !file}
              className={`w-full py-2 px-4 rounded-md font-medium text-white ${
                loading || !file 
                  ? "bg-secondary-400 cursor-not-allowed" 
                  : "bg-primary-600 hover:bg-primary-700"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </span>
              ) : (
                "Upload File"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-secondary-200">
            <h2 className="text-lg font-semibold text-secondary-900 mb-2">Debug Info</h2>
            <p className="text-sm text-secondary-700 mb-4">
              Check your browser console for detailed logs about the upload process.
            </p>
            <div className="bg-secondary-50 p-4 rounded-lg">
              <pre className="text-xs overflow-auto">
                {file && JSON.stringify({
                  fileName: file.name,
                  fileType: file.type,
                  fileSize: file.size,
                  lastModified: new Date(file.lastModified).toISOString()
                }, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default TestUpload; 