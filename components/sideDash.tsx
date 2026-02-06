"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

type AuthUser  = {
  name: string
  role: "admin" | "editor" | "user"
}


export default function sideDash({ user }: { user: AuthUser  }) {
  const pathname = usePathname() 


  // Sidebar links
  const links = [
    { href: "/dashboard", label: "Dashboard", roles: ["admin", "editor"] },
    { href: "/dashboard/posts", label: "Posts", roles: ["admin", "editor"] },
    { href: "/dashboard/categories", label: "Categories", roles: ["admin"] },
    { href: "/dashboard/users", label: "Users", roles: ["admin"] },
    { href: "/dashboard/settings", label: "Settings", roles: ["admin"] },
  ]
  
  
  return (
    <aside className="w-64 bg-white border-r border-muted hidden md:flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-muted">
        <span className="text-xl font-extrabold">
          Next<span className="text-accent">Blog</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {links
          .filter(link => link.roles.includes(user.role))
          .map((link) => {
            const isActive = pathname === link.href

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-2 rounded-xl text-sm font-semibold transition
                  ${isActive
                    ? "bg-muted text-accent"
                    : "text-primary hover:bg-muted hover:text-accent"
                  }`}
              >
                {link.label}
              </Link>
            )
        })}
      </nav>

      {/* User */}
      <div className="border-t border-muted p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted" />
          <div>
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-xs text-primary/60">{user.role}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

/* Components */

function SidebarItem({
  label,
  active = false,
}: {
  label: string
  active?: boolean
}) {
  return (
    <div
      className={`px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer transition
        ${
          active
            ? "bg-muted text-accent"
            : "hover:bg-muted hover:text-accent"
        }`}
    >
      {label}
    </div>
  )
}

