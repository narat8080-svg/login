import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hybsbsjpeoxxjilizoiy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5YnNic2pwZW94eGppbGl6b2l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0NDAxMzcsImV4cCI6MjA4NjAxNjEzN30.UxyJrvDSgZX18idLxuOR4YP7XJxV5JcBqoR3xZ0aAW4';

export const supabase = createClient(supabaseUrl, supabaseKey);