// Blog post interface
export interface BlogPost {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  tags: string;
  imageUrl: string;
  createdAt: string;
  views: number;
}

// Create blog post data interface
export interface CreateBlogPostData {
  title: string;
  shortDescription: string;
  content: string;
  tags: string;
  imageUrl: string;
}

// Update blog post data interface
export interface UpdateBlogPostData extends CreateBlogPostData {
  id: string;
}

// Blog service
const blogService = {
  // Get all blog posts
  getAllPosts: async (): Promise<BlogPost[]> => {
    const response = await fetch("/api/blog");
    if (!response.ok) {
      throw new Error("Failed to fetch blog posts");
    }
    return response.json();
  },

  // Get a single blog post by ID
  getPostById: async (id: string): Promise<BlogPost> => {
    const response = await fetch(`/api/blog?id=${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch blog post");
    }
    return response.json();
  },

  // Create a new blog post
  createPost: async (postData: CreateBlogPostData): Promise<BlogPost> => {
    const response = await fetch("/api/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error("Failed to create blog post");
    }

    return response.json();
  },

  // Update an existing blog post
  updatePost: async (postData: UpdateBlogPostData): Promise<BlogPost> => {
    const response = await fetch("/api/blog", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error("Failed to update blog post");
    }

    return response.json();
  },

  // Delete a blog post
  deletePost: async (id: string): Promise<void> => {
    const response = await fetch(`/api/blog?id=${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete blog post");
    }
  },
};

export default blogService;
