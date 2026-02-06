import { ContactUs } from "@/actions/PostsActions";

export default function ContactPage() {
  
  const EnvelopeIcon = () => (
    <svg className="text-accent mr-3" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2}><rect x="2" y="4" width="16" height="12" rx="2"/><path d="M2 6l8 6 8-6"/></svg>
  );
  const PhoneIcon = () => (
    <svg className="text-accent mr-3" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2}><path d="M2 3v2a15 15 0 0015 15h2"/><path d="M17 17l-4-4"/></svg>
  );
  const MapIcon = () => (
    <svg className="text-accent mr-3" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2}><path d="M10 20s6-5.5 6-10A6 6 0 0010 4a6 6 0 00-6 6c0 4.5 6 10 6 10z"/><circle cx="10" cy="10" r="2"/></svg>
  );
  const SendIcon = () => (
    <svg className="inline-block" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2}><path d="M2 16l14-7-14-7v6l10 1-10 1z"/></svg>
  );

  return (
    <main className="w-full min-h-screen flex bg-gradient-to-br from-bg via-white/60 to-accent/10 text-primary">
      {/* Sidebar – Contact Info */}
      <aside className="hidden lg:flex flex-col justify-center items-start bg-white/80 border-r border-muted px-10 w-96 backdrop-blur-xl shadow-xl rounded-r-3xl">
        <h2 className="text-3xl font-extrabold mb-4 text-accent">Get in Touch</h2>
        <p className="text-primary/70 mb-8 text-lg">
          We'd love to hear from you! Reach out with questions, feedback, or just to say hello.
        </p>
        <div className="space-y-6 text-lg">
          <div className="flex items-center">
            <EnvelopeIcon />
            <span className="font-semibold">Email:</span>
            <a href="mailto:info@nextblog.com" className="ml-2 text-accent hover:underline">info@nextblog.com</a>
          </div>
          <div className="flex items-center">
            <PhoneIcon />
            <span className="font-semibold">Phone:</span>
            <span className="ml-2 text-primary/80">+1 234 567 8901</span>
          </div>
          <div className="flex items-center">
            <MapIcon />
            <span className="font-semibold">Address:</span>
            <span className="ml-2 text-primary/80">123 Main St, City, Country</span>
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <section className="flex-1 p-8 flex flex-col items-center justify-center relative">
        <h1 className="text-4xl font-extrabold mb-2 text-center text-accent drop-shadow-lg">Contact Us</h1>
        <p className="text-primary/70 mb-8 text-center max-w-md text-lg">
          Fill out the form below and our team will get back to you as soon as possible.
        </p>
        {/* Divider */}
        <div className="w-24 h-1 bg-accent/30 rounded-full mb-8 animate-pulse" />
        <div className="bg-white/80 border border-muted rounded-2xl p-8 max-w-lg w-full shadow-2xl backdrop-blur-xl animate-fade-in">
          <h2 className="text-xl font-bold mb-4 text-primary">Send a Message</h2>
          {/* Success/Error message placeholder */}
          <div className="mb-4 h-6 text-center text-accent font-semibold"></div>
          <form className="space-y-6" action={ContactUs}>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                className="w-full border border-muted rounded-lg p-3 focus:border-accent focus:ring-accent transition bg-white/70 shadow-sm"
                required
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full border border-muted rounded-lg p-3 focus:border-accent focus:ring-accent transition bg-white/70 shadow-sm"
                required
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full border border-muted rounded-lg p-3 focus:border-accent focus:ring-accent transition bg-white/70 shadow-sm"
                required
                placeholder="Type your message..."
              />
            </div>
            <button
              type="submit"
              className="bg-accent text-white rounded-lg px-6 py-3 font-bold flex items-center gap-2 hover:bg-accent/90 transition shadow-lg hover:scale-105 active:scale-95"
            >
              <SendIcon /> Send
            </button>
          </form>
        </div>
        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 rounded-full blur-2xl -z-10" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/20 rounded-full blur-xl -z-10" />
      </section>
    </main>
  )
}
