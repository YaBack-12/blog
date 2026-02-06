import { prisma } from "@/lib/db"
import SideDash from "@/components/sideDash"
import Link from "next/link"
import UserTable from "@/components/users/UserTable"

export default async function UsersDashboardPage() {
  const users = await prisma.user.findMany();

  return (
    <div className="w-full h-screen bg-gradient-to-br from-bg via-white/60 to-accent/10 text-primary flex">
      <section className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold">Users</h1>
        </div>
        <UserTable users={users} />
      </section>
    </div>
  )
}
