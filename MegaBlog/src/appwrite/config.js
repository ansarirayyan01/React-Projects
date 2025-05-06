import conf from "../conf/conf.js";
import { Client, ID, Databases, Query, Storage } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;
    query;
    constructor(){
        this.client
           .setEndpoint(conf.appwriteUrl)
           .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
        this.Query = new Query(this.client)
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite service :: CreatePost :: error", error);
            throw error;
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: UpdatePost :: error", error);
            throw error;
        }
    }

    async deletePost(slug) {
        try {
             await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: DeletePost :: error", error);
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: GetPost :: error", error);
            return null;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite service :: GetPosts :: error", error);
            return null;
        }
    }



    // UPLOAD FILE SERVICE  
    async uploadFile(file) { 
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: UploadFile :: error", error);
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
                await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: DeleteFile :: error", error);
            return false
        }
    }

    async getFile(fileId) {
        try {
            return await this.bucket.getFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite service :: GetFile :: error", error);
            return null;
        }
    }

    async getFiles() {
        try {
            return await this.bucket.listFiles(
                conf.appwriteBucketId
            )
        } catch (error) {
            console.log("Appwrite service :: GetFiles :: error", error);
            return null;
        }
    }

    getFileView(fileId) {
        try {
            if (!fileId) {
                console.log("Appwrite service :: GetFileView :: error: No fileId provided");
                return null;
            }
            
            console.log("Getting file view for ID:", fileId);
            return this.bucket.getFileView(
                conf.appwriteBucketId,
                fileId
            );
        } catch (error) {
            console.log("Appwrite service :: GetFileView :: error", error);
            return null;
        }
    }




}

const service = new Service()
export default service