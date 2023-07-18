import { createContextProvider } from '@solid-primitives/context'
import { createStorage } from '@solid-primitives/storage'
import { isNil } from 'lodash-es'
import { createEffect, createRoot, createSignal } from 'solid-js'

type User = {
  email: string
  username: string
  token: string
  bio?: string
  image: string
}

const [UserProvider, useUser] = createContextProvider(
  () => {
    const [user, setUserSignal] = createSignal<User | null>(null)

    // Not reactive. Needs to be synchronized to signal.
    const [store, setUserStore, { remove }] = createStorage({
      prefix: 'solid-realworld',
    })

    createRoot(() => {
      createEffect(() => {
        const user = store['user']
        if (user) {
          setUserSignal(JSON.parse(user))
        }
      })
    })

    return {
      user,
      loggedIn: () => !isNil(user()),
      login: (user: User) => {
        setUserStore('user', JSON.stringify(user))
        setUserSignal(user)
      },
      logout: () => {
        remove('user')
        setUserSignal(null)
      },
    }
  },
  {
    user: () => null,
    loggedIn: () => false,
    login: (user: User) => {},
    logout: () => {},
  },
)

export { UserProvider, useUser }
