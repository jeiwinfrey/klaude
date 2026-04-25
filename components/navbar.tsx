"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { IconAnimatePath } from "@central-icons-react/round-filled-radius-3-stroke-1.5"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Navbar() {
  const pathname = usePathname()
  const active = pathname.startsWith("/sections") ? "sections" : "components"

  return (
    <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-2">
      <div className="flex items-center gap-2 text-lg font-medium tracking-tight">
        <IconAnimatePath size={18} ariaHidden />
        <span>klaude-ui</span>
      </div>

      <Tabs value={active}>
        <TabsList>
          <TabsTrigger value="components" asChild>
            <Link href="/components">Components</Link>
          </TabsTrigger>
          <TabsTrigger value="sections" asChild>
            <Link href="/sections">Sections</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </nav>
  )
}
