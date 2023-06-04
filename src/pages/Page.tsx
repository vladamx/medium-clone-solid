import { Component, JSX } from 'solid-js'

export const Page: Component<{ children: JSX.Element }> = props => {
  return <div class='container page'>{props.children}</div>
}
