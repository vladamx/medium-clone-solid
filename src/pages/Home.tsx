import { useRouteData } from '@solidjs/router'
import { parseISO } from 'date-fns'
import { ErrorBoundary, For, Suspense } from 'solid-js'
import { ArticlePreview } from '../components/ArticlePreview'
import { Banner } from '../components/Banner'
import { FeedToggle } from '../components/FeedToggle'
import { Sidebar } from '../components/Sidebar'

import { homeRouteData } from './Home.data'
import { Page } from './Page'

export const Home = () => {
  const { feed, refetch } = useRouteData<typeof homeRouteData>()

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
            {/* Bootstrap layout issue */}
            <p></p>
            {/* Because of the mechanics of how createResourse signals work be sure to always nest data access after error check otherwise data access signal will throw. Thats why ErrorBoundary works.
            ErrorBoundary API is a little bit cumbersome because of manual reset needed after mutation but powerful in a way since you can pull it up in the hierarchy and still catch errors just like Suspense. ErrorBoundaries will be reset automatically on page change*/}
            <ErrorBoundary
              fallback={(err, reset) => (
                <div>
                  <p>Failed to load articles!</p>
                  <p>Reason: {err.message}</p>
                  <button
                    class='btn btn-outline-success'
                    onClick={() => {
                      refetch()
                      reset()
                    }}
                  >
                    Try again
                  </button>
                </div>
              )}
            >
              <Suspense fallback={<p>Loading articles..</p>}>
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
              </Suspense>
            </ErrorBoundary>
          </div>
          <div class='col-md-3'>
            <Sidebar />
          </div>
        </div>
      </Page>
    </div>
  )
}
