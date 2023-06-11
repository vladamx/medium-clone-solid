import { createLocalStorage } from '@solid-primitives/storage'
import { A } from '@solidjs/router'
import { Page } from './Page'

export const SignIn = () => {
  const [store, setStore] = createLocalStorage({
    prefix: 'solid-realworld',
  })
  return (
    <div class='auth-page'>
      <Page>
        <div class='row'>
          <div class='col-md-6 offset-md-3 col-xs-12'>
            <h1 class='text-xs-center'>Sign in</h1>
            <p class='text-xs-center'>
              <A href='/register'>Need an account?</A>
            </p>
            <form>
              <fieldset class='form-group'>
                <input
                  class='form-control form-control-lg'
                  type='text'
                  placeholder='Email'
                />
              </fieldset>
              <p class='error-messages'>That email is already taken</p>
              <fieldset class='form-group'>
                <input
                  class='form-control form-control-lg'
                  type='password'
                  placeholder='Password'
                />
              </fieldset>
              <p class='error-messages'>That email is already taken</p>
              <button class='btn btn-lg btn-primary pull-xs-right'>
                Sign in
              </button>
            </form>
          </div>
        </div>
      </Page>
    </div>
  )
}
