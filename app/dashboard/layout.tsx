import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { MusicPlayer } from "@/components/music-player"
import { MusicProvider } from "@/contexts/music-context"
import { PlaylistProvider } from "@/contexts/playlist-context"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MusicProvider>
      <PlaylistProvider>
        <div className="flex h-screen bg-black">
          <Sidebar />
          <main className="flex-1 overflow-y-auto pb-24">{children}</main>
          <MusicPlayer />
        </div>
      </PlaylistProvider>
    </MusicProvider>
  )
}
