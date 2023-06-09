import { createResource } from 'solid-js'
import { fetchFeed } from '../api'

export const homeRouteData = () => {
  const [feed, { refetch }] = createResource(fetchFeed)
  return { feed, refetch }
}
