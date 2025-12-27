import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FloatingParticles } from "@/components/floating-particles"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sparkles, Users, Sword, Dice6 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingParticles />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="border-b border-border bg-background/80 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-fey-gold" />
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">FeyForge</h1>
            </div>
            <ThemeToggle />
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 container mx-auto px-4 py-12 md:py-20">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Forge Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fey-cyan via-fey-purple to-fey-gold">
                Legend
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Your enchanted companion for D&D campaign management. Create characters, track combat, and weave epic
              tales.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            <Link href="/characters/new" className="block">
              <Card className="h-full bg-card/80 backdrop-blur-sm border-2 border-border hover:border-fey-cyan transition-all duration-300 hover:shadow-lg hover:shadow-fey-cyan/20 group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-fey-cyan/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="h-8 w-8 text-fey-cyan" />
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">Create Character</h3>
                  <p className="text-sm text-muted-foreground">Forge a new hero with our guided wizard</p>
                </CardContent>
              </Card>
            </Link>

            <Card className="h-full bg-card/80 backdrop-blur-sm border-2 border-border hover:border-fey-purple transition-all duration-300 hover:shadow-lg hover:shadow-fey-purple/20 group opacity-75">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-fey-purple/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sword className="h-8 w-8 text-fey-purple" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">Combat Tracker</h3>
                <p className="text-sm text-muted-foreground">Manage initiative and track battles</p>
                <span className="text-xs text-fey-purple mt-2 block">Coming Soon</span>
              </CardContent>
            </Card>

            <Card className="h-full bg-card/80 backdrop-blur-sm border-2 border-border hover:border-fey-gold transition-all duration-300 hover:shadow-lg hover:shadow-fey-gold/20 group opacity-75">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-fey-gold/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Dice6 className="h-8 w-8 text-fey-gold" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">Dice Roller</h3>
                <p className="text-sm text-muted-foreground">Roll with magical animations</p>
                <span className="text-xs text-fey-gold mt-2 block">Coming Soon</span>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link href="/characters/new">
              <Button
                size="lg"
                className="bg-gradient-to-r from-fey-cyan to-fey-purple hover:opacity-90 text-white h-14 px-8 text-lg"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Start Your Adventure
              </Button>
            </Link>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-background/80 backdrop-blur-md">
          <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
            <p>✨ FeyForge — Enchanted D&D Campaign Management</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
