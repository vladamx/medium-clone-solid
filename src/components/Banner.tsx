type BannerProps = {
  title: string
  description: string
}

export const Banner = (props: BannerProps) => {
  return (
    <div class='banner'>
      <div class='container'>
        <h1 class='logo-font'>{props.title}</h1>
        <p>{props.description}</p>
      </div>
    </div>
  )
}
