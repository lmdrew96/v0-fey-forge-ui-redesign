"use client"

import { useState } from "react"
import { History, ChevronDown, ChevronUp, RotateCcw, ArrowUp, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useDiceStore, type DiceRollResult } from "@/lib/dice-store"
import { cn } from "@/lib/utils"

function formatTime(date: Date): string {
  const d = new Date(date)
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

function RollResultItem({
  result,
  isLatest,
}: {
  result: DiceRollResult
  isLatest: boolean
}) {
  const isCrit = result.dieType === 20 && result.rolls.some((r) => r === 20)
  const isFumble = result.dieType === 20 && result.rolls.some((r) => r === 1)

  // For advantage/disadvantage, show which roll was used
  const isAdvDisadv = result.isAdvantage || result.isDisadvantage
  const selectedRoll = isAdvDisadv
    ? result.isAdvantage
      ? Math.max(...result.rolls)
      : Math.min(...result.rolls)
    : null

  return (
    <div
      className={cn(
        "flex items-center justify-between py-2 px-3 rounded-lg transition-colors",
        isLatest && "bg-fey-cyan/10 border border-fey-cyan/20",
        !isLatest && "hover:bg-muted/50"
      )}
    >
      <div className="flex items-center gap-2 min-w-0 flex-1">
        {/* Expression */}
        <span className="text-sm font-medium text-foreground truncate">
          {result.expression}
        </span>

        {/* Advantage/Disadvantage indicator */}
        {result.isAdvantage && (
          <Badge variant="outline" className="text-xs shrink-0 border-green-500/50 text-green-600 dark:text-green-400">
            <ArrowUp className="w-3 h-3 mr-1" />
            Adv
          </Badge>
        )}
        {result.isDisadvantage && (
          <Badge variant="outline" className="text-xs shrink-0 border-red-500/50 text-red-600 dark:text-red-400">
            <ArrowDown className="w-3 h-3 mr-1" />
            Dis
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {/* Individual rolls */}
        <span className="text-xs text-muted-foreground hidden sm:inline">
          [{result.rolls.map((r, i) => (
            <span
              key={i}
              className={cn(
                isAdvDisadv && r === selectedRoll && "font-bold text-foreground",
                isAdvDisadv && r !== selectedRoll && "line-through opacity-50"
              )}
            >
              {r}
              {i < result.rolls.length - 1 && ", "}
            </span>
          ))}]
          {result.modifier !== 0 && (
            <span className="ml-1">
              {result.modifier >= 0 ? "+" : ""}
              {result.modifier}
            </span>
          )}
        </span>

        {/* Total */}
        <Badge
          variant={isLatest ? "default" : "secondary"}
          className={cn(
            "min-w-[2.5rem] justify-center font-bold",
            isLatest && "bg-fey-cyan text-white",
            isCrit && "bg-fey-gold text-black",
            isFumble && "bg-destructive"
          )}
        >
          {result.total}
        </Badge>

        {/* Timestamp */}
        <span className="text-xs text-muted-foreground w-12 text-right hidden md:inline">
          {formatTime(result.timestamp)}
        </span>
      </div>
    </div>
  )
}

export function RollHistory() {
  const [isOpen, setIsOpen] = useState(true)
  const { rollHistory, clearHistory } = useDiceStore()

  if (rollHistory.length === 0) {
    return null
  }

  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CollapsibleTrigger asChild>
              <button className="flex items-center gap-2 hover:text-fey-cyan transition-colors">
                <History className="h-5 w-5 text-fey-purple" />
                <CardTitle className="text-base">Roll History</CardTitle>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
                {!isOpen && (
                  <Badge variant="secondary" className="ml-1">
                    {rollHistory.length}
                  </Badge>
                )}
              </button>
            </CollapsibleTrigger>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearHistory}
              className="h-8 px-2 text-muted-foreground hover:text-destructive"
              aria-label="Clear roll history"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <ScrollArea className="max-h-64">
              <div className="space-y-1">
                {rollHistory.map((result, index) => (
                  <RollResultItem
                    key={result.id}
                    result={result}
                    isLatest={index === 0}
                  />
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
