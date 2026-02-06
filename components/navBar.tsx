import { getAuthUser, getSession, logoutUser } from '@/actions/AuthActions'
import Link from 'next/link'
import NavMobileMenu from './NavMobileMenu';

const navBar = async () => {
    const session = await getSession();
    const user = await getAuthUser();
    // Mobile menu state (for demonstration, not interactive in server component)
    // In a real app, use a client component for toggling

    return (
        <nav className="sticky top-0 z-50 bg-bg/80 backdrop-blur-lg border-b border-muted">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-3 items-center h-16">
                    {/* Logo – Left */}
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-extrabold tracking-tight">
                            Next<span className="text-accent">Blog</span>
                        </Link>
                    </div>

                    {/* Menu – Center */}
                    <ul className="hidden md:flex justify-center gap-10 text-sm font-semibold">
                        {["/", "/posts", "/about", "/contact"].map((href, idx) => (
                            <li key={href} className="relative group cursor-pointer">
                                <Link href={href} className="group-hover:text-accent transition">
                                    {["Home", "Articles", "About", "Contact"][idx]}
                                </Link>
                                <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full group-hover:left-0" />
                            </li>
                        ))}
                    </ul>

                    

                    {/* Auth – Right (desktop only) */}
                    <div className="hidden md:flex items-center justify-end gap-4">
                        {session ? (
                            <>
                                {(user?.role === "admin" || user?.role === "editor") && (
                                    <a href="/dashboard" className="text-sm font-semibold hover:text-accent transition">
                                        Dashboard
                                    </a>
                                )}
                               
                                <form action={logoutUser}>
                                    <button type="submit" className="bg-accent text-white px-5 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition shadow-md">
                                        Logout
                                    </button>
                                </form>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="text-sm font-semibold hover:text-accent transition">
                                    Login
                                </Link>
                                <Link href="/signup" className="bg-accent text-white px-5 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition shadow-md">
                                    Sign up
                                </Link>
                            </>
                        )}

                    </div>
                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center justify-end">
                        <NavMobileMenu session={session} user={user} />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default navBar