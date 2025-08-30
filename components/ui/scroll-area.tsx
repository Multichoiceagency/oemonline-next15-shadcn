// components/ui/scroll-area.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

type Props = React.HTMLAttributes<HTMLDivElement>

export function ScrollArea({ className, children, ...props }: Props) {
  return (
    <div
      className={cn(
        "relative overflow-auto rounded-md [scrollbar-gutter:stable]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// API-compat stub voor shadcn's ScrollBar (niet nodig voor styling hier)
export function ScrollBar() {
  return null
}
