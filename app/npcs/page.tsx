"use client"

import { AppShell } from "@/components/app-shell"
import { NPCList } from "@/components/npcs/npc-list"

export default function NPCsPage() {
  return (
    <AppShell pageTitle="NPCs">
      <div className="p-3 sm:p-4 lg:p-6 w-full max-w-full min-w-0">
        <NPCList />
      </div>
    </AppShell>
  )
}
