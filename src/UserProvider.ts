import { createContextProvider } from '@solid-primitives/context'
import { isNil } from 'lodash-es'
import { createSignal } from 'solid-js'

const [UserProvider, useUser] = createContextProvider(
  () => {
    const [user, setUserSignal] = createSignal<{
      username: string
      email: string
      image?: string
      bio?: string
      token: string
    } | null>({ username: 'user1', email: 'user1@gmail.com', token: 'token' })

    return {
      user,
      loggedIn: () => !isNil(user()),
      login: (user: { email: string; username: string; token: string }) => {
        setUserSignal(user)
      },
      logout: () => {
        setUserSignal(null)
      },
    }
  },
  {
    user: () => null,
    loggedIn: () => false,
    login: (user: { email: string; username: string }) => {},
    logout: () => {},
  },
)

export { UserProvider, useUser }
