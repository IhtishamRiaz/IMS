import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export const cn = (...inputs) => {
   return twMerge(clsx(inputs));
};

const capitalizeEachFirstWord = (str) => {

   const arr = str.split(" ");

   for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
   }

   const str2 = arr.join(" ");
   return str2;
}
const capitalizeFirstWord = (str) => {
   return str.charAt(0).toUpperCase() + str.slice(1);
}

export { capitalizeEachFirstWord, capitalizeFirstWord }