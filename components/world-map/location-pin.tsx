"use client"

import { useState } from "react"
import { MapPin, Castle, Home, Landmark, Skull, Star, HelpCircle } from "lucide-react"
import type { LocationPin as LocationPinType } from "@/lib/world-map-store"
import { cn } from "@/lib/utils"

interface LocationPinProps {
  pin: LocationPinType
  isSelected: boolean
  onClick: () => void
}

const pinTypeIcons: Record<LocationPinType["type"], React.ElementType> = {
  city: Castle,
  town: Home,
  village: Home,
  dungeon: Skull,
  landmark: Landmark,
  poi: Star,
  other: MapPin,
}

const pinTypeColors: Record<LocationPinType["type"], string> = {
  city: "bg-fey-gold text-background",
  town: "bg-fey-purple text-white",
  village: "bg-fey-sage text-background",
  dungeon: "bg-destructive text-white",
  landmark: "bg-fey-cyan text-background",
  poi: "bg-primary text-primary-foreground",
  other: "bg-muted-foreground text-background",
}

export function LocationPinMarker({ pin, isSelected, onClick }: LocationPinProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  const Icon = pinTypeIcons[pin.type] || MapPin
  const colorClass = pinTypeColors[pin.type] || "bg-muted-foreground text-background"
  
  return (
    <div
      data-pin
      className="absolute transform -translate-x-1/2 -translate-y-full"
      style={{
        left: `${pin.x}%`,
        top: `${pin.y}%`,
      }}
    >
      {/* Pin Marker */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "relative flex flex-col items-center transition-transform duration-200",
          isSelected && "scale-125",
          isHovered && !isSelected && "scale-110"
        )}
      >
        {/* Pin Icon */}
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all duration-200",
            colorClass,
            isSelected && "ring-2 ring-offset-2 ring-fey-cyan ring-offset-background",
            "hover:shadow-xl"
          )}
        >
          <Icon className="w-4 h-4" />
        </div>
        
        {/* Pin Pointer */}
        <div
          className={cn(
            "w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent -mt-0.5",
            pin.type === "city" && "border-t-fey-gold",
            pin.type === "town" && "border-t-fey-purple",
            pin.type === "village" && "border-t-fey-sage",
            pin.type === "dungeon" && "border-t-destructive",
            pin.type === "landmark" && "border-t-fey-cyan",
            pin.type === "poi" && "border-t-primary",
            pin.type === "other" && "border-t-muted-foreground",
          )}
        />
        
        {/* Hover Label */}
        {(isHovered || isSelected) && (
          <div className="absolute top-full mt-2 px-2 py-1 bg-card/95 backdrop-blur-sm rounded border border-border shadow-lg whitespace-nowrap z-10">
            <p className="text-xs font-medium text-foreground">{pin.name}</p>
          </div>
        )}
      </button>
    </div>
  )
}
