"use client"

import * as React from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

const rowVariants = {
  idle: {
    backgroundColor: "rgba(0,0,0,0)",
  },
  hover: {
    backgroundColor: "color-mix(in srgb, var(--color-muted) 70%, transparent)",
  },
}

const cellVariants = {
  idle: { y: 0 },
  hover: { y: -1 },
}

const rowSpring = {
  type: "spring" as const,
  stiffness: 500,
  damping: 40,
  mass: 0.5,
}

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-hidden rounded-2xl bg-muted p-1"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn(
        "rounded-xl bg-card [&_tr:first-child_td:first-child]:rounded-tl-xl [&_tr:first-child_td:last-child]:rounded-tr-xl [&_tr:last-child_td:first-child]:rounded-bl-xl [&_tr:last-child_td:last-child]:rounded-br-xl",
        className
      )}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({
  className,
  ...props
}: Omit<React.ComponentProps<typeof motion.tr>, "ref"> & { ref?: React.Ref<HTMLTableRowElement> }) {
  return (
    <motion.tr
      data-slot="table-row"
      initial="idle"
      whileHover="hover"
      animate="idle"
      variants={rowVariants}
      transition={rowSpring}
      className={cn(
        "group/row [&:not(:last-child)_td]:border-b",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-10 px-4 text-left align-middle text-sm font-medium whitespace-nowrap text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, children, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "px-4 py-3 align-middle whitespace-nowrap text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    >
      <motion.div
        variants={cellVariants}
        transition={rowSpring}
      >
        {children}
      </motion.div>
    </td>
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
