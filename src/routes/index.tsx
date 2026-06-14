import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const categories = [
  { to: '/visual', ko: '시각', en: 'VISUAL' },
  { to: '/audio', ko: '청각', en: 'AUDIO' },
  { to: '/tactile', ko: '촉각', en: 'TACTILE' },
  { to: '/taste', ko: '미각', en: 'TASTE' },
  { to: '/scent', ko: '후각', en: 'SCENT' },
]

function HomePage() {
  return (
    <main>
      {/* 히어로 섹션 */}
      <section className="max-w-4xl mx-auto px-4 py-24 text-center">
        <p className="text-xs tracking-widest text-muted-foreground uppercase mb-4">
          좋아하는 것들을 잊지 않기 위해
        </p>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Sensory Archive</h1>
        <p className="text-sm text-muted-foreground italic">TOWARD THE LIGHT</p>
      </section>

      {/* 카테고리 링크 */}
      <section className="max-w-4xl mx-auto px-4 pb-24">
        <ul className="flex flex-col gap-3">
          {categories.map((cat) => (
            <li key={cat.en}>
              <Link
                to={cat.to}
                className="flex items-center justify-between border-b border-border py-4 group"
              >
                <span className="text-lg font-medium">{cat.ko}</span>
                <span className="text-xs tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
                  {cat.en} →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 하단 문구 */}
      <section className="max-w-4xl mx-auto px-4 pb-24 text-center">
        <p className="text-xs text-muted-foreground">
          a quiet library, tended slowly
        </p>
      </section>
    </main>
  )
}