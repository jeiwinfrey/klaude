import type { FC } from "react"

import { IconAnchor } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconAnchor"
import { IconGlobe2 } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconGlobe2"
import { IconLightBulb } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconLightBulb"
import { IconLineChart1 } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconLineChart1"
import { IconLinear } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconLinear"
import { IconWind } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconWind"

import { cn } from "@/lib/utils"

const SPONSORS: readonly {
  name: string
  Icon: FC<{ className?: string; "aria-hidden"?: boolean }>
}[] = [
  { name: "Sponsor1", Icon: IconLightBulb },
  { name: "Sponsor2", Icon: IconWind },
  { name: "Sponsor3", Icon: IconGlobe2 },
  { name: "Sponsor4", Icon: IconLinear },
  { name: "Sponsor5", Icon: IconLineChart1 },
  { name: "Sponsor6", Icon: IconAnchor },
]

type SponsorsStripProps = {
  className?: string
}

export function SponsorsStrip({ className }: SponsorsStripProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-12", className)}
      role="region"
      aria-label="Sponsors and partners"
    >
      <ul className="grid w-full min-w-0 grid-cols-2 justify-items-stretch gap-x-2 gap-y-5 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-6 md:grid-cols-6 md:gap-x-3 md:gap-y-0">
        {SPONSORS.map(({ name, Icon }) => (
          <li key={name} className="flex min-w-0 justify-center md:min-h-[2.5rem] md:items-center">
            <span className="inline-flex w-full min-w-0 max-w-full items-center justify-center gap-2 text-xs font-medium tracking-tight text-foreground/75 sm:text-sm">
              <Icon className="!size-4 shrink-0 text-foreground/60" aria-hidden />
              <span className="text-center leading-tight">{name}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
