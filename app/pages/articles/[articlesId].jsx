import { useRouter } from 'next/router'

export function ArticlesDetail(){
    const router = useRouter()
    const articlesId = router.query.articlesId

    if(articlesId === 'ps'){
        return (
            <><h1 className="text-3xl font-bold underline">
            détail de l'article Playstation 5 prix 500 euros 2 en stock
            </h1></>
        )
    }
    else if(articlesId === 'xbox'){
        return (
            <><h1 className="text-3xl font-bold underline">
            détail de l'article Xbox One prix 400 euros 500 en stock
            </h1></>
        )
    }
    else if(articlesId === 'switch'){
        return (
            <><h1 className="text-3xl font-bold underline">
            détail de l'article Nintendo Switch prix 300 euros 100 en stock
            </h1></>
        )
    }
    else{
        return (
            <><h1 className="text-3xl font-bold underline">
            article inexistant
            </h1></>
        )
    }
}

export default ArticlesDetail
