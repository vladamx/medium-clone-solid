import { useSearchParams } from '@solidjs/router'
import { toNumber } from 'lodash-es'
import { createResource, createSignal } from 'solid-js'
import { fetchFeed } from '../api'

export const homeRouteData = () => {
  const [searchParams] = useSearchParams<{ page?: string }>()
  const [currentPage, setCurrentPage] = createSignal(
    toNumber(searchParams.page) || 1,
  )
  const [feed, { refetch }] = createResource(currentPage, fetchFeed)
  return { feed, refetch, currentPage, setCurrentPage }
}
