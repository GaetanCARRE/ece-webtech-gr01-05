const express = require('express');
const app = express();

const route = require('./handles');

app.use('/', route);  // Mount the router to the root path
app.use('/about', route); // Mount the router to the /about path
app.use('/hello', route); // Mount the router to the /hello path

app.listen(8080, () => {
  console.log('Server is running...');
})
