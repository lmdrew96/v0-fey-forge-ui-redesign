"use client"

import { useState, useRef } from "react"
import {
  Download,
  Upload,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Database,
  FileJson,
  Loader2,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

// LocalStorage keys used by FeyForge stores
const STORAGE_KEYS = [
  "feyforge-campaigns",
  "feyforge-characters",
  "feyforge-npcs",
  "feyforge-sessions",
  "feyforge-combat",
  "feyforge-dice-store",
  "feyforge-dm-assistant",
  "feyforge-codex",
  "feyforge-world-map",
  "feyforge-font-size",
]

interface ExportData {
  version: string
  exportedAt: string
  data: Record<string, unknown>
}

export function DataManagement() {
  const [isExporting, setIsExporting] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [clearConfirmText, setClearConfirmText] = useState("")
  const [showDangerZone, setShowDangerZone] = useState(false)
  const [importStatus, setImportStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleExport = async () => {
    setIsExporting(true)

    try {
      // Collect all FeyForge data from localStorage
      const exportData: ExportData = {
        version: "1.0.0",
        exportedAt: new Date().toISOString(),
        data: {},
      }

      for (const key of STORAGE_KEYS) {
        const data = localStorage.getItem(key)
        if (data) {
          try {
            exportData.data[key] = JSON.parse(data)
          } catch {
            // If not JSON, store as string
            exportData.data[key] = data
          }
        }
      }

      // Create and download the file
      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: "application/json",
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `feyforge-backup-${new Date().toISOString().split("T")[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setImportStatus({
        type: "success",
        message: "Data exported successfully!",
      })
    } catch (error) {
      setImportStatus({
        type: "error",
        message: "Failed to export data. Please try again.",
      })
    } finally {
      setIsExporting(false)
      // Clear status after 3 seconds
      setTimeout(() => setImportStatus({ type: null, message: "" }), 3000)
    }
  }

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsImporting(true)
    setImportStatus({ type: null, message: "" })

    try {
      const text = await file.text()
      const importData: ExportData = JSON.parse(text)

      // Validate the import data structure
      if (!importData.version || !importData.data) {
        throw new Error("Invalid FeyForge backup file format")
      }

      // Import data to localStorage
      for (const [key, value] of Object.entries(importData.data)) {
        if (STORAGE_KEYS.includes(key)) {
          localStorage.setItem(
            key,
            typeof value === "string" ? value : JSON.stringify(value)
          )
        }
      }

      setImportStatus({
        type: "success",
        message: "Data imported successfully! Please refresh the page to see changes.",
      })
    } catch (error) {
      setImportStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to import data. Please check the file format.",
      })
    } finally {
      setIsImporting(false)
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleClearAllData = () => {
    // Clear all FeyForge data from localStorage
    for (const key of STORAGE_KEYS) {
      localStorage.removeItem(key)
    }

    setShowClearConfirm(false)
    setClearConfirmText("")
    setImportStatus({
      type: "success",
      message: "All data cleared. Please refresh the page.",
    })
  }

  const canClearData = clearConfirmText.toLowerCase() === "delete all"

  return (
    <div className="space-y-6">
      {/* Export Data */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Download className="h-5 w-5 text-fey-cyan" />
            Export Data
          </CardTitle>
          <CardDescription>
            Download all your FeyForge data as a JSON backup file
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This will export all your campaigns, characters, NPCs, sessions, dice rolls, and
            other settings to a single file that you can use to restore your data later.
          </p>
          <Button onClick={handleExport} disabled={isExporting} className="w-full sm:w-auto">
            {isExporting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <FileJson className="h-4 w-4 mr-2" />
                Export All Data
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Import Data */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Upload className="h-5 w-5 text-fey-purple" />
            Import Data
          </CardTitle>
          <CardDescription>
            Restore your data from a previously exported backup file
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Import a FeyForge backup file to restore your data. This will merge with your
            existing data, potentially overwriting items with the same IDs.
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            variant="outline"
            onClick={handleImportClick}
            disabled={isImporting}
            className="w-full sm:w-auto"
          >
            {isImporting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Importing...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Choose Backup File
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Status Message */}
      {importStatus.type && (
        <Card
          className={`border ${
            importStatus.type === "success"
              ? "bg-green-500/10 border-green-500/30"
              : "bg-destructive/10 border-destructive/30"
          }`}
        >
          <CardContent className="flex items-center gap-3 py-4">
            {importStatus.type === "success" ? (
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0" />
            )}
            <p className="text-sm">{importStatus.message}</p>
          </CardContent>
        </Card>
      )}

      {/* Danger Zone */}
      <Collapsible open={showDangerZone} onOpenChange={setShowDangerZone}>
        <Card className="bg-card/50 border-destructive/30">
          <CardHeader>
            <CollapsibleTrigger asChild>
              <button className="flex items-center justify-between w-full text-left">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2 text-destructive">
                    <AlertTriangle className="h-5 w-5" />
                    Danger Zone
                  </CardTitle>
                  <CardDescription>
                    Irreversible actions that permanently delete your data
                  </CardDescription>
                </div>
                <span className="text-sm text-muted-foreground">
                  {showDangerZone ? "Hide" : "Show"}
                </span>
              </button>
            </CollapsibleTrigger>
          </CardHeader>
          <CollapsibleContent>
            <CardContent className="space-y-4 pt-0">
              <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
                <h4 className="font-medium text-destructive flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Clear All Data
                </h4>
                <p className="text-sm text-muted-foreground mt-2">
                  Permanently delete all your FeyForge data including campaigns, characters,
                  NPCs, sessions, and settings. This action cannot be undone.
                </p>
                <Button
                  variant="destructive"
                  onClick={() => setShowClearConfirm(true)}
                  className="mt-4"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All Data
                </Button>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Clear Data Confirmation Dialog */}
      <AlertDialog open={showClearConfirm} onOpenChange={setShowClearConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-destructive flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Delete All Data?
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
              <span className="block">
                This will permanently delete ALL your FeyForge data, including:
              </span>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>All campaigns</li>
                <li>All characters</li>
                <li>All NPCs</li>
                <li>All session logs</li>
                <li>Combat encounters</li>
                <li>Saved dice rolls</li>
                <li>DM Assistant conversations</li>
                <li>World map data</li>
                <li>All other settings</li>
              </ul>
              <span className="block font-medium text-destructive">
                This action cannot be undone!
              </span>
              <span className="block mt-4">
                To confirm, type <strong>&quot;delete all&quot;</strong> below:
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Input
            value={clearConfirmText}
            onChange={(e) => setClearConfirmText(e.target.value)}
            placeholder="Type 'delete all' to confirm"
            className="mt-2"
          />
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel onClick={() => setClearConfirmText("")}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleClearAllData}
              disabled={!canClearData}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50"
            >
              Delete Everything
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
