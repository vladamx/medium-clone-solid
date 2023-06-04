import type { Component } from 'solid-js'
import { Footer } from './components/Footer'

import { Header } from './components/Header'
import { Profile } from './pages/Profile'

import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Settings } from './pages/Settings'
import { CreateArticle } from './pages/CreateArticle'
import { Article } from './pages/Article'

const App: Component = () => {
  return (
    <>
      <Header />
      <Article />
      <Footer />
    </>
  )
}

export default App
