// dossier de création des routes
        const about = require('./content/about.json')
        const express = require('express')
        const router = express.Router()

        router.use ((req,res,next) => {
            console.log('Time:', Date.now())
            next()
        })
        router.get('/',(req, res) =>{ // route / qui affiche le contenu du fichier content/index.html
            res.write('Accueil !')
            res.end()
        })
        router.get( '/hello',(req, res) =>{ // route hello qui affiche le nom de l'utilisateur et + d'infos si nom = Adam
            if (req.query.name==="Adam"){
                res.write("Adam 21 ans etudiant à l'ECE Paris dans la filiere Cybersecurite trop cool l'ECE tres fun")
            }
            else if(req.query.name!=="Adam"){
                res.write('Hello ' + req.query.name)
            }
            else{
                res.write('Hello inconnu')
            }
        res.end()
        })
        router.get('/about',(req, res) =>{ // route about qui affiche le contenu du fichier content/about.json
            res.write(JSON.stringify(about))
            res.end()
        })
        module.exports= router
    //}


