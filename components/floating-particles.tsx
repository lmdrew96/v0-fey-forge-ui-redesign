"use client"

import { useEffect, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  delay: number
  duration: number
  type: "normal" | "slow" | "glow"
}

export function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const colors = [
      "rgba(0, 206, 209, 0.6)", // Cyan
      "rgba(147, 112, 219, 0.5)", // Purple
      "rgba(75, 0, 130, 0.4)", // Indigo
      "rgba(255, 215, 0, 0.3)", // Gold
    ]

    const types: Particle["type"][] = ["normal", "slow", "glow"]

    const newParticles: Particle[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 8,
      type: types[Math.floor(Math.random() * types.length)],
    }))

    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`particle ${particle.type === "slow" ? "particle-slow" : ""} ${particle.type === "glow" ? "particle-glow" : ""}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
