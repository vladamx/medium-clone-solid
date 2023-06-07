import { Outlet } from '@solidjs/router'
// Basic animation primitive
// Compatible with router
// No surprises in scheduling since solid is very friendly with how original DOM works
import { FadeTransition } from './FadeTransition'
// more advanced(user friendly) animation library https://motion.dev/ has adapters for solid

import { Footer } from './Footer'
import { Header } from './Header'

export const PageLayout = () => {
  return (
    <>
      <Header />
      {/* Transition using Web Animation Api */}
      <FadeTransition>
        <Outlet />
      </FadeTransition>
      <Footer />
    </>
  )
}
