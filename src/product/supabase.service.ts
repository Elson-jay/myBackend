import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://bfqfygdbshnmfelvmcyv.supabase.co', 
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmcWZ5Z2Ric2hubWZlbHZtY3l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1NDk3MzAsImV4cCI6MjA1NjEyNTczMH0.7rhowKch4tfusja75LGtpLXQN6JmXErs7vKI4w-ovpI'
    );
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }
}
