import {serverHandle} from './handles.js'

const http = require('http')
const qs = require('querystring')

const content = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>ECE AST</title>' +
'    </head>' +
'    <body>' +
'       <p>Hello World!</p>' +
'    </body>' +
'</html>'

const url = require('url')
const handles = require('./handles')
const server = http.createServer(serverHandle)
server.listen(8080)