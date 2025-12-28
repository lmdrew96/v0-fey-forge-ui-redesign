"use client"

import { AppShell } from "@/components/app-shell"
import { SessionList } from "@/components/sessions/session-list"

export default function SessionsPage() {
  return (
    <AppShell pageTitle="Sessions">
      <div className="p-3 sm:p-4 lg:p-6 w-full max-w-full min-w-0">
        <SessionList />
      </div>
    </AppShell>
  )
}
