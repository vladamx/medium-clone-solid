import { merge, range } from 'lodash-es'
import { Index, mergeProps } from 'solid-js'

type PaginationProps = {
  totalPages?: number
  currentPage: number
  onPageChange: (page: number) => void
}

export const Pagination = (props: PaginationProps) => {
  const mergedProps = mergeProps({ totalPages: 20 }, props)
  return (
    <nav>
      <ul class='pagination'>
        <Index each={range(1, mergedProps.totalPages + 1)}>
          {(item, index) => (
            <li
              class='page-item'
              classList={{ active: item() === props.currentPage }}
              onClick={() => mergedProps.onPageChange(index + 1)}
            >
              <a class='page-link'>{item()}</a>
            </li>
          )}
        </Index>
      </ul>
    </nav>
  )
}
