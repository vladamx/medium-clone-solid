import type { Component } from 'solid-js'
import { Article } from './pages/Article'
import { Route, Router, Routes } from '@solidjs/router'

import { Profile } from './pages/Profile'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Settings } from './pages/Settings'
import { CreateEditArticle } from './pages/CreateEditArticle'
import { PageLayout } from './components/PageLayout'

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
          <Route path='/@:username' component={Profile} />
          <Route path='/@:username/favorites' component={Profile} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
