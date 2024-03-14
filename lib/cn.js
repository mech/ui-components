// https://github.com/shadcn-ui/ui/blob/main/apps/www/lib/utils.ts
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...args) {
  return twMerge(clsx(args));
}

export default cn;
