import { ApiResponse, SearchResult, Surah } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiService {
  private async fetchJSON<T>(endpoint: string, options?: RequestInit): Promise<T> {
    // For server-side during build, we need absolute URLs
    let url = `${API_BASE_URL}${endpoint}`;
    
    // During build time, use the production URL or a fallback
    if (typeof window === 'undefined' && process.env.NEXT_PHASE === 'phase-production-build') {
      // Use environment variable for build time API URL
      url = `${process.env.BUILD_API_URL || 'https://quran-api.vercel.app/api'}${endpoint}`;
    }
    
    console.log(`Fetching from: ${url}`);
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    return response.json();
  }
  
  async getSurahs(): Promise<Surah[]> {
    const response = await this.fetchJSON<ApiResponse<Surah[]>>('/surahs');
    return response.data || [];
  }
  
  async getSurahById(id: number, lang: string = 'en'): Promise<Surah | null> {
    const response = await this.fetchJSON<ApiResponse<Surah>>(`/surahs/${id}?lang=${lang}`);
    return response.data || null;
  }
  
  async searchAyahs(query: string, lang: string = 'en'): Promise<SearchResult[]> {
    if (!query || query.length < 2) return [];
    const response = await this.fetchJSON<ApiResponse<SearchResult[]>>(`/search?q=${encodeURIComponent(query)}&lang=${lang}`);
    return response.data || [];
  }
}

export const api = new ApiService();