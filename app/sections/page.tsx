import type { Metadata } from "next"

import Hero from "@/components/hero"

export const metadata: Metadata = {
  title: "Sections",
  description:
    "Page sections for heroes, features, and landings, with motion out of the box, fewer one-off builds.",
}

export default function SectionsPage() {
  return (
    <Hero
      headline="Sections that ship."
      subheadline="Heroes, features, and footers, ready to go live."
    />
  )
}
