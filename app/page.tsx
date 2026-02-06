import { prisma } from "@/lib/db";
import Link from "next/link";


type Post = {
  id: number;
  title: string;
  slug: string;
  image: string;
  description?: string;
  category?: {
    title: string;
  };
  author?: {
    name: string;
  };
  // Add other fields as needed
};

export default async function Home() {
    const posts: Post[] = await prisma.post.findMany({ where: { status: 1 }, include: { category: true , author: true} }); 
    const post: Post[] = await prisma.post.findMany({ 
      where: { status: 1 },
      include: { category: true , author: true},
      orderBy: { createdAt: 'desc' },
      take: 1,
    }); 
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-bg via-white/60 to-accent/10 text-primary">

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Insights, stories & ideas for modern developers
          </h2>
          <p className="mt-6 text-[#25343F]/70 max-w-lg">
            A minimal blog built with Next.js and Tailwind CSS, sharing
            development tips, tutorials, and real-world experiences.
          </p>
          <button className="mt-8 bg-accent text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition">
            Read Articles
          </button>
        </div>

        {/* Featured Post with Image */}
        <div className="bg-white rounded-3xl p-6 shadow-lg flex flex-col items-center text-center">
          <img
            src={"http://localhost:3000/" + post[0]?.image }
            alt="Featured Post"
            width={400}
            height={250}
            className="rounded-2xl w-full object-cover mb-4"
          />
          <p className="text-sm uppercase tracking-wider text-muted">
            {post[0]?.category?.title}
          </p>
          <h3 className="mt-2 text-2xl font-bold">
            {post[0]?.title}
          </h3>
          <p className="mt-2 text-[#25343F]/70">
            {post[0]?.description}
          </p>
          <Link href={`/posts/${post[0]?.slug}`} className="mt-4 text-muted font-semibold hover:underline">
            Read more →
          </Link>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h3 className="text-3xl font-bold mb-10">Latest Articles</h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: Post) => (
            <Link
              key={post.id}
              href={`/posts/${post.slug}`}
              className="bg-white rounded-3xl border border-[#BFC9D1] overflow-hidden shadow hover:shadow-lg transition flex flex-col"
            >
              <img
                src={"http://localhost:3000/" +   post.image}
                alt={post.title}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-1">
                <span className="text-xs text-muted font-semibold uppercase">
                  {post.category?.title}
                </span>
                <h4 className="mt-2 text-xl font-bold flex-1">{post.title}</h4>
                {/* <p className="mt-2 text-sm text-[#25343F]/70">{post.excerpt}</p> */}
                <span className="mt-4 text-sm font-semibold text-muted hover:underline">
                  Read article →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
