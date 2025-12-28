"use client"

import { Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DiceGrid } from "@/components/dice/dice-visual"
import { CustomExpression } from "@/components/dice/custom-expression"
import { RollHistory } from "@/components/dice/roll-history"
import { SavedRolls } from "@/components/dice/saved-rolls"
import { useDiceStore } from "@/lib/dice-store"
import { cn } from "@/lib/utils"

function RollResultDisplay() {
  const { currentResult, isRolling } = useDiceStore()

  if (!currentResult && !isRolling) {
    return (
      <Card className="bg-gradient-to-br from-card to-muted/30">
        <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12">
          <div className="text-6xl sm:text-8xl font-bold text-muted-foreground/30 mb-2">
            ?
          </div>
          <p className="text-sm text-muted-foreground">
            Click a die to roll
          </p>
        </CardContent>
      </Card>
    )
  }

  const isCrit =
    currentResult?.dieType === 20 && currentResult.rolls.some((r) => r === 20)
  const isFumble =
    currentResult?.dieType === 20 && currentResult.rolls.some((r) => r === 1)

  return (
    <Card
      className={cn(
        "bg-gradient-to-br from-card to-muted/30 transition-all duration-300",
        isRolling && "animate-pulse",
        isCrit && "border-fey-gold shadow-lg shadow-fey-gold/20",
        isFumble && "border-destructive shadow-lg shadow-destructive/20"
      )}
    >
      <CardContent className="flex flex-col items-center justify-center py-6 sm:py-10">
        {isRolling ? (
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-fey-cyan animate-spin" />
            <span className="text-lg sm:text-xl text-muted-foreground">Rolling...</span>
          </div>
        ) : currentResult ? (
          <>
            {/* Critical/Fumble banner */}
            {isCrit && (
              <Badge className="mb-2 bg-fey-gold text-black font-bold animate-bounce">
                Natural 20 - Critical!
              </Badge>
            )}
            {isFumble && (
              <Badge className="mb-2 bg-destructive font-bold animate-bounce">
                Natural 1 - Critical Fail!
              </Badge>
            )}

            {/* Total result */}
            <div
              className={cn(
                "text-5xl sm:text-7xl lg:text-8xl font-bold mb-2 transition-all",
                isCrit && "text-fey-gold",
                isFumble && "text-destructive",
                !isCrit && !isFumble && "text-fey-cyan"
              )}
            >
              {currentResult.total}
            </div>

            {/* Expression and breakdown */}
            <p className="text-sm sm:text-base text-muted-foreground">
              {currentResult.expression}
            </p>

            {/* Individual dice rolls */}
            <div className="flex items-center gap-2 mt-2 flex-wrap justify-center">
              {currentResult.rolls.map((roll, i) => {
                const isMaxRoll = roll === currentResult.dieType
                const isMinRoll = roll === 1
                const isSelected =
                  (currentResult.isAdvantage || currentResult.isDisadvantage) &&
                  roll ===
                    (currentResult.isAdvantage
                      ? Math.max(...currentResult.rolls)
                      : Math.min(...currentResult.rolls))
                const isNotSelected =
                  (currentResult.isAdvantage || currentResult.isDisadvantage) &&
                  !isSelected

                return (
                  <Badge
                    key={i}
                    variant="outline"
                    className={cn(
                      "text-sm font-medium",
                      isMaxRoll && "border-fey-gold text-fey-gold",
                      isMinRoll &&
                        currentResult.dieType === 20 &&
                        "border-destructive text-destructive",
                      isNotSelected && "opacity-50 line-through"
                    )}
                  >
                    {roll}
                  </Badge>
                )
              })}
              {currentResult.modifier !== 0 && (
                <span className="text-sm text-muted-foreground">
                  {currentResult.modifier >= 0 ? "+" : ""}
                  {currentResult.modifier}
                </span>
              )}
            </div>

            {/* Advantage/Disadvantage indicator */}
            {(currentResult.isAdvantage || currentResult.isDisadvantage) && (
              <Badge
                variant="outline"
                className={cn(
                  "mt-2",
                  currentResult.isAdvantage &&
                    "border-green-500/50 text-green-600 dark:text-green-400",
                  currentResult.isDisadvantage &&
                    "border-red-500/50 text-red-600 dark:text-red-400"
                )}
              >
                {currentResult.isAdvantage ? "Advantage" : "Disadvantage"}
              </Badge>
            )}
          </>
        ) : null}
      </CardContent>
    </Card>
  )
}

export function DiceRoller() {
  return (
    <div className="space-y-6">
      {/* Main result display */}
      <RollResultDisplay />

      {/* Visual dice grid */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-fey-cyan" />
            Click to Roll
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DiceGrid />
        </CardContent>
      </Card>

      {/* Two column layout for custom and saved on larger screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <CustomExpression />
        <SavedRolls />
      </div>

      {/* Roll history */}
      <RollHistory />
    </div>
  )
}
