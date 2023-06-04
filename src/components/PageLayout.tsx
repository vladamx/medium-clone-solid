import { Outlet } from '@solidjs/router'
import { Footer } from './Footer'
import { Header } from './Header'

export const PageLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
