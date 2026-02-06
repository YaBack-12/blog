import { prisma } from "@/lib/db"
import Link from "next/link"
import CategoriesTable from "@/components/CategoriesTable"

export default async function CategoriesDashboardPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: { select: { posts: true } },
    },
  })

  return (
    <div className="w-full h-screen bg-gradient-to-br from-bg via-white/60 to-accent/10 text-primary flex">
      <section className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold">Categories</h1>

          <Link
            href="/dashboard/categories/create"
            className="bg-accent text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition"
          >
            + New Category
          </Link>
        </div>

        <CategoriesTable categories={categories} />
      </section>
    </div>
  )
}
