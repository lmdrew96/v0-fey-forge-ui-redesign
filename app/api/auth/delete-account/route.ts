import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { db, isDatabaseConfigured } from "@/lib/db"
import {
  users,
  accounts,
  sessions,
  characters,
  campaigns,
  npcs,
  mapLocations,
  gameSessions,
  wikiEntries,
} from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function DELETE(req: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!isDatabaseConfigured()) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      )
    }

    const userId = session.user.id

    // Delete all user data in the correct order (respecting foreign keys)
    // 1. Delete wiki entries
    await db.delete(wikiEntries).where(eq(wikiEntries.userId, userId))

    // 2. Delete game sessions
    await db.delete(gameSessions).where(eq(gameSessions.userId, userId))

    // 3. Delete NPCs
    await db.delete(npcs).where(eq(npcs.userId, userId))

    // 4. Delete map locations
    await db.delete(mapLocations).where(eq(mapLocations.userId, userId))

    // 5. Delete characters
    await db.delete(characters).where(eq(characters.userId, userId))

    // 6. Delete campaigns
    await db.delete(campaigns).where(eq(campaigns.userId, userId))

    // 7. Delete sessions (NextAuth)
    await db.delete(sessions).where(eq(sessions.userId, userId))

    // 8. Delete accounts (OAuth connections)
    await db.delete(accounts).where(eq(accounts.userId, userId))

    // 9. Finally, delete the user
    await db.delete(users).where(eq(users.id, userId))

    return NextResponse.json({
      success: true,
      message: "Account deleted successfully",
    })
  } catch (error) {
    console.error("[FeyForge] Account deletion error:", error)
    return NextResponse.json(
      { error: "Failed to delete account" },
      { status: 500 }
    )
  }
}
