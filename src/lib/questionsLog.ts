import { supabase } from '@/integrations/supabase/client';

export async function logQuestion(question: string, source: string, language: string = 'ar') {
  try {
    const { error } = await supabase
      .from('questions_log')
      .insert({
        question,
        source,
        language,
        user_agent: navigator.userAgent,
      });

    if (error) {
      console.error('Error logging question:', error);
    }
  } catch (error) {
    console.error('Error logging question:', error);
  }
}
