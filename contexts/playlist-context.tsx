"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface Track {
  id: string
  title: string
  artist: string
  album: string
  duration: number
  image: string
  audioUrl: string
}

interface Playlist {
  id: string
  title: string
  description: string
  image: string
  tracks: Track[]
  isLiked?: boolean
  createdAt: Date
  updatedAt: Date
}

interface PlaylistContextType {
  playlists: Playlist[]
  likedSongs: Track[]
  createPlaylist: (title: string, description?: string) => Promise<Playlist>
  updatePlaylist: (playlistId: string, updates: Partial<Playlist>) => void
  addToPlaylist: (playlistId: string, track: Track) => void
  removeFromPlaylist: (playlistId: string, trackId: string) => void
  toggleLikedSong: (track: Track) => void
  isTrackLiked: (trackId: string) => boolean
  deletePlaylist: (playlistId: string) => void
  getPlaylistById: (playlistId: string) => Playlist | undefined
  setPlaylists: (playlists: Playlist[]) => void
}

const PlaylistContext = createContext<PlaylistContextType | null>(null)

export function PlaylistProvider({ children }: { children: React.ReactNode }) {
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [likedSongs, setLikedSongs] = useState<Track[]>([])

  // Load data from localStorage on mount
  useEffect(() => {
    const savedPlaylists = localStorage.getItem("soundsphere-playlists")
    const savedLikedSongs = localStorage.getItem("soundsphere-liked-songs")

    if (savedPlaylists) {
      try {
        const parsed = JSON.parse(savedPlaylists)
        // Convert date strings back to Date objects
        const playlistsWithDates = parsed.map((p: any) => ({
          ...p,
          createdAt: new Date(p.createdAt),
          updatedAt: new Date(p.updatedAt),
        }))
        setPlaylists(playlistsWithDates)
      } catch (error) {
        console.error("Error loading playlists:", error)
        setPlaylists([])
      }
    }

    if (savedLikedSongs) {
      try {
        const parsed = JSON.parse(savedLikedSongs)
        setLikedSongs(parsed)
      } catch (error) {
        console.error("Error loading liked songs:", error)
        setLikedSongs([])
      }
    }
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("soundsphere-playlists", JSON.stringify(playlists))
  }, [playlists])

  useEffect(() => {
    localStorage.setItem("soundsphere-liked-songs", JSON.stringify(likedSongs))
  }, [likedSongs])

  const createPlaylist = async (title: string, description = "Created by you"): Promise<Playlist> => {
    // Validate input
    if (!title.trim()) {
      throw new Error("Playlist title is required")
    }

    // Check for duplicate names
    const existingPlaylist = playlists.find((p) => p.title.toLowerCase() === title.toLowerCase())
    if (existingPlaylist) {
      throw new Error("A playlist with this name already exists")
    }

    // Array of available album covers
    const albumCovers = [
      "/images/sherine-album.png",
      "/images/3dabl-draganov.png",
      "/images/hawjidi-album.png",
      "/images/spotlight-artist.png",
      "/images/wtshl-album.png",
      "/images/adidas-comic.png",
      "/images/eminem-curtain-call.png",
      "/images/burning-door.png",
      "/images/slim-shady-death.png",
      "/images/eminem-encore.png",
    ]

    // Select a random album cover
    const randomImage = albumCovers[Math.floor(Math.random() * albumCovers.length)]

    const now = new Date()
    const newPlaylist: Playlist = {
      id: `playlist_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: title.trim(),
      description: description.trim(),
      image: randomImage,
      tracks: [],
      createdAt: now,
      updatedAt: now,
    }

    setPlaylists((prev) => {
      const updated = [...prev, newPlaylist]
      return updated
    })

    return newPlaylist
  }

  const updatePlaylist = (playlistId: string, updates: Partial<Playlist>) => {
    setPlaylists((prev) => {
      const updatedPlaylists = prev.map((playlist) => {
        if (playlist.id === playlistId) {
          // Check for duplicate names (excluding current playlist)
          const titleToCheck = updates.title?.trim() || playlist.title
          const existingPlaylist = prev.find(
            (p) => p.id !== playlistId && p.title.toLowerCase() === titleToCheck.toLowerCase(),
          )

          if (existingPlaylist && updates.title) {
            throw new Error("A playlist with this name already exists")
          }

          return {
            ...playlist,
            ...updates,
            updatedAt: new Date(),
            title: updates.title?.trim() || playlist.title,
            description: updates.description?.trim() || playlist.description,
          }
        }
        return playlist
      })

      return updatedPlaylists
    })
  }

  const addToPlaylist = (playlistId: string, track: Track) => {
    setPlaylists((prev) =>
      prev.map((playlist) =>
        playlist.id === playlistId
          ? {
              ...playlist,
              tracks: [...playlist.tracks, track],
              updatedAt: new Date(),
            }
          : playlist,
      ),
    )
  }

  const removeFromPlaylist = (playlistId: string, trackId: string) => {
    setPlaylists((prev) =>
      prev.map((playlist) =>
        playlist.id === playlistId
          ? {
              ...playlist,
              tracks: playlist.tracks.filter((track) => track.id !== trackId),
              updatedAt: new Date(),
            }
          : playlist,
      ),
    )
  }

  const toggleLikedSong = (track: Track) => {
    setLikedSongs((prev) => {
      const isLiked = prev.some((t) => t.id === track.id)
      if (isLiked) {
        return prev.filter((t) => t.id !== track.id)
      } else {
        return [...prev, track]
      }
    })
  }

  const isTrackLiked = (trackId: string) => {
    return likedSongs.some((track) => track.id === trackId)
  }

  const deletePlaylist = (playlistId: string) => {
    try {
      setPlaylists((prev) => {
        const filtered = prev.filter((playlist) => playlist.id !== playlistId)
        return filtered
      })
      return true
    } catch (error) {
      console.error("Error deleting playlist:", error)
      return false
    }
  }

  const getPlaylistById = (playlistId: string) => {
    return playlists.find((playlist) => playlist.id === playlistId)
  }

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        likedSongs,
        createPlaylist,
        updatePlaylist,
        addToPlaylist,
        removeFromPlaylist,
        toggleLikedSong,
        isTrackLiked,
        deletePlaylist,
        getPlaylistById,
        setPlaylists,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  )
}

export function usePlaylist() {
  const context = useContext(PlaylistContext)
  if (!context) {
    throw new Error("usePlaylist must be used within a PlaylistProvider")
  }
  return context
}
