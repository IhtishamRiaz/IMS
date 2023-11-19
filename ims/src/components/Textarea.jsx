import React from 'react'
import { cn } from '../lib/utils'

const Textarea = ({ label, id, required, errors = {}, register, disabled, fullWidth, className, ...props }) => {
   return (
      <section className='relative'>
         {label &&
            <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-600">{label}</label>
         }
         <div>
            <textarea
               id={id}
               autoCapitalize={id}
               disabled={disabled}
               {...(register ? register(id, { required }) : {})}
               {...props}
               className={cn(`
                  form-input
                  block
                  w-56
                  rounded-md
                  border-0
                  py-2
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
                  sm:leading-6`,
                  errors[id] && "focus:ring-rose-500 ring-rose-500",
                  disabled && "opacity-50 cursor-default",
                  fullWidth && 'w-full',
                  className
               )}
            />
         </div>
         {errors[id] && <p className='absolute text-sm text-red-600'>{errors[id].message}</p>}
      </section >
   )
}

export default Textarea