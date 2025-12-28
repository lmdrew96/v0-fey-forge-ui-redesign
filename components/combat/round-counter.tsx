"use client"

import { Plus, Minus, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCombatStore } from "@/lib/combat-store"

export function RoundCounter() {
  const { currentRound, incrementRound, decrementRound, resetRound } = useCombatStore()

  return (
    <Card>
      <CardContent className="py-4 px-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-foreground/80">Round</span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={decrementRound}
              disabled={currentRound <= 1}
              aria-label="Previous round"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-2xl font-bold text-fey-cyan min-w-[3rem] text-center" aria-live="polite">{currentRound}</span>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={incrementRound} aria-label="Next round">
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={resetRound} aria-label="Reset round counter">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
