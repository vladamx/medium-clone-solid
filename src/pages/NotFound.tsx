import { A } from '@solidjs/router'

export const NotFound = () => {
  return (
    <div class='container page'>
      <div class='row'>
        <div class='col-md-6 offset-md-3 col-xs-12'>
          <h1 class='text-xs-center'>Not Found</h1>
          <hr />
          <div class='row flex-items-md-center'>
            <A href='/'>
              <button class='btn btn-outline'>Go Home</button>
            </A>
          </div>
        </div>
      </div>
    </div>
  )
}
