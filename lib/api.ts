import { cache } from "react";

export interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  section: "مناسبت ها" | "اطلاعیه ها" | "اخبار ها" | "افتخارات";
  leadPicture: string;
  createdAt: string;
  updatedAt: string;
  readingTime: number;
  averageRating: number;
  totalRatings: number;
  author?: {
    id: string;
    username: string;
  };
}

export interface ApiResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
}

const API_URL = process.env.API_URL || "http://localhost:3100";

export const fetchPosts = cache(
  async (
    section?: string,
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<Post>> => {
    try {
      let url = `${API_URL}/posts?page=${page}&limit=${limit}`;
      if (section) {
        url += `&section=${encodeURIComponent(section)}`;
      }

      const response = await fetch(url, { next: { revalidate: 60 } });

      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching posts:", error);
      return {
        data: [],
        meta: {
          currentPage: 1,
          itemsPerPage: limit,
          totalItems: 0,
          totalPages: 0,
        },
      };
    }
  }
);
