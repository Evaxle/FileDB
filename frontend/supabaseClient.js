import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qhlettphcwwdoorgxozk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFobGV0dHBoY3d3ZG9vcmd4b3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3NjczMDIsImV4cCI6MjA3OTM0MzMwMn0.GnqdJdk6cIsAubR9y0u3w5CzddFVmB8wyuyE5tetmOU'

export const supabase = createClient(supabaseUrl, supabaseKey)