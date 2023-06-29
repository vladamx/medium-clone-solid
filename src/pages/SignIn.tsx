import {
  createForm,
  FormError,
  SubmitHandler,
  email,
  required,
} from '@modular-forms/solid'
import { A, useNavigate } from '@solidjs/router'
import { z } from 'zod'
import { login as apiLogin } from '../api'
import { useUser } from '../UserProvider'
import { Page } from './Page'

const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
})

type LoginForm = z.infer<typeof loginSchema>

export const SignIn = () => {
  const { user, login } = useUser()
  const navigate = useNavigate()
  const [loginForm, { Form, Field }] = createForm<LoginForm>({
    revalidateOn: 'touched',
    validateOn: 'touched',
  })

  const handleSubmit: SubmitHandler<LoginForm> = async (values, event) => {
    const response = await apiLogin({
      email: values.email,
      password: values.password,
    })
    if (response.user) {
      console.info('Saving user to session...')
      login(response.user)
      navigate('/')
    } else if (response.errors) {
      Object.entries(response.errors).forEach(([key, value]) => {
        throw new FormError<LoginForm>({
          [key]: value as string[][0],
        })
      })
    }
  }

  return (
    <div class='auth-page'>
      <Page>
        <div class='row'>
          <div class='col-md-6 offset-md-3 col-xs-12'>
            <h1 class='text-xs-center'>Sign in</h1>
            <p class='text-xs-center'>
              <A href='/register'>Need an account?</A>
            </p>
            <Form onSubmit={handleSubmit}>
              <Field
                validate={[email('is not valid'), required('is required')]}
                name='email'
              >
                {(field, props) => (
                  <>
                    <fieldset class='form-group'>
                      <input
                        class='form-control form-control-lg'
                        {...props}
                        value={field.value}
                        placeholder='Email'
                      />
                    </fieldset>
                    {field.error && (
                      <p class='error-messages'>Email {field.error}</p>
                    )}
                  </>
                )}
              </Field>
              <Field name='password'>
                {(field, props) => (
                  <>
                    <fieldset class='form-group'>
                      <input
                        class='form-control form-control-lg'
                        type='password'
                        {...props}
                        value={field.value}
                        placeholder='Password'
                      />
                    </fieldset>
                    {field.error && (
                      <p class='error-messages'>Password {field.error}</p>
                    )}
                  </>
                )}
              </Field>
              <button class='btn btn-lg btn-primary pull-xs-right'>
                Sign in
              </button>
            </Form>
          </div>
        </div>
      </Page>
    </div>
  )
}
