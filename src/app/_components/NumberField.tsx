'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function NumberField() {
    const [value, setValue] = useState(1)

    return (
        <div className="flex items-center gap-2">
            <Button
                className="border-none rounded-none cursor-pointer rounded-l-lg w-[52px] h-[48px] text-[28px] text-[#4A5565] hover:text-[#16A34A]"
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setValue(prev => Math.max(1, prev - 1))}
            >
                -
            </Button>

            <Input
                type="number"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-16 text-center border-none text-[#364153]"
            />

            <Button
                className="border-none w-[52px] h-[48px] rounded-none cursor-pointer rounded-r-lg text-[28px] text-[#4A5565] hover:text-[#16A34A]"
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setValue(prev => prev + 1)}
            >
                +
            </Button>
        </div>
    )
}