'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function NavMobileMenu({ session, user }: { session: any, user: any }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        className="p-2 rounded-lg hover:bg-muted focus:outline-none"
        onClick={() => setOpen(v => !v)}
        aria-label="Open menu"
      >
        <svg width={24} height={24} fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-16 left-0 w-full bg-white border-b border-muted shadow-lg z-50 animate-fade-in">
          <ul className="flex flex-col gap-2 p-4 text-sm font-semibold">
            <li>
              <Link href="/" className="block py-2 px-4 rounded hover:bg-accent/10" onClick={() => setOpen(false)}>Home</Link>
            </li>
            <li>
              <Link href="/posts" className="block py-2 px-4 rounded hover:bg-accent/10" onClick={() => setOpen(false)}>Articles</Link>
            </li>
            <li>
              <Link href="/about" className="block py-2 px-4 rounded hover:bg-accent/10" onClick={() => setOpen(false)}>About</Link>
            </li>
            <li>
              <Link href="/contact" className="block py-2 px-4 rounded hover:bg-accent/10" onClick={() => setOpen(false)}>Contact</Link>
            </li>
            <li className="mt-2 border-t border-muted pt-2 flex flex-col gap-2">
              {session ? (
                <>
                  {user?.name && (
                    <span className="block py-2 px-4 text-primary/80">{user.name}</span>
                  )}
                  {(user?.role === "admin" || user?.role === "editor") && (
                    <a href="/dashboard" className="block py-2 px-4 rounded hover:bg-accent/10" onClick={() => setOpen(false)}>
                      Dashboard
                    </a>
                  )}
                  
                  <form action="/api/logout" method="post">
                    <button type="submit" className="bg-accent text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition shadow-md w-full mt-2">
                      Logout
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link href="/login" className="block py-2 px-4 rounded hover:bg-accent/10" onClick={() => setOpen(false)}>
                    Login
                  </Link>
                  <Link href="/signup" className="bg-accent text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition shadow-md w-full mt-2" onClick={() => setOpen(false)}>
                    Sign up
                  </Link>
                </>
              )}
            </li>
          </ul>
        </div>
      )}
    </>
  )
}
