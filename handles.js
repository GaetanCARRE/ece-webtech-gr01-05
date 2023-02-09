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
    
        if (route_path === '/hello' && 'name' in params) {
            res.write('Hello ' + params['name'])
        } else {
            res.write('Hello anonymous')
        }
        
        res.end();
      
    }
}