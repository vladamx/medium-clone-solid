import { Component, createResource, lazy } from 'solid-js'
import { Article } from './pages/Article'
import { Route, Router, Routes } from '@solidjs/router'

import { PageLayout } from './components/PageLayout'

const Profile = lazy(() => import('./pages/lazy/Profile'))
const Settings = lazy(async () => {
  await new Promise(resolve => setTimeout(resolve, 4000))
  return import('./pages/lazy/Settings')
})

import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { CreateEditArticle } from './pages/CreateEditArticle'
import { NotFound } from './pages/NotFound'
import { homeRouteData } from './pages/Home.data'

const App: Component = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' component={PageLayout}>
          <Route path='/' component={Home} data={homeRouteData} />
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
