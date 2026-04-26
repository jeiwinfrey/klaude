import type { Metadata } from "next"

import Hero from "@/components/hero"

export const metadata: Metadata = {
  title: "Components",
  description:
    "Registry components with real motion. Install and theme like the rest of your system.",
}

export default function ComponentsPage() {
  return (
    <Hero
      headline="Motion-first components."
      subheadline="Motion, depth, and conversion, one theme, every surface."
    />
  )
}
