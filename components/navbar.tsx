"use client"

import * as React from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { IconAnimatePath } from "@central-icons-react/round-filled-radius-3-stroke-1.5"
import { IconMoon } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconMoon"
import { IconSun } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconSun"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Navbar() {
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const active = pathname.startsWith("/sections") ? "sections" : "components"
  const isDark = resolvedTheme === "dark"

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-2">
      <div className="flex items-center gap-2 text-lg font-medium tracking-tight">
        <IconAnimatePath size={18} ariaHidden />
        <span>klaude-ui</span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="secondary"
          size="icon"
          className="size-11 rounded-full bg-muted text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label={mounted && isDark ? "Switch to light mode" : "Switch to dark mode"}
          onClick={() => setTheme(isDark ? "light" : "dark")}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mounted && isDark ? (
              <motion.span
                key="sun"
                initial={{ opacity: 0, rotate: -60, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 60, scale: 0.7 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="flex items-center justify-center"
              >
                <IconSun aria-hidden />
              </motion.span>
            ) : (
              <motion.span
                key="moon"
                initial={{ opacity: 0, rotate: 60, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -60, scale: 0.7 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="flex items-center justify-center"
              >
                <IconMoon aria-hidden />
              </motion.span>
            )}
          </AnimatePresence>
        </Button>

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
      </div>
    </nav>
  )
}
