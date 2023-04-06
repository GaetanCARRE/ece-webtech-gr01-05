import { supabase } from '../../../supabase/supabase.js';

export default async function handler(req, res) {
  const { id } = req.query;

  try 
  {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();
    if (!data) {
      return res.status(404).json({ error: 'Article not found' });
    }
    console.log(data);
    return res.status(200).json(data);
  } 
  catch (error) 
  {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
