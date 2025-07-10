"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import { Check } from "lucide-react"
import { usePlaylist } from "@/contexts/playlist-context"

interface EditPlaylistDialogProps {
  playlistId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditPlaylistDialog({ playlistId, open, onOpenChange }: EditPlaylistDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const { getPlaylistById, updatePlaylist } = usePlaylist()

  const playlist = getPlaylistById(playlistId)

  useEffect(() => {
    if (playlist && open) {
      setTitle(playlist.title)
      setDescription(playlist.description)
      setShowSuccess(false)
    }
  }, [playlist, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !playlist) {
      return
    }

    setIsUpdating(true)

    try {
      updatePlaylist(playlistId, {
        title: title.trim(),
        description: description.trim() || "Created by you",
      })

      setShowSuccess(true)

      setTimeout(() => {
        setIsUpdating(false)
        setShowSuccess(false)
        onOpenChange(false)
      }, 1500)
    } catch (error) {
      console.error("Error updating playlist:", error)
      setIsUpdating(false)
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!isUpdating) {
      onOpenChange(newOpen)
      if (!newOpen) {
        setShowSuccess(false)
        setTitle("")
        setDescription("")
      }
    }
  }

  if (!playlist) return null

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle>{showSuccess ? "Playlist Updated!" : "Edit Playlist"}</DialogTitle>
          <DialogDescription className="text-gray-400">
            {showSuccess ? "Your playlist has been updated successfully." : "Make changes to your playlist details."}
          </DialogDescription>
        </DialogHeader>

        {showSuccess ? (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center space-x-2 text-green-500">
              <Check className="h-6 w-6" />
              <span className="text-lg font-medium">Playlist "{title}" updated!</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Playlist Name *</Label>
                <Input
                  id="edit-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="My Awesome Playlist"
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  required
                  disabled={isUpdating}
                  maxLength={100}
                />
                <span className="text-xs text-gray-500">{title.length}/100 characters</span>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description (Optional)</Label>
                <Textarea
                  id="edit-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your playlist..."
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 resize-none"
                  rows={3}
                  disabled={isUpdating}
                  maxLength={300}
                />
                <span className="text-xs text-gray-500">{description.length}/300 characters</span>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
                disabled={isUpdating}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700"
                disabled={isUpdating || !title.trim()}
              >
                {isUpdating ? "Updating..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
