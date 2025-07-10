"use client"

import { useMusic } from "@/contexts/music-context"
import { usePlaylist } from "@/contexts/playlist-context"
import { Button } from "@/components/ui/button"
import { Play, Pause, Heart, Shuffle } from "lucide-react"

export default function LikedSongsPage() {
  const { state, dispatch } = useMusic()
  const { likedSongs, toggleLikedSong } = usePlaylist()

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handlePlayTrack = (track: (typeof likedSongs)[0]) => {
    dispatch({ type: "PLAY_TRACK", track, queue: likedSongs })
  }

  const handleTogglePlay = (track: (typeof likedSongs)[0]) => {
    if (state.currentTrack?.id === track.id) {
      dispatch({ type: "TOGGLE_PLAY" })
    } else {
      handlePlayTrack(track)
    }
  }

  const handlePlayAll = () => {
    if (likedSongs.length > 0) {
      dispatch({ type: "PLAY_TRACK", track: likedSongs[0], queue: likedSongs })
    }
  }

  const handleShuffle = () => {
    if (likedSongs.length > 0) {
      const shuffled = [...likedSongs].sort(() => Math.random() - 0.5)
      dispatch({ type: "PLAY_TRACK", track: shuffled[0], queue: shuffled })
    }
  }

  return (
    <div className="p-6 bg-gradient-to-b from-purple-900/20 to-black min-h-full">
      {/* Header */}
      <div className="flex items-end space-x-6 mb-8">
        <div className="w-60 h-60 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <Heart className="h-24 w-24 text-white fill-current" />
        </div>
        <div>
          <p className="text-sm text-gray-400 uppercase tracking-wide">Playlist</p>
          <h1 className="text-6xl font-bold text-white mb-4">Liked Songs</h1>
          <p className="text-gray-400">
            {likedSongs.length} song{likedSongs.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Controls */}
      {likedSongs.length > 0 && (
        <div className="flex items-center space-x-4 mb-8">
          <Button onClick={handlePlayAll} className="bg-purple-600 hover:bg-purple-700 rounded-full w-14 h-14 p-0">
            <Play className="h-6 w-6 text-white ml-1" />
          </Button>
          <Button onClick={handleShuffle} variant="ghost" className="text-gray-400 hover:text-white">
            <Shuffle className="h-6 w-6" />
          </Button>
        </div>
      )}

      {/* Track List */}
      {likedSongs.length === 0 ? (
        <div className="text-center py-20">
          <Heart className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Songs you like will appear here</h2>
          <p className="text-gray-400">Save songs by tapping the heart icon.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {likedSongs.map((track, index) => (
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
                <Heart className="h-4 w-4 text-purple-500 fill-current" />
              </Button>
              <div className="text-gray-400 text-sm w-12 text-right">{formatTime(track.duration)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
