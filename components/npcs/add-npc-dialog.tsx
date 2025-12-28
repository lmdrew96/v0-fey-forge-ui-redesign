"use client"

import { useState } from "react"
import { Plus, UserCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useNPCsStore, type NPC } from "@/lib/npcs-store"
import { useCampaignsStore } from "@/lib/campaigns-store"

interface AddNPCDialogProps {
  trigger?: React.ReactNode
}

export function AddNPCDialog({ trigger }: AddNPCDialogProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { addNPC } = useNPCsStore()
  const { activeCampaignId } = useCampaignsStore()

  // Form state
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [faction, setFaction] = useState("")
  const [location, setLocation] = useState("")
  const [importance, setImportance] = useState<"minor" | "major" | "key">("minor")
  const [race, setRace] = useState("")
  const [npcClass, setNpcClass] = useState("")
  const [personality, setPersonality] = useState("")
  const [goals, setGoals] = useState("")
  const [relationships, setRelationships] = useState("")

  const resetForm = () => {
    setName("")
    setRole("")
    setFaction("")
    setLocation("")
    setImportance("minor")
    setRace("")
    setNpcClass("")
    setPersonality("")
    setGoals("")
    setRelationships("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim() || !role.trim()) return
    if (!activeCampaignId) return

    setIsSubmitting(true)

    const newNPC: NPC = {
      id: `npc-${Date.now()}`,
      campaignId: activeCampaignId,
      name: name.trim(),
      role: role.trim(),
      faction: faction.trim() || undefined,
      location: location.trim() || undefined,
      importance,
      race: race.trim() || undefined,
      class: npcClass.trim() || undefined,
      personality: personality.trim(),
      goals: goals.trim() || undefined,
      relationships: relationships.trim() || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    addNPC(newNPC)
    
    setTimeout(() => {
      setIsSubmitting(false)
      resetForm()
      setOpen(false)
    }, 300)
  }

  const isFormValid = name.trim() && role.trim() && activeCampaignId

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-fey-cyan hover:bg-fey-cyan/90 text-white flex-shrink-0">
            <Plus className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">Add NPC</span>
            <span className="xs:hidden">Add</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <UserCircle className="w-5 h-5 text-fey-cyan" />
            Add New NPC
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Required Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="npc-name">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="npc-name"
                placeholder="Enter NPC name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="npc-role">
                Role/Occupation <span className="text-red-500">*</span>
              </Label>
              <Input
                id="npc-role"
                placeholder="e.g., Tavern Keeper, Quest Giver"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="bg-background"
              />
            </div>
          </div>

          {/* Faction & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="npc-faction">Faction</Label>
              <Input
                id="npc-faction"
                placeholder="e.g., Summer Court, Thieves Guild"
                value={faction}
                onChange={(e) => setFaction(e.target.value)}
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="npc-location">Location</Label>
              <Input
                id="npc-location"
                placeholder="e.g., The Wandering Willow Tavern"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-background"
              />
            </div>
          </div>

          {/* Importance & Race/Class */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="npc-importance">Importance</Label>
              <Select value={importance} onValueChange={(v) => setImportance(v as "minor" | "major" | "key")}>
                <SelectTrigger id="npc-importance" className="bg-background">
                  <SelectValue placeholder="Select importance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minor">Minor</SelectItem>
                  <SelectItem value="major">Major</SelectItem>
                  <SelectItem value="key">Key</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="npc-race">Race</Label>
              <Input
                id="npc-race"
                placeholder="e.g., Human, Elf"
                value={race}
                onChange={(e) => setRace(e.target.value)}
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="npc-class">Class</Label>
              <Input
                id="npc-class"
                placeholder="e.g., Wizard, Rogue"
                value={npcClass}
                onChange={(e) => setNpcClass(e.target.value)}
                className="bg-background"
              />
            </div>
          </div>

          {/* Personality Notes */}
          <div className="space-y-2">
            <Label htmlFor="npc-personality">Personality Notes</Label>
            <Textarea
              id="npc-personality"
              placeholder="Describe the NPC's personality, mannerisms, and demeanor..."
              value={personality}
              onChange={(e) => setPersonality(e.target.value)}
              className="bg-background min-h-[80px] resize-none"
            />
          </div>

          {/* Goals & Motivations */}
          <div className="space-y-2">
            <Label htmlFor="npc-goals">Goals & Motivations</Label>
            <Textarea
              id="npc-goals"
              placeholder="What does this NPC want? What drives them?"
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              className="bg-background min-h-[60px] resize-none"
            />
          </div>

          {/* Relationships */}
          <div className="space-y-2">
            <Label htmlFor="npc-relationships">Relationships</Label>
            <Textarea
              id="npc-relationships"
              placeholder="Connections to PCs, other NPCs, or factions..."
              value={relationships}
              onChange={(e) => setRelationships(e.target.value)}
              className="bg-background min-h-[60px] resize-none"
            />
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetForm()
                setOpen(false)
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-fey-cyan hover:bg-fey-cyan/90 text-white"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Add NPC
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
