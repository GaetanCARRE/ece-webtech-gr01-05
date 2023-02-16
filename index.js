const http = require('http')
const url = require('url')
const handles = require('./handles')
const server = http.createServer(handles.serverHandle);
server.listen(8080)