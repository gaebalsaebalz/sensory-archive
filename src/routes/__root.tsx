import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { Link, Outlet } from '@tanstack/react-router'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Sensory Archive' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground">
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/20 border-b border-white/20">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="text-black font-semibold">
            J's Archive of Senses
          </Link>

          <div className="flex gap-6 text-black text-sm">
            <Link to="/visual">시각 / Visual</Link>
            <Link to="/audio">청각 / Auditory</Link>
            <Link to="/taste">미각 / Taste</Link>
            <Link to="/scent">후각 / Scent</Link>
            <Link to="/about">About</Link>
            <Link to="/guestbook">방명록 / Guestbook</Link>
          </div>
        </nav>
      </header>

      <main className="min-h-screen bg-[#F4EEE4] text-black">
        {children}
      </main>

        {children}
        <footer className="border-t border-border mt-24">
          <div className="max-w-4xl mx-auto px-4 py-8 text-xs text-muted-foreground text-center">
            a quiet library, tended slowly
          </div>
        </footer>
        <TanStackDevtools
          config={{ position: 'bottom-right' }}
          plugins={[{ name: 'Tanstack Router', render: <TanStackRouterDevtoolsPanel /> }]}
        />
        <Scripts />
      </body>
    </html>
  )
}