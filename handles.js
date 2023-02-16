const express = require('express');
const router = express.Router();
const fs = require('fs');

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

module.exports = router;
