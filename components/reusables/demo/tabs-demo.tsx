"use client"

import { IconCode } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconCode"
import { IconPreview } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconPreview"
import { IconPencil } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconPencil"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export function TabsDemo() {
  return (
    <Tabs defaultValue="design" className="max-w-xs">
      <TabsList className="w-full">
        <TabsTrigger value="design" layoutId="demo-tabs">
          <IconPencil data-icon="inline-start" aria-hidden />
          Design
        </TabsTrigger>
        <TabsTrigger value="code" layoutId="demo-tabs">
          <IconCode data-icon="inline-start" aria-hidden />
          Code
        </TabsTrigger>
        <TabsTrigger value="preview" layoutId="demo-tabs">
          <IconPreview data-icon="inline-start" aria-hidden />
          Preview
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
