import { useSearchParams } from '@solidjs/router'
import { createEffect, For, Show, Suspense } from 'solid-js'
import { isNil } from 'lodash-es'
import { FadeTransition } from './FadeTransition'

type FeedToggleProps = {
  feeds: { id: string; title: string; disabled?: boolean }[]
  defaultFeed: string
}

export const FeedToggle = (props: FeedToggleProps) => {
  const [searchParams, setSearchParams] = useSearchParams<{
    feed?: string
    tag?: string
    page?: string
  }>()

  const isActiveFeed = (feed: string) => searchParams.feed === feed

  createEffect(() => {
    if (!searchParams.feed && !searchParams.tag) {
      setSearchParams({ feed: props.defaultFeed, tag: '', page: 1 })
    } else if (searchParams.feed && searchParams.tag) {
      setSearchParams({ feed: '', tag: searchParams.tag, page: 1 })
    }
  })

  return (
    <div class='feed-toggle'>
      <ul class='nav nav-pills outline-active'>
        <For each={props.feeds}>
          {feed => (
            <li class='nav-item'>
              <a
                class='nav-link'
                classList={{
                  active: isActiveFeed(feed.id),
                  disabled: !isNil(feed.disabled) && !isActiveFeed(feed.id),
                }}
                onClick={() => {
                  if (feed.id === searchParams.feed || feed.disabled) {
                    return
                  }
                  setSearchParams({ feed: feed.id, tag: '', page: 1 })
                }}
              >
                {feed.title}
              </a>
            </li>
          )}
        </For>
        <FadeTransition mode='inout' duration={1200}>
          <Suspense>
            <Show when={searchParams.tag}>
              <li class='nav-item'>
                <a
                  class='nav-link'
                  classList={{
                    active: true,
                  }}
                >
                  #{searchParams.tag}
                </a>
              </li>
            </Show>
          </Suspense>
        </FadeTransition>
      </ul>
    </div>
  )
}
