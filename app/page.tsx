import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Music, Users, Heart } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const featuredPlaylists = [
    {
      id: 1,
      title: "Arabic Hits",
      description: "The most played Arabic songs right now",
      image: "/images/sherine-album.png",
      tracks: 50,
    },
    {
      id: 2,
      title: "Dark Vibes",
      description: "Relax and unwind with these moody tracks",
      image: "/images/dark-portrait.png",
      tracks: 32,
    },
    {
      id: 3,
      title: "Hip-Hop Heat",
      description: "High-energy music to fuel your day",
      image: "/images/wtshl-album.png",
      tracks: 45,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Music className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold text-white">Soundsphere</span>
          </div>
          <div className="space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-white hover:text-purple-200">
                Login
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-white text-purple-900 hover:bg-purple-100">Sign Up</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-bold text-white mb-6">
          Your Music, <span className="text-purple-300">Your World</span>
        </h1>
        <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
          Stream millions of songs, create personalized playlists, and discover new artists in the ultimate music
          experience.
        </p>
        <Link href="/dashboard">
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg">
            <Play className="mr-2 h-5 w-5" />
            Start Listening
          </Button>
        </Link>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose Soundsphere?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Music className="h-12 w-12 text-purple-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Unlimited Music</h3>
              <p className="text-purple-200">
                Access millions of songs from your favorite artists and discover new ones.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-purple-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Social Features</h3>
              <p className="text-purple-200">Share playlists with friends and see what others are listening to.</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Heart className="h-12 w-12 text-purple-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Personalized</h3>
              <p className="text-purple-200">Get recommendations based on your listening habits and preferences.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Playlists */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Featured Playlists</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {featuredPlaylists.map((playlist) => (
            <Card
              key={playlist.id}
              className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer"
            >
              <CardContent className="p-6">
                <img
                  src={playlist.image || "/placeholder.svg"}
                  alt={playlist.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-white mb-2">{playlist.title}</h3>
                <p className="text-purple-200 mb-4">{playlist.description}</p>
                <p className="text-sm text-purple-300">{playlist.tracks} tracks</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center">
        <p className="text-purple-200">© 2024 Soundsphere. All rights reserved.</p>
      </footer>
    </div>
  )
}
