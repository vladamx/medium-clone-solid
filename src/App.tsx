import { Component, lazy } from 'solid-js'
import { Article } from './pages/Article'
import { Route, Router, Routes } from '@solidjs/router'

import { PageLayout } from './components/PageLayout'

const Profile = lazy(() => import('./pages/Profile'))
const Settings = lazy(() => import('./pages/Settings'))

import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { CreateEditArticle } from './pages/CreateEditArticle'
import { NotFound } from './pages/NotFound'

const App: Component = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' component={PageLayout}>
          <Route path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Login} />
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
