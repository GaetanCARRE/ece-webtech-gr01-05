// console.log ('Hello World !')
// http server
const http = require('http')

const handles = require('./handles')
const hd = require('./content/handlesabout')

  http
  .createServer(handles.serverHandle)
  .listen(8080)
