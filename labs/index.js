const express = require('express');
const app = express();

const route = require('./handles');
app.use(express.json());
app.use('/', route);  // Mount the router to the root path


app.listen(8080, () => {
  console.log('Server is running...');
})
