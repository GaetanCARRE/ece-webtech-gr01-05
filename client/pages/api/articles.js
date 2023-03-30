import articlesData from '../../data/articles.json';
export const db = articlesData
  
  export default function handler(req, res) {
    res.status(200).json(db)
  }