"use client"

import { useParams } from "next/navigation"
import { useMusic } from "@/contexts/music-context"
import { usePlaylist } from "@/contexts/playlist-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Pause, Heart, Shuffle, UserPlus } from "lucide-react"

// Updated mock artist data with real audio files
const mockArtists = {
  "1": {
    id: "1",
    name: "Sherine",
    image: "/images/sherine-album.png",
    followers: "12.5M",
    bio: "Sherine Abdel Wahab is an Egyptian singer and actress, known for her powerful voice and emotional performances in Arabic music.",
    topTracks: [
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
        id: "8",
        title: "Hobak Khatar",
        artist: "Sherine",
        album: "Sherine 2024",
        duration: 213,
        image: "/images/sherine-album.png",
        audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      },
    ],
    albums: [
      {
        id: "1",
        title: "Sherine 2024",
        year: 2024,
        image: "/images/sherine-album.png",
      },
    ],
  },
  "2": {
    id: "2",
    name: "3DABL",
    image: "/images/3dabl-draganov.png",
    followers: "8.2M",
    bio: "3DABL is a rising star in the Arabic trap scene, known for his unique style and powerful beats.",
    topTracks: [
      {
        id: "2",
        title: "Draganov",
        artist: "3DABL",
        album: "DRAGANOV",
        duration: 180,
        image: "/images/3dabl-draganov.png",
        audioUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Draganov%20-%203dabi%20%28Official%20Audio%29-Tqs7FkVBIptYkSbVyFG25t09v5sEto.mp3",
      },
    ],
    albums: [
      {
        id: "2",
        title: "DRAGANOV",
        year: 2023,
        image: "/images/3dabl-draganov.png",
      },
    ],
  },
  "3": {
    id: "3",
    name: "ElGrandeToto",
    image: "/images/hawjidi-album.png",
    followers: "15.7M",
    bio: "ElGrandeToto is a Moroccan rapper and one of the most influential artists in the North African music scene.",
    topTracks: [
      {
        id: "3",
        title: "Blue Love",
        artist: "ElGrandeToto",
        album: "Blue Love",
        duration: 210,
        image: "/images/hawjidi-album.png",
        audioUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ElgrandeToto%20BLUE%20LOVE%20%28Lyrics%20video%29-FcROIoPKAfjWkffVsUTvMOSgR97B6q.mp3",
      },
    ],
    albums: [
      {
        id: "3",
        title: "Blue Love",
        year: 2024,
        image: "/images/hawjidi-album.png",
      },
    ],
  },
  "4": {
    id: "4",
    name: "The Weeknd",
    image: "/images/dark-portrait.png",
    followers: "85.2M",
    bio: "Abel Makkonen Tesfaye, known professionally as The Weeknd, is a Canadian singer, songwriter, and record producer.",
    topTracks: [
      {
        id: "4",
        title: "Midnight Soul",
        artist: "The Weeknd",
        album: "After Hours",
        duration: 178,
        image: "/images/dark-portrait.png",
        audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      },
    ],
    albums: [
      {
        id: "4",
        title: "After Hours",
        year: 2020,
        image: "/images/dark-portrait.png",
      },
    ],
  },
  "5": {
    id: "5",
    name: "CHEU-B",
    image: "/images/wtshl-album.png",
    followers: "6.1M",
    bio: "CHEU-B is a French rapper known for his energetic performances and street-inspired lyrics.",
    topTracks: [
      {
        id: "5",
        title: "WTSHL",
        artist: "CHEU-B",
        album: "WTSHL Vol.1",
        duration: 141,
        image: "/images/wtshl-album.png",
        audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      },
    ],
    albums: [
      {
        id: "5",
        title: "WTSHL Vol.1",
        year: 2023,
        image: "/images/wtshl-album.png",
      },
    ],
  },
  "6": {
    id: "6",
    name: "Duo Artists",
    image: "/images/101-album.png",
    followers: "3.8M",
    bio: "Duo Artists is a collaborative project featuring two talented musicians creating innovative sounds together.",
    topTracks: [
      {
        id: "6",
        title: "Room 101",
        artist: "Duo Artists",
        album: "101",
        duration: 238,
        image: "/images/101-album.png",
        audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      },
    ],
    albums: [
      {
        id: "6",
        title: "101",
        year: 2024,
        image: "/images/101-album.png",
      },
    ],
  },
  "7": {
    id: "7",
    name: "Fire Element",
    image: "/images/fire-door-album.png",
    followers: "4.5M",
    bio: "Fire Element creates intense, passionate music with fiery energy and powerful compositions.",
    topTracks: [
      {
        id: "7",
        title: "Burning Doors",
        artist: "Fire Element",
        album: "Flames",
        duration: 195,
        image: "/images/fire-door-album.png",
        audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      },
    ],
    albums: [
      {
        id: "7",
        title: "Flames",
        year: 2023,
        image: "/images/fire-door-album.png",
      },
    ],
  },
}

