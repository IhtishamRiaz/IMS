import React, { useState } from 'react'
import { ChevronFirst, MoreVertical, LifeBuoy, Receipt, Boxes, ShoppingCart, UserCircle, BarChart3, LayoutDashboard, Settings, ChevronLast } from 'lucide-react'
import { cn } from '../lib/utils'
import { Link, useLocation } from 'react-router-dom';
import useLogout from '../hooks/useLogout'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
   DropdownMenuItem
} from "./ui/dropdown-menu"

const SideNav = () => {
   const [expanded, setExpanded] = useState(true);

   const logout = useLogout();

   const items = [
      { text: 'Dashboard', icon: LayoutDashboard, href: '/app/dashboard' },
      { text: 'Statistics', icon: BarChart3 },
      { text: 'Accounts', icon: UserCircle, href: '/app/accounts' },
      { text: 'Products', icon: Boxes, href: '/app/products' },
      { text: 'Purchase', icon: ShoppingCart, href: '/app/purchase' },
      { text: 'Sale', icon: Receipt, href: '/app/sale' },
      { text: 'Settings', icon: Settings },
      { text: 'Help', icon: LifeBuoy },
   ]

   return (
      <aside className='sticky top-0 h-screen'>
         <nav className='flex flex-col h-full bg-white border-r shadow-sm'>
            {/* Logo */}
            <div className='flex items-center justify-between p-4 pb-2'>
               <img
                  src="https://img.logoipsum.com/262.svg"
                  alt=""
                  className={cn(`overflow-hidden transition-all`, expanded ? 'w-32' : 'w-0')}
               />
               <button
                  className='p-1.5 rounded-lg bg-brand-50 hover:bg-brand-100'
                  onClick={() => setExpanded(curr => !curr)}
               >
                  {expanded ? <ChevronFirst /> : <ChevronLast />}
               </button>
            </div>
            {/* Ul */}
            <ul className='flex-1 px-3 mt-5'>
               {items.map(({ text, icon, href }, index) => {
                  return (
                     <React.Fragment key={text}>
                        {(index === 6) ? <hr className='my-3' /> : null}
                        <SidebarItem text={text} icon={icon} expanded={expanded} href={href} />
                     </React.Fragment>
                  );
               })}
            </ul>
            {/* User Avatar */}
            <div className='flex p-3 border-t'>
               <img
                  src="https://ui-avatars.com/api/?background=D8B4FE&color=6B21A8&bold=true"
                  alt=""
                  className='w-10 h-10 rounded-md'
               />
               <div className={cn(`flex justify-between overflow-hidden transition-all items-center`, expanded ? 'w-52 ml-3' : 'w-0')}>
                  <div className='leading-4'>
                     <h4 className='font-bold'>John Doe</h4>
                     <span className='text-sm text-gray-600'>johndow@gmail.com</span>
                  </div>
                  {/* DropDownMenu */}
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <MoreVertical size={20} className='cursor-pointer' />
                     </DropdownMenuTrigger>
                     <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Settings</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                           Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={logout}>
                           Logout
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               </div>
            </div>
         </nav>
      </aside>
   )
}

export const SidebarItem = ({ icon: Icon, text, expanded, href }) => {

   const location = useLocation();
   const path = location.pathname;
   const isActive = path === href;

   return (
      <Link to={href}>
         <li
            className={
               cn(`group relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer`,
                  isActive ? 'bg-brand-800 text-white'
                     : 'hover:bg-brand-100 text-gray-600'
               )}
         >
            {<Icon size={20} />}
            <span className={cn(`overflow-hidden transition-all`, expanded ? 'w-52 ml-3' : 'w-0')}>
               {text}
            </span>
            {/* Tooltip */}
            {!expanded &&
               <div
                  className='absolute z-50 invisible px-2 py-1 ml-6 text-sm transition-all -translate-x-3 rounded-md w-max left-full bg-brand-100 text-brand-800 opacity-20 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0'
               >
                  {text}
               </div>
            }
         </li>
      </Link>
   );
};

export default SideNav;