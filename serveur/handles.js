// necessary imports
module.exports ={
    serverHandle: function (req, res) {
        const url = require('url')
        const qs = require('querystring')
        const route = url.parse(req.url)
        const path = route.pathname
        const params = qs.parse(route.query)
        const about = require('./content/about.json')
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
    
        res.writeHead(200, {'Content-Type': 'text/plain'})
    // creation de la route about qui affiche le contenu du fichier content/about.json
        if (path === '/about') {
            res.write(JSON.stringify(about))
        }
        else if (path=== '/hello' && 'name' in params) {
            // si le nom est Adam
            if(params['name']==="Adam"){
                res.write("Adam 21 ans etudiant à l'ECE Paris dans la filiere Cybersecurite trop cool l'ECE tres fun")
            }
            else{ // sinon autre nom random
                res.write('Hello ' + params['name'])
            }
        }else { // si pas de nom on affiche une erreur
            res.write("Error 404 - Not found")
        }
        const queryParams = qs.parse(url.parse(req.url).query)
        console.log(queryParams)
    
        console.log(path)
    
        res.end()
      }
}