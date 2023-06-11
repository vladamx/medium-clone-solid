import { createLocalStorage } from '@solid-primitives/storage'
import { Page } from '../Page'

const Settings = () => {
  const [, , { toJSON }] = createLocalStorage({
    prefix: 'solid-realworld',
  })
  return (
    <div class='settings-page'>
      <Page>
        <div class='row'>
          <div class='col-md-6 offset-md-3 col-xs-12'>
            <h1 class='text-xs-center'>Your Settings</h1>

            <form>
              <fieldset>
                <fieldset class='form-group'>
                  <input
                    class='form-control'
                    value={JSON.parse(toJSON()['solid-realworld.user']).image}
                    type='text'
                    placeholder='URL of profile picture'
                  />
                </fieldset>
                <fieldset class='form-group'>
                  <input
                    class='form-control form-control-lg'
                    type='text'
                    value={
                      JSON.parse(toJSON()['solid-realworld.user']).username
                    }
                    placeholder='Your Name'
                  />
                </fieldset>
                <fieldset class='form-group'>
                  <textarea
                    class='form-control form-control-lg'
                    rows='8'
                    value={JSON.parse(toJSON()['solid-realworld.user']).bio}
                    placeholder='Short bio about you'
                  ></textarea>
                </fieldset>
                <fieldset class='form-group'>
                  <input
                    class='form-control form-control-lg'
                    type='text'
                    value={JSON.parse(toJSON()['solid-realworld.user']).email}
                    placeholder='Email'
                  />
                </fieldset>
                <fieldset class='form-group'>
                  <input
                    class='form-control form-control-lg'
                    type='password'
                    value={
                      JSON.parse(toJSON()['solid-realworld.user']).password
                    }
                    placeholder='Password'
                  />
                </fieldset>
                <button class='btn btn-lg btn-primary pull-xs-right'>
                  Update Settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button class='btn btn-outline-danger'>
              Or click here to logout.
            </button>
          </div>
        </div>
      </Page>
    </div>
  )
}

export default Settings
