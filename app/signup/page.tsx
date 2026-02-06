import { registerUser } from "@/actions/AuthActions";

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-bg via-white/60 to-accent/10 px-4">
      <div className="bg-white border border-muted rounded-2xl p-8 sm:p-12 max-w-md w-full shadow-md">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-3xl font-extrabold">
            Next<span className="text-accent">Blog</span>
          </span>
          <p className="mt-2 text-primary/70 text-sm">Create a new account</p>
        </div>

        {/* Form */}
        <form action={registerUser} className="space-y-6" >
          
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              className="w-full border border-muted rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              className="w-full border border-muted rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              className="w-full border border-muted rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="********"
              className="w-full border border-muted rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-accent text-white px-4 py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6 flex items-center gap-2">
          <hr className="flex-1 border-muted" />
          <span className="text-xs text-primary/50">or</span>
          <hr className="flex-1 border-muted" />
        </div>

        {/* Social Signup */}
        <div className="mt-6 flex flex-col gap-3">
          <button className="w-full border border-muted rounded-xl px-4 py-3 text-sm font-semibold hover:bg-muted transition">
            Continue with Google
          </button>
          <button className="w-full border border-muted rounded-xl px-4 py-3 text-sm font-semibold hover:bg-muted transition">
            Continue with GitHub
          </button>
        </div>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-primary/70">
          Already have an account?{" "}
          <a href="/login" className="text-accent hover:underline">
            Login
          </a>
        </p>
      </div>
    </main>
  )
}
