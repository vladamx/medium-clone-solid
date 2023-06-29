import {
  createForm,
  email,
  FormError,
  required,
  setValues,
  SubmitHandler,
} from '@modular-forms/solid'
import { useNavigate } from '@solidjs/router'
import { z } from 'zod'
import { updateUser } from '../../api'
import { useUser } from '../../UserProvider'
import { Page } from '../Page'

const settingsSchema = z.object({
  image: z.string(),
  email: z.string(),
  username: z.string(),
  bio: z.string(),
  password: z.string(),
})

type SettingsForm = z.infer<typeof settingsSchema>

const Settings = () => {
  const navigate = useNavigate()
  const { user, logout: logoutUser } = useUser()

  const [loginForm, { Form, Field }] = createForm<SettingsForm>({
    initialValues: {
      image: user()?.image ?? '',
      email: user()?.email ?? '',
      username: user()?.username ?? '',
      bio: user()?.bio ?? '',
      password: '',
    },
    revalidateOn: 'touched',
    validateOn: 'touched',
  })

  const logout = () => {
    logoutUser()
    navigate('/login')
  }

  const handleSubmit: SubmitHandler<SettingsForm> = async (values, event) => {
    const userValue = user()
    if (userValue) {
      const response = await updateUser(userValue.token, {
        username: values.username,
        email: values.email,
        bio: values.bio,
        image: values.image,
        password: values.password ? values.password : undefined,
      })
      if (response.user) {
        setValues(loginForm, response.user)
      } else if (response.errors) {
        Object.entries(response.errors).forEach(([key, value]) => {
          throw new FormError<SettingsForm>({
            [key]: value as string[][0],
          })
        })
      }
    }
  }

  return (
    <div class='settings-page'>
      <Page>
        <div class='row'>
          <div class='col-md-6 offset-md-3 col-xs-12'>
            <h1 class='text-xs-center'>Your Settings</h1>

            <Form onSubmit={handleSubmit}>
              <fieldset>
                <Field validate={[required('is required')]} name='image'>
                  {(field, props) => (
                    <>
                      <fieldset class='form-group'>
                        <input
                          class='form-control'
                          {...props}
                          value={field.value}
                          type='text'
                          placeholder='URL of profile picture'
                        />
                      </fieldset>
                      {field.error && (
                        <p class='error-messages'>Image {field.error}</p>
                      )}
                    </>
                  )}
                </Field>
                <Field validate={[required('is required')]} name='username'>
                  {(field, props) => (
                    <>
                      <fieldset class='form-group'>
                        <input
                          class='form-control form-control-lg'
                          {...props}
                          value={field.value}
                          type='text'
                          placeholder='Your Name'
                        />
                      </fieldset>
                      {field.error && (
                        <p class='error-messages'>Name {field.error}</p>
                      )}
                    </>
                  )}
                </Field>
                <Field name='bio'>
                  {(field, props) => (
                    <>
                      <fieldset class='form-group'>
                        <textarea
                          class='form-control form-control-lg'
                          rows='8'
                          value={field.value}
                          {...props}
                          placeholder='Short bio about you'
                        ></textarea>
                      </fieldset>
                      {field.error && (
                        <p class='error-messages'>Bio {field.error}</p>
                      )}
                    </>
                  )}
                </Field>
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
                  Update Settings
                </button>
              </fieldset>
            </Form>
            <hr />
            <button onClick={logout} class='btn btn-outline-danger'>
              Or click here to logout.
            </button>
          </div>
        </div>
      </Page>
    </div>
  )
}

export default Settings