export default function ArtistPage() {
  const params = useParams()
  const artistId = params.id as string
  const { state, dispatch } = useMusic()
  const { toggleLikedSong, isTrackLiked } = usePlaylist()

  const artist = mockArtists[artistId as keyof typeof mockArtists]

  if (!artist) {
    return (
      <div className="p-6 bg-gradient-to-b from-gray-900 to-black min-h-full">
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-white mb-2">Artist not found</h2>
          <p className="text-gray-400">The artist you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handlePlayTrack = (track: (typeof artist.topTracks)[0]) => {
    dispatch({ type: "PLAY_TRACK", track, queue: artist.topTracks })
  }

  const handleTogglePlay = (track: (typeof artist.topTracks)[0]) => {
    if (state.currentTrack?.id === track.id) {
      dispatch({ type: "TOGGLE_PLAY" })
    } else {
      handlePlayTrack(track)
    }
  }

  const handlePlayAll = () => {
    if (artist.topTracks.length > 0) {
      dispatch({ type: "PLAY_TRACK", track: artist.topTracks[0], queue: artist.topTracks })
    }
  }

  const handleShuffle = () => {
    if (artist.topTracks.length > 0) {
      const shuffled = [...artist.topTracks].sort(() => Math.random() - 0.5)
      dispatch({ type: "PLAY_TRACK", track: shuffled[0], queue: shuffled })
    }
  }

  return (
    <div className="p-6 bg-gradient-to-b from-purple-900/20 to-black min-h-full">
      {/* Header */}
      <div className="flex items-end space-x-6 mb-8">
        <img
          src={artist.image || "/placeholder.svg"}
          alt={artist.name}
          className="w-60 h-60 rounded-full object-cover shadow-2xl"
        />
        <div>
          <p className="text-sm text-gray-400 uppercase tracking-wide">Artist</p>
          <h1 className="text-6xl font-bold text-white mb-4">{artist.name}</h1>
          <p className="text-gray-400 mb-2">{artist.followers} monthly listeners</p>
          <p className="text-gray-300 max-w-2xl">{artist.bio}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-4 mb-8">
        <Button onClick={handlePlayAll} className="bg-purple-600 hover:bg-purple-700 rounded-full w-14 h-14 p-0">
          <Play className="h-6 w-6 text-white ml-1" />
        </Button>
        <Button onClick={handleShuffle} variant="ghost" className="text-gray-400 hover:text-white">
          <Shuffle className="h-6 w-6" />
        </Button>
        <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 bg-transparent">
          <UserPlus className="mr-2 h-4 w-4" />
          Follow
        </Button>
      </div>

      {/* Popular Tracks */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Popular</h2>
        <div className="space-y-2">
          {artist.topTracks.map((track, index) => (
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

      {/* Albums */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Albums</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {artist.albums.map((album) => (
            <Card
              key={album.id}
              className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors cursor-pointer group"
            >
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <img
                    src={album.image || "/placeholder.svg"}
                    alt={album.title}
                    className="w-full aspect-square object-cover rounded-md"
                  />
                  <Button className="absolute bottom-2 right-2 bg-purple-600 hover:bg-purple-700 rounded-full w-12 h-12 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="h-5 w-5 text-white" />
                  </Button>
                </div>
                <h3 className="text-white font-semibold mb-1 truncate">{album.title}</h3>
                <p className="text-gray-400 text-sm">{album.year}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
