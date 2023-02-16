// console.log ('Hello World !')
// http server
const http = require('http')

const handles = require('./handles')

  http
  .createServer(handles.serverHandle)
  .listen(8080)
