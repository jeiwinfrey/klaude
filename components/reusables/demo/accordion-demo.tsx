"use client"

import {
  Accordion,
  AccordionContent,
  AccordionGroup,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionDemo() {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="item-1"
      className="max-w-sm"
    >
      <AccordionGroup items={["item-1", "item-2", "item-3"]}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Native-feeling motion</AccordionTrigger>
          <AccordionContent>
            Smooth expand and collapse for compact settings or FAQ groups.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Rounded surfaces</AccordionTrigger>
          <AccordionContent>
            Built to sit cleanly inside soft, card-like iOS-inspired layouts.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Simple composition</AccordionTrigger>
          <AccordionContent>
            Trigger and content stay minimal, so the component is easy to drop in.
          </AccordionContent>
        </AccordionItem>
      </AccordionGroup>
    </Accordion>
  )
}
