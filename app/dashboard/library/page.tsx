"use client"

import { useState, useEffect } from "react"
import { useMusic } from "@/contexts/music-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Search, Heart, Plus, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { CreatePlaylistDialog } from "@/components/create-playlist-dialog"
import { usePlaylist } from "@/contexts/playlist-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EditPlaylistDialog } from "@/components/edit-playlist-dialog"
import { DeletePlaylistDialog } from "@/components/delete-playlist-dialog"

// Mock data with new album covers and matching names
const mockArtists = [
  {
    id: "1",
    name: "Sherine",
    image: "/images/sherine-album.png",
    isFollowing: true,
  },
  {
    id: "2",
    name: "3DABL",
    image: "/images/3dabl-draganov.png",
    isFollowing: true,
  },
  {
    id: "3",
    name: "HAWJIDI",
    image: "/images/hawjidi-album.png",
    isFollowing: true,
  },
  {
    id: "4",
    name: "The Artist",
    image: "/images/spotlight-artist.png",
    isFollowing: true,
  },
  {
    id: "5",
    name: "CHEU-B",
    image: "/images/wtshl-album.png",
    isFollowing: true,
  },
  {
    id: "6",
    name: "Urban Artist",
    image: "/images/adidas-comic.png",
    isFollowing: true,
  },
  {
    id: "7",
    name: "Eminem",
    image: "/images/eminem-curtain-call.png",
    isFollowing: true,
  },
  {
    id: "8",
    name: "Fire Element",
    image: "/images/burning-door.png",
    isFollowing: true,
  },
]

const mockAlbums = [
  {
    id: "1",
    title: "Sherine 2024",
    artist: "Sherine",
    image: "/images/sherine-album.png",
    year: 2024,
  },
  {
    id: "2",
    title: "DRAGANOV",
    artist: "3DABL",
    image: "/images/3dabl-draganov.png",
    year: 2023,
  },
  {
    id: "3",
    title: "HAWJIDI",
    artist: "HAWJIDI",
    image: "/images/hawjidi-album.png",
    year: 2024,
  },
  {
    id: "4",
    title: "Reflections",
    artist: "The Artist",
    image: "/images/spotlight-artist.png",
    year: 2023,
  },
  {
    id: "5",
    title: "WTSHL Vol.1",
    artist: "CHEU-B",
    image: "/images/wtshl-album.png",
    year: 2023,
  },
  {
    id: "6",
    title: "City Life",
    artist: "Urban Artist",
    image: "/images/adidas-comic.png",
    year: 2024,
  },
  {
    id: "7",
    title: "Curtain Call: The Hits",
    artist: "Eminem",
    image: "/images/eminem-curtain-call.png",
    year: 2005,
  },
  {
    id: "8",
    title: "Flames",
    artist: "Fire Element",
    image: "/images/burning-door.png",
    year: 2023,
  },
  {
    id: "9",
    title: "The Death of Slim Shady",
    artist: "Eminem",
    image: "/images/slim-shady-death.png",
    year: 2024,
  },
  {
    id: "10",
    title: "Encore",
    artist: "Eminem",
    image: "/images/eminem-encore.png",
    year: 2004,
  },
]

