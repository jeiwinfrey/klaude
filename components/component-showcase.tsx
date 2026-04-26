import type { ReactNode } from "react"

import { ButtonDemo } from "@/components/reusables/demo/button-demo"
import { TabsDemo } from "@/components/reusables/demo/tabs-demo"

type ShowcaseCard = {
  id: string
  title: string
  demo: ReactNode
}

const cards: ShowcaseCard[] = [
  { id: "button", title: "Button", demo: <ButtonDemo /> },
  { id: "tabs", title: "Tabs", demo: <TabsDemo /> },
]

export function Showcase() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 md:gap-3">
        {cards.map((card) => (
          <div key={card.id} className="flex flex-col">
            <div className="flex aspect-square w-full min-w-0 items-center justify-center rounded-2xl bg-card/80 p-6 text-card-foreground">
              {card.demo}
            </div>
            <p className="mt-2 mb-4 text-left text-sm font-medium text-foreground">
              {card.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
