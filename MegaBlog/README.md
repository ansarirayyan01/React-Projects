# MegaBlog 📝

A modern, feature-rich blogging platform built with React and Appwrite.

![MegaBlog Logo](public/vite.svg)

## ✨ Features

- **Beautiful UI**: Modern and responsive design with a focus on readability
- **User Authentication**: Secure login/signup with Appwrite authentication
- **Rich Text Editor**: Create and edit posts with a powerful WYSIWYG editor
- **Image Uploads**: Upload and manage images for your blog posts
- **Real-time Updates**: Changes reflect immediately with fast page loads
- **Category-based Organization**: Organize posts by categories
- **Responsive Design**: Looks great on all devices - mobile, tablet, and desktop

## 🚀 Tech Stack

- **Frontend**: React.js, React Router, Redux Toolkit
- **Styling**: Tailwind CSS
- **Backend as a Service**: Appwrite
- **Authentication**: Appwrite Auth
- **Database**: Appwrite Database
- **Storage**: Appwrite Storage
- **Build Tool**: Vite
- **Form Handling**: React Hook Form
- **Content Parsing**: html-react-parser

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- An Appwrite account and project set up

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/megablog.git
   cd megablog
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your Appwrite credentials:
   ```env
   VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
   VITE_APPWRITE_PROJECT_ID=your-project-id
   VITE_APPWRITE_DATABASE_ID=your-database-id
   VITE_APPWRITE_COLLECTION_ID=your-collection-id
   VITE_APPWRITE_BUCKET_ID=your-bucket-id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── appwrite/        # Appwrite service configuration
├── assets/          # Static assets
├── components/      # Reusable UI components
├── pages/           # Page components
├── store/           # Redux store configuration
├── utils/           # Utility functions
├── App.jsx          # Main application component
└── main.jsx         # Entry point
```

## 🔍 Key Components

- **AuthLayout**: Handles authentication routing
- **Header**: Navigation and auth status
- **PostCard**: Displays post previews
- **PostForm**: Create and edit posts
- **RTE**: Rich text editor component

## 📱 Responsive Design

MegaBlog is built with a mobile-first approach, ensuring a great user experience across devices:
- Mobile: < 640px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔐 Authentication Flow

1. User signs up/logs in via Appwrite Auth
2. Auth status is managed via Redux Toolkit
3. Protected routes ensure only authenticated users can create/edit posts
4. User session persists across page refreshes

## 📝 Creating and Editing Posts

1. Navigate to the "Create Post" page
2. Fill in post details: title, content, featured image
3. Use the rich text editor to format your content
4. Submit the post to save it to Appwrite

## 🛠️ Development

- **Development Mode**:
  ```bash
  npm run dev
  ```

- **Build for Production**:
  ```bash
  npm run build
  ```

- **Preview Production Build**:
  ```bash
  npm run preview
  ```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👏 Acknowledgments

- [Appwrite](https://appwrite.io/) for the backend services
- [Tailwind CSS](https://tailwindcss.com/) for the styling
- [React](https://reactjs.org/) for the frontend framework
- [Vite](https://vitejs.dev/) for the build tool

---

Made with ❤️ by [Your Name]
