import { ErrorBoundary, Show, Suspense, lazy, Component } from 'solid-js'
import { Article } from './pages/Article'
import { Route, Router, Routes } from '@solidjs/router'

import { PageLayout } from './components/PageLayout'

const Profile = lazy(() => import('./pages/lazy/Profile'))
const Settings = lazy(async () => {
  await new Promise(resolve => setTimeout(resolve, 4000))
  return import('./pages/lazy/Settings')
})

import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'
import { CreateEditArticle } from './pages/CreateEditArticle'
import { NotFound } from './pages/NotFound'
import { homeRouteData } from './pages/Home.data'
import { SignUp } from './pages/SignUp'

import logo from './logo.png'
import { useUser } from './UserProvider'

const App: Component = () => {
  // TODO: Not reactive
  const { loggedIn } = useUser()

  return (
    <ErrorBoundary fallback={'Error...'}>
      {/* This global suspense is pretty much mandatory in order for async mechanism to work across the app - for example isRouting() from router would not work without this suspense */}
      <Suspense
        fallback={
          <div
            style={{
              display: 'flex',
              'justify-content': 'center',
              'align-items': 'center',
              height: '100vh',
            }}
          >
            <img
              style={{ 'align-self': 'center' }}
              width={300}
              height={50}
              alt='logo'
              src={logo}
            />
          </div>
        }
      >
        <Router>
          <Routes>
            <Route path='/' component={PageLayout}>
              <Route path='/' component={Home} data={homeRouteData} />
              <Show when={loggedIn}>
                <Route path='/login' component={SignIn} />
                <Route path='/register' component={SignUp} />
              </Show>
              <Route path='/settings' component={Settings} />
              <Route path='/editor' component={CreateEditArticle} />
              <Route path='/editor/:slug' component={CreateEditArticle} />
              <Route path='/article/:slug' component={Article} />
              <Route path='/@/'>
                <Route path='/:username' component={Profile} />
                <Route path='/:username/favorites' component={Profile} />
              </Route>
            </Route>
            <Route path='*' component={NotFound} />
          </Routes>
        </Router>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
