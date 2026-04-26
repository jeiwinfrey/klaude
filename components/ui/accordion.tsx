"use client"

import * as React from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"
import { LayoutGroup, motion, useReducedMotion } from "motion/react"
import { IconChevronDownSmall } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconChevronDownSmall"

import { cn } from "@/lib/utils"

// Apple-style: fast, critically damped, no bounce
const spring = {
  type: "spring" as const,
  stiffness: 500,
  damping: 40,
  mass: 0.5,
}

const AccordionValueContext = React.createContext<string>("")
const AccordionItemValueContext = React.createContext<string>("")

function Accordion({
  className,
  value,
  defaultValue,
  onValueChange,
  type = "single",
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  const [internal, setInternal] = React.useState(
    (value ?? defaultValue ?? "") as string
  )
  const current = (value ?? internal) as string

  const handleChange = React.useCallback(
    (v: string) => {
      setInternal(v)
      ;(onValueChange as ((v: string) => void) | undefined)?.(v)
    },
    [onValueChange]
  )

  return (
    <AccordionValueContext.Provider value={current}>
      <LayoutGroup>
        <AccordionPrimitive.Root
          data-slot="accordion"
          type={type as "single"}
          value={current}
          onValueChange={handleChange}
          className={cn("flex w-full flex-col gap-1.5", className)}
          {...props}
        />
      </LayoutGroup>
    </AccordionValueContext.Provider>
  )
}

function AccordionGroup({
  items,
  children,
  className,
}: {
  items: string[]
  children: React.ReactNode
  className?: string
}) {
  const openValue = React.useContext(AccordionValueContext)
  const childArray = React.Children.toArray(children)

  return (
    <div className={cn("flex flex-col", className)}>
      {items.map((item, i) => {
        const isOpen = item === openValue
        const prevClosed = i > 0 && items[i - 1] !== openValue
        const nextClosed = i < items.length - 1 && items[i + 1] !== openValue

        return (
          <motion.div
            key={item}
            layout
            transition={spring}
            animate={{
              marginTop: isOpen ? 6 : 0,
              marginBottom: isOpen ? 6 : 0,
            }}
            className={cn(
              "overflow-hidden bg-muted",
              isOpen && "rounded-2xl",
              !isOpen && !prevClosed && !nextClosed && "rounded-2xl",
              !isOpen && !prevClosed && nextClosed && "rounded-t-2xl",
              !isOpen && prevClosed && !nextClosed && "rounded-b-2xl",
              !isOpen && prevClosed && nextClosed && "rounded-none"
            )}
          >
            <motion.div layout="position" transition={spring}>
              {childArray[i]}
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}

function AccordionItem({
  value,
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionItemValueContext.Provider value={value}>
      <AccordionPrimitive.Item
        data-slot="accordion-item"
        value={value}
        className={cn("text-card-foreground", className)}
        {...props}
      />
    </AccordionItemValueContext.Provider>
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  const reduceMotion = useReducedMotion()
  const openValue = React.useContext(AccordionValueContext)
  const itemValue = React.useContext(AccordionItemValueContext)
  const isOpen = openValue === itemValue

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/trigger flex flex-1 items-center justify-between gap-4 rounded-2xl px-4 py-3.5 text-left text-sm font-medium outline-none select-none disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        <motion.div
          whileTap={{ scale: reduceMotion ? 1 : 0.985 }}
          transition={spring}
          className="flex w-full items-center justify-between gap-4"
        >
          <motion.span layout="position" transition={spring} className="min-w-0">
            {children}
          </motion.span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={spring}
            className="flex shrink-0 items-center justify-center text-muted-foreground"
          >
            <IconChevronDownSmall className="size-4" aria-hidden />
          </motion.div>
        </motion.div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  const reduceMotion = useReducedMotion()
  const openValue = React.useContext(AccordionValueContext)
  const itemValue = React.useContext(AccordionItemValueContext)
  const isOpen = openValue === itemValue

  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      forceMount
      className="overflow-hidden"
      {...props}
    >
      <motion.div
        initial={false}
        animate={
          isOpen
            ? { height: "auto", opacity: 1 }
            : { height: 0, opacity: reduceMotion ? 1 : 0 }
        }
        transition={{
          ...spring,
          opacity: isOpen
            ? { duration: reduceMotion ? 0 : 0.15, ease: [0.25, 0.1, 0.25, 1] }
            : { duration: reduceMotion ? 0 : 0.08, ease: [0.25, 0.1, 0.25, 1] },
        }}
        style={{ overflow: "hidden" }}
      >
        <motion.div
          layout="position"
          transition={spring}
          className={cn(
            "px-4 pt-0 pb-4 text-sm text-muted-foreground",
            className
          )}
        >
          {children}
        </motion.div>
      </motion.div>
    </AccordionPrimitive.Content>
  )
}

export {
  Accordion,
  AccordionGroup,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
}
