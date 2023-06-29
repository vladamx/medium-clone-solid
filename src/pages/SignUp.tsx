import { A } from '@solidjs/router'
import { Show } from 'solid-js'
import { createStore } from 'solid-js/store'
import { createUser } from '../api'
import { useUser } from '../UserProvider'
import { Page } from './Page'

export const SignUp = () => {
  const [userForm, setUserForm] = createStore({
    email: { value: '', error: '' },
    password: { value: '', error: '' },
    username: { value: '', error: '' },
    error: '',
  })
  const { user, login } = useUser()
  return (
    <div class='auth-page'>
      <Page>
        <div class='row'>
          <div class='col-md-6 offset-md-3 col-xs-12'>
            <h1 class='text-xs-center'>Sign up</h1>
            <p class='text-xs-center'>
              <A href='/login'>Have an account?</A>
            </p>
            <form
              onSubmit={async e => {
                try {
                  e.preventDefault()
                  setUserForm('error', '')
                  const response = await createUser({
                    username: userForm.username.value,
                    email: userForm.email.value,
                    password: userForm.password.value,
                  })
                  if (response.errors) {
                    Object.entries(response.errors).forEach(([key, value]) => {
                      setUserForm(
                        key as 'username' | 'email' | 'password',
                        'error',
                        value as string[][0],
                      )
                    })
                  }
                  if (response.user) {
                    console.info('Successfully created user')
                    console.info('Saving user to session...')
                    login(response.user)
                  }
                } catch (error) {
                  if (error instanceof Error) {
                    setUserForm('error', error.message)
                  }
                }
              }}
            >
              <fieldset class='form-group'>
                <input
                  class='form-control form-control-lg'
                  type='text'
                  value={userForm.username.value}
                  onKeyUp={e =>
                    setUserForm('username', 'value', e.currentTarget.value)
                  }
                  onBlur={e => {
                    if (!e.currentTarget.value) {
                      setUserForm('username', 'error', 'is required')
                    } else {
                      setUserForm('username', 'error', '')
                    }
                  }}
                  placeholder='Your Name'
                />
              </fieldset>
              <Show when={userForm.username.error} keyed>
                {error => <p class='error-messages'> Name {error}</p>}
              </Show>
              <fieldset class='form-group'>
                <input
                  class='form-control form-control-lg'
                  type='text'
                  value={userForm.email.value}
                  onKeyUp={e =>
                    setUserForm('email', 'value', e.currentTarget.value)
                  }
                  onBlur={e => {
                    if (!e.currentTarget.value) {
                      setUserForm('email', 'error', 'is required')
                    } else {
                      setUserForm('email', 'error', '')
                    }
                  }}
                  placeholder='Email'
                />
              </fieldset>
              <Show when={userForm.email.error} keyed>
                {error => <p class='error-messages'>Email {error}</p>}
              </Show>
              <fieldset class='form-group'>
                <input
                  class='form-control form-control-lg'
                  type='password'
                  value={userForm.password.value}
                  onKeyUp={e =>
                    setUserForm('password', 'value', e.currentTarget.value)
                  }
                  onBlur={e => {
                    if (!e.currentTarget.value) {
                      setUserForm('password', 'error', ' is required')
                    } else {
                      setUserForm('email', 'error', '')
                    }
                  }}
                  placeholder='Password'
                />
              </fieldset>
              <Show when={userForm.password.error} keyed>
                {error => <p class='error-messages'>Password {error}</p>}
              </Show>
              <Show when={userForm.error} keyed>
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
