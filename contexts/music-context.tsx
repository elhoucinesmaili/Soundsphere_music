"use client"

import type React from "react"

import { createContext, useContext, useReducer, useRef, useEffect, useCallback } from "react"

interface Track {
  id: string
  title: string
  artist: string
  album: string
  duration: number
  image: string
  audioUrl: string
}

interface MusicState {
  currentTrack: Track | null
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  queue: Track[]
  currentIndex: number
  isShuffled: boolean
  repeatMode: "none" | "one" | "all"
  isLoading: boolean
  buffered: number
}

type MusicAction =
  | { type: "PLAY_TRACK"; track: Track; queue?: Track[] }
  | { type: "TOGGLE_PLAY" }
  | { type: "NEXT_TRACK" }
  | { type: "PREVIOUS_TRACK" }
  | { type: "SET_TIME"; time: number }
  | { type: "SET_DURATION"; duration: number }
  | { type: "SET_VOLUME"; volume: number }
  | { type: "TOGGLE_SHUFFLE" }
  | { type: "TOGGLE_REPEAT" }
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "SET_BUFFERED"; buffered: number }

const initialState: MusicState = {
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.7,
  queue: [],
  currentIndex: 0,
  isShuffled: false,
  repeatMode: "none",
  isLoading: false,
  buffered: 0,
}

function musicReducer(state: MusicState, action: MusicAction): MusicState {
  switch (action.type) {
    case "PLAY_TRACK":
      const queue = action.queue || [action.track]
      const index = queue.findIndex((track) => track.id === action.track.id)
      return {
        ...state,
        currentTrack: action.track,
        queue,
        currentIndex: index,
        isPlaying: false, // Will be set to true after loading
        isLoading: true,
        currentTime: 0,
        duration: 0,
      }
    case "TOGGLE_PLAY":
      return { ...state, isPlaying: !state.isPlaying }
    case "NEXT_TRACK":
      if (state.queue.length === 0) return state
      let nextIndex = state.currentIndex + 1
      if (nextIndex >= state.queue.length) {
        nextIndex = state.repeatMode === "all" ? 0 : state.currentIndex
      }
      if (nextIndex === state.currentIndex && state.repeatMode !== "all") {
        return state
      }
      return {
        ...state,
        currentTrack: state.queue[nextIndex],
        currentIndex: nextIndex,
        isPlaying: false,
        isLoading: true,
        currentTime: 0,
        duration: 0,
      }
    case "PREVIOUS_TRACK":
      if (state.queue.length === 0) return state
      // If more than 3 seconds into the song, restart current song
      if (state.currentTime > 3) {
        return { ...state, currentTime: 0 }
      }
      let prevIndex = state.currentIndex - 1
      if (prevIndex < 0) {
        prevIndex = state.repeatMode === "all" ? state.queue.length - 1 : 0
      }
      return {
        ...state,
        currentTrack: state.queue[prevIndex],
        currentIndex: prevIndex,
        isPlaying: false,
        isLoading: true,
        currentTime: 0,
        duration: 0,
      }
    case "SET_TIME":
      return { ...state, currentTime: action.time }
    case "SET_DURATION":
      return { ...state, duration: action.duration }
    case "SET_VOLUME":
      return { ...state, volume: Math.max(0, Math.min(1, action.volume)) }
    case "TOGGLE_SHUFFLE":
      return { ...state, isShuffled: !state.isShuffled }
    case "TOGGLE_REPEAT":
      const modes: ("none" | "one" | "all")[] = ["none", "one", "all"]
      const currentModeIndex = modes.indexOf(state.repeatMode)
      const nextMode = modes[(currentModeIndex + 1) % modes.length]
      return { ...state, repeatMode: nextMode }
    case "SET_LOADING":
      return { ...state, isLoading: action.loading }
    case "SET_BUFFERED":
      return { ...state, buffered: action.buffered }
    default:
      return state
  }
}

