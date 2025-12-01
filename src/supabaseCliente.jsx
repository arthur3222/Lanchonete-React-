import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://mihtxdlmlntfxkclkvis.supabase.com";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1paHR4ZGxtbG50ZnhrY2xrdmlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MTQ4MzksImV4cCI6MjA3NDk5MDgzOX0.oqMeEOnV5463hF8BaJ916yYyNjDC2bJe73SCP2Fg1yA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
