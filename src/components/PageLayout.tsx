import { Outlet } from '@solidjs/router'
// Basic animation primitive
// Compatible with router
// No surprises in scheduling since solid is very friendly with how original DOM works
import { Transition } from 'solid-transition-group'
// more advanced(user friendly) animation library https://motion.dev/ has adapters for solid

import { Footer } from './Footer'
import { Header } from './Header'

export const PageLayout = () => {
  return (
    <>
      <Header />
      {/* Transition using Web Animation Api */}
      <Transition
        mode='outin'
        onBeforeEnter={el => {
          if (el instanceof HTMLElement) el.style.opacity = '0'
        }}
        onEnter={(el, done) => {
          el.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 150,
            fill: 'both',
          })
            .finished.then(done)
            .catch(done)
        }}
        onExit={(el, done) => {
          el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 150 })
            .finished.then(done)
            .catch(done)
        }}
      >
        <Outlet />
      </Transition>
      <Footer />
    </>
  )
}