export default function LibraryPage() {
  const { state, dispatch } = useMusic()
  const { playlists, likedSongs, setPlaylists } = usePlaylist()
  const [searchQuery, setSearchQuery] = useState("")
  const [editingPlaylistId, setEditingPlaylistId] = useState<string | null>(null)
  const [deletingPlaylist, setDeletingPlaylist] = useState<{ id: string; title: string } | null>(null)

  // Add some sample playlists if none exist (for demo purposes)
  useEffect(() => {
    const savedPlaylists = localStorage.getItem("soundsphere-playlists")

    if (!savedPlaylists && playlists.length === 0) {
      const samplePlaylists = [
        {
          id: "sample-1",
          title: "My Playlist #1",
          description: "Created by you",
          image: "/images/eminem-curtain-call.png",
          tracks: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "sample-2",
          title: "Chill Vibes",
          description: "Created by you",
          image: "/images/spotlight-artist.png",
          tracks: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "sample-3",
          title: "Workout Mix",
          description: "Created by you",
          image: "/images/burning-door.png",
          tracks: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]

      setPlaylists(samplePlaylists)
    }
  }, [])

  // Create the liked songs playlist with a dynamic image from liked songs
  const likedSongsImage = likedSongs.length > 0 ? likedSongs[0].image : "/images/eminem-curtain-call.png"
  const likedSongsPlaylist = {
    id: "liked-songs",
    title: "Liked Songs",
    description: "Your favorite tracks",
    image: likedSongsImage,
    trackCount: likedSongs.length,
    isLiked: true,
  }

  // Combine liked songs with user playlists
  const allPlaylists = [
    likedSongsPlaylist,
    ...playlists.map((p) => ({
      ...p,
      trackCount: p.tracks.length,
      isLiked: false,
    })),
  ]

  const filteredPlaylists = allPlaylists.filter((playlist) =>
    playlist.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredArtists = mockArtists.filter((artist) => artist.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const filteredAlbums = mockAlbums.filter(
    (album) =>
      album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      album.artist.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleEditPlaylist = (playlistId: string) => {
    setEditingPlaylistId(playlistId)
  }

  const handleDeletePlaylist = (playlistId: string, playlistTitle: string) => {
    setDeletingPlaylist({ id: playlistId, title: playlistTitle })
  }

  return (
    <div className="p-6 bg-gradient-to-b from-gray-900 to-black min-h-full">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Your Library</h1>
          <CreatePlaylistDialog />
        </div>

        {/* Search Input */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search in Your Library"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:bg-gray-700"
          />
        </div>
      </div>

      <Tabs defaultValue="playlists" className="w-full">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="playlists" className="data-[state=active]:bg-gray-700">
            Playlists ({allPlaylists.length})
          </TabsTrigger>
          <TabsTrigger value="artists" className="data-[state=active]:bg-gray-700">
            Artists ({mockArtists.length})
          </TabsTrigger>
          <TabsTrigger value="albums" className="data-[state=active]:bg-gray-700">
            Albums ({mockAlbums.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="playlists" className="mt-6">
          {filteredPlaylists.length === 0 && searchQuery ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No playlists found for "{searchQuery}"</p>
              <p className="text-gray-500 text-sm mt-2">Try a different search term</p>
            </div>
          ) : filteredPlaylists.length === 1 && filteredPlaylists[0].id === "liked-songs" ? (
            <div className="text-center py-12">
              <div className="mb-6">
                <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-12 w-12 text-gray-600" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Create your first playlist</h3>
                <p className="text-gray-400 mb-6">It's easy, we'll help you</p>
                <CreatePlaylistDialog />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPlaylists.map((playlist) => (
                <Card
                  key={playlist.id}
                  className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors cursor-pointer group"
                  onClick={() => {
                    if (playlist.id === "liked-songs") {
                      window.location.href = "/dashboard/liked-songs"
                    } else {
                      window.location.href = `/dashboard/playlist/${playlist.id}`
                    }
                  }}
                >
                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      {playlist.isLiked ? (
                        <div className="w-full h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md flex items-center justify-center">
                          <Heart className="h-12 w-12 text-white fill-current" />
                        </div>
                      ) : (
                        <img
                          src={playlist.image || "/placeholder.svg"}
                          alt={playlist.title}
                          className="w-full h-40 object-cover rounded-md"
                        />
                      )}
                      <Button
                        className="absolute bottom-2 right-2 bg-purple-600 hover:bg-purple-700 rounded-full w-12 h-12 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation()
                          if (playlist.id === "liked-songs") {
                            if (likedSongs.length > 0) {
                              dispatch({ type: "PLAY_TRACK", track: likedSongs[0], queue: likedSongs })
                            }
                          } else {
                            const playlistData = playlists.find((p) => p.id === playlist.id)
                            if (playlistData && playlistData.tracks.length > 0) {
                              dispatch({
                                type: "PLAY_TRACK",
                                track: playlistData.tracks[0],
                                queue: playlistData.tracks,
                              })
                            }
                          }
                        }}
                      >
                        <Play className="h-5 w-5 text-white" />
                      </Button>
                    </div>
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold mb-1 truncate">{playlist.title}</h3>
                        <p className="text-gray-400 text-sm mb-2 truncate">{playlist.description}</p>
                        <p className="text-gray-500 text-xs">{playlist.trackCount} songs</p>
                      </div>
                      {!playlist.isLiked && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                              }}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-gray-800 border-gray-700" align="end">
                            <DropdownMenuItem
                              className="text-white hover:bg-gray-700 cursor-pointer focus:bg-gray-700"
                              onSelect={(e) => {
                                e.preventDefault()
                                handleEditPlaylist(playlist.id)
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit playlist
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-400 hover:bg-gray-700 hover:text-red-300 cursor-pointer focus:bg-gray-700 focus:text-red-300"
                              onSelect={(e) => {
                                e.preventDefault()
                                handleDeletePlaylist(playlist.id, playlist.title)
                              }}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete playlist
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="artists" className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredArtists.map((artist) => (
              <Card
                key={artist.id}
                className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors cursor-pointer group"
                onClick={() => {
                  window.location.href = `/dashboard/artist/${artist.id}`
                }}
              >
                <CardContent className="p-4 text-center">
                  <div className="relative mb-4">
                    <img
                      src={artist.image || "/placeholder.svg"}
                      alt={artist.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover"
                    />
                    <Button className="absolute bottom-2 right-2 bg-purple-600 hover:bg-purple-700 rounded-full w-12 h-12 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="h-5 w-5 text-white" />
                    </Button>
                  </div>
                  <h3 className="text-white font-semibold mb-1">{artist.name}</h3>
                  <p className="text-gray-400 text-sm">Artist</p>
                  {artist.isFollowing && (
                    <div className="mt-2">
                      <span className="text-purple-500 text-xs">Following</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="albums" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAlbums.map((album) => (
              <Card
                key={album.id}
                className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors cursor-pointer group"
              >
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <img
                      src={album.image || "/placeholder.svg"}
                      alt={album.title}
                      className="w-full h-40 object-cover rounded-md"
                    />
                    <Button className="absolute bottom-2 right-2 bg-purple-600 hover:bg-purple-700 rounded-full w-12 h-12 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="h-5 w-5 text-white" />
                    </Button>
                  </div>
                  <h3 className="text-white font-semibold mb-1 truncate">{album.title}</h3>
                  <p className="text-gray-400 text-sm mb-1">{album.artist}</p>
                  <p className="text-gray-500 text-xs">{album.year}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Playlist Dialog */}
      {editingPlaylistId && (
        <EditPlaylistDialog
          playlistId={editingPlaylistId}
          open={!!editingPlaylistId}
          onOpenChange={(open) => {
            if (!open) {
              setEditingPlaylistId(null)
            }
          }}
        />
      )}

      {/* Delete Playlist Dialog */}
      {deletingPlaylist && (
        <DeletePlaylistDialog
          playlistId={deletingPlaylist.id}
          playlistTitle={deletingPlaylist.title}
          open={!!deletingPlaylist}
          onOpenChange={(open) => {
            if (!open) {
              setDeletingPlaylist(null)
            }
          }}
        />
      )}
    </div>
  )
}
