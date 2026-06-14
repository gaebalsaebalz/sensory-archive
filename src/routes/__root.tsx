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
        <header className="border-b border-border">
          <nav className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="text-sm font-medium tracking-widest uppercase">
              Sensory Archive
            </Link>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/visual" className="hover:text-foreground transition-colors">Visual</Link>
              <Link to="/audio" className="hover:text-foreground transition-colors">Audio</Link>
              <Link to="/tactile" className="hover:text-foreground transition-colors">Tactile</Link>
              <Link to="/taste" className="hover:text-foreground transition-colors">Taste</Link>
              <Link to="/scent" className="hover:text-foreground transition-colors">Scent</Link>
              <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
              <Link to="/guestbook" className="hover:text-foreground transition-colors">Guestbook</Link>
            </div>
          </nav>
        </header>
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