import articlesData from '../../../data/articles.json';


export default function handler(req, res) {
  const article = articlesData.find( article => article.id === req.query.id)
  console.log(article)
  if( !article ) 
    return res.status(404).json('Wrong article')
  res.status(200).json(article)
}