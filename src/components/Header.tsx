import { A, useIsRouting } from '@solidjs/router'
import { createEffect, Show } from 'solid-js'
import { useUser } from '../UserProvider'

export const Header = () => {
  const { loggedIn } = useUser()

  const isRouting = useIsRouting()
  let progressRef: HTMLDivElement | undefined
  createEffect(() => {
    const progress = () => {
      if (isRouting()) {
        requestAnimationFrame(() => {
          if (progressRef) {
            // Could also update signal for ease of use and accessibility
            progressRef.style.width = `${
              ((parseInt(progressRef.style.width) || 0) + 2) % 100
            }%`
            progress()
          }
        })
      }
    }
    progress()
  })

  return (
    <>
      <div
        class='progress'
        style={{ 'margin-bottom': 0, height: !isRouting() ? 0 : '1rem' }}
      >
        {isRouting() && (
          <div
            ref={progressRef}
            class='progress-bar'
            style={{ 'background-color': '#5cb85c', height: '5px' }}
            role='progressbar'
          ></div>
        )}
      </div>
      <nav class='navbar navbar-light'>
        <div class='container'>
          <A class='navbar-brand' href='/'>
            conduit
          </A>
          <ul class='nav navbar-nav pull-xs-right'>
            <li class='nav-item'>
              <A class='nav-link' end={true} href='/'>
                Home
              </A>
            </li>
            <Show when={loggedIn()}>
              <li class='nav-item'>
                <A class='nav-link' href='/editor'>
                  {' '}
                  <i class='ion-compose'></i>&nbsp;New Article{' '}
                </A>
              </li>
            </Show>
            <Show when={loggedIn()}>
              <li class='nav-item'>
                <A class='nav-link' href='/settings'>
                  {' '}
                  <i class='ion-gear-a'></i>&nbsp;Settings{' '}
                </A>
              </li>
            </Show>
            <Show when={!loggedIn()}>
              <li class='nav-item'>
                <A class='nav-link' href='/login'>
                  Sign in
                </A>
              </li>
              <li class='nav-item'>
                <A class='nav-link' href='/register'>
                  Sign up
                </A>
              </li>
            </Show>
          </ul>
        </div>
      </nav>
    </>
  )
}
