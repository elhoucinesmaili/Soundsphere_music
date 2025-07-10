"use client"

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
import { AlertTriangle } from "lucide-react"
import { usePlaylist } from "@/contexts/playlist-context"

interface DeletePlaylistDialogProps {
  playlistId: string
  playlistTitle: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeletePlaylistDialog({ playlistId, playlistTitle, open, onOpenChange }: DeletePlaylistDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const { deletePlaylist } = usePlaylist()

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      deletePlaylist(playlistId)

      setTimeout(() => {
        setIsDeleting(false)
        onOpenChange(false)
      }, 300)
    } catch (error) {
      console.error("Error deleting playlist:", error)
      setIsDeleting(false)
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!isDeleting) {
      onOpenChange(newOpen)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <DialogTitle>Delete Playlist</DialogTitle>
          </div>
          <DialogDescription className="text-gray-400">
            Are you sure you want to delete "{playlistTitle}"? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="bg-red-900/20 border border-red-800 rounded-md p-4">
            <p className="text-red-400 text-sm">
              <strong>Warning:</strong> This will permanently delete the playlist and all its contents.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white" disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete Playlist"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
