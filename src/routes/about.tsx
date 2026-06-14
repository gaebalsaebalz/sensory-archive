import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <p className="text-xs text-muted-foreground tracking-widest mb-2">About</p>
      <h1 className="text-3xl font-bold mb-8">J's Archive of Senses</h1>

      <div className="flex flex-col gap-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          좋아하는 것들을 잊지 않기 위해 — a personal collection of moments,
          between a library and a botanical garden.
        </p>
        <p>
          시각, 청각, 촉각, 미각, 후각. 다섯 가지 감각으로 기록한 아카이브.
          기억은 처음엔 흔적으로 남고, 다시 찾을 때 색을 되찾는다.
        </p>
        <p className="italic">
          "Memories first remain as traces. When revisited, they recover their colors."
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-border">
        <p className="text-xs text-muted-foreground">
          <Link to="/guestbook" className="hover:text-foreground transition-colors underline underline-offset-4">
            Guestbook
          </Link>
          {' '}에 흔적을 남겨주세요.
        </p>
      </div>
    </main>
  )
}