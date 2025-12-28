"use client"

import { useState } from "react"
import { Bookmark, Plus, X, Pencil, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useDiceStore, parseDiceExpression, rollDice, type SavedRoll } from "@/lib/dice-store"
import { cn } from "@/lib/utils"

interface SavedRollButtonProps {
  savedRoll: SavedRoll
  onRoll: () => void
  onRemove: () => void
  onEdit: (updates: Partial<SavedRoll>) => void
}

function SavedRollButton({ savedRoll, onRoll, onRemove, onEdit }: SavedRollButtonProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(savedRoll.name)
  const [editExpression, setEditExpression] = useState(savedRoll.expression)
  const { isRolling } = useDiceStore()

  const handleSaveEdit = () => {
    if (editName.trim() && parseDiceExpression(editExpression.trim())) {
      onEdit({ name: editName.trim(), expression: editExpression.trim().toLowerCase() })
      setIsEditing(false)
    }
  }

  if (isEditing) {
    return (
      <div className="flex items-center gap-2 p-2 border border-fey-cyan/30 rounded-lg bg-muted/50 min-w-0 w-full">
        <Input
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          placeholder="Name"
          className="h-8 text-xs flex-1 min-w-0"
        />
        <Input
          value={editExpression}
          onChange={(e) => setEditExpression(e.target.value)}
          placeholder="2d6+3"
          className="h-8 text-xs w-20 shrink-0"
        />
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={handleSaveEdit}
          aria-label="Save changes"
        >
          <Check className="h-4 w-4 text-green-500" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={() => {
            setEditName(savedRoll.name)
            setEditExpression(savedRoll.expression)
            setIsEditing(false)
          }}
          aria-label="Cancel editing"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>
    )
  }

  return (
    <div className="group flex items-center gap-1 min-w-0 w-full">
      <Button
        variant="outline"
        size="sm"
        onClick={onRoll}
        disabled={isRolling}
        className={cn(
          "flex-1 min-w-0 justify-between h-auto py-2 px-3 overflow-hidden",
          "hover:border-fey-purple/50 hover:bg-fey-purple/5",
          "transition-all duration-200"
        )}
      >
        <span className="font-medium truncate min-w-0 flex-1 text-left">{savedRoll.name}</span>
        <span className="text-xs text-muted-foreground ml-2 shrink-0">{savedRoll.expression}</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 shrink-0"
        onClick={() => setIsEditing(true)}
        aria-label={`Edit ${savedRoll.name}`}
      >
        <Pencil className="h-3 w-3 text-muted-foreground" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 shrink-0"
        onClick={onRemove}
        aria-label={`Remove ${savedRoll.name}`}
      >
        <X className="h-3 w-3 text-muted-foreground hover:text-destructive" />
      </Button>
    </div>
  )
}

function AddSavedRollDialog() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [expression, setExpression] = useState("")
  const [error, setError] = useState<string | null>(null)
  const { addSavedRoll } = useDiceStore()

  const handleAdd = () => {
    if (!name.trim()) {
      setError("Enter a name")
      return
    }

    if (!parseDiceExpression(expression.trim())) {
      setError("Invalid dice expression")
      return
    }

    addSavedRoll({
      id: crypto.randomUUID(),
      name: name.trim(),
      expression: expression.trim().toLowerCase(),
    })

    setName("")
    setExpression("")
    setError(null)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Save New Roll
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Save Custom Roll</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="roll-name">Name</Label>
            <Input
              id="roll-name"
              placeholder="e.g., Fireball, Sneak Attack"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setError(null)
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="roll-expression">Dice Expression</Label>
            <Input
              id="roll-expression"
              placeholder="e.g., 8d6, 2d6+3"
              value={expression}
              onChange={(e) => {
                setExpression(e.target.value)
                setError(null)
              }}
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAdd}>Save Roll</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function SavedRolls() {
  const { savedRolls, removeSavedRoll, updateSavedRoll, addRoll, setIsRolling, rollMode } = useDiceStore()

  const handleRoll = (savedRoll: SavedRoll) => {
    const parsed = parseDiceExpression(savedRoll.expression)
    if (!parsed) return

    setIsRolling(true)

    setTimeout(() => {
      const result = rollDice(parsed.sides, parsed.count, parsed.modifier, {
        isAdvantage: rollMode === "advantage" && parsed.sides === 20 && parsed.count === 1,
        isDisadvantage: rollMode === "disadvantage" && parsed.sides === 20 && parsed.count === 1,
        label: `${savedRoll.name}: ${savedRoll.expression}`,
      })
      addRoll(result)
      setIsRolling(false)
    }, 300)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Bookmark className="h-5 w-5 text-fey-gold" />
          Saved Rolls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {savedRolls.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No saved rolls yet. Add your favorite dice combinations!
          </p>
        ) : (
          <div className="space-y-2">
            {savedRolls.map((savedRoll) => (
              <SavedRollButton
                key={savedRoll.id}
                savedRoll={savedRoll}
                onRoll={() => handleRoll(savedRoll)}
                onRemove={() => removeSavedRoll(savedRoll.id)}
                onEdit={(updates) => updateSavedRoll(savedRoll.id, updates)}
              />
            ))}
          </div>
        )}
        <AddSavedRollDialog />
      </CardContent>
    </Card>
  )
}
