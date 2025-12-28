"use client"

import { AppShell } from "@/components/app-shell"
import { DMAssistant } from "@/components/dm-assistant/dm-assistant"

export default function DMAssistantPage() {
  return (
    <AppShell pageTitle="DM Assistant">
      <div className="h-[calc(100vh-4rem)] lg:h-[calc(100vh-2rem)] flex flex-col">
        <DMAssistant />
      </div>
    </AppShell>
  )
}
