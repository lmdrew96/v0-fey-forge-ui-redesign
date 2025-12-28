"use client"

import { useState, useMemo } from "react"
import { Plus, ScrollText, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSessionsStore, type Session } from "@/lib/sessions-store"
import { useCampaignsStore } from "@/lib/campaigns-store"
import { useCharactersStore } from "@/lib/characters-store"

interface AddSessionDialogProps {
  trigger?: React.ReactNode
}

export function AddSessionDialog({ trigger }: AddSessionDialogProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { sessions, addSession } = useSessionsStore()
  const { activeCampaignId } = useCampaignsStore()
  const { characters } = useCharactersStore()

  // Form state
  const [title, setTitle] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [summary, setSummary] = useState("")
  const [xpAwarded, setXpAwarded] = useState("")
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>([])
  const [lootInput, setLootInput] = useState("")
  const [loot, setLoot] = useState<string[]>([])
  const [highlightsInput, setHighlightsInput] = useState("")
  const [highlights, setHighlights] = useState<string[]>([])
  const [dmNotes, setDmNotes] = useState("")

  // Get all characters for attendee selection
  const allCharacters = useMemo(() => {
    return characters
  }, [characters])

  // Calculate next session number
  const nextSessionNumber = useMemo(() => {
    const campaignSessions = sessions.filter((s) => s.campaignId === activeCampaignId)
    if (campaignSessions.length === 0) return 1
    return Math.max(...campaignSessions.map((s) => s.sessionNumber)) + 1
  }, [sessions, activeCampaignId])

  const resetForm = () => {
    setTitle("")
    setDate(new Date().toISOString().split("T")[0])
    setSummary("")
    setXpAwarded("")
    setSelectedAttendees([])
    setLootInput("")
    setLoot([])
    setHighlightsInput("")
    setHighlights([])
    setDmNotes("")
  }

  const handleAddLoot = () => {
    if (lootInput.trim()) {
      setLoot([...loot, lootInput.trim()])
      setLootInput("")
    }
  }

  const handleRemoveLoot = (index: number) => {
    setLoot(loot.filter((_, i) => i !== index))
  }

  const handleAddHighlight = () => {
    if (highlightsInput.trim()) {
      setHighlights([...highlights, highlightsInput.trim()])
      setHighlightsInput("")
    }
  }

  const handleRemoveHighlight = (index: number) => {
    setHighlights(highlights.filter((_, i) => i !== index))
  }

  const handleToggleAttendee = (characterId: string) => {
    setSelectedAttendees((prev) =>
      prev.includes(characterId)
        ? prev.filter((id) => id !== characterId)
        : [...prev, characterId]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !activeCampaignId) return

    setIsSubmitting(true)

    const newSession: Session = {
      id: `session-${Date.now()}`,
      campaignId: activeCampaignId,
      sessionNumber: nextSessionNumber,
      title: title.trim(),
      date: new Date(date).toISOString(),
      summary: summary.trim(),
      attendees: selectedAttendees,
      xpAwarded: parseInt(xpAwarded) || 0,
      loot,
      highlights,
      dmNotes: dmNotes.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    addSession(newSession)

    setTimeout(() => {
      setIsSubmitting(false)
      resetForm()
      setOpen(false)
    }, 300)
  }

  const isFormValid = title.trim() && activeCampaignId

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-fey-purple hover:bg-fey-purple/90 text-white flex-shrink-0">
            <Plus className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">New Session</span>
            <span className="xs:hidden">New</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-hidden bg-card flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <ScrollText className="w-5 h-5 text-fey-purple" />
            Log New Session
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 -mx-6 px-6">
          <form onSubmit={handleSubmit} className="space-y-4 pb-4">
            {/* Session Number Badge */}
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-fey-purple/10 text-fey-purple border-fey-purple/30">
                Session {nextSessionNumber}
              </Badge>
            </div>

            {/* Title and Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="session-title">
                  Session Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="session-title"
                  placeholder="e.g., The Dragon's Lair"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="session-date">Date</Label>
                <Input
                  id="session-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="session-xp">XP Awarded</Label>
                <Input
                  id="session-xp"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={xpAwarded}
                  onChange={(e) => setXpAwarded(e.target.value)}
                  className="bg-background"
                />
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-2">
              <Label htmlFor="session-summary">Session Summary</Label>
              <Textarea
                id="session-summary"
                placeholder="What happened this session?"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="bg-background min-h-[80px] resize-none"
              />
            </div>

            {/* Attendees */}
            {allCharacters.length > 0 && (
              <div className="space-y-2">
                <Label>Attendees (PCs present)</Label>
                <div className="flex flex-wrap gap-2 p-3 rounded-lg bg-background border border-input">
                  {allCharacters.map((character) => (
                    <label
                      key={character.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedAttendees.includes(character.id)}
                        onCheckedChange={() => handleToggleAttendee(character.id)}
                      />
                      <span className="text-sm">{character.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Loot */}
            <div className="space-y-2">
              <Label>Loot Gained</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add loot item..."
                  value={lootInput}
                  onChange={(e) => setLootInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddLoot()
                    }
                  }}
                  className="bg-background flex-1"
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleAddLoot}
                  disabled={!lootInput.trim()}
                >
                  Add
                </Button>
              </div>
              {loot.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {loot.map((item, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-fey-gold/10 text-fey-gold border-fey-gold/30 pr-1"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => handleRemoveLoot(index)}
                        className="ml-1 p-0.5 hover:bg-fey-gold/20 rounded"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Highlights */}
            <div className="space-y-2">
              <Label>Key Story Beats</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add story highlight..."
                  value={highlightsInput}
                  onChange={(e) => setHighlightsInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddHighlight()
                    }
                  }}
                  className="bg-background flex-1"
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleAddHighlight}
                  disabled={!highlightsInput.trim()}
                >
                  Add
                </Button>
              </div>
              {highlights.length > 0 && (
                <ul className="space-y-1 pl-1">
                  {highlights.map((highlight, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-foreground/80"
                    >
                      <span className="text-fey-purple mt-0.5">•</span>
                      <span className="flex-1">{highlight}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveHighlight(index)}
                        className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* DM Notes */}
            <div className="space-y-2">
              <Label htmlFor="session-dm-notes">
                DM Notes <Badge variant="secondary" className="ml-2 text-[10px]">Private</Badge>
              </Label>
              <Textarea
                id="session-dm-notes"
                placeholder="Private notes for future reference..."
                value={dmNotes}
                onChange={(e) => setDmNotes(e.target.value)}
                className="bg-background min-h-[80px] resize-none"
              />
            </div>
          </form>
        </ScrollArea>

        <DialogFooter className="pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={() => {
              resetForm()
              setOpen(false)
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            className="bg-fey-purple hover:bg-fey-purple/90 text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Log Session"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
