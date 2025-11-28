import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Bug, Check, Lightbulb, MessageSquare, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <MessageSquare className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Annya</span>
          </Link>
          <nav className="flex items-center gap-4">
            <SignedOut>
              <SignInButton>
                <Button variant="ghost">Sign In</Button>
              </SignInButton>
              <SignUpButton>
                <Button>Get Started</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Button asChild>
                <Link href="/projects">Dashboard</Link>
              </Button>
            </SignedIn>
          </nav>
        </div>
      </header>

      <main>
        <section className="container mx-auto px-4 py-24 text-center">
          <h1 className="mx-auto max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl">
            Collect user feedback{" "}
            <span className="text-primary">effortlessly</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Add a simple widget to your website and start collecting bug
            reports, feature requests, and general feedback from your users in
            minutes.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <SignedOut>
              <SignUpButton>
                <Button size="lg">Start for Free</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Button size="lg" asChild>
                <Link href="/projects">Go to Dashboard</Link>
              </Button>
            </SignedIn>
            <Button size="lg" variant="outline" asChild>
              <a href="#pricing">View Pricing</a>
            </Button>
          </div>
        </section>

        <section className="border-t bg-muted/30 py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-3xl font-bold">How it works</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
              Get started in three simple steps
            </p>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  1
                </div>
                <h3 className="mt-4 text-xl font-semibold">Create a project</h3>
                <p className="mt-2 text-muted-foreground">
                  Sign up and create a new project for your website or app.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  2
                </div>
                <h3 className="mt-4 text-xl font-semibold">Add the widget</h3>
                <p className="mt-2 text-muted-foreground">
                  Copy and paste a single line of code into your website.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  3
                </div>
                <h3 className="mt-4 text-xl font-semibold">Collect feedback</h3>
                <p className="mt-2 text-muted-foreground">
                  Your users can now submit feedback directly from your site.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-3xl font-bold">Features</h2>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              <div className="rounded-lg border p-6">
                <Bug className="h-10 w-10 text-red-500" />
                <h3 className="mt-4 text-xl font-semibold">Bug Reports</h3>
                <p className="mt-2 text-muted-foreground">
                  Users can report bugs with optional screenshots for context.
                </p>
              </div>
              <div className="rounded-lg border p-6">
                <Lightbulb className="h-10 w-10 text-yellow-500" />
                <h3 className="mt-4 text-xl font-semibold">Feature Requests</h3>
                <p className="mt-2 text-muted-foreground">
                  Collect ideas and suggestions to improve your product.
                </p>
              </div>
              <div className="rounded-lg border p-6">
                <Zap className="h-10 w-10 text-primary" />
                <h3 className="mt-4 text-xl font-semibold">Easy Integration</h3>
                <p className="mt-2 text-muted-foreground">
                  One script tag is all you need. Works with any website.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="border-t bg-muted/30 py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-3xl font-bold">
              Simple, transparent pricing
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
              Start for free, upgrade when you need more
            </p>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              <div className="rounded-lg border bg-background p-8">
                <h3 className="text-xl font-semibold">Free</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />1 project
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    50 feedbacks/month
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <Check className="h-4 w-4" />
                    No screenshots
                  </li>
                </ul>
                <SignUpButton>
                  <Button className="mt-8 w-full" variant="outline">
                    Get Started
                  </Button>
                </SignUpButton>
              </div>
              <div className="rounded-lg border-2 border-primary bg-background p-8">
                <h3 className="text-xl font-semibold">Pro</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$9</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />5 projects
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    500 feedbacks/month
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    Screenshot support
                  </li>
                </ul>
                <SignUpButton>
                  <Button className="mt-8 w-full">Upgrade to Pro</Button>
                </SignUpButton>
              </div>
              <div className="rounded-lg border bg-background p-8">
                <h3 className="text-xl font-semibold">Max</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    Unlimited projects
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    Unlimited feedbacks
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    Screenshot support
                  </li>
                </ul>
                <SignUpButton>
                  <Button className="mt-8 w-full" variant="outline">
                    Upgrade to Max
                  </Button>
                </SignUpButton>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Annya Feedback. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
