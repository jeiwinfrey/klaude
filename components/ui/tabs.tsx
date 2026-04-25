"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Tabs as TabsPrimitive } from "radix-ui"
import { LayoutGroup, motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

/* ── active-value context ── */
const TabsValueContext = React.createContext<string | undefined>(undefined)

function Tabs({
  className,
  orientation = "horizontal",
  value,
  defaultValue,
  onValueChange,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  const [internalValue, setInternalValue] = React.useState(
    value ?? defaultValue ?? ""
  )

  const current = value ?? internalValue

  const handleChange = React.useCallback(
    (v: string) => {
      setInternalValue(v)
      onValueChange?.(v)
    },
    [onValueChange]
  )

  return (
    <TabsValueContext.Provider value={current}>
      <TabsPrimitive.Root
        data-slot="tabs"
        data-orientation={orientation}
        value={current}
        onValueChange={handleChange}
        className={cn(
          "group/tabs flex gap-2 data-horizontal:flex-col",
          className
        )}
        {...props}
      />
    </TabsValueContext.Provider>
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center gap-1 rounded-full text-muted-foreground group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col group-data-vertical/tabs:rounded-2xl data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted p-1",
        line: "bg-transparent p-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <LayoutGroup>
      <TabsPrimitive.List
        data-slot="tabs-list"
        data-variant={variant}
        className={cn(tabsListVariants({ variant }), className)}
        {...props}
      />
    </LayoutGroup>
  )
}

/** iOS-style spring */
const iosSpring = {
  type: "spring" as const,
  stiffness: 380,
  damping: 26,
  mass: 0.8,
}

const reducedMotionLayout = {
  type: "tween" as const,
  duration: 0.15,
  ease: "easeOut" as const,
}

const tabsLabelClassName = "relative z-10 inline-flex items-center gap-1.5"

const tabsTriggerClassName =
  "relative inline-flex h-9 cursor-pointer select-none items-center justify-center gap-1.5 rounded-full px-3 text-xs font-normal whitespace-nowrap transition-colors transition-transform outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-0 active:scale-[0.96] motion-reduce:active:scale-100 disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 group-data-vertical/tabs:h-auto group-data-vertical/tabs:min-h-9 group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start group-data-vertical/tabs:rounded-2xl group-data-vertical/tabs:px-3 group-data-vertical/tabs:py-2.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5"

function TabsTrigger({
  className,
  children,
  value,
  layoutId = "tabs-pill",
  asChild,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> & {
  layoutId?: string
}) {
  const reduceMotion = useReducedMotion()
  const layoutTransition = reduceMotion ? reducedMotionLayout : iosSpring
  const activeValue = React.useContext(TabsValueContext)
  const isActive = value === activeValue

  const pill = isActive && (
    <motion.span
      layoutId={layoutId}
      className="absolute inset-0 rounded-full bg-background"
      style={{ originX: 0.5, originY: 0.5 }}
      transition={layoutTransition}
    />
  )
  const label = <span className={tabsLabelClassName}>{children}</span>

  if (asChild) {
    const child = React.Children.only(children) as React.ReactElement<{
      className?: string
      children?: React.ReactNode
    }>
    return (
      <TabsPrimitive.Trigger
        data-slot="tabs-trigger"
        value={value}
        asChild
        className={cn(
          tabsTriggerClassName,
          isActive ? "text-foreground" : "text-muted-foreground",
          className
        )}
        {...props}
      >
        {React.cloneElement(child, {
          children: (
            <>
              {pill}
              <span className={tabsLabelClassName}>{child.props.children}</span>
            </>
          ),
        })}
      </TabsPrimitive.Trigger>
    )
  }

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      value={value}
      className={cn(
        tabsTriggerClassName,
        isActive ? "text-foreground" : "text-muted-foreground",
        className
      )}
      {...props}
    >
      {pill}
      {label}
    </TabsPrimitive.Trigger>
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
