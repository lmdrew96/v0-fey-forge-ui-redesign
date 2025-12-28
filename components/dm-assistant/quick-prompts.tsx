"use client"

import { Button } from "@/components/ui/button"
import {
  Lightbulb,
  Users,
  Swords,
  Scroll,
  Coins,
  CloudSun,
  BookOpen,
  Scale,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface QuickPromptsProps {
  onSelectPrompt: (prompt: string) => void
  compact?: boolean
}

const quickPrompts = [
  {
    label: "Plot hook",
    prompt: "Give me an interesting plot hook for my D&D campaign",
    icon: Lightbulb,
    color: "text-amber-500",
  },
  {
    label: "NPC idea",
    prompt: "Generate a memorable NPC with personality and backstory",
    icon: Users,
    color: "text-fey-purple",
  },
  {
    label: "Encounter",
    prompt: "Suggest a creative combat or roleplay encounter",
    icon: Swords,
    color: "text-red-500",
  },
  {
    label: "Tavern",
    prompt: "Describe an interesting tavern or inn for my party to visit",
    icon: Scroll,
    color: "text-orange-500",
  },
  {
    label: "Loot",
    prompt: "Generate some interesting loot or a magic item",
    icon: Coins,
    color: "text-fey-gold",
  },
  {
    label: "Weather",
    prompt: "Describe an interesting weather effect for my game",
    icon: CloudSun,
    color: "text-sky-500",
  },
  {
    label: "Rules help",
    prompt: "Help me understand a D&D 5e rule or mechanic",
    icon: BookOpen,
    color: "text-fey-cyan",
  },
  {
    label: "Balance",
    prompt: "Help me balance an encounter for my party",
    icon: Scale,
    color: "text-green-500",
  },
]

export function QuickPrompts({ onSelectPrompt, compact = false }: QuickPromptsProps) {
  if (compact) {
    return (
      <div className="flex flex-wrap gap-1.5">
        {quickPrompts.slice(0, 4).map((item) => (
          <Button
            key={item.label}
            variant="outline"
            size="sm"
            className="h-7 text-xs gap-1.5 bg-muted/50 hover:bg-fey-cyan/10 hover:border-fey-cyan/50"
            onClick={() => onSelectPrompt(item.prompt)}
          >
            <item.icon className={cn("h-3 w-3", item.color)} />
            {item.label}
          </Button>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full max-w-2xl">
      {quickPrompts.map((item) => (
        <Button
          key={item.label}
          variant="outline"
          className={cn(
            "h-auto py-3 px-4 flex flex-col items-center gap-2",
            "bg-card/50 hover:bg-fey-cyan/10 hover:border-fey-cyan/50",
            "transition-all duration-200"
          )}
          onClick={() => onSelectPrompt(item.prompt)}
        >
          <item.icon className={cn("h-5 w-5", item.color)} />
          <span className="text-xs font-medium">{item.label}</span>
        </Button>
      ))}
    </div>
  )
}
