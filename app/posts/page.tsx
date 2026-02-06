import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { prisma } from '@/lib/db';

export default async function Posts () {
  

  const posts = await prisma.post.findMany({ where: { status: 1 }, include: { category: true , author: true} }); 
  const categories = await prisma.category.findMany(); 
  return (
    <main className="bg-gradient-to-br from-bg via-white/60 to-accent/10 text-primary min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-12 grid lg:grid-cols-[260px_1fr] gap-12">

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 h-fit bg-white border border-[#BFC9D1] rounded-2xl p-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-primary/70">
            Categories
          </h2>
          <ul className="mt-6 space-y-2">
            {categories.map((category) => (
              <li
                key={category.id}
                className="cursor-pointer px-4 py-2 rounded-xl text-sm font-medium hover:bg-muted hover:text-accent transition"
              >
                {category.title}
              </li>
            ))}
          </ul>
        </aside>

        {/* Articles */}
        <section>
          <h1 className="text-4xl font-extrabold mb-10">Articles</h1>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white border border-bg rounded-3xl overflow-hidden shadow hover:shadow-lg transition flex flex-col"
              >
                {/* Article Image */}
                <img
                  src={"http://localhost:3000/" + post.image}
                  alt={post.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />

                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs font-semibold uppercase text-muted">
                    {post.category?.title}
                  </span>

                  <h3 className="mt-2 text-xl font-bold leading-snug flex-1">
                    {post.title}
                  </h3>

                  {/* <p className="mt-2 text-sm text-[#25343F]/70">
                    {post.excerpt}
                  </p> */}

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-primary/50">{post.createdAt?.toLocaleDateString()}</span>
                    <Link
                      href={`/posts/${post.slug}`}
                      className="text-sm font-semibold text-muted hover:underline"
                    >
                      Read →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

