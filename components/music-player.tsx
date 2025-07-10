"use client"

import { useMusic } from "@/contexts/music-context"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Shuffle, Repeat, Repeat1, Loader2 } from "lucide-react"
import { useState } from "react"

export function MusicPlayer() {
  const { state, dispatch, seekTo } = useMusic()
  const [isDragging, setIsDragging] = useState(false)
  const [dragTime, setDragTime] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [previousVolume, setPreviousVolume] = useState(0.7)

  if (!state.currentTrack) return null

  const formatTime = (time: number) => {
    if (!time || isNaN(time) || !isFinite(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleSeekStart = () => {
    setIsDragging(true)
  }

  const handleSeekChange = (value: number[]) => {
    const newTime = value[0]
    setDragTime(newTime)
    if (!isDragging) {
      seekTo(newTime)
    }
  }

  const handleSeekEnd = () => {
    seekTo(dragTime)
    setIsDragging(false)
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    dispatch({ type: "SET_VOLUME", volume: newVolume })
    if (newVolume > 0 && isMuted) {
      setIsMuted(false)
    }
  }

  const handleMuteToggle = () => {
    if (isMuted) {
      dispatch({ type: "SET_VOLUME", volume: previousVolume })
      setIsMuted(false)
    } else {
      setPreviousVolume(state.volume)
      dispatch({ type: "SET_VOLUME", volume: 0 })
      setIsMuted(true)
    }
  }

  const currentDisplayTime = isDragging ? dragTime : state.currentTime
  const progressPercentage = state.duration > 0 ? (currentDisplayTime / state.duration) * 100 : 0
  const bufferedPercentage = state.duration > 0 ? (state.buffered / state.duration) * 100 : 0

  const RepeatIcon = state.repeatMode === "one" ? Repeat1 : Repeat
  const VolumeIcon = isMuted || state.volume === 0 ? VolumeX : Volume2

  return (
    <Card className="fixed bottom-0 left-0 right-0 bg-gray-900 border-gray-700 rounded-none border-x-0 border-b-0 z-50">
      <div className="flex items-center justify-between p-4">
        {/* Track Info */}
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <div className="relative">
            <img
              src={state.currentTrack.image || "/placeholder.svg"}
              alt={state.currentTrack.title}
              className="w-12 h-12 rounded-md object-cover"
            />
            {state.isLoading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-md">
                <Loader2 className="h-4 w-4 text-white animate-spin" />
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-white font-medium truncate">{state.currentTrack.title}</p>
            <p className="text-gray-400 text-sm truncate">{state.currentTrack.artist}</p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 flex-2 max-w-2xl">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch({ type: "TOGGLE_SHUFFLE" })}
              className={`text-gray-400 hover:text-white transition-colors ${
                state.isShuffled ? "text-purple-500" : ""
              }`}
            >
              <Shuffle className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch({ type: "PREVIOUS_TRACK" })}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button
              onClick={() => dispatch({ type: "TOGGLE_PLAY" })}
              className="bg-white text-black hover:bg-gray-200 rounded-full w-10 h-10 p-0 transition-all"
              disabled={state.isLoading}
            >
              {state.isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : state.isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 ml-0.5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch({ type: "NEXT_TRACK" })}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <SkipForward className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch({ type: "TOGGLE_REPEAT" })}
              className={`text-gray-400 hover:text-white transition-colors ${
                state.repeatMode !== "none" ? "text-purple-500" : ""
              }`}
            >
              <RepeatIcon className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-2 w-full">
            <span className="text-xs text-gray-400 w-10 text-right">{formatTime(currentDisplayTime)}</span>
            <div className="flex-1 relative">
              {/* Buffered Progress */}
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-1 bg-gray-600 rounded-full">
                  <div
                    className="h-full bg-gray-500 rounded-full transition-all duration-300"
                    style={{ width: `${bufferedPercentage}%` }}
                  />
                </div>
              </div>
              {/* Main Progress Slider */}
              <Slider
                value={[currentDisplayTime]}
                max={state.duration || 100}
                step={0.1}
                onValueChange={handleSeekChange}
                onPointerDown={handleSeekStart}
                onPointerUp={handleSeekEnd}
                className="relative z-10"
                disabled={!state.currentTrack || state.duration === 0}
              />
            </div>
            <span className="text-xs text-gray-400 w-10">{formatTime(state.duration)}</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2 flex-1 justify-end min-w-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleMuteToggle}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <VolumeIcon className="h-4 w-4" />
          </Button>
          <div className="w-24">
            <Slider
              value={[isMuted ? 0 : state.volume]}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="w-full"
            />
          </div>
          <span className="text-xs text-gray-400 w-8 text-center">
            {Math.round((isMuted ? 0 : state.volume) * 100)}
          </span>
        </div>
      </div>
    </Card>
  )
}
