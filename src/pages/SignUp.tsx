import { createLocalStorage } from '@solid-primitives/storage'
import { A } from '@solidjs/router'
import { Show } from 'solid-js'
import { createStore } from 'solid-js/store'
import { createUser } from '../api'
import { Page } from './Page'

export const SignUp = () => {
  const [user, setUser] = createStore({
    email: { value: '', error: '' },
    password: { value: '', error: '' },
    username: { value: '', error: '' },
    error: '',
  })
  const [, setStore] = createLocalStorage({
    prefix: 'solid-realworld',
  })
  return (
    <div class='auth-page'>
      <Page>
        <div class='row'>
          <div class='col-md-6 offset-md-3 col-xs-12'>
            <h1 class='text-xs-center'>Sign up</h1>
            <p class='text-xs-center'>
              <A href='/login'>Have an account?</A>
            </p>
            <pre>
              <code>{JSON.stringify(user, null, 2)}</code>
            </pre>
            <form
              onSubmit={async e => {
                try {
                  e.preventDefault()
                  setStore('error', '')
                  const response = await createUser({
                    username: user.username.value,
                    email: user.email.value,
                    password: user.password.value,
                  })
                  if (response.errors) {
                    Object.entries(response.errors).forEach(([key, value]) => {
                      setUser(
                        key as 'username' | 'email' | 'password',
                        'error',
                        value as string[][0],
                      )
                    })
                  }
                  if (response.user) {
                    console.info('Successfully created user')
                    console.info('Saving user to session...')
                    setStore('user', JSON.stringify(response.user))
                  }
                } catch (error) {
                  if (error instanceof Error) {
                    setUser('error', error.message)
                  }
                }
              }}
            >
              <fieldset class='form-group'>
                <input
                  class='form-control form-control-lg'
                  type='text'
                  value={user.username.value}
                  onKeyUp={e =>
                    setUser('username', 'value', e.currentTarget.value)
                  }
                  onBlur={e => {
                    if (!e.currentTarget.value) {
                      setUser('username', 'error', 'is required')
                    } else {
                      setUser('username', 'error', '')
                    }
                  }}
                  placeholder='Your Name'
                />
              </fieldset>
              <Show when={user.username.error} keyed>
                {error => <p class='error-messages'> Name {error}</p>}
              </Show>
              <fieldset class='form-group'>
                <input
                  class='form-control form-control-lg'
                  type='text'
                  value={user.email.value}
                  onKeyUp={e =>
                    setUser('email', 'value', e.currentTarget.value)
                  }
                  onBlur={e => {
                    if (!e.currentTarget.value) {
                      setUser('email', 'error', 'is required')
                    } else {
                      setUser('email', 'error', '')
                    }
                  }}
                  placeholder='Email'
                />
              </fieldset>
              <Show when={user.email.error} keyed>
                {error => <p class='error-messages'>Email {error}</p>}
              </Show>
              <fieldset class='form-group'>
                <input
                  class='form-control form-control-lg'
                  type='password'
                  value={user.password.value}
                  onKeyUp={e =>
                    setUser('password', 'value', e.currentTarget.value)
                  }
                  onBlur={e => {
                    if (!e.currentTarget.value) {
                      setUser('password', 'error', ' is required')
                    } else {
                      setUser('email', 'error', '')
                    }
                  }}
                  placeholder='Password'
                />
              </fieldset>
              <Show when={user.password.error} keyed>
                {error => <p class='error-messages'>Password {error}</p>}
              </Show>
              <Show when={user.error} keyed>
                {error => <p class='error-messages'>{error}</p>}
              </Show>
              <button
                type='submit'
                class='btn btn-lg btn-primary pull-xs-right'
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </Page>
    </div>
  )
}
