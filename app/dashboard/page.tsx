"use client"

import { useMusic } from "@/contexts/music-context"
import { usePlaylist } from "@/contexts/playlist-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Pause, Heart } from "lucide-react"

// Updated mock data with real audio files
const mockTracks = [
  {
    id: "1",
    title: "Betmenny Ensak",
    artist: "Sherine",
    album: "Sherine 2024",
    duration: 240, // Updated duration
    image: "/images/sherine-album.png",
    audioUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Btmanna%20Ansak-nbHWM7xxibCXLXt7pH5SuRqrxe7LYO.mp3",
  },
  {
    id: "2",
    title: "Draganov",
    artist: "3DABL",
    album: "DRAGANOV",
    duration: 180, // Updated duration
    image: "/images/3dabl-draganov.png",
    audioUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Draganov%20-%203dabi%20%28Official%20Audio%29-Tqs7FkVBIptYkSbVyFG25t09v5sEto.mp3",
  },
  {
    id: "3",
    title: "Blue Love",
    artist: "ElGrandeToto",
    album: "Blue Love",
    duration: 210, // Updated duration
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

const featuredPlaylists = [
  {
    id: "1",
    title: "Hip-Hop Legends",
    description: "The greatest rap tracks of all time",
    image: "/images/eminem-curtain-call.png",
    tracks: [mockTracks[6], mockTracks[8], mockTracks[9]],
  },
  {
    id: "2",
    title: "Dark Vibes",
    description: "Moody and atmospheric",
    image: "/images/3dabl-draganov.png",
    tracks: [mockTracks[1], mockTracks[3], mockTracks[7]],
  },
  {
    id: "3",
    title: "Street Chronicles",
    description: "Urban stories and beats",
    image: "/images/adidas-comic.png",
    tracks: [mockTracks[4], mockTracks[5]],
  },
]

export default function DashboardPage() {
  const { state, dispatch } = useMusic()
  const { toggleLikedSong, isTrackLiked } = usePlaylist()

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
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

  return (
    <div className="p-6 bg-gradient-to-b from-purple-900/20 to-black min-h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Good evening</h1>
        <p className="text-gray-400">Ready to discover your next favorite song?</p>
      </div>

      {/* Featured Playlists */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Featured Playlists</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPlaylists.map((playlist) => (
            <Card
              key={playlist.id}
              className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors cursor-pointer group"
              onClick={() => {
                if (playlist.tracks.length > 0) {
                  dispatch({ type: "PLAY_TRACK", track: playlist.tracks[0], queue: playlist.tracks })
                }
              }}
            >
              <CardContent className="p-4">
                <div className="relative">
                  <img
                    src={playlist.image || "/placeholder.svg"}
                    alt={playlist.title}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <Button
                    className="absolute bottom-6 right-2 bg-purple-600 hover:bg-purple-700 rounded-full w-12 h-12 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation()
                      if (playlist.tracks.length > 0) {
                        dispatch({ type: "PLAY_TRACK", track: playlist.tracks[0], queue: playlist.tracks })
                      }
                    }}
                  >
                    <Play className="h-5 w-5 text-white" />
                  </Button>
                </div>
                <h3 className="text-white font-semibold mb-1">{playlist.title}</h3>
                <p className="text-gray-400 text-sm">{playlist.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Popular Tracks */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Popular Right Now</h2>
        <div className="space-y-2">
          {mockTracks.map((track, index) => (
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
              <Button
                onClick={() => toggleLikedSong(track)}
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Heart
                  className={`h-4 w-4 ${isTrackLiked(track.id) ? "text-purple-500 fill-current" : "text-gray-400"}`}
                />
              </Button>
              <div className="text-gray-400 text-sm w-12 text-right">{formatTime(track.duration)}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
