import { useRouteData } from '@solidjs/router'
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

      <pre>State: {JSON.stringify(feed.state, null, 2)}</pre>
      <pre>Loading: {JSON.stringify(feed.loading, null, 2)}</pre>
      <pre>Error: {JSON.stringify(feed.error ?? 'No error', null, 2)}</pre>
      <pre>Data: {JSON.stringify(feed()?.articles[0], null, 2)}</pre>

      <Page>
        <div class='row'>
          <div class='col-md-9'>
            <FeedToggle
              feeds={[{ id: 'global', title: 'Global Feed' }]}
              defaultFeed='global'
            />
            <ArticlePreview
              author={{
                username: 'jake',
                image:
                  'https://static.productionready.io/images/smiley-cyrus.jpg',
                following: false,
                name: 'Jacob',
              }}
              date='January 20th'
              title='How to build webapps that scale'
              slug='how-to-build-webapps-that-scale'
              description='This is the description for the post.'
              favoritesCount={0}
            />
            <ArticlePreview
              author={{
                username: 'jake',
                image:
                  'https://static.productionready.io/images/smiley-cyrus.jpg',
                following: false,
                name: 'Jacob',
              }}
              date='January 20th'
              title='How to build webapps that scale'
              slug='how-to-build-webapps-that-scale'
              description='This is the description for the post.'
              favoritesCount={0}
            />
          </div>
          <div class='col-md-3'>
            <Sidebar />
          </div>
        </div>
      </Page>
    </div>
  )
}
