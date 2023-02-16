const qs = require('querystring')
const url = require('url')
const fs = require('fs');

const content = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>ECE AST</title>' +
'    </head>' +
'    <body>' +
'    </body>' +
'</html>'

const home = '<h1>Home</h1>' +
'<p>By typing /hello?name="your name" in url you can display your name\nif you dont write name it will say Hello Anonymous. Try it <a href="http://localhost:8080/hello">here</a> </p>'

module.exports = {
    serverHandle : function (req, res) {
        const path = url.parse(req.url).pathname;
        console.log(path);
        const queryParams = qs.parse(url.parse(req.url).query);
        console.log(queryParams);
        const route = url.parse(req.url)
        const route_path = route.pathname
        const params = qs.parse(route.query)
    
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(content);
        if (route_path == '/') {
            res.write(home)
        }
        else if(route_path === '/hello' && 'name' in params) {
            if (params['name'] == 'Gaetan')
                res.write('Hello i\'m Gaetan CARRE,\n i\'m 21 years old and i\'m a student at ECE Paris in apprentiship with Thales')
            else
                res.write('Hello ' + params['name'])
        } 
        else if(route_path === '/hello'){
            res.write('Hello anonymous')
        }
        else if (route_path === '/about'){
            const about = JSON.parse(fs.readFileSync('about.json'))
            res.write(about.content)

        }
        else {
            res.write('<h1>404 Not Found</h1>')
        }
        
        
        res.end();
      
    }
}