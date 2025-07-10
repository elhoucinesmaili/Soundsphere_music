"use client"

import { useState } from "react"
import { useMusic } from "@/contexts/music-context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Play, Pause } from "lucide-react"

// Updated mock data with real audio files
const mockTracks = [
  {
    id: "1",
    title: "Betmenny Ensak",
    artist: "Sherine",
    album: "Sherine 2024",
    duration: 240,
    image: "/images/sherine-album.png",
    audioUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Btmanna%20Ansak-nbHWM7xxibCXLXt7pH5SuRqrxe7LYO.mp3",
  },
  {
    id: "2",
    title: "Draganov",
    artist: "3DABL",
    album: "DRAGANOV",
    duration: 180,
    image: "/images/3dabl-draganov.png",
    audioUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Draganov%20-%203dabi%20%28Official%20Audio%29-Tqs7FkVBIptYkSbVyFG25t09v5sEto.mp3",
  },
  {
    id: "3",
    title: "Blue Love",
    artist: "ElGrandeToto",
    album: "Blue Love",
    duration: 210,
    image: "/images/hawjidi-album.png",
    audioUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ElgrandeToto%20BLUE%20LOVE%20%28Lyrics%20video%29-FcROIoPKAfjWkffVsUTvMOSgR97B6q.mp3",
  },
  {
    id: "4",
    title: "Spotlight",
    artist: "The Artist",
    album: "Reflections",
    duration: 178,
    image: "/images/spotlight-artist.png",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
  },
  {
    id: "5",
    title: "WTSHL",
    artist: "CHEU-B",
    album: "WTSHL Vol.1",
    duration: 141,
    image: "/images/wtshl-album.png",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
  },
  {
    id: "6",
    title: "Street Stories",
    artist: "Urban Artist",
    album: "City Life",
    duration: 238,
    image: "/images/adidas-comic.png",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
  },
  {
    id: "7",
    title: "Curtain Call",
    artist: "Eminem",
    album: "Curtain Call: The Hits",
    duration: 195,
    image: "/images/eminem-curtain-call.png",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
  },
  {
    id: "8",
    title: "Burning Doors",
    artist: "Fire Element",
    album: "Flames",
    duration: 195,
    image: "/images/burning-door.png",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
  },
  {
    id: "9",
    title: "The Death of Slim Shady",
    artist: "Eminem",
    album: "The Death of Slim Shady",
    duration: 267,
    image: "/images/slim-shady-death.png",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
  },
  {
    id: "10",
    title: "Encore",
    artist: "Eminem",
    album: "Encore",
    duration: 223,
    image: "/images/eminem-encore.png",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
  },
]

const mockArtists = [
  {
    id: "1",
    name: "Sherine",
    image: "/images/sherine-album.png",
    followers: "12.5M",
  },
  {
    id: "2",
    name: "3DABL",
    image: "/images/3dabl-draganov.png",
    followers: "8.2M",
  },
  {
    id: "3",
    name: "ElGrandeToto",
    image: "/images/hawjidi-album.png",
    followers: "15.7M",
  },
  {
    id: "4",
    name: "The Artist",
    image: "/images/spotlight-artist.png",
    followers: "5.3M",
  },
  {
    id: "5",
    name: "CHEU-B",
    image: "/images/wtshl-album.png",
    followers: "6.1M",
  },
  {
    id: "6",
    name: "Urban Artist",
    image: "/images/adidas-comic.png",
    followers: "3.8M",
  },
  {
    id: "7",
    name: "Eminem",
    image: "/images/eminem-curtain-call.png",
    followers: "85.2M",
  },
  {
    id: "8",
    name: "Fire Element",
    image: "/images/burning-door.png",
    followers: "4.5M",
  },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<{
    tracks: typeof mockTracks
    artists: typeof mockArtists
  }>({ tracks: [], artists: [] })
  const { state, dispatch } = useMusic()

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      // Mock search - filter tracks and artists
      const filteredTracks = mockTracks.filter(
        (track) =>
          track.title.toLowerCase().includes(query.toLowerCase()) ||
          track.artist.toLowerCase().includes(query.toLowerCase()) ||
          track.album.toLowerCase().includes(query.toLowerCase()),
      )
      const filteredArtists = mockArtists.filter((artist) => artist.name.toLowerCase().includes(query.toLowerCase()))
      setSearchResults({ tracks: filteredTracks, artists: filteredArtists })
    } else {
      setSearchResults({ tracks: [], artists: [] })
    }
  }

  const handlePlayTrack = (track: (typeof mockTracks)[0]) => {
    dispatch({ type: "PLAY_TRACK", track, queue: mockTracks })
  }

  const handleTogglePlay = (track: (typeof mockTracks)[0]) => {
    if (state.currentTrack?.id === track.id) {
      dispatch({ type: "TOGGLE_PLAY" })
    } else {
      handlePlayTrack(track)
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="p-6 bg-gradient-to-b from-gray-900 to-black min-h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-6">Search</h1>

        {/* Search Input */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="What do you want to listen to?"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:bg-gray-700"
          />
        </div>
      </div>

      {!searchQuery && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Browse All</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { title: "Hip-Hop", color: "bg-orange-500" },
              { title: "Arabic Music", color: "bg-pink-500" },
              { title: "Dark & Moody", color: "bg-red-500" },
              { title: "Electronic", color: "bg-blue-500" },
              { title: "World Music", color: "bg-yellow-500" },
              { title: "Alternative", color: "bg-purple-500" },
              { title: "Street Music", color: "bg-green-500" },
              { title: "R&B", color: "bg-indigo-500" },
            ].map((genre) => (
              <Card
                key={genre.title}
                className={`${genre.color} border-none cursor-pointer hover:scale-105 transition-transform`}
                onClick={() => handleSearch(genre.title)}
              >
                <CardContent className="p-4 h-24 flex items-end">
                  <h3 className="text-white font-bold text-lg">{genre.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {searchQuery && (
        <div className="space-y-8">
          {/* Artists */}
          {searchResults.artists.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Artists</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {searchResults.artists.map((artist) => (
                  <Card
                    key={artist.id}
                    className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors cursor-pointer"
                    onClick={() => {
                      window.location.href = `/dashboard/artist/${artist.id}`
                    }}
                  >
                    <CardContent className="p-4 text-center">
                      <img
                        src={artist.image || "/placeholder.svg"}
                        alt={artist.name}
                        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                      />
                      <h3 className="text-white font-semibold mb-1">{artist.name}</h3>
                      <p className="text-gray-400 text-sm">Artist • {artist.followers} followers</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Tracks */}
          {searchResults.tracks.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Songs</h2>
              <div className="space-y-2">
                {searchResults.tracks.map((track, index) => (
                  <div
                    key={track.id}
                    className="flex items-center space-x-4 p-3 rounded-md hover:bg-gray-800/50 transition-colors group"
                  >
                    <div className="text-gray-400 w-4 text-center">{index + 1}</div>
                    <div className="relative">
                      <img
                        src={track.image || "/placeholder.svg"}
                        alt={track.title}
                        className="w-12 h-12 rounded-md object-cover"
                      />
                      <Button
                        onClick={() => handleTogglePlay(track)}
                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-md"
                        variant="ghost"
                        size="sm"
                      >
                        {state.currentTrack?.id === track.id && state.isPlaying ? (
                          <Pause className="h-4 w-4 text-white" />
                        ) : (
                          <Play className="h-4 w-4 text-white" />
                        )}
                      </Button>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{track.title}</p>
                      <p className="text-gray-400 text-sm truncate">{track.artist}</p>
                    </div>
                    <div className="text-gray-400 text-sm">{track.album}</div>
                    <div className="text-gray-400 text-sm w-12 text-right">{formatTime(track.duration)}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {searchQuery && searchResults.tracks.length === 0 && searchResults.artists.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No results found for "{searchQuery}"</p>
              <p className="text-gray-500 text-sm mt-2">Try searching for something else</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
