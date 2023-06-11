import { Component, lazy, Show } from 'solid-js'
import { Article } from './pages/Article'
import { Route, Router, Routes } from '@solidjs/router'

import { PageLayout } from './components/PageLayout'

const Profile = lazy(() => import('./pages/lazy/Profile'))
const Settings = lazy(async () => {
  return import('./pages/lazy/Settings')
})

import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'
import { CreateEditArticle } from './pages/CreateEditArticle'
import { NotFound } from './pages/NotFound'
import { homeRouteData } from './pages/Home.data'
import { SignUp } from './pages/SignUp'
import { createLocalStorage } from '@solid-primitives/storage'

const App: Component = () => {
  const [, , { toJSON }] = createLocalStorage({
    prefix: 'solid-realworld',
  })
  return (
    <Router>
      <Routes>
        <Route path='/' component={PageLayout}>
          <Route path='/' component={Home} data={homeRouteData} />
          <Show when={!toJSON()['solid-realworld.user']}>
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
  )
}

export default App
