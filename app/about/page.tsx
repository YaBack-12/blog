import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-bg via-white/60 to-accent/10 text-primary">
      
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            About This Blog
          </h2>
          <p className="mt-6 text-[#25343F]/70 max-w-lg">
            A space where modern web development meets real-world experience.
            Built to share ideas, lessons learned, and practical tutorials for
            developers who care about clean code and thoughtful design.
          </p>

          <Link
            href="/posts"
            className="inline-block mt-8 bg-accent text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Explore Articles
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Why this project?</h3>
          <p className="text-[#25343F]/70 leading-relaxed">
            This blog was created as a minimal, fast, and scalable platform using
            <strong> Next.js</strong>, <strong>Tailwind CSS</strong>, and a modern
            backend stack. The goal is to focus on content, performance, and
            developer experience without unnecessary complexity.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Mission */}
          <div className="bg-white rounded-3xl border border-[#BFC9D1] p-6 shadow">
            <h4 className="text-xl font-bold mb-3">Our Mission</h4>
            <p className="text-[#25343F]/70">
              Share practical knowledge, modern techniques, and honest insights
              to help developers build better products with confidence.
            </p>
          </div>

          {/* Topics */}
          <div className="bg-white rounded-3xl border border-[#BFC9D1] p-6 shadow">
            <h4 className="text-xl font-bold mb-3">What We Write About</h4>
            <ul className="text-[#25343F]/70 space-y-2 list-disc list-inside">
              <li>Next.js & React</li>
              <li>Backend development</li>
              <li>UI/UX & performance</li>
              <li>Real-world project tips</li>
            </ul>
          </div>

          {/* Author */}
          <div className="bg-white rounded-3xl border border-[#BFC9D1] p-6 shadow">
            <h4 className="text-xl font-bold mb-3">About the Author</h4>
            <p className="text-[#25343F]/70">
              A passionate full-stack developer focused on building maintainable,
              scalable applications and continuously learning modern web
              technologies.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}
