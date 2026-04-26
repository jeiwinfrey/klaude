"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

// ── Background scale effect ─────────────────────────────────────────
// Matches Vaul's own transition curve and duration.
// We handle it ourselves so we can use clip-path (viewport-aware
// rounded corners) instead of border-radius (page-top corners).

const SCALE = 0.98
const TRANSLATE_Y = 14
const DURATION_S = 0.5
const EASING = "cubic-bezier(0.32, 0.72, 0, 1)"

function getWrapper() {
  return document.querySelector<HTMLElement>(
    "[vaul-drawer-wrapper], [data-vaul-drawer-wrapper]"
  )
}

function getMaxRadius() {
  const rem =
    parseFloat(
      getComputedStyle(document.documentElement)
        .getPropertyValue("--radius")
        .trim()
    ) || 0.75
  return rem * 2.2 * 16 // --radius-3xl in px
}

function getViewportClip() {
  const scrollY = window.scrollY
  const wrapper = getWrapper()
  const bottom = wrapper
    ? Math.max(0, wrapper.scrollHeight - scrollY - window.innerHeight)
    : 0
  return { top: scrollY, bottom }
}

/** Set wrapper styles for a given progress (0 = closed, 1 = fully open). */
function setProgress(
  el: HTMLElement,
  progress: number,
  animated: boolean
) {
  const maxR = getMaxRadius()
  const s = 1 - progress * (1 - SCALE)
  const ty = progress * TRANSLATE_Y
  const r = progress * maxR
  const { top, bottom } = getViewportClip()

  el.style.transformOrigin = "top"
  el.style.overflow = "hidden"
  el.style.transform = `scale(${s}) translate3d(0, ${ty}px, 0)`
  el.style.clipPath =
    r > 0.1
      ? `inset(${top}px 0px ${bottom}px 0px round ${r}px)`
      : "none"

  if (animated) {
    el.style.transitionProperty = "transform"
    el.style.transitionDuration = `${DURATION_S}s`
    el.style.transitionTimingFunction = EASING
    animateClipRadius(el, progress === 1 ? 0 : maxR, r, top, bottom)
  } else {
    el.style.transition = "none"
  }
}

/** Animate only the clip-path radius via rAF to stay in sync with the
 *  CSS-transitioned transform (clip-path inset values stay fixed). */
function animateClipRadius(
  el: HTMLElement,
  fromR: number,
  toR: number,
  top: number,
  bottom: number
) {
  const start = performance.now()
  const ms = DURATION_S * 1000

  const tick = (now: number) => {
    const t = Math.min((now - start) / ms, 1)
    const eased = 1 - Math.pow(1 - t, 3)
    const r = fromR + (toR - fromR) * eased

    el.style.clipPath =
      r > 0.1
        ? `inset(${top}px 0px ${bottom}px 0px round ${r}px)`
        : "none"

    if (t < 1) requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)
}

function resetWrapper(el: HTMLElement) {
  ;[
    "transform",
    "transformOrigin",
    "clipPath",
    "overflow",
    "transition",
    "transitionProperty",
    "transitionDuration",
    "transitionTimingFunction",
  ].forEach((p) => el.style.setProperty(p, ""))
}

// ── Component tree ──────────────────────────────────────────────────

function Drawer({
  onOpenChange,
  onDrag,
  onRelease,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  const open = React.useRef(false)

  const handleOpenChange = React.useCallback(
    (isOpen: boolean) => {
      open.current = isOpen
      const el = getWrapper()

      if (el) {
        setProgress(el, isOpen ? 1 : 0, true)

        if (!isOpen) {
          const cleanup = () => {
            if (!open.current) resetWrapper(el)
            el.removeEventListener("transitionend", cleanup)
          }
          el.addEventListener("transitionend", cleanup)
        }
      }

      onOpenChange?.(isOpen)
    },
    [onOpenChange]
  )

  const handleDrag = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>, pct: number) => {
      const el = getWrapper()
      if (el) setProgress(el, Math.max(0, Math.min(1, 1 - pct)), false)
      onDrag?.(e, pct)
    },
    [onDrag]
  )

  const handleRelease = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>, willOpen: boolean) => {
      const el = getWrapper()

      if (el) {
        setProgress(el, willOpen ? 1 : 0, true)

        if (!willOpen) {
          const cleanup = () => {
            if (!open.current) resetWrapper(el)
            el.removeEventListener("transitionend", cleanup)
          }
          el.addEventListener("transitionend", cleanup)
        }
      }

      onRelease?.(e, willOpen)
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

function DrawerTrigger(
  props: React.ComponentProps<typeof DrawerPrimitive.Trigger>
) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal(
  props: React.ComponentProps<typeof DrawerPrimitive.Portal>
) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose(
  props: React.ComponentProps<typeof DrawerPrimitive.Close>
) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn("fixed inset-0 z-50 bg-black/30", className)}
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
    <DrawerPortal>
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
