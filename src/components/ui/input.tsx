import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'rounded-[6px] border border-[#99A1AF66] py-2.5 px-3 text-[#36415380] font-medium text-[16px] focus:border-[#16A34A] focus:outline-none',
        className
      )}
      {...props}
    />
  )
}

export { Input }
