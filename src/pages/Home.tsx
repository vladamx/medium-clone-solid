import { useRouteData } from '@solidjs/router'
import { parseISO } from 'date-fns'
import { For } from 'solid-js'
import { ArticlePreview } from '../components/ArticlePreview'
import { Banner } from '../components/Banner'
import { FeedToggle } from '../components/FeedToggle'
import { Sidebar } from '../components/Sidebar'

import { homeRouteData } from './Home.data'
import { Page } from './Page'

export const Home = () => {
  const feed = useRouteData<typeof homeRouteData>()

  return (
    <div class='home-page'>
      <Banner title='conduit' description='A place to share your knowledge.' />
      <Page>
        <div class='row'>
          <div class='col-md-9'>
            <FeedToggle
              feeds={[{ id: 'global', title: 'Global Feed' }]}
              defaultFeed='global'
            />
            {feed.loading && <div>Loading...</div>}
            {feed.error && <div>Error: {feed.error}</div>}
            <For each={feed()?.articles}>
              {article => (
                <ArticlePreview
                  author={{
                    username: article.author.username,
                    image:
                      article.author.image ||
                      'https://static.productionready.io/images/smiley-cyrus.jpg',
                    following: article.author.following,
                    name: article.author.username,
                  }}
                  date={parseISO(article.createdAt).toLocaleDateString()}
                  title={article.title}
                  slug={article.slug}
                  description={article.description}
                  favoritesCount={article.favoritesCount}
                />
              )}
            </For>
          </div>
          <div class='col-md-3'>
            <Sidebar />
          </div>
        </div>
      </Page>
    </div>
  )
}
