export const fetchUser = async (id: string) => {
  try {
    const res = await fetch(
      `https://conduit.productionready.io/api/profiles/${id}`,
    )
    return res.json()
  } catch (error) {
    return Promise.reject(error)
  }
}

export const fetchTags = async () => {
  const res = await fetch(`https://conduit.productionready.io/api/tags`)
  return res.json()
}

export const fetchArticle = async (slug: string) => {
  const res = await fetch(
    `https://conduit.productionready.io/api/articles/${slug}`,
  )
  return res.json()
}

export const fetchCommentsForArticle = async (slug: string) => {
  const res = await fetch(
    `https://conduit.productionready.io/api/articles/${slug}/comments`,
  )
  return res.json()
}

export type Feed = {
  articles: Article[]
  articlesCount: number
}

export type Article = {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: Author
}

export type Author = {
  username: string
  bio: string
  image: string
  following: boolean
}

export const fetchFeed = async (page: number) => {
  console.log(page)
  try {
    const res = await fetch(
      `https://conduit.productionready.io/api/articles?limit=10&offset=${
        (page - 1) * 10
      }`,
    )
    return res.json() as Promise<Feed>
  } catch (error) {
    return Promise.reject(error)
  }
}

export const fetchArticlesForTag = async (tag: string) => {
  const res = await fetch(
    `https://conduit.productionready.io/api/articles?tag=${tag}`,
  )
  return res.json()
}

export const fetchArticlesByAuthor = async (author: string) => {
  const res = await fetch(
    `https://conduit.productionready.io/api/articles?author=${author}`,
  )
  return res.json()
}

export const fetchArticlesForFavorited = async (favorited: string) => {
  const res = await fetch(
    `https://conduit.productionready.io/api/articles?favorited=${favorited}`,
  )
  return res.json()
}
