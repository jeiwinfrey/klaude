"use client"

import { IconArrowUp } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconArrowUp"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { cn } from "@/lib/utils"

const row = cn(
  "flex w-full min-h-11 items-center justify-between gap-3",
  "border-b border-border/50 px-4 py-2.5 text-left text-[17px] leading-snug",
  "outline-none last:border-b-0 active:bg-muted/70",
  "transition-[background-color] duration-150"
)

function RowChevron() {
  return (
    <span
      className="shrink-0 text-lg leading-none text-muted-foreground/80"
      aria-hidden
    >
      ›
    </span>
  )
}

export function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="secondary"
          size="lg"
        >
          <IconArrowUp data-icon="inline-start" aria-hidden />
          Open Drawer
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="px-4 pt-0 text-center">
          <DrawerTitle className="text-balance text-xl font-bold tracking-tight">
            Move money
          </DrawerTitle>
          <DrawerDescription className="text-[15px] leading-normal">
            Between your own accounts. Most transfers post in a few minutes.
          </DrawerDescription>
        </DrawerHeader>

        <p className="px-4 pb-2 text-center text-[13px] text-muted-foreground">
          <span className="tabular-nums">$2,140.00</span> available in Cash
        </p>

        <div className="px-4 pb-3">
          <div
            className="overflow-hidden rounded-2xl bg-muted/50"
            role="list"
            aria-label="Transfer details"
          >
            <button type="button" className={row}>
              <span className="text-foreground">Amount</span>
              <span className="tabular-nums text-[17px] font-medium text-foreground">
                $250.00
              </span>
            </button>
            <button type="button" className={row}>
              <span className="min-w-0 flex-1 text-foreground">From</span>
              <span className="flex min-w-0 items-center gap-1 text-muted-foreground">
                <span className="truncate">Cash</span>
                <RowChevron />
              </span>
            </button>
            <button type="button" className={row}>
              <span className="min-w-0 flex-1 text-foreground">To</span>
              <span className="flex min-w-0 items-center gap-1 text-muted-foreground">
                <span className="truncate">Savings</span>
                <RowChevron />
              </span>
            </button>
            <button type="button" className={row}>
              <span className="text-foreground">Note</span>
              <span className="truncate text-[15px] text-muted-foreground">
                Rent split, savings…
              </span>
            </button>
          </div>
        </div>

        <DrawerFooter className="mt-2 items-stretch px-4 pt-2 pb-2 sm:px-5">
          <div className="flex w-full justify-center">
            <DrawerClose asChild>
              <Button
                variant="ghost"
                className="h-12 min-h-12 w-11/12 max-w-sm touch-manipulation rounded-2xl border-0 !bg-[#34C759]/20 px-6 text-[17px] font-semibold !text-[#34C759] shadow-none transition-[transform,background-color,opacity] duration-200 hover:!bg-[#34C759]/30 hover:!text-[#34C759] active:scale-[0.99] active:opacity-90 dark:!bg-[#30D158]/20 dark:!text-[#30D158] dark:hover:!bg-[#30D158]/30 dark:hover:!text-[#30D158] motion-reduce:active:scale-100"
              >
                Send
              </Button>
            </DrawerClose>
          </div>
          <DrawerClose asChild>
            <Button
              variant="ghost"
              className="h-11 w-full touch-manipulation rounded-xl border-0 text-[17px] font-medium text-muted-foreground transition-colors duration-200 hover:!bg-transparent hover:text-foreground active:opacity-50"
            >
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
