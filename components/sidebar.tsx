"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, Search, Library, Plus, Heart, Music, User } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { usePlaylist } from "@/contexts/playlist-context"
import { CreatePlaylistDialog } from "@/components/create-playlist-dialog"

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { playlists } = usePlaylist()

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Home" },
    { href: "/dashboard/search", icon: Search, label: "Search" },
    { href: "/dashboard/library", icon: Library, label: "Your Library" },
  ]

  return (
    <div className="w-64 bg-black text-white flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <Music className="h-8 w-8 text-purple-500" />
          <span className="text-xl font-bold">Soundsphere</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-3">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              className={`w-full justify-start mb-1 text-gray-300 hover:text-white ${
                pathname === item.href ? "bg-gray-800 text-white" : ""
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>

      {/* Create Playlist */}
      <div className="px-3 mt-6">
        <CreatePlaylistDialog>
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white">
            <Plus className="mr-3 h-5 w-5" />
            Create Playlist
          </Button>
        </CreatePlaylistDialog>
        <Link href="/dashboard/liked-songs">
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white">
            <Heart className="mr-3 h-5 w-5" />
            Liked Songs
          </Button>
        </Link>
      </div>

      {/* Playlists */}
      <div className="flex-1 px-3 mt-6">
        <ScrollArea className="h-full">
          {playlists.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-gray-500 text-sm">No playlists yet</p>
              <p className="text-gray-600 text-xs mt-1">Create your first playlist!</p>
            </div>
          ) : (
            playlists.map((playlist) => (
              <Button
                key={playlist.id}
                variant="ghost"
                className="w-full justify-start mb-1 text-gray-400 hover:text-white text-sm"
                onClick={() => router.push(`/dashboard/playlist/${playlist.id}`)}
              >
                <span className="truncate">{playlist.title}</span>
              </Button>
            ))
          )}
        </ScrollArea>
      </div>

      {/* User Profile */}
      <div className="p-3 border-t border-gray-800">
        <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white">
          <User className="mr-3 h-5 w-5" />
          Profile
        </Button>
      </div>
    </div>
  )
}
