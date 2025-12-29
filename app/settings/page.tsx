"use client"

import { AppShell } from "@/components/app-shell"
import { SettingsTabs } from "@/components/settings/settings-tabs"

export default function SettingsPage() {
  return (
    <AppShell pageTitle="Settings">
      <div className="p-3 sm:p-4 lg:p-6 w-full max-w-full min-w-0">
        <SettingsTabs />
      </div>
    </AppShell>
  )
}
