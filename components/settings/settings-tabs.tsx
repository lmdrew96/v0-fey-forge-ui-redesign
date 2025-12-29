"use client"

import { Palette, Users, Database, UserCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppearanceSettings } from "./appearance-settings"
import { CampaignSettings } from "./campaign-settings"
import { DataManagement } from "./data-management"
import { AccountSettings } from "./account-settings"

export function SettingsTabs() {
  return (
    <Tabs defaultValue="appearance" className="w-full">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-1 h-auto p-1">
        <TabsTrigger value="appearance" className="flex items-center gap-1.5 py-2">
          <Palette className="h-4 w-4 flex-shrink-0" />
          <span className="hidden xs:inline sm:inline">Appearance</span>
          <span className="xs:hidden sm:hidden">Theme</span>
        </TabsTrigger>
        <TabsTrigger value="campaign" className="flex items-center gap-1.5 py-2">
          <Users className="h-4 w-4 flex-shrink-0" />
          <span className="hidden xs:inline sm:inline">Campaign</span>
          <span className="xs:hidden sm:hidden">Camp.</span>
        </TabsTrigger>
        <TabsTrigger value="data" className="flex items-center gap-1.5 py-2">
          <Database className="h-4 w-4 flex-shrink-0" />
          <span>Data</span>
        </TabsTrigger>
        <TabsTrigger value="account" className="flex items-center gap-1.5 py-2">
          <UserCircle className="h-4 w-4 flex-shrink-0" />
          <span>Account</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="appearance" className="mt-6">
        <AppearanceSettings />
      </TabsContent>

      <TabsContent value="campaign" className="mt-6">
        <CampaignSettings />
      </TabsContent>

      <TabsContent value="data" className="mt-6">
        <DataManagement />
      </TabsContent>

      <TabsContent value="account" className="mt-6">
        <AccountSettings />
      </TabsContent>
    </Tabs>
  )
}
