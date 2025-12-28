"use client"

import { useState } from "react"
import { Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useDiceStore, parseDiceExpression, rollDice } from "@/lib/dice-store"
import { cn } from "@/lib/utils"

export function CustomExpression() {
  const [expression, setExpression] = useState("")
  const [error, setError] = useState<string | null>(null)
  const { addRoll, isRolling, setIsRolling, rollMode, setRollMode } = useDiceStore()

  const handleRoll = () => {
    if (!expression.trim()) {
      setError("Enter a dice expression")
      return
    }

    const parsed = parseDiceExpression(expression.trim())
    if (!parsed) {
      setError("Invalid format. Use: 2d6+3, 1d20, 4d8-2")
      return
    }

    setError(null)
    setIsRolling(true)

    setTimeout(() => {
      const result = rollDice(parsed.sides, parsed.count, parsed.modifier, {
        isAdvantage: rollMode === "advantage" && parsed.sides === 20 && parsed.count === 1,
        isDisadvantage: rollMode === "disadvantage" && parsed.sides === 20 && parsed.count === 1,
        label: expression.trim().toLowerCase(),
      })
      addRoll(result)
      setIsRolling(false)
    }, 300)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleRoll()
    }
  }

  // Quick expression buttons
  const quickExpressions = [
    { label: "2d6", expression: "2d6" },
    { label: "1d20+5", expression: "1d20+5" },
    { label: "4d6", expression: "4d6" },
    { label: "1d8+3", expression: "1d8+3" },
  ]

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Calculator className="h-5 w-5 text-fey-cyan" />
          Custom Roll
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Expression input */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="e.g., 2d6+3, 1d20-2, 8d6"
              value={expression}
              onChange={(e) => {
                setExpression(e.target.value)
                setError(null)
              }}
              onKeyDown={handleKeyDown}
              className={cn("flex-1", error && "border-destructive")}
              aria-label="Dice expression"
            />
            <Button
              onClick={handleRoll}
              disabled={isRolling || !expression.trim()}
              className="shrink-0"
            >
              Roll
            </Button>
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
        </div>

        {/* Quick expression chips */}
        <div className="flex flex-wrap gap-2">
          {quickExpressions.map(({ label, expression: expr }) => (
            <Button
              key={expr}
              variant="outline"
              size="sm"
              onClick={() => setExpression(expr)}
              className="text-xs"
            >
              {label}
            </Button>
          ))}
        </div>

        {/* Advantage/Disadvantage toggle for d20 */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">
            d20 Roll Mode
          </Label>
          <RadioGroup
            value={rollMode}
            onValueChange={(value) =>
              setRollMode(value as "normal" | "advantage" | "disadvantage")
            }
            className="flex flex-wrap gap-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="normal" id="normal" />
              <Label htmlFor="normal" className="text-sm font-normal cursor-pointer">
                Normal
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="advantage"
                id="advantage"
                className="border-green-500 text-green-500"
              />
              <Label htmlFor="advantage" className="text-sm font-normal cursor-pointer text-green-600 dark:text-green-400">
                Advantage
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="disadvantage"
                id="disadvantage"
                className="border-red-500 text-red-500"
              />
              <Label htmlFor="disadvantage" className="text-sm font-normal cursor-pointer text-red-600 dark:text-red-400">
                Disadvantage
              </Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  )
}
