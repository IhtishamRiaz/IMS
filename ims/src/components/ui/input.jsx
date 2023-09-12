import * as React from "react"

import { cn } from "../../lib/utils"


const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `
           file:border-0 
           file:bg-transparent 
           file:text-sm 
           file:font-medium
           form-input
           block
           w-56
           rounded-md
           border-0
           py-1.5
           text-gray-900
           shadow-sm
           ring-1
           ring-inset
           ring-gray-300
           placeholder:text-gray-400
           focus:ring-2
           focus:ring-inset
           focus:ring-brand-600
           sm:text-sm
           sm:leading-6
           disabled:cursor-not-allowed 
           disabled:opacity-50 
           dark:border-gray-800 
           dark:bg-gray-950
           dark:ring-offset-gray-950
           dark:placeholder:text-gray-400
           dark:focus-visible:ring-gray-300
           `,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
