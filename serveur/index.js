// console.log ('Hello World !')
// http server const http = require('http')
const handles = require('./handles')
const express = require('express')
const app = express()


app.use('/',handles)
app.listen(8080, () => {
    console.log('Server started.')
})

