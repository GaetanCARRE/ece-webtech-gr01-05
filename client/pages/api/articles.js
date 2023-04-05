import { supabase } from '../../supabase/supabase.js';

export default async function handler(req, res) {
  const { data, error } = await supabase.from('articles').select('*');
  if (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }

  return res.status(200).json(data);
}
