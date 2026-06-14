import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$slug')({
  component: PostPage,
})

function PostPage() {
  const { slug } = Route.useParams()

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">{slug}</h1>
      <p className="text-muted-foreground">글 내용이 여기에 들어올 예정</p>
    </main>
  )
}