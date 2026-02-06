import EditTable from "@/components/posts/EditTable";
import { prisma } from "@/lib/db";
import Link from "next/link";


export default async function PostsDashboardPage() {
  const posts = await prisma.post.findMany({ include: { category: true , author: true} }); 
  return (
    <div className="w-full h-screen bg-bg text-primary flex">
        <section className="flex-1 p-8 bg-gradient-to-br from-bg via-white/60 to-accent/10 text-primary min-h-screen">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-extrabold">Posts</h1>
            <Link href="/dashboard/posts/create" className="bg-accent text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition">
            + New Post
            </Link>
        </div>

        {/* Table */}
        <div className="bg-white border border-muted rounded-2xl overflow-hidden">
            <EditTable posts={posts} />
        </div>

        {/* Empty state */}
        {posts.length === 0 && (
            <div className="mt-20 text-center text-primary/60">
            No posts yet. Create your first post.
            </div>
        )}
        </section>
    </div>
  )
}
