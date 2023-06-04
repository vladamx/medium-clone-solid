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
      <Banner />

      <pre>State: {JSON.stringify(feed.state, null, 2)}</pre>
      <pre>Loading: {JSON.stringify(feed.loading, null, 2)}</pre>
      <pre>Error: {JSON.stringify(feed.error ?? 'No error', null, 2)}</pre>
      <pre>Data: {JSON.stringify(feed()?.articles[0], null, 2)}</pre>

      <Page>
        <div class='row'>
          <div class='col-md-9'>
            <FeedToggle />
            <ArticlePreview />
            <ArticlePreview />
          </div>
          <div class='col-md-3'>
            <Sidebar />
          </div>
        </div>
      </Page>
    </div>
  )
}
