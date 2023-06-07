import { A } from '@solidjs/router'

type ArticlePreviewProps = {
  author: {
    username: string
    image: string
    following: boolean
    name: string
  }
  date: string
  title: string
  slug: string
  description: string
  favoritesCount: number
}

// props access is deferred up to the last moment and bound on dom elements
// default props are supported with mergeProps which returns a signal
// split props are supported with splitProps which returns a signal
// JSX return real dom nodes rather than a virtual dom
// so you can directly add classes to children for example
export const ArticlePreview = (props: ArticlePreviewProps) => {
  return (
    <div class='article-preview'>
      <div class='article-meta'>
        <A href={`/@/${props.author.username}`}>
          <img src={props.author.image} />
        </A>
        <div class='info'>
          <a href='' class='author'>
            {props.author.name}
          </a>
          <span class='date'>{props.date}</span>
        </div>
        <button class='btn btn-outline-primary btn-sm pull-xs-right'>
          <i class='ion-heart'></i> {props.favoritesCount}
        </button>
      </div>
      <A href={`/article/${props.slug}`} class='preview-link'>
        <h1>{props.title}</h1>
        <p>{props.description}</p>
        <span>Read more...</span>
      </A>
    </div>
  )
}
