import { Sidebar } from "./sidebar"
import { Player } from "./player"

export function MainLayout({ children, showHeader = true }) {
  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gradient-to-b from-secondary/20 to-background pb-24">{children}</main>
      <Player />
    </div>
  )
}

