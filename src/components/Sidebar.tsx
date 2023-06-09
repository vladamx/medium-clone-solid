import { A, useSearchParams } from '@solidjs/router'
import { For } from 'solid-js'

export const Sidebar = () => {
  const [, setSearchParams] = useSearchParams<{ tag?: string; feed?: string }>()

  const tags = () => [
    'programming',
    'javascript',
    'emberjs',
    'angularjs',
    'react',
    'mean',
    'node',
    'rails',
  ]

  return (
    <div class='sidebar'>
      <p>Popular Tags</p>

      <div class='tag-list'>
        <For each={tags()}>
          {tag => (
            <a
              onClick={() => {
                setSearchParams({ tag, feed: '', page: 1 })
              }}
              class='tag-pill tag-default'
            >
              {tag}
            </a>
          )}
        </For>
      </div>
    </div>
  )
}
