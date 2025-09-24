export interface Story {
  id: number;
  title: string;
  category: string;
  text: string;
  image_urls: string[];
  age_range?: string;
  reading_time?: number; // in minutes
  audio_url?: string; // optional audio file URL
}