const MusicContext = createContext<{
  state: MusicState
  dispatch: React.Dispatch<MusicAction>
  audioRef: React.RefObject<HTMLAudioElement>
  seekTo: (time: number) => void
} | null>(null)

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(musicReducer, initialState)
  const audioRef = useRef<HTMLAudioElement>(null)

  const seekTo = useCallback(
    (time: number) => {
      const audio = audioRef.current
      if (audio && !isNaN(time) && isFinite(time)) {
        const seekTime = Math.max(0, Math.min(time, state.duration || 0))
        audio.currentTime = seekTime
        dispatch({ type: "SET_TIME", time: seekTime })
      }
    },
    [state.duration],
  )

  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      if (!isNaN(audio.currentTime) && isFinite(audio.currentTime)) {
        dispatch({ type: "SET_TIME", time: audio.currentTime })
      }
    }

    const handleLoadedMetadata = () => {
      if (!isNaN(audio.duration) && isFinite(audio.duration)) {
        dispatch({ type: "SET_DURATION", duration: audio.duration })
      }
    }

    const handleLoadedData = () => {
      if (!isNaN(audio.duration) && isFinite(audio.duration)) {
        dispatch({ type: "SET_DURATION", duration: audio.duration })
      }
      dispatch({ type: "SET_LOADING", loading: false })
    }

    const handleCanPlay = () => {
      if (!isNaN(audio.duration) && isFinite(audio.duration)) {
        dispatch({ type: "SET_DURATION", duration: audio.duration })
      }
      dispatch({ type: "SET_LOADING", loading: false })
      // Auto-play if we were trying to play
      if (state.currentTrack && !state.isPlaying) {
        dispatch({ type: "TOGGLE_PLAY" })
      }
    }

    const handleProgress = () => {
      if (audio.buffered.length > 0) {
        const buffered = audio.buffered.end(audio.buffered.length - 1)
        dispatch({ type: "SET_BUFFERED", buffered })
      }
    }

    const handleEnded = () => {
      if (state.repeatMode === "one") {
        audio.currentTime = 0
        audio.play().catch(console.error)
      } else {
        dispatch({ type: "NEXT_TRACK" })
      }
    }

    const handleError = (e: Event) => {
      console.error("Audio error:", e)
      dispatch({ type: "SET_LOADING", loading: false })
    }

    const handleLoadStart = () => {
      dispatch({ type: "SET_LOADING", loading: true })
      dispatch({ type: "SET_TIME", time: 0 })
      dispatch({ type: "SET_DURATION", duration: 0 })
    }

    const handleWaiting = () => {
      dispatch({ type: "SET_LOADING", loading: true })
    }

    const handlePlaying = () => {
      dispatch({ type: "SET_LOADING", loading: false })
    }

    // Add all event listeners
    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("loadeddata", handleLoadedData)
    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("progress", handleProgress)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)
    audio.addEventListener("loadstart", handleLoadStart)
    audio.addEventListener("waiting", handleWaiting)
    audio.addEventListener("playing", handlePlaying)

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("loadeddata", handleLoadedData)
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("progress", handleProgress)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
      audio.removeEventListener("loadstart", handleLoadStart)
      audio.removeEventListener("waiting", handleWaiting)
      audio.removeEventListener("playing", handlePlaying)
    }
  }, [state.repeatMode, state.currentTrack])

  // Handle play/pause
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !state.currentTrack) return

    if (state.isPlaying) {
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Play failed:", error)
          dispatch({ type: "TOGGLE_PLAY" })
        })
      }
    } else {
      audio.pause()
    }
  }, [state.isPlaying, state.currentTrack])

  // Handle volume changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = state.volume
  }, [state.volume])

  // Handle track changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !state.currentTrack) return

    // Reset audio state
    audio.currentTime = 0
    dispatch({ type: "SET_TIME", time: 0 })
    dispatch({ type: "SET_DURATION", duration: 0 })

    // Load new track
    audio.load()
  }, [state.currentTrack])

  return (
    <MusicContext.Provider value={{ state, dispatch, audioRef, seekTo }}>
      {children}
      <audio ref={audioRef} src={state.currentTrack?.audioUrl} preload="metadata" crossOrigin="anonymous" />
    </MusicContext.Provider>
  )
}

export function useMusic() {
  const context = useContext(MusicContext)
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider")
  }
  return context
}
