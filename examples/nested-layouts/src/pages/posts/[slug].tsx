import { LoaderFn, MakeGenerics, useMatch } from '@tanstack/react-location'

type Post = {
  id: string
  userId: string
  title?: string
  body?: string
}

type Route = MakeGenerics<{ LoaderData: Post; Params: { slug: string } }>

export const loader: LoaderFn<Route> = async ({ params }) => {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${params.slug}`).then((response) => response.json())
}

export default function Post() {
  const { data } = useMatch<Route>()

  return (
    <>
      <h1>Post @ {data.id}</h1>

      <code>
        Loader data
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </code>
    </>
  )
}
