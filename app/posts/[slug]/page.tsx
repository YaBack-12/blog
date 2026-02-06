import { CreateComment, incrementPostViews } from "@/actions/PostsActions";
import { prisma } from "@/lib/db";


export default async function SinglePostPage(props: { params: Promise<{ slug: string }> }) {
    
  const params = await props.params;
  if (!params.slug) {
    return (
      <main className="bg-bg text-primary min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Post not found</h1>
          <p className="mt-2 text-primary/60">No slug provided.</p>
        </div>
      </main>
    );
  }

  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    include: { category: true , author: true} 
  });

  const comments = await prisma.comment.findMany({
    where: { postId: post?.id },
    include: { author: true },
    orderBy: { createdAt: "desc" },
  });

  if (!post) {
    return (
      <main className="bg-bg text-primary min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Post not found</h1>
          <p className="mt-2 text-primary/60">No post matches this slug.</p>
        </div>
      </main>
    );
  }
  await incrementPostViews(post.id);

  return (
    <main className="bg-gradient-to-br from-bg via-white/60 to-accent/10 text-primary min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-12 grid  gap-12">
      {/* <div className="mx-auto max-w-7xl px-6 py-12 grid lg:grid-cols-[1fr_280px] gap-12"> */}

        {/* Article */}
        <article className="w-full bg-white border border-muted rounded-2xl p-8 md:p-12">
          
          {/* Meta */}
          <header className="mb-8">
            <img
              src={"http://localhost:3000/" + post?.image }
              alt={post?.image || "Post Image"}
              className="mt-4 rounded-2xl w-full object-cover"
            />
            <span className="text-xs font-semibold uppercase text-accent">
              {post?.category?.title}
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
              {post?.title}
            </h1>
            
            <p className="mt-4 text-sm text-primary/60">
              By {post?.author?.name} • {post?.createdAt?.toLocaleDateString()}  • 6 min read
            </p>
          </header>

          {/* Content */}
          <div className="prose prose-slate max-w-none">
            <p>{post?.description}</p>
            <p>
              As Next.js projects grow, having a solid structure becomes essential. In this article, we’ll explore patterns that help keep your application maintainable and scalable.
            </p>

            <h2>Why Structure Matters</h2>
            <p>
              A clean structure helps teams collaborate efficiently and reduces technical debt over time.
            </p>

            <h3>Recommended Folder Layout</h3>
            <pre>
              <code>
{`app/
 ├─ articles/
 ├─ components/
 ├─ lib/
 ├─ styles/
`}
              </code>
            </pre>

            <h2>Best Practices</h2>
            <ul>
              <li>Keep components small and focused</li>
              <li>Group related features together</li>
              <li>Avoid deeply nested folders</li>
            </ul>

            <h2>Conclusion</h2>
            <p>
              Structure isn’t about perfection — it’s about clarity, consistency, and long-term maintainability.
            </p>
          </div>

          {/* Comments Section */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Comments</h2>

            {/* Comment Form */}
            <form className="mb-8 space-y-4" action={CreateComment.bind(null, post?.id)}>
              <div>
                <label htmlFor="comment" className="block text-sm font-semibold mb-1">
                  Comment
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={4}
                  placeholder="Write your comment..."
                  className="w-full border border-muted rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                />
              </div>

              <button
                type="submit"
                className="bg-accent text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition"
              >
                Post Comment
              </button>
            </form>

            {/* All Comments */}
            <div className="space-y-6">
              {comments.map((comment, index) => (
                <div
                  key={index}
                  className="bg-muted/20 border border-muted rounded-2xl p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{comment?.author?.name}</span>
                    <span className="text-xs text-primary/60">{comment?.createdAt.toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-primary/80">{comment.Comment}</p>
                </div>
              ))}
            </div>
          </section>
        </article>

        {/* Sidebar */}
        {/* <aside className="hidden lg:block lg:sticky lg:top-24 h-fit bg-white border border-muted rounded-2xl p-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-primary/70">
            On this page
          </h3>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="hover:text-accent cursor-pointer">Why Structure Matters</li>
            <li className="hover:text-accent cursor-pointer">Recommended Folder Layout</li>
            <li className="hover:text-accent cursor-pointer">Best Practices</li>
            <li className="hover:text-accent cursor-pointer">Conclusion</li>
          </ul>
        </aside> */}
      </div>
    </main>
  )
}
