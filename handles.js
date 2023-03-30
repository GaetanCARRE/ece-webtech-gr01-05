const express = require('express');
const router = express.Router();
const fs = require('fs');
const db = {
    articles: [
      {
        id: '1',
        title: 'Nike Air Max 270',
        content: 'The Nike Air Max 270 is a new addition to the Air Max family. It features a large Air unit in the heel and a large Max Air unit in the forefoot. The shoe is designed to be a lifestyle shoe, but it is also suitable for running.',
        date: '04/10/2022',
        author: 'Nike'
      },
      {
        id: '2',
        title: 'Nike Air Force 1',
        content: 'The Nike Air Force 1 is a basketball shoe that was first released in 1982. It was designed by Bruce Kilgore and is named after the aircraft that carries the President of the United States. The shoe is still popular today and is available in many different colorways.',
        date: '03/12/2021',
        author: 'Nike'
      },
      {
        id: '3',
        title: 'Jordan 1',
        content: 'The Jordan 1 is a basketball shoe that was first released in 1985. It was designed by Peter Moore and is named after Michael Jordan. The shoe is still popular today and is available in many different colorways.',
        date: '02/11/2020',
        author: 'Jordan'
      }
    ],
    comments: [
      {
        id: '1',
        timestamp: 1664835049,
        content: 'I really like this Nike Air Max 270.',
        articleId: '1',
        author: 'Maxime Dupont'
      },
      {
        id: '2',
        timestamp: 1664835050,
        content: 'I really like this Nike Air Force 1.',
        articleId: '2',
        author: 'Gaetan Carre'
      }
    ]
  }



router.get('/', (req, res) => {
  res.send('Hello World');
});

router.get('/about', (req, res) => {
  const about = JSON.parse(fs.readFileSync('about.json'));
  res.write(about.content);
  res.end();
});

router.get('/hello', (req, res) => {
    if (req.query.name === undefined) {
        res.write('Hello anonymous');
    } 
    else if (req.query.name === 'Gaetan') {
      res.write(
        "Hello, I'm Gaetan CARRE,\nI'm 21 years old and I'm a student at ECE Paris in apprentiship with Thales"
      );
    } 
    else {
      res.write('Hello ' + req.query.name);
    }

  res.end();
});

router.get('/articles', (req, res) => {
    res.send(db.articles);
});

router.get('/articles/:id', (req, res) => {
    const id = req.params.id;
    const article = db.articles.find((article) => article.id === id);
    res.send(article);
});

router.post('/articles', (req, res) => {
    const article = req.body;
    console.log(article);
    db.articles.push(article);
    res.send(article);
    
});

router.get('/articles/:articleId/comments', (req, res) => {
    const articleId = req.params.articleId;
    const comments = db.comments.filter((comment) => comment.articleId === articleId);
    res.send(comments);
});

router.post('/articles/:articleId/comments', (req, res) => {
    const articleId = req.params.articleId;
    const comment = req.body;
    comment.articleId = articleId;
    db.comments.push(comment);
    res.send(comment);
});

router.get('/articles/:articleId/comments/:commentId', (req, res) => {
    const articleId = req.params.articleId;
    const commentId = req.params.commentId;
    const comment = db.comments.find((comment) => parseInt(comment.id) === parseInt(commentId) && parseInt(comment.articleId) === parseInt(articleId));
    res.send(comment);
});



module.exports = router;
