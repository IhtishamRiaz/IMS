import React from 'react';
import ReactSelect from "react-select";
import { cn } from '../lib/utils';

const Select = ({ Controller, control, options, name, placeholder, optionsMessage, label, errors, isLoading, setTypeValue, className, ...props }) => {
   return (
      <section className={cn('w-56', className)}>
         {label &&
            <label
               htmlFor={name}
               className="block text-sm font-medium leading-6 text-gray-600"
            >
               {label}
            </label>
         }
         <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value, name, ref } }) => (
               <ReactSelect
                  id={name}
                  isSearchable
                  options={options}
                  ref={ref}
                  name={name}
                  isDisabled={isLoading}
                  placeholder={placeholder}
                  noOptionsMessage={() => optionsMessage}
                  value={options.find(c => c.value === value) || null}
                  onChange={e => {
                     onChange(e.value);
                     setTypeValue && setTypeValue(e.value);
                  }}
                  {...props}
                  // onChange={e => onChange(e.map((c) => c.value))}
                  theme={(theme) => ({
                     ...theme,
                     colors: {
                        ...theme.colors,
                        primary25: '#E9D5FF',
                        primary: '#9333EA',
                     },
                  })}
               />
            )}
         />
         {errors[name] && <p className='absolute text-sm text-red-600'>{errors[name].message}</p>}
      </section>
   )
}

export default Select