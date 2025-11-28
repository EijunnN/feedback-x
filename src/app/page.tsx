import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Check, Copy, Terminal } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Mapped strictly from your plans.ts
const PLANS_DISPLAY = [
  {
    key: "free",
    name: "Free",
    price: "$0",
    description: "For hobby projects",
    features: [
      "1 Project",
      "50 Feedbacks/month",
      "No Image Uploads",
      "Standard Branding",
    ],
  },
  {
    key: "pro",
    name: "Pro",
    price: "$9",
    description: "For growing teams",
    features: [
      "5 Projects",
      "500 Feedbacks/month",
      "Image Uploads",
      "Export Data",
      "Standard Branding",
    ],
    highlight: true,
  },
  {
    key: "max",
    name: "Max",
    price: "$29",
    description: "For scaling companies",
    features: [
      "Unlimited Projects",
      "Unlimited Feedbacks",
      "Image Uploads",
      "Export Data",
      "Remove Branding",
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500/30 selection:text-orange-200 font-sans">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto flex h-14 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-orange-500 rounded-sm" />
            <span className="font-bold tracking-tight text-lg font-mono">
              ANNYA
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-[13px] font-mono text-zinc-400 uppercase tracking-wide">
            <a href="#product" className="hover:text-white transition-colors">
              Product
            </a>
            <a
              href="#integration"
              className="hover:text-white transition-colors"
            >
              Integration
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton>
                <button className="text-[13px] font-mono text-white hover:text-zinc-300 uppercase">
                  Log In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="bg-white text-black px-4 py-1.5 text-[13px] font-mono font-bold uppercase hover:bg-zinc-200 transition-colors">
                  Contact Sales
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/projects">
                <button className="bg-orange-600 text-white px-4 py-1.5 text-[13px] font-mono font-bold uppercase hover:bg-orange-500 transition-colors">
                  Dashboard
                </button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </header>

      <main className="pt-32">
        {/* HERO SECTION */}
        <section className="container mx-auto px-6 mb-32 relative">
          <div className="flex flex-col lg:flex-row gap-16 lg:items-end">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                  System Active
                </span>
              </div>

              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-12">
                User-Native
                <br />
                Feedback Loop
              </h1>

              <div className="max-w-xl">
                <p className="font-mono text-sm text-zinc-400 mb-8 leading-relaxed">
                  The zero-friction feedback widget for modern web applications.
                  Embed a single script. Collect bugs, ideas, and screenshots
                  instantly.
                </p>

                {/* Script Tag Box */}
                <div className="border border-zinc-800 bg-[#0A0A0A] rounded-sm p-4 relative group max-w-xl">
                  <div className="absolute top-0 left-0 px-2 py-1 bg-zinc-900 border-b border-r border-zinc-800 text-[10px] font-mono text-zinc-500 uppercase">
                    index.html
                  </div>
                  <div className="mt-4 overflow-x-auto">
                    <code className="font-mono text-sm text-zinc-300 whitespace-pre">
                      <span className="text-zinc-500">&lt;</span>
                      <span className="text-orange-400">script</span>{" "}
                      <span className="text-purple-400">src</span>=
                      <span className="text-green-400">
                        "https://annya.io/widget.js"
                      </span>{" "}
                      <span className="text-purple-400">data-project</span>=
                      <span className="text-green-400">"pk_..."</span>
                      <span className="text-zinc-500">&gt;&lt;/</span>
                      <span className="text-orange-400">script</span>
                      <span className="text-zinc-500">&gt;</span>
                    </code>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Abstraction Right */}
            <div className="flex-1 lg:h-[400px] relative hidden lg:block">
              {/* Crosshairs */}
              <div className="absolute top-0 right-0 text-zinc-800">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <rect x="11" width="2" height="8" />
                  <rect x="11" y="16" width="2" height="8" />
                  <rect y="11" width="8" height="2" />
                  <rect x="16" y="11" width="8" height="2" />
                </svg>
              </div>
              <div className="absolute bottom-0 left-0 text-zinc-800">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <rect x="11" width="2" height="8" />
                  <rect x="11" y="16" width="2" height="8" />
                  <rect y="11" width="8" height="2" />
                  <rect x="16" y="11" width="8" height="2" />
                </svg>
              </div>

              <div className="absolute inset-10 border border-dashed border-zinc-800 flex items-center justify-center">
                <div className="w-48 h-48 border border-zinc-700 flex items-center justify-center bg-black relative">
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-orange-500" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-orange-500" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-orange-500" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-orange-500" />

                  <div className="text-center">
                    <div className="text-4xl font-bold font-mono tracking-tighter text-white">
                      98%
                    </div>
                    <div className="text-[10px] font-mono text-zinc-500 uppercase mt-2">
                      Feedback Capture Rate
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTEGRATION SECTION */}
        <section
          id="integration"
          className="border-t border-zinc-900 bg-[#050505] py-24"
        >
          <div className="container mx-auto px-6">
            <div className="flex items-center gap-3 mb-16">
              <div className="h-1 w-1 bg-orange-500" />
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                Deployment
              </span>
            </div>

            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-8 leading-tight">
                  Drop-in.
                  <br />
                  Zero Config.
                </h2>
                <p className="font-mono text-zinc-500 max-w-md leading-relaxed mb-12">
                  No complex SDKs to initialize. No dependencies to manage. Just
                  a standard HTML script tag that works with React, Vue, Svelte,
                  or vanilla HTML.
                </p>

                <div className="border-l-2 border-zinc-800 pl-6 space-y-6">
                  <div>
                    <div className="text-orange-500 font-mono text-xs uppercase mb-1">
                      Step 01
                    </div>
                    <div className="text-white font-medium">Create Project</div>
                  </div>
                  <div>
                    <div className="text-zinc-600 font-mono text-xs uppercase mb-1">
                      Step 02
                    </div>
                    <div className="text-zinc-400 font-medium">Copy Script</div>
                  </div>
                  <div>
                    <div className="text-zinc-600 font-mono text-xs uppercase mb-1">
                      Step 03
                    </div>
                    <div className="text-zinc-400 font-medium">
                      Receive Feedback
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-zinc-800/20 blur-lg opacity-50" />
                <div className="relative border border-zinc-800 bg-black p-6 rounded-sm">
                  <div className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-4">
                    <span className="text-xs font-mono text-zinc-500">
                      WIDGET_PREVIEW.EXE
                    </span>
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-zinc-800" />
                      <div className="w-2 h-2 rounded-full bg-zinc-800" />
                    </div>
                  </div>

                  <div className="aspect-video bg-zinc-900/30 rounded-sm relative border border-dashed border-zinc-800/50 flex items-center justify-center">
                    <div className="text-zinc-700 font-mono text-xs">
                      Your Website Content
                    </div>

                    <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white text-black px-3 py-2 rounded-full shadow-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs font-bold">Feedback</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing" className="py-32 container mx-auto px-6">
          <div className="flex items-center gap-3 mb-16">
            <div className="h-1 w-1 bg-orange-500" />
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
              Pricing Plans
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-1">
            {PLANS_DISPLAY.map((plan) => (
              <div
                key={plan.key}
                className={`
                    relative p-8 border border-zinc-800 flex flex-col min-h-[400px]
                    ${plan.highlight ? "bg-zinc-900/50" : "bg-black"}
                    hover:border-orange-500/50 transition-colors duration-300
                  `}
              >
                <div className="mb-8">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-orange-500 mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white tracking-tighter">
                      {plan.price}
                    </span>
                    <span className="text-zinc-600 font-mono text-xs">/mo</span>
                  </div>
                  <p className="text-zinc-500 text-xs mt-4 font-mono uppercase tracking-wide">
                    {plan.description}
                  </p>
                </div>

                <div className="w-full h-px bg-zinc-800 mb-8" />

                <ul className="space-y-4 mb-12 flex-1">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm font-mono text-zinc-300"
                    >
                      <div className="w-1 h-1 bg-zinc-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <SignUpButton>
                  <button className="w-full py-3 bg-zinc-900 hover:bg-orange-600 text-white border border-zinc-800 hover:border-orange-600 font-mono text-xs uppercase tracking-widest transition-all">
                    Select {plan.name}
                  </button>
                </SignUpButton>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-black border-t border-zinc-900 py-12 text-zinc-600 font-mono text-xs">
          <div className="container mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-zinc-800" />
              <span className="text-zinc-400">ANNYA SYSTEM</span>
            </div>
            <div>© 2024</div>
          </div>
        </footer>
      </main>
    </div>
  );
}
