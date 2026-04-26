import { SponsorsStrip } from "@/components/sponsors-strip"
import { cn } from "@/lib/utils"

export type HeroProps = {
  headline: string
  subheadline: string
  showSponsors?: boolean
  className?: string
}

export default function Hero({
  headline,
  subheadline,
  showSponsors = true,
  className,
}: HeroProps) {
  return (
    <>
      <section
        className={cn("pt-8 pb-6 text-center md:pt-14 md:pb-10", className)}
      >
        <div className="mx-auto max-w-5xl px-6">
          <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:max-w-xl md:mx-auto md:text-3xl">
            <span className="block leading-snug">{headline}</span>
            <span className="mt-1.5 block text-muted-foreground sm:mt-2">
              {subheadline}
            </span>
          </h1>
        </div>
      </section>
      {showSponsors && <SponsorsStrip className="mt-6 md:mt-10" />}
    </>
  )
}
