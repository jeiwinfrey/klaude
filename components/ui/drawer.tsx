"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

/**
 * We disable Vaul's `shouldScaleBackground` and implement the background
 * effect ourselves so we can control the border-radius (24px vs Vaul's 8px).
 *
 * The wrapper gets:
 * - scale: 1 → 0.96
 * - translateY: 0 → 14px
 * - borderRadius: 0 → 24px
 *
 * All three are driven by the same progress value (0 = closed, 1 = open).
 * During open/close: CSS transition handles it.
 * During drag: set directly per-frame via onDrag (transition: none).
 * After release: CSS transition takes over again.
 */

const SCALE = 0.98
const TRANSLATE_Y = 14
const DURATION = "0.5s"
const EASING = "cubic-bezier(0.32, 0.72, 0, 1)"

function getWrapper() {
  return document.querySelector<HTMLElement>(
    "[vaul-drawer-wrapper], [data-vaul-drawer-wrapper]"
  )
}

/** Read --radius from CSS and compute --radius-3xl in px */
function getRadius() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--radius")
    .trim()
  const rem = parseFloat(raw) || 0.75
  return rem * 2.2 * 16 // --radius-3xl = --radius * 2.2, rem → px
}

function applyProgress(el: HTMLElement, progress: number, animate: boolean) {
  const radius = getRadius()
  const s = 1 - progress * (1 - SCALE)
  const t = progress * TRANSLATE_Y
  const r = progress * radius

  el.style.transform = `scale(${s}) translate3d(0, ${t}px, 0)`
  el.style.transformOrigin = "top"
  el.style.borderRadius = `${r}px`
  el.style.overflow = "hidden"

  if (animate) {
    el.style.transitionProperty = "transform, border-radius"
    el.style.transitionDuration = DURATION
    el.style.transitionTimingFunction = EASING
  } else {
    el.style.transition = "none"
  }
}

function clearStyles(el: HTMLElement) {
  el.style.transform = ""
  el.style.transformOrigin = ""
  el.style.borderRadius = ""
  el.style.overflow = ""
  el.style.transition = ""
  el.style.transitionProperty = ""
  el.style.transitionDuration = ""
  el.style.transitionTimingFunction = ""
}

function Drawer({
  onOpenChange,
  onDrag,
  onRelease,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  const isOpen = React.useRef(false)

  const handleOpenChange = React.useCallback(
    (open: boolean) => {
      const el = getWrapper()
      isOpen.current = open

      if (el) {
        if (open) {
          applyProgress(el, 1, true)
        } else {
          applyProgress(el, 0, true)
          // Clean up after transition ends
          const cleanup = () => {
            if (!isOpen.current) {
              clearStyles(el)
            }
            el.removeEventListener("transitionend", cleanup)
          }
          el.addEventListener("transitionend", cleanup)
        }
      }

      onOpenChange?.(open)
    },
    [onOpenChange]
  )

  const handleDrag = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>, percentageDragged: number) => {
      const el = getWrapper()
      if (el) {
        // percentageDragged: 0 = fully open, 1 = dragged to close threshold
        const progress = Math.max(0, Math.min(1, 1 - percentageDragged))
        applyProgress(el, progress, false)
      }
      onDrag?.(e, percentageDragged)
    },
    [onDrag]
  )

  const handleRelease = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>, open: boolean) => {
      const el = getWrapper()
      if (el) {
        // Animate to final state after release
        applyProgress(el, open ? 1 : 0, true)
        if (!open) {
          const cleanup = () => {
            if (!isOpen.current) {
              clearStyles(el)
            }
            el.removeEventListener("transitionend", cleanup)
          }
          el.addEventListener("transitionend", cleanup)
        }
      }
      onRelease?.(e, open)
    },
    [onRelease]
  )

  return (
    <DrawerPrimitive.Root
      data-slot="drawer"
      onOpenChange={handleOpenChange}
      onDrag={handleDrag}
      onRelease={handleRelease}
      {...props}
    />
  )
}

function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({
  className,
  style,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn("fixed inset-0 z-50", className)}
      style={{
        backgroundColor: "var(--drawer-overlay-bg, rgba(0,0,0,0.3))",
        backdropFilter: "var(--drawer-overlay-blur, blur(0px))",
        WebkitBackdropFilter: "var(--drawer-overlay-blur, blur(0px))",
        ...style,
      }}
      {...props}
    />
  )
}

function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "group/drawer-content fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto max-h-[85dvh] flex-col rounded-t-3xl bg-popover pb-[env(safe-area-inset-bottom)] text-sm shadow-xl outline-none",
          className
        )}
        {...props}
      >
        <div className="mx-auto mt-2.5 mb-1 h-1 w-10 shrink-0 rounded-full bg-muted-foreground/30" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex flex-col gap-0.5 px-5 pt-2 pb-1 text-center md:text-left",
        className
      )}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 px-5 pt-2 pb-5", className)}
      {...props}
    />
  )
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn(
        "font-heading text-base font-semibold text-foreground",
        className
      )}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
