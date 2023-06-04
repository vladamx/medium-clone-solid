import { A } from '@solidjs/router'

export const Header = () => {
  return (
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
          <li class='nav-item'>
            <A class='nav-link' href='/editor'>
              {' '}
              <i class='ion-compose'></i>&nbsp;New Article{' '}
            </A>
          </li>
          <li class='nav-item'>
            <A class='nav-link' href='/settings'>
              {' '}
              <i class='ion-gear-a'></i>&nbsp;Settings{' '}
            </A>
          </li>
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
        </ul>
      </div>
    </nav>
  )
}
