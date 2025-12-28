"use client"

import { useState } from "react"
import { 
  X, 
  MapPin, 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff,
  Castle,
  Home,
  Skull,
  Landmark,
  Star,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useWorldMapStore, type LocationPin } from "@/lib/world-map-store"
import { cn } from "@/lib/utils"

interface LocationInfoPopoverProps {
  pin: LocationPin
  onClose: () => void
}

const pinTypeLabels: Record<LocationPin["type"], string> = {
  city: "City",
  town: "Town",
  village: "Village",
  dungeon: "Dungeon",
  landmark: "Landmark",
  poi: "Point of Interest",
  other: "Other",
}

const pinTypeIcons: Record<LocationPin["type"], React.ElementType> = {
  city: Castle,
  town: Home,
  village: Home,
  dungeon: Skull,
  landmark: Landmark,
  poi: Star,
  other: MapPin,
}

const locationTypes: { value: LocationPin["type"]; label: string }[] = [
  { value: "city", label: "City" },
  { value: "town", label: "Town" },
  { value: "village", label: "Village" },
  { value: "dungeon", label: "Dungeon" },
  { value: "landmark", label: "Landmark" },
  { value: "poi", label: "Point of Interest" },
  { value: "other", label: "Other" },
]

export function LocationInfoPopover({ pin, onClose }: LocationInfoPopoverProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  
  const { updatePin, deletePin, revealPin, hidePin } = useWorldMapStore()
  
  // Edit form state
  const [editName, setEditName] = useState(pin.name)
  const [editDescription, setEditDescription] = useState(pin.description)
  const [editType, setEditType] = useState(pin.type)
  const [editNotes, setEditNotes] = useState(pin.notes)
  
  const Icon = pinTypeIcons[pin.type]
  
  const handleSave = async () => {
    setIsSaving(true)
    try {
      updatePin(pin.id, {
        name: editName.trim(),
        description: editDescription.trim(),
        type: editType,
        notes: editNotes.trim(),
      })
      setIsEditing(false)
    } finally {
      setIsSaving(false)
    }
  }
  
  const handleDelete = () => {
    deletePin(pin.id)
    onClose()
  }
  
  const handleToggleVisibility = () => {
    if (pin.isRevealed) {
      hidePin(pin.id)
    } else {
      revealPin(pin.id)
    }
  }
  
  const handleCancelEdit = () => {
    setEditName(pin.name)
    setEditDescription(pin.description)
    setEditType(pin.type)
    setEditNotes(pin.notes)
    setIsEditing(false)
  }
  
  return (
    <div className="absolute top-4 right-4 z-20 w-full max-w-sm">
      <Card className="bg-card/95 backdrop-blur-sm shadow-xl">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              {isEditing ? (
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="h-8"
                  placeholder="Location name"
                />
              ) : (
                <CardTitle className="text-lg truncate">{pin.name}</CardTitle>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 flex-shrink-0"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2 mt-1">
            {isEditing ? (
              <Select value={editType} onValueChange={(v) => setEditType(v as LocationPin["type"])}>
                <SelectTrigger className="h-7 w-auto">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {locationTypes.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Badge variant="secondary" className="text-xs">
                {pinTypeLabels[pin.type]}
              </Badge>
            )}
            <Badge 
              variant={pin.isRevealed ? "default" : "outline"} 
              className={cn(
                "text-xs cursor-pointer",
                pin.isRevealed ? "bg-primary/20 text-primary hover:bg-primary/30" : ""
              )}
              onClick={handleToggleVisibility}
            >
              {pin.isRevealed ? (
                <>
                  <Eye className="w-3 h-3 mr-1" />
                  Visible
                </>
              ) : (
                <>
                  <EyeOff className="w-3 h-3 mr-1" />
                  Hidden
                </>
              )}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="pt-2">
          <ScrollArea className="max-h-64">
            <div className="space-y-4 pr-2">
              {/* Description */}
              <div>
                <Label className="text-xs text-muted-foreground uppercase tracking-wide">
                  Description
                </Label>
                {isEditing ? (
                  <Textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Location description..."
                    rows={3}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-sm mt-1">
                    {pin.description || <span className="text-muted-foreground italic">No description</span>}
                  </p>
                )}
              </div>
              
              {/* DM Notes */}
              <div>
                <Label className="text-xs text-muted-foreground uppercase tracking-wide">
                  DM Notes
                </Label>
                {isEditing ? (
                  <Textarea
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="Private notes for the DM..."
                    rows={2}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-sm mt-1 text-muted-foreground">
                    {pin.notes || <span className="italic">No notes</span>}
                  </p>
                )}
              </div>
              
              {/* Position Info */}
              {!isEditing && (
                <div>
                  <Label className="text-xs text-muted-foreground uppercase tracking-wide">
                    Position
                  </Label>
                  <p className="text-sm mt-1 font-mono">
                    X: {pin.x.toFixed(1)}% | Y: {pin.y.toFixed(1)}%
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
          
          {/* Actions */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            {isEditing ? (
              <div className="flex items-center gap-2 w-full">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancelEdit}
                  disabled={isSaving}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={!editName.trim() || isSaving}
                  className="flex-1"
                >
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="gap-1"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                  Edit
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Location</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{pin.name}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
