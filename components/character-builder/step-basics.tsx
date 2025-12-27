"use client"

import { useState } from "react"
import { useCharacterStore } from "@/lib/character-store"
import { races, classes, backgrounds, alignments } from "@/lib/character-data"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import {
  Sparkles,
  ChevronDown,
  Check,
  Footprints,
  Ruler,
  Zap,
  Shield,
  Heart,
  Swords,
  BookOpen,
  Wrench,
  Languages,
} from "lucide-react"

export function StepBasics() {
  const { character, updateCharacter } = useCharacterStore()
  const [expandedRace, setExpandedRace] = useState<string | null>(null)
  const [expandedClass, setExpandedClass] = useState<string | null>(null)
  const [expandedBackground, setExpandedBackground] = useState<string | null>(null)

  const selectedRace = races.find((r) => r.value === character.race)

  return (
    <div className="space-y-8">
      {/* Character Name */}
      <div className="space-y-3">
        <Label htmlFor="name" className="text-lg font-semibold flex items-center gap-2 text-foreground">
          <Sparkles className="h-4 w-4 text-fey-gold" />
          Character Name
        </Label>
        <Input
          id="name"
          placeholder="Enter your hero's name..."
          value={character.name}
          onChange={(e) => updateCharacter({ name: e.target.value })}
          className="h-12 text-lg bg-card border-2 border-border focus:border-fey-cyan transition-colors"
        />
      </div>

      {/* Race Selection - existing collapsible list */}
      <div className="space-y-3">
        <Label className="text-lg font-semibold flex items-center gap-2 text-foreground">
          <Sparkles className="h-4 w-4 text-fey-cyan" />
          Race
        </Label>
        <div className="space-y-2">
          {races.map((race) => {
            const isSelected = character.race === race.value
            const isExpanded = expandedRace === race.value

            return (
              <Collapsible
                key={race.value}
                open={isExpanded}
                onOpenChange={(open) => setExpandedRace(open ? race.value : null)}
              >
                <div
                  className={cn(
                    "rounded-lg border-2 transition-all duration-200 overflow-hidden",
                    isSelected ? "border-fey-cyan bg-fey-cyan/10" : "border-border bg-card hover:border-fey-purple/50",
                  )}
                >
                  <div className="flex items-center">
                    <button
                      onClick={() => {
                        updateCharacter({ race: race.value, subrace: "" })
                        if (!isExpanded) setExpandedRace(race.value)
                      }}
                      className="flex-1 flex items-center gap-3 p-4 text-left"
                    >
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                          isSelected ? "border-fey-cyan bg-fey-cyan" : "border-muted-foreground",
                        )}
                      >
                        {isSelected && <Check className="h-3 w-3 text-background" />}
                      </div>
                      <span className="font-medium text-foreground">{race.label}</span>
                      {race.subraces.length > 0 && (
                        <span className="text-xs text-muted-foreground">({race.subraces.length} subraces)</span>
                      )}
                    </button>
                    <CollapsibleTrigger asChild>
                      <button className="p-4 hover:bg-secondary/50 transition-colors">
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 text-muted-foreground transition-transform duration-200",
                            isExpanded && "rotate-180",
                          )}
                        />
                      </button>
                    </CollapsibleTrigger>
                  </div>

                  <CollapsibleContent>
                    <div className="px-4 pb-4 pt-2 border-t border-border/50 space-y-4">
                      <p className="text-sm text-muted-foreground italic">{race.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1.5 text-fey-sage">
                          <Footprints className="h-4 w-4" />
                          <span>{race.speed} ft</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-fey-purple">
                          <Ruler className="h-4 w-4" />
                          <span>{race.size}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          Racial Traits
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {race.traits.map((trait) => (
                            <span
                              key={trait}
                              className="px-2 py-1 text-xs rounded-full bg-fey-cyan/10 text-fey-cyan border border-fey-cyan/30"
                            >
                              {trait}
                            </span>
                          ))}
                        </div>
                      </div>
                      {race.subraces.length > 0 && isSelected && (
                        <div className="space-y-2">
                          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                            Choose Subrace
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {race.subraces.map((subrace) => (
                              <button
                                key={subrace}
                                onClick={() => updateCharacter({ subrace })}
                                className={cn(
                                  "px-3 py-1.5 text-sm rounded-lg border-2 transition-all",
                                  character.subrace === subrace
                                    ? "border-fey-gold bg-fey-gold/10 text-fey-gold"
                                    : "border-border hover:border-fey-purple/50 text-foreground",
                                )}
                              >
                                {subrace}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            )
          })}
        </div>
      </div>

      {/* Class Selection - existing collapsible list */}
      <div className="space-y-3">
        <Label className="text-lg font-semibold flex items-center gap-2 text-foreground">
          <Sparkles className="h-4 w-4 text-fey-purple" />
          Class
        </Label>
        <div className="space-y-2">
          {classes.map((cls) => {
            const isSelected = character.characterClass === cls.value
            const isExpanded = expandedClass === cls.value

            return (
              <Collapsible
                key={cls.value}
                open={isExpanded}
                onOpenChange={(open) => setExpandedClass(open ? cls.value : null)}
              >
                <div
                  className={cn(
                    "rounded-lg border-2 transition-all duration-200 overflow-hidden",
                    isSelected
                      ? "border-fey-purple bg-fey-purple/10"
                      : "border-border bg-card hover:border-fey-cyan/50",
                  )}
                >
                  <div className="flex items-center">
                    <button
                      onClick={() => {
                        updateCharacter({ characterClass: cls.value })
                        if (!isExpanded) setExpandedClass(cls.value)
                      }}
                      className="flex-1 flex items-center gap-3 p-4 text-left"
                    >
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                          isSelected ? "border-fey-purple bg-fey-purple" : "border-muted-foreground",
                        )}
                      >
                        {isSelected && <Check className="h-3 w-3 text-background" />}
                      </div>
                      <span className="text-xl">{cls.icon}</span>
                      <span className="font-medium text-foreground">{cls.label}</span>
                      <span className="text-xs text-muted-foreground ml-auto mr-2">{cls.hitDie}</span>
                    </button>
                    <CollapsibleTrigger asChild>
                      <button className="p-4 hover:bg-secondary/50 transition-colors">
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 text-muted-foreground transition-transform duration-200",
                            isExpanded && "rotate-180",
                          )}
                        />
                      </button>
                    </CollapsibleTrigger>
                  </div>

                  <CollapsibleContent>
                    <div className="px-4 pb-4 pt-2 border-t border-border/50 space-y-4">
                      <p className="text-sm text-muted-foreground italic">{cls.description}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Heart className="h-4 w-4 text-red-400" />
                          <span className="text-muted-foreground">Hit Die:</span>
                          <span className="font-medium text-foreground">{cls.hitDie}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-fey-gold" />
                          <span className="text-muted-foreground">Primary:</span>
                          <span className="font-medium text-foreground">{cls.primaryAbility}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-fey-sage" />
                          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                            Saving Throws
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {cls.savingThrows.map((save) => (
                            <span
                              key={save}
                              className="px-2 py-1 text-xs rounded-full bg-fey-sage/10 text-fey-sage border border-fey-sage/30"
                            >
                              {save}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Swords className="h-4 w-4 text-fey-purple" />
                          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                            Proficiencies
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{cls.armorWeapons}</p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            )
          })}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-lg font-semibold flex items-center gap-2 text-foreground">
          <BookOpen className="h-4 w-4 text-fey-gold" />
          Background
        </Label>
        <div className="space-y-2">
          {backgrounds.map((bg) => {
            const isSelected = character.background === bg.value
            const isExpanded = expandedBackground === bg.value

            return (
              <Collapsible
                key={bg.value}
                open={isExpanded}
                onOpenChange={(open) => setExpandedBackground(open ? bg.value : null)}
              >
                <div
                  className={cn(
                    "rounded-lg border-2 transition-all duration-200 overflow-hidden",
                    isSelected ? "border-fey-gold bg-fey-gold/10" : "border-border bg-card hover:border-fey-cyan/50",
                  )}
                >
                  <div className="flex items-center">
                    <button
                      onClick={() => {
                        updateCharacter({ background: bg.value })
                        if (!isExpanded) setExpandedBackground(bg.value)
                      }}
                      className="flex-1 flex items-center gap-3 p-4 text-left"
                    >
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                          isSelected ? "border-fey-gold bg-fey-gold" : "border-muted-foreground",
                        )}
                      >
                        {isSelected && <Check className="h-3 w-3 text-background" />}
                      </div>
                      <span className="font-medium text-foreground">{bg.label}</span>
                      <span className="text-xs text-muted-foreground ml-auto mr-2">{bg.feature}</span>
                    </button>
                    <CollapsibleTrigger asChild>
                      <button className="p-4 hover:bg-secondary/50 transition-colors">
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 text-muted-foreground transition-transform duration-200",
                            isExpanded && "rotate-180",
                          )}
                        />
                      </button>
                    </CollapsibleTrigger>
                  </div>

                  <CollapsibleContent>
                    <div className="px-4 pb-4 pt-2 border-t border-border/50 space-y-4">
                      <p className="text-sm text-muted-foreground italic">{bg.description}</p>

                      {/* Skill Proficiencies */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-fey-cyan" />
                          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                            Skill Proficiencies
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {bg.skillProficiencies.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-1 text-xs rounded-full bg-fey-cyan/10 text-fey-cyan border border-fey-cyan/30"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Tool Proficiencies (if any) */}
                      {bg.toolProficiencies && bg.toolProficiencies.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Wrench className="h-4 w-4 text-fey-purple" />
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                              Tool Proficiencies
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {bg.toolProficiencies.map((tool) => (
                              <span
                                key={tool}
                                className="px-2 py-1 text-xs rounded-full bg-fey-purple/10 text-fey-purple border border-fey-purple/30"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Languages (if any) */}
                      {bg.languages && bg.languages > 0 && (
                        <div className="flex items-center gap-2 text-sm">
                          <Languages className="h-4 w-4 text-fey-sage" />
                          <span className="text-muted-foreground">Languages:</span>
                          <span className="font-medium text-foreground">{bg.languages} of your choice</span>
                        </div>
                      )}

                      {/* Equipment */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Swords className="h-4 w-4 text-fey-gold" />
                          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                            Equipment
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{bg.equipment}</p>
                      </div>

                      {/* Feature */}
                      <div className="p-3 rounded-lg bg-secondary/30 border border-border/50">
                        <span className="text-xs font-semibold text-fey-gold uppercase tracking-wide">
                          Feature: {bg.feature}
                        </span>
                      </div>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            )
          })}
        </div>
      </div>

      {/* Alignment - keeping as grid since it's a simple 3x3 matrix */}
      <div className="space-y-4">
        <Label className="text-lg font-semibold text-foreground">Alignment</Label>
        <div className="grid grid-cols-3 gap-2 max-w-md">
          {alignments.map((row, rowIndex) =>
            row.map((alignment) => (
              <button
                key={alignment}
                onClick={() => updateCharacter({ alignment })}
                className={cn(
                  "p-2 sm:p-3 text-xs sm:text-sm rounded-lg border-2 transition-all duration-200 font-medium",
                  character.alignment === alignment
                    ? "border-fey-gold bg-fey-gold/10 text-fey-gold"
                    : "border-border bg-card text-card-foreground hover:border-fey-purple/50",
                  rowIndex === 0 && "text-fey-sage",
                  rowIndex === 2 && "text-destructive/70",
                )}
              >
                {alignment}
              </button>
            )),
          )}
        </div>
      </div>
    </div>
  )
}
