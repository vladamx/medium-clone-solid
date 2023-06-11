import { A } from '@solidjs/router'
import { Page } from './Page'

export const NotFound = () => {
  return (
    <Page>
      <div class='row flex-items-md-center'>
        <div class='col'>
          <h1 class='text-xs-center'>Not Found</h1>
          <hr />
          <div class='row flex-items-md-center'>
            <A href='/'>
              <button class='btn btn-outline'>Go Home</button>
            </A>
          </div>
        </div>
      </div>
    </Page>
  )
}
