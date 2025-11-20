import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image_url: string;
  demo_url?: string;
  github_url?: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface About {
  id: string;
  bio: string;
  skills: string[];
  experience: string;
  education: string;
  updated_at: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}
