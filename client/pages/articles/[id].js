export default function Article({
    article
}) {
    return (
        <div>
            <h1 className="text-red-500">
                {article.title}
            </h1>
            <p style={{ fontStyle: 'italic' }}>This page fetch data at build time, excellent for SEO.</p>
            <p>
                {article.message}
            </p>
        </div>
    )
}

export async function getStaticProps(ctx) {
    const response = await fetch(`http://localhost:3000/api/articles/${ctx.params.id}`)
    const article = await response.json()
    return {
        props: {
            article: article
        }
    };
}

export async function getStaticPaths() {
    const response = await fetch(`http://localhost:3000/api/articles`)
    const articles = await response.json()
    return {
        paths: articles.map(article => `/articles/${article.id}`),
        fallback: false
    };
}
