"use client"

import { AppShell } from "@/components/app-shell"
import { WorldMap } from "@/components/world-map/world-map"
import { MapControls } from "@/components/world-map/map-controls"
import { AddPinDialog } from "@/components/world-map/add-pin-dialog"
import { UploadMapDialog } from "@/components/world-map/upload-map-dialog"

export default function WorldMapPage() {
  return (
    <AppShell pageTitle="World Map">
      <div className="flex flex-col h-[calc(100vh-4rem)] w-full overflow-hidden">
        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-end gap-2 p-3 sm:p-4 border-b border-border bg-card/50 backdrop-blur-sm">
          <UploadMapDialog />
          <AddPinDialog />
        </div>

        {/* Map Container */}
        <div className="flex-1 relative overflow-hidden">
          <WorldMap />
          
          {/* Map Controls Overlay */}
          <div className="absolute bottom-4 left-4 z-10">
            <MapControls />
          </div>
        </div>
      </div>
    </AppShell>
  )
}
