import { getAuthUser } from "@/actions/AuthActions";
import { prisma } from "@/lib/db";

export default async function DashboardPage() {
  let post_count ; 
  let comment_count;
  let category_count;
  let views_count;
  const user = await getAuthUser();
  if (user?.role === "admin") {
    post_count = await prisma.post.count();
    comment_count = await prisma.comment.count();
    category_count = await prisma.category.count();
    views_count = await prisma.post.aggregate({
      _sum: { views: true },
    });
  }else{
    post_count = await prisma.post.count({
      where: { authorId: user?.id },
    });
    comment_count = await prisma.comment.count({
      where: { post: { authorId: user?.id } },
    });
    category_count = await prisma.category.count({
      where: { posts: { some: { authorId: user?.id } } },
    });
    views_count = await prisma.post.aggregate({
      where: { authorId: user?.id },
      _sum: { views: true },
    });

  }
  
  return (
    <main className="w-full h-screen bg-gradient-to-br from-bg via-white/60 to-accent/10 text-primary flex">
      {/* Main Content */}
      <section className="flex-1 p-8">
        <h1 className="text-3xl font-extrabold mb-8">Dashboard</h1>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard title="Articles" value={post_count.toString()} />
          <StatCard title="Categories" value={category_count.toString()} />
          <StatCard title="Views" value={views_count._sum.views?.toString() || "0"} />
          <StatCard title="Comments" value={comment_count.toString()} />
        </div>

        {/* Content */}
        <div className="bg-white border border-muted rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <p className="text-sm text-primary/70">
            Your recent articles and platform activity will appear here.
          </p>
        </div>
      </section>
    </main>
  )
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white border border-muted rounded-2xl p-6">
      <p className="text-sm text-primary/60">{title}</p>
      <p className="mt-2 text-3xl font-extrabold">{value}</p>
    </div>
  )
}
