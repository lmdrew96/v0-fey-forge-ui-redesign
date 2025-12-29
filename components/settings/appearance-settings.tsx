"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Monitor, Type } from "lucide-react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const fontSizes = [
  { value: "small", label: "Small", size: "14px" },
  { value: "medium", label: "Medium", size: "16px" },
  { value: "large", label: "Large", size: "18px" },
]

export function AppearanceSettings() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [fontSize, setFontSize] = useState("medium")

  // Load font size from localStorage on mount
  useEffect(() => {
    setMounted(true)
    const savedFontSize = localStorage.getItem("feyforge-font-size")
    if (savedFontSize) {
      setFontSize(savedFontSize)
      applyFontSize(savedFontSize)
    }
  }, [])

  const applyFontSize = (size: string) => {
    const fontSizeConfig = fontSizes.find((f) => f.value === size)
    if (fontSizeConfig) {
      document.documentElement.style.fontSize = fontSizeConfig.size
    }
  }

  const handleFontSizeChange = (size: string) => {
    setFontSize(size)
    localStorage.setItem("feyforge-font-size", size)
    applyFontSize(size)
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="space-y-6">
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sun className="h-5 w-5 text-fey-gold" />
              Theme
            </CardTitle>
            <CardDescription>Choose your preferred color scheme</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-24 animate-pulse bg-muted/30 rounded-lg" />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Theme Setting */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            {resolvedTheme === "dark" ? (
              <Moon className="h-5 w-5 text-fey-cyan" />
            ) : (
              <Sun className="h-5 w-5 text-fey-gold" />
            )}
            Theme
          </CardTitle>
          <CardDescription>Choose your preferred color scheme</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={theme || "system"}
            onValueChange={setTheme}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            <Label
              htmlFor="light"
              className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                theme === "light"
                  ? "border-fey-cyan bg-fey-cyan/10"
                  : "border-border/50 hover:border-border hover:bg-muted/30"
              }`}
            >
              <RadioGroupItem value="light" id="light" className="sr-only" />
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-white border border-border shadow-sm">
                <Sun className="h-5 w-5 text-fey-gold" />
              </div>
              <div>
                <div className="font-medium">Light</div>
                <div className="text-xs text-muted-foreground">
                  Bright and clear
                </div>
              </div>
            </Label>

            <Label
              htmlFor="dark"
              className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                theme === "dark"
                  ? "border-fey-cyan bg-fey-cyan/10"
                  : "border-border/50 hover:border-border hover:bg-muted/30"
              }`}
            >
              <RadioGroupItem value="dark" id="dark" className="sr-only" />
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-slate-900 border border-slate-700 shadow-sm">
                <Moon className="h-5 w-5 text-fey-cyan" />
              </div>
              <div>
                <div className="font-medium">Dark</div>
                <div className="text-xs text-muted-foreground">
                  Easy on the eyes
                </div>
              </div>
            </Label>

            <Label
              htmlFor="system"
              className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                theme === "system"
                  ? "border-fey-cyan bg-fey-cyan/10"
                  : "border-border/50 hover:border-border hover:bg-muted/30"
              }`}
            >
              <RadioGroupItem value="system" id="system" className="sr-only" />
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-white to-slate-900 border border-border shadow-sm">
                <Monitor className="h-5 w-5 text-fey-purple" />
              </div>
              <div>
                <div className="font-medium">System</div>
                <div className="text-xs text-muted-foreground">
                  Follows device
                </div>
              </div>
            </Label>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Font Size Setting */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Type className="h-5 w-5 text-fey-purple" />
            Font Size
          </CardTitle>
          <CardDescription>Adjust the text size throughout the app</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={fontSize} onValueChange={handleFontSizeChange}>
            <SelectTrigger className="w-full sm:w-48 bg-card border-border/50">
              <SelectValue placeholder="Select font size" />
            </SelectTrigger>
            <SelectContent>
              {fontSizes.map((size) => (
                <SelectItem key={size.value} value={size.value}>
                  <span className="flex items-center gap-2">
                    <span
                      className="inline-block w-6 text-center"
                      style={{ fontSize: size.size }}
                    >
                      Aa
                    </span>
                    {size.label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="mt-3 text-sm text-muted-foreground">
            Current size: {fontSizes.find((f) => f.value === fontSize)?.label} (
            {fontSizes.find((f) => f.value === fontSize)?.size})
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
