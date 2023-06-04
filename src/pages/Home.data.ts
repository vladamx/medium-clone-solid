import { createResource } from 'solid-js'
import { fetchFeed } from '../api'

export const homeRouteData = () => {
  const [feed] = createResource(fetchFeed)
  return feed
}
