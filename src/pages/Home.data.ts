import { useSearchParams } from '@solidjs/router'
import { toNumber } from 'lodash-es'
import { createResource } from 'solid-js'
import { fetchFeed } from '../api'

export const homeRouteData = () => {
  const [searchParams, setSearchParams] = useSearchParams<{
    tag?: string
    page?: string
  }>()
  const [feed, { refetch }] = createResource(
    () => ({ page: toNumber(searchParams.page) || 1, tag: searchParams.tag }),
    fetchFeed,
  )

  return {
    feed,
    refetch,
    currentPage: () => toNumber(searchParams.page) || 1,
    setCurrentPage: (page: number) => setSearchParams({ page }),
  }
}
