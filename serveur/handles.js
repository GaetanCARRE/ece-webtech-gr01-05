// dossier de création des routes
        const about = require('./content/about.json')
        const express = require('express')
        const router = express.Router()
        const db={
            articles:[
                {id:'d001cf93-c4eb-4f56-9787-dd48ba7cde45',
                title:'PS5',
                date:'03/07/2022',
                author:'Playstation',
                content:'pack ps5 classique avec lecteur de disque'},
                {id:'a6c4784c-0e6b-45dd-b269-9cacab307670',
                title:'PS5 Digital edition',
                date:'03/07/2022',
                author:'Playstation',
                content:'pack ps5 classique sans lecteur de disque'},
                {id:'a5037c6f-5bdb-4b2a-91ee-cec96e169654',
                title:'PS5 God of War',
                date:'07/11/2022',
                author:'Playstation',
                content:'pack ps5 edition god of war avec le jeu et 2 manettes'},
                {id:'839b6516-8fb5-4951-83af-7b7c3d40d5d3',
                title:'Nintendo Swicth',
                date:'07/10/2021',
                author:'Nintendo',
                content:'Pack Nintendo Switch avec 2 joycons'},
            ],
            comments:[
                {id:'cdb764af-9aaf-417a-b655-a0805093c396',
                timestamp:1778911,
                content:'Super console j ai reussi a l avoir en 15 secondes',
                articleId:'d001cf93-c4eb-4f56-9787-dd48ba7cde45',
                author:'Philippe'},
                {id:'9b701228-1d48-4d06-8806-582e5ae8a5e5',
                timestamp:1071571,
                content:'Trop nul y a pas de lecteur de disque',
                articleId:'a6c4784c-0e6b-45dd-b269-9cacab307670',
                author:'Michel'},
                {id:'0196af1e-bebb-4b8b-8684-9236544cbbdc',
                timestamp:7618191,
                content:'God of war est certainement le jeu de l annee',
                articleId:'a5037c6f-5bdb-4b2a-91ee-cec96e169654',
                author:'Fan2JV'},
                {id:'0b26a1f2-bec8-4c45-9d3f-16728e21c3c6',
                timestamp:1111111,
                content:'ma petite fille s amuse comme une folle avec sa console',
                articleId:'839b6516-8fb5-4951-83af-7b7c3d40d5d3',
                author:'Chantal'},
            ]
        }

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
        router.get('/articles',(req, res) =>{ // get route articles qui affiche tout les articles
            res.write(JSON.stringify(db.articles))
            res.end()
        })
        // HELP
        router.post('/articles',(req, res) =>{ // post route articles qui permet d'ajouter un nouvel article
            const article = req.body
            db.articles.push(article)
            res.write(JSON.stringify(db.articles))
            res.end()
        })
        router.get('/articles/:articleId',(req, res) =>{ // get route articles qui permet de récupérer un article par son ID
            const SearchID = req.params.articleId
            const article = db.articles.find(article => article.id === SearchID)
            res.write(JSON.stringify(article))
            res.end()
        })
        router.get('/articles/:articleId/comments',(req, res) =>{ // get route articles qui permet de récupérer tous les commentaire d'un article grace a son ID
            const SearchID = req.params.articleId
            const comments = db.comments.filter(comment => comment.articleId === SearchID)
            res.write(JSON.stringify(comments))
            res.end()
        })
        // HELP
        router.post('/articles/:articleId/comments',(req, res) =>{ // post ajouter un nouveau commentaire a un article grace a son ID
            const SearchID = req.params.articleId
            const article = db.articles.find(article => article.id === SearchID)
            const comment = req.body
            comment.articleId = article.id
            newtimestamp=Date.now()
            comment.timestamp=ntimestamp
            db.comments.push(comment)
            res.write(JSON.stringify(db.comments))
            res.end()
        })
        router.get('/articles/:articleId/comments/:commentId',(req, res) =>{ // get route articles qui permet de récupérer un commentaire d'un article grace a son ID
            const ASearchID = req.params.articleId
            const CSearchID = req.params.commentId
            const comment = db.comments.find(comment => comment.id === CSearchID && comment.articleId === ASearchID)
            res.write(JSON.stringify(comment))
            res.end()
        })
        module.exports= router
    //}


