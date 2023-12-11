import React from 'react'
import ReactSelect from "react-select";
import { cn } from '../lib/utils';

const SimpleSelect = ({ name, isLoading = false, placeholder, optionsMessage, label, value, options, className, errors = {}, ...props }) => {
   return (
      <>
         <section className={cn('w-56', className)}>
            {label &&
               <label
                  htmlFor={name}
                  className="block text-sm font-medium leading-6 text-gray-600"
               >
                  {label}
               </label>
            }
            <ReactSelect
               id={name}
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
            {errors[name] && <p className='absolute text-sm text-red-600'>{errors[name].message}</p>}
         </section>
      </>
   )
}

export default SimpleSelect