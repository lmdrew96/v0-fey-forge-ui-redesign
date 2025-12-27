import { create } from "zustand"

export interface CharacterData {
  // Step 1: Basics
  name: string
  race: string
  subrace: string
  characterClass: string
  background: string
  alignment: string

  // Step 2: Ability Scores
  abilityMethod: "pointBuy" | "standardArray" | "manual"
  abilities: {
    strength: number
    dexterity: number
    constitution: number
    intelligence: number
    wisdom: number
    charisma: number
  }

  // Step 3: Skills & Proficiencies
  skillProficiencies: string[]
  toolProficiencies: string[]
  languages: string[]

  // Step 4: Equipment
  equipmentChoice: "packages" | "gold"
  selectedEquipment: string[]
  startingGold: number

  // Step 5: Details
  personalityTraits: string
  ideals: string
  bonds: string
  flaws: string
  backstory: string
  age: string
  height: string
  weight: string
  eyes: string
  skin: string
  hair: string
  imageUrl: string
}

interface CharacterStore {
  currentStep: number
  character: CharacterData
  setStep: (step: number) => void
  updateCharacter: (data: Partial<CharacterData>) => void
  resetCharacter: () => void
}

const initialCharacter: CharacterData = {
  name: "",
  race: "",
  subrace: "",
  characterClass: "",
  background: "",
  alignment: "",
  abilityMethod: "pointBuy",
  abilities: {
    strength: 8,
    dexterity: 8,
    constitution: 8,
    intelligence: 8,
    wisdom: 8,
    charisma: 8,
  },
  skillProficiencies: [],
  toolProficiencies: [],
  languages: ["Common"],
  equipmentChoice: "packages",
  selectedEquipment: [],
  startingGold: 0,
  personalityTraits: "",
  ideals: "",
  bonds: "",
  flaws: "",
  backstory: "",
  age: "",
  height: "",
  weight: "",
  eyes: "",
  skin: "",
  hair: "",
  imageUrl: "",
}

export const useCharacterStore = create<CharacterStore>((set) => ({
  currentStep: 1,
  character: initialCharacter,
  setStep: (step) => set({ currentStep: step }),
  updateCharacter: (data) =>
    set((state) => ({
      character: { ...state.character, ...data },
    })),
  resetCharacter: () => set({ currentStep: 1, character: initialCharacter }),
}))
