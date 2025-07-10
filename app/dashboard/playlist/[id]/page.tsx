"use client"

import { useParams } from "next/navigation"
import { useMusic } from "@/contexts/music-context"
import { usePlaylist } from "@/contexts/playlist-context"
import { Button } from "@/components/ui/button"
import { Play, Pause, Heart, Shuffle, MoreHorizontal } from "lucide-react"

export default function PlaylistPage() {
  const params = useParams()
  const playlistId = params.id as string
  const { state, dispatch } = useMusic()
  const { playlists, toggleLikedSong, isTrackLiked } = usePlaylist()

  const playlist = playlists.find((p) => p.id === playlistId)

  if (!playlist) {
    return (
      <div className="p-6 bg-gradient-to-b from-gray-900 to-black min-h-full">
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-white mb-2">Playlist not found</h2>
          <p className="text-gray-400">The playlist you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handlePlayTrack = (track: (typeof playlist.tracks)[0]) => {
    dispatch({ type: "PLAY_TRACK", track, queue: playlist.tracks })
  }

  const handleTogglePlay = (track: (typeof playlist.tracks)[0]) => {
    if (state.currentTrack?.id === track.id) {
      dispatch({ type: "TOGGLE_PLAY" })
    } else {
      handlePlayTrack(track)
    }
  }

  const handlePlayAll = () => {
    if (playlist.tracks.length > 0) {
      dispatch({ type: "PLAY_TRACK", track: playlist.tracks[0], queue: playlist.tracks })
    }
  }

  const handleShuffle = () => {
    if (playlist.tracks.length > 0) {
      const shuffled = [...playlist.tracks].sort(() => Math.random() - 0.5)
      dispatch({ type: "PLAY_TRACK", track: shuffled[0], queue: shuffled })
    }
  }

  return (
    <div className="p-6 bg-gradient-to-b from-purple-900/20 to-black min-h-full">
      {/* Header */}
      <div className="flex items-end space-x-6 mb-8">
        <img
          src={playlist.image || "/placeholder.svg"}
          alt={playlist.title}
          className="w-60 h-60 rounded-lg object-cover shadow-2xl"
        />
        <div>
          <p className="text-sm text-gray-400 uppercase tracking-wide">Playlist</p>
          <h1 className="text-6xl font-bold text-white mb-4">{playlist.title}</h1>
          <p className="text-gray-400 mb-2">{playlist.description}</p>
          <p className="text-gray-400">
            {playlist.tracks.length} song{playlist.tracks.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Controls */}
      {playlist.tracks.length > 0 && (
        <div className="flex items-center space-x-4 mb-8">
          <Button onClick={handlePlayAll} className="bg-purple-600 hover:bg-purple-700 rounded-full w-14 h-14 p-0">
            <Play className="h-6 w-6 text-white ml-1" />
          </Button>
          <Button onClick={handleShuffle} variant="ghost" className="text-gray-400 hover:text-white">
            <Shuffle className="h-6 w-6" />
          </Button>
          <Button variant="ghost" className="text-gray-400 hover:text-white">
            <MoreHorizontal className="h-6 w-6" />
          </Button>
        </div>
      )}

      {/* Track List */}
      {playlist.tracks.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-white mb-2">This playlist is empty</h2>
          <p className="text-gray-400">Add some songs to get started.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {playlist.tracks.map((track, index) => (
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
      )}
    </div>
  )
}
