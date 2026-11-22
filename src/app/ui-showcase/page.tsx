import type { Metadata } from "next";

import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";

export const metadata: Metadata = {
  title: "UI Showcase",
  description: "MentorLagbe reusable UI component showcase.",
};

export default function UIShowcasePage() {
  return (
    <main className="min-h-screen bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-10">
        {/* Page Header */}
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            MentorLagbe Design System
          </p>

          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            UI Component Showcase
          </h1>

          <p className="max-w-2xl text-sm leading-6 text-muted sm:text-base">
            A central place to preview and maintain reusable
            interface components used throughout MentorLagbe.
          </p>
        </header>

        {/* Buttons */}
        <section className="space-y-4">
          <SectionHeading
            title="Buttons"
            description="Different button variants and sizes."
          />

          <Card>
            <CardContent className="flex flex-wrap items-center gap-3 pt-5">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-wrap items-center gap-3 pt-5">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button isLoading>Loading</Button>
              <Button disabled>Disabled</Button>
            </CardContent>
          </Card>
        </section>

        {/* Inputs */}
        <section className="space-y-4">
          <SectionHeading
            title="Form Inputs"
            description="Standard input, helper text and validation error."
          />

          <Card>
            <CardContent className="grid gap-6 pt-5 md:grid-cols-2">
              <Input
                label="Full Name"
                name="fullName"
                placeholder="Enter your full name"
              />

              <Input
                label="Email Address"
                name="email"
                type="email"
                placeholder="you@example.com"
                helperText="We will use this email for account communication."
              />

              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
              />

              <Input
                label="Phone Number"
                name="phone"
                placeholder="01XXXXXXXXX"
                error="Please enter a valid phone number."
              />
            </CardContent>
          </Card>
        </section>

        {/* Badges */}
        <section className="space-y-4">
          <SectionHeading
            title="Badges"
            description="Status and category indicators."
          />

          <Card>
            <CardContent className="flex flex-wrap items-center gap-3 pt-5">
              <Badge>Default</Badge>
              <Badge variant="success">Approved</Badge>
              <Badge variant="warning">Pending</Badge>
              <Badge variant="danger">Rejected</Badge>
              <Badge variant="info">Student</Badge>
            </CardContent>
          </Card>
        </section>

        {/* Cards */}
        <section className="space-y-4">
          <SectionHeading
            title="Cards"
            description="Reusable content containers."
          />

          <div className="grid gap-5 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <CardTitle>Student Profile</CardTitle>
                  <Badge variant="success">Active</Badge>
                </div>

                <CardDescription>
                  Example of a reusable profile card.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-sm leading-6 text-muted">
                  Students can manage their profiles, explore
                  tuition opportunities and connect with tutors.
                </p>
              </CardContent>

              <CardFooter>
                <Button size="sm">View Profile</Button>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <CardTitle>Tutor Subscription</CardTitle>
                  <Badge variant="info">Pro</Badge>
                </div>

                <CardDescription>
                  Example of a subscription summary card.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-3xl font-bold text-foreground">
                  ৳1,500
                  <span className="ml-2 text-sm font-normal text-muted">
                    / one-time
                  </span>
                </p>

                <p className="mt-2 text-sm text-muted">
                  Upgrade to enjoy unlimited tuition posts.
                </p>
              </CardContent>

              <CardFooter>
                <Button size="sm">Upgrade Plan</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Color Palette */}
        <section className="space-y-4">
          <SectionHeading
            title="Brand Colors"
            description="Core colors used throughout the application."
          />

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            <ColorSwatch
              name="Navy"
              value="#14213D"
              className="bg-brand-navy"
            />

            <ColorSwatch
              name="Teal"
              value="#0F766E"
              className="bg-brand-teal"
            />

            <ColorSwatch
              name="Amber"
              value="#F4B942"
              className="bg-brand-amber"
            />

            <ColorSwatch
              name="Background"
              value="#F7F9FC"
              className="bg-background border border-border"
              textClassName="text-foreground"
            />

            <ColorSwatch
              name="Surface"
              value="#FFFFFF"
              className="bg-surface border border-border"
              textClassName="text-foreground"
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border pt-6">
          <p className="text-center text-xs text-muted">
            MentorLagbe Design System · Development Preview
          </p>
        </footer>
      </div>
    </main>
  );
}

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-1">
      <h2 className="text-xl font-bold text-foreground">
        {title}
      </h2>

      <p className="text-sm text-muted">
        {description}
      </p>
    </div>
  );
}

function ColorSwatch({
  name,
  value,
  className,
  textClassName = "text-white",
}: {
  name: string;
  value: string;
  className: string;
  textClassName?: string;
}) {
  return (
    <div
      className={`flex min-h-28 flex-col justify-between rounded-xl p-4 ${className}`}
    >
      <span className={`text-sm font-semibold ${textClassName}`}>
        {name}
      </span>

      <span className={`text-xs ${textClassName}`}>
        {value}
      </span>
    </div>
  );
}