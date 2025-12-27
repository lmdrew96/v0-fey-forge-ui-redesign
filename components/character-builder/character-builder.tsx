"use client"

import { useCharacterStore } from "@/lib/character-store"
import { ProgressIndicator } from "./progress-indicator"
import { StepBasics } from "./step-basics"
import { StepAbilities } from "./step-abilities"
import { StepSkills } from "./step-skills"
import { StepEquipment } from "./step-equipment"
import { StepDetails } from "./step-details"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { FloatingParticles } from "@/components/floating-particles"
import { ArrowLeft, ArrowRight, X, Sparkles, Check } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const TOTAL_STEPS = 5

const stepTitles = [
  "Who is your hero?",
  "Forge your abilities",
  "Master your skills",
  "Gather your gear",
  "Tell your story",
]

export function CharacterBuilder() {
  const { currentStep, setStep, character, resetCharacter } = useCharacterStore()

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return character.name && character.race && character.characterClass
      case 2:
        return true
      case 3:
        return true
      case 4:
        return character.equipmentChoice === "gold" || character.selectedEquipment.length > 0
      case 5:
        return true
      default:
        return true
    }
  }

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS && canProceed()) {
      setStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    // In a real app, this would save the character
    console.log("Character created:", character)
    alert("Character created successfully! 🎉")
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepBasics />
      case 2:
        return <StepAbilities />
      case 3:
        return <StepSkills />
      case 4:
        return <StepEquipment />
      case 5:
        return <StepDetails />
      default:
        return <StepBasics />
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingParticles />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/characters">
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Cancel</span>
                  </Button>
                </Link>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
                    <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-fey-gold" />
                    <span className="hidden sm:inline">Forge Your Hero</span>
                    <span className="sm:hidden">Create Character</span>
                  </h1>
                  <p className="text-sm text-muted-foreground hidden md:block">{stepTitles[currentStep - 1]}</p>
                </div>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Progress */}
        <div className="bg-card/50 border-b border-border">
          <div className="container mx-auto">
            <ProgressIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
          <Card className="bg-card/80 backdrop-blur-sm border-2 border-border shadow-xl">
            <CardContent className="p-4 md:p-8">
              {/* Mobile Step Title */}
              <h2 className="text-lg font-semibold text-fey-gold mb-6 md:hidden">{stepTitles[currentStep - 1]}</h2>

              {renderStep()}
            </CardContent>
          </Card>
        </main>

        {/* Navigation Footer */}
        <footer className="sticky bottom-0 z-20 bg-background/80 backdrop-blur-md border-t border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className={cn(
                  "flex-1 md:flex-none md:min-w-32 h-12 border-2",
                  currentStep === 1
                    ? "border-border text-muted-foreground"
                    : "border-fey-purple text-fey-purple hover:bg-fey-purple/10",
                )}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>

              {/* Step indicator for mobile */}
              <div className="hidden sm:flex items-center gap-1">
                {Array.from({ length: TOTAL_STEPS }, (_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      i + 1 === currentStep ? "w-6 bg-fey-cyan" : i + 1 < currentStep ? "bg-fey-cyan" : "bg-secondary",
                    )}
                  />
                ))}
              </div>

              {currentStep < TOTAL_STEPS ? (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={cn(
                    "flex-1 md:flex-none md:min-w-32 h-12",
                    canProceed()
                      ? "bg-fey-cyan hover:bg-fey-cyan/90 text-accent-foreground"
                      : "bg-secondary text-muted-foreground",
                  )}
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleComplete}
                  className="flex-1 md:flex-none md:min-w-32 h-12 bg-fey-gold hover:bg-fey-gold/90 text-accent-foreground"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Create Character
                </Button>
              )}
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
