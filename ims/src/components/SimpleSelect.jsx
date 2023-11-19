import React from 'react'
import ReactSelect from "react-select";
import { cn } from '../lib/utils';

const SimpleSelect = ({ id, isLoading = false, placeholder, optionsMessage, label, value, options, className, ...props }) => {
   return (
      <>
         <section className={cn('w-56', className)}>
            {label &&
               <label
                  htmlFor={id}
                  className="block text-sm font-medium leading-6 text-gray-600"
               >
                  {label}
               </label>
            }
            <ReactSelect
               id={id}
               isSearchable
               options={options}
               isDisabled={isLoading}
               placeholder={placeholder}
               noOptionsMessage={() => optionsMessage}
               value={options.find(c => c.value === value) || null}
               {...props}
               theme={(theme) => ({
                  ...theme,
                  colors: {
                     ...theme.colors,
                     primary25: '#E9D5FF',
                     primary: '#9333EA',
                  },
               })}
            />
         </section>
      </>
   )
}

export default SimpleSelect