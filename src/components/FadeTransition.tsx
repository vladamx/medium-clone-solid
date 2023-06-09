import { JSX, mergeProps } from 'solid-js'
import { Transition } from 'solid-transition-group'

type FadeTransition = {
  children: JSX.Element
  duration?: number
  mode?: 'inout' | 'outin'
}

export const FadeTransition = (props: FadeTransition) => {
  const mergedProps = mergeProps({ duration: 150, mode: 'outin' }, props)
  return (
    <Transition
      mode={mergedProps.mode as 'inout' | 'outin'}
      onBeforeEnter={el => {
        if (el.parentNode) {
          if (el instanceof HTMLElement) el.style.opacity = '0'
        }
      }}
      onEnter={(el, done) => {
        el.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: mergedProps.duration,
          fill: 'both',
        })
          .finished.then(done)
          .catch(done)
      }}
      onExit={(el, done) => {
        el.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: mergedProps.duration,
        })
          .finished.then(done)
          .catch(done)
      }}
    >
      {props.children}
    </Transition>
  )
}
