import Link from 'next/link'

const Footer = () => {
  return (
      <footer className="bg-accent text-bg py-12 px-6 ">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold text-lg mb-4">NextBlog</h4>
            <p className="text-sm text-bg/70">
              Sharing knowledge, tutorials, and tips for modern web development.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-bg transition">Home</Link></li>
              <li><Link href="/articles" className="hover:text-bg transition">Articles</Link></li>
              <li><Link href="/categories" className="hover:text-bg transition">Categories</Link></li>
              <li><Link href="/login" className="hover:text-bg transition">Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <p className="text-sm text-bg/70">contact@nextblog.com</p>
            <p className="text-sm text-bg/70">+212 600 000 000</p>
          </div>
        </div>
        <p className="mt-12 text-center text-sm text-bg/50">&copy; 2026 NextBlog. All rights reserved.</p>
      </footer>
  )
}

export default Footer