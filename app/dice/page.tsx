"use client"

import { AppShell } from "@/components/app-shell"
import { DiceRoller } from "@/components/dice/dice-roller"

export default function DicePage() {
  return (
    <AppShell pageTitle="Dice Roller">
      <div className="p-3 sm:p-4 lg:p-6 max-w-4xl mx-auto w-full">
        <DiceRoller />
      </div>
    </AppShell>
  )
}
