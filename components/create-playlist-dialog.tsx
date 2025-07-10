"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Check, Search } from "lucide-react"
import { usePlaylist } from "@/contexts/playlist-context"

interface CreatePlaylistDialogProps {
  children?: React.ReactNode
}

// Updated available songs with real audio files
const availableSongs = [
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

export function CreatePlaylistDialog({ children }: CreatePlaylistDialogProps) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedSongs, setSelectedSongs] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [previewSong, setPreviewSong] = useState<string | null>(null)
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null)
  const { createPlaylist, addToPlaylist } = usePlaylist()

  const filteredSongs = availableSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.album.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleSongToggle = (songId: string) => {
    setSelectedSongs((prev) => (prev.includes(songId) ? prev.filter((id) => id !== songId) : [...prev, songId]))
  }

  const handleSelectAll = () => {
    if (selectedSongs.length === filteredSongs.length) {
      setSelectedSongs([])
    } else {
      setSelectedSongs(filteredSongs.map((song) => song.id))
    }
  }

  const handlePreviewSong = (songId: string, audioUrl: string) => {
    if (previewSong === songId) {
      // Stop preview
      if (audioRef) {
        audioRef.pause()
        audioRef.currentTime = 0
      }
      setPreviewSong(null)
    } else {
      // Start preview
      if (audioRef) {
        audioRef.pause()
      }

      const audio = new Audio(audioUrl)
      audio.volume = 0.3
      audio.crossOrigin = "anonymous"

      audio.addEventListener("canplay", () => {
        audio.play().catch(console.error)
      })

      audio.addEventListener("error", (e) => {
        console.error("Preview audio error:", e)
        setPreviewSong(null)
      })

      setAudioRef(audio)
      setPreviewSong(songId)

      // Auto-stop after 15 seconds
      setTimeout(() => {
        if (audio && previewSong === songId) {
          audio.pause()
          setPreviewSong(null)
        }
      }, 15000)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (title.trim()) {
      setIsCreating(true)

      try {
        const newPlaylist = await createPlaylist(title.trim(), description.trim() || "Created by you")

        // Add selected songs to the playlist
        const songsToAdd = availableSongs.filter((song) => selectedSongs.includes(song.id))
        for (const song of songsToAdd) {
          addToPlaylist(newPlaylist.id, song)
        }

        setShowSuccess(true)

        setTimeout(() => {
          setTitle("")
          setDescription("")
          setSelectedSongs([])
          setSearchQuery("")
          setIsCreating(false)
          setShowSuccess(false)
          setOpen(false)
        }, 1500)
      } catch (error) {
        console.error("Error creating playlist:", error)
        setIsCreating(false)
      }
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!isCreating) {
      setOpen(newOpen)
      if (!newOpen) {
        // Stop any playing preview
        if (audioRef) {
          audioRef.pause()
          setPreviewSong(null)
        }

        setTitle("")
        setDescription("")
        setSelectedSongs([])
        setSearchQuery("")
        setShowSuccess(false)
      }
    }
  }

  return (
    <>
      {children ? (
        <div onClick={() => setOpen(true)}>{children}</div>
      ) : (
        <Button className="bg-purple-600 hover:bg-purple-700 border-2 border-purple-400" onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Playlist
        </Button>
      )}

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>{showSuccess ? "Playlist Created!" : "Create New Playlist"}</DialogTitle>
            <DialogDescription className="text-gray-400">
              {showSuccess
                ? "Your playlist has been created successfully."
                : "Give your playlist a name and add some songs."}
            </DialogDescription>
          </DialogHeader>

          {showSuccess ? (
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center space-x-2 text-green-500">
                <Check className="h-6 w-6" />
                <span className="text-lg font-medium">
                  Playlist "{title}" created with {selectedSongs.length} songs!
                </span>
              </div>
            </div>
          ) : (
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="bg-gray-700 border-gray-600">
                <TabsTrigger value="details" className="data-[state=active]:bg-gray-600">
                  Playlist Details
                </TabsTrigger>
                <TabsTrigger value="songs" className="data-[state=active]:bg-gray-600">
                  Add Songs ({selectedSongs.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-4">
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Playlist Name *</Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="My Awesome Playlist"
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                        required
                        disabled={isCreating}
                        maxLength={100}
                      />
                      <span className="text-xs text-gray-500">{title.length}/100 characters</span>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description (Optional)</Label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your playlist..."
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 resize-none"
                        rows={3}
                        disabled={isCreating}
                        maxLength={300}
                      />
                      <span className="text-xs text-gray-500">{description.length}/300 characters</span>
                    </div>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="songs" className="mt-4">
                <div className="space-y-4">
                  {/* Search and Select All */}
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search songs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleSelectAll}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                    >
                      {selectedSongs.length === filteredSongs.length ? "Deselect All" : "Select All"}
                    </Button>
                  </div>

                  {/* Songs List */}
                  <ScrollArea className="h-64 w-full border border-gray-600 rounded-md">
                    <div className="p-4 space-y-2">
                      {filteredSongs.map((song) => (
                        <div
                          key={song.id}
                          className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700/50 transition-colors"
                        >
                          <Checkbox
                            id={song.id}
                            checked={selectedSongs.includes(song.id)}
                            onCheckedChange={() => handleSongToggle(song.id)}
                            className="border-gray-500"
                          />
                          <img
                            src={song.image || "/placeholder.svg"}
                            alt={song.title}
                            className="w-10 h-10 rounded-md object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-medium truncate">{song.title}</p>
                            <p className="text-gray-400 text-sm truncate">{song.artist}</p>
                          </div>
                          <div className="text-gray-400 text-sm hidden md:block">{song.album}</div>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            className="text-gray-400 hover:text-white"
                            onClick={() => handlePreviewSong(song.id, song.audioUrl)}
                          >
                            {previewSong === song.id ? "Stop" : "Preview"}
                          </Button>
                          <div className="text-gray-400 text-sm w-12 text-right">{formatTime(song.duration)}</div>
                        </div>
                      ))}
                      {filteredSongs.length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-gray-400">No songs found</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>
            </Tabs>
          )}

          {!showSuccess && (
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
                disabled={isCreating}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSubmit}
                className="bg-purple-600 hover:bg-purple-700"
                disabled={isCreating || !title.trim()}
              >
                {isCreating
                  ? "Creating..."
                  : `Create Playlist${selectedSongs.length > 0 ? ` (${selectedSongs.length} songs)` : ""}`}
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
