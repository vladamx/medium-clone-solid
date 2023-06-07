import { useSearchParams } from '@solidjs/router'
import { createEffect, For, Show } from 'solid-js'
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
  }>()

  const isActiveFeed = (feed: string) => searchParams.feed === feed

  createEffect(() => {
    if (!searchParams.feed && !searchParams.tag) {
      setSearchParams({ feed: props.defaultFeed, tag: '' })
    } else if (searchParams.feed && searchParams.tag) {
      setSearchParams({ feed: '', tag: searchParams.tag })
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
                  setSearchParams({ feed: feed.id, tag: '' })
                }}
              >
                {feed.title}
              </a>
            </li>
          )}
        </For>
        <FadeTransition duration={300}>
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
        </FadeTransition>
      </ul>
    </div>
  )
}
