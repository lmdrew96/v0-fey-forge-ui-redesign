"use client"

import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { useDiceStore, rollDice } from "@/lib/dice-store"

interface DiceVisualProps {
  sides: number
  label: string
  className?: string
}

function DieShape({ sides, isRolling }: { sides: number; isRolling: boolean }) {
  // SVG shapes for different dice
  const shapeClass = cn(
    "w-full h-full transition-transform duration-300",
    isRolling && "animate-spin"
  )

  switch (sides) {
    case 4:
      // Triangle (d4)
      return (
        <svg viewBox="0 0 100 100" className={shapeClass}>
          <polygon
            points="50,10 10,90 90,90"
            fill="currentColor"
            stroke="var(--fey-gold)"
            strokeWidth="2"
          />
          <text
            x="50"
            y="70"
            textAnchor="middle"
            fill="var(--fey-gold)"
            fontSize="24"
            fontWeight="bold"
          >
            4
          </text>
        </svg>
      )
    case 6:
      // Square (d6)
      return (
        <svg viewBox="0 0 100 100" className={shapeClass}>
          <rect
            x="10"
            y="10"
            width="80"
            height="80"
            rx="8"
            fill="currentColor"
            stroke="var(--fey-cyan)"
            strokeWidth="2"
          />
          <text
            x="50"
            y="58"
            textAnchor="middle"
            fill="var(--fey-cyan)"
            fontSize="28"
            fontWeight="bold"
          >
            6
          </text>
        </svg>
      )
    case 8:
      // Diamond (d8)
      return (
        <svg viewBox="0 0 100 100" className={shapeClass}>
          <polygon
            points="50,5 95,50 50,95 5,50"
            fill="currentColor"
            stroke="var(--fey-purple)"
            strokeWidth="2"
          />
          <text
            x="50"
            y="58"
            textAnchor="middle"
            fill="var(--fey-purple)"
            fontSize="24"
            fontWeight="bold"
          >
            8
          </text>
        </svg>
      )
    case 10:
      // Pentagon-ish (d10)
      return (
        <svg viewBox="0 0 100 100" className={shapeClass}>
          <polygon
            points="50,5 95,35 80,90 20,90 5,35"
            fill="currentColor"
            stroke="var(--fey-gold)"
            strokeWidth="2"
          />
          <text
            x="50"
            y="60"
            textAnchor="middle"
            fill="var(--fey-gold)"
            fontSize="22"
            fontWeight="bold"
          >
            10
          </text>
        </svg>
      )
    case 12:
      // Pentagon (d12)
      return (
        <svg viewBox="0 0 100 100" className={shapeClass}>
          <polygon
            points="50,5 93,35 80,88 20,88 7,35"
            fill="currentColor"
            stroke="var(--fey-cyan)"
            strokeWidth="2"
          />
          <text
            x="50"
            y="60"
            textAnchor="middle"
            fill="var(--fey-cyan)"
            fontSize="20"
            fontWeight="bold"
          >
            12
          </text>
        </svg>
      )
    case 20:
      // Hexagon-ish (d20) - the iconic die
      return (
        <svg viewBox="0 0 100 100" className={shapeClass}>
          <polygon
            points="50,3 93,25 93,75 50,97 7,75 7,25"
            fill="currentColor"
            stroke="var(--fey-purple)"
            strokeWidth="2"
          />
          <text
            x="50"
            y="58"
            textAnchor="middle"
            fill="var(--fey-purple)"
            fontSize="22"
            fontWeight="bold"
          >
            20
          </text>
        </svg>
      )
    case 100:
      // Circle with percent (d100)
      return (
        <svg viewBox="0 0 100 100" className={shapeClass}>
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="currentColor"
            stroke="var(--fey-gold)"
            strokeWidth="2"
          />
          <text
            x="50"
            y="42"
            textAnchor="middle"
            fill="var(--fey-gold)"
            fontSize="16"
            fontWeight="bold"
          >
            d
          </text>
          <text
            x="50"
            y="68"
            textAnchor="middle"
            fill="var(--fey-gold)"
            fontSize="20"
            fontWeight="bold"
          >
            100
          </text>
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 100 100" className={shapeClass}>
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="currentColor"
            stroke="var(--fey-cyan)"
            strokeWidth="2"
          />
          <text
            x="50"
            y="58"
            textAnchor="middle"
            fill="var(--fey-cyan)"
            fontSize="24"
            fontWeight="bold"
          >
            {sides}
          </text>
        </svg>
      )
  }
}

export function DiceVisual({ sides, label, className }: DiceVisualProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const { addRoll, isRolling, setIsRolling, rollMode } = useDiceStore()

  const handleRoll = useCallback(() => {
    if (isRolling) return

    setIsRolling(true)
    setIsAnimating(true)

    // Animate for a short duration then show result
    setTimeout(() => {
      const result = rollDice(sides, 1, 0, {
        isAdvantage: rollMode === "advantage" && sides === 20,
        isDisadvantage: rollMode === "disadvantage" && sides === 20,
      })
      addRoll(result)
      setIsAnimating(false)
      setIsRolling(false)
    }, 500)
  }, [sides, addRoll, isRolling, setIsRolling, rollMode])

  return (
    <button
      onClick={handleRoll}
      disabled={isRolling}
      className={cn(
        "relative flex flex-col items-center justify-center p-3 sm:p-4",
        "rounded-xl border-2 border-border bg-card/50 backdrop-blur-sm",
        "transition-all duration-200",
        "hover:border-fey-cyan/50 hover:bg-card/80 hover:shadow-lg hover:shadow-fey-cyan/10",
        "active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fey-cyan focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "group cursor-pointer touch-manipulation",
        className
      )}
      aria-label={`Roll ${label}`}
    >
      {/* Die shape container */}
      <div
        className={cn(
          "w-12 h-12 sm:w-16 sm:h-16 mb-1 sm:mb-2 text-card-foreground/20",
          "transition-all duration-300",
          "group-hover:text-card-foreground/40 group-hover:scale-110",
          isAnimating && "animate-bounce"
        )}
      >
        <DieShape sides={sides} isRolling={isAnimating} />
      </div>

      {/* Label */}
      <span
        className={cn(
          "text-xs sm:text-sm font-semibold text-muted-foreground",
          "transition-colors group-hover:text-foreground"
        )}
      >
        {label}
      </span>

      {/* Glow effect on hover */}
      <div
        className={cn(
          "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300",
          "bg-gradient-to-br from-fey-cyan/5 via-transparent to-fey-purple/5",
          "group-hover:opacity-100"
        )}
      />
    </button>
  )
}

// Component to display all dice
export function DiceGrid() {
  const diceTypes = [
    { sides: 20, label: "d20" },
    { sides: 12, label: "d12" },
    { sides: 10, label: "d10" },
    { sides: 8, label: "d8" },
    { sides: 6, label: "d6" },
    { sides: 4, label: "d4" },
    { sides: 100, label: "d100" },
  ]

  return (
    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 sm:gap-3">
      {diceTypes.map(({ sides, label }) => (
        <DiceVisual key={sides} sides={sides} label={label} />
      ))}
    </div>
  )
}
