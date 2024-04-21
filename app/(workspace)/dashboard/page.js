"use client";

import { AppBar } from "@/components/AppBar";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/Drawer";
import Button from "@/components/Button";
import { Menu } from "lucide-react";
import TableTest from "@/app/(workspace)/dashboard/TableTest";

// overflow-y-auto to <main>
export default function Dashboard() {
  // if only using fragment will result in:
  // Skipping auto-scroll behavior due to `position: sticky` or `position: fixed` on element:
  return (
    <div>
      <header className="sticky top-0 z-50 flex items-center gap-2 border-b bg-background/95 px-4 py-3 backdrop-blur-sm">
        <Drawer modal={false}>
          <DrawerTrigger className="block md:hidden">
            <Button variant="secondary" outline prefix={<Menu />} size="sm" />
          </DrawerTrigger>
          <DrawerContent
            side="left"
            className="block w-60 md:hidden"
            // onInteractOutside={(e) => e.preventDefault()}
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <AppBar />
          </DrawerContent>
        </Drawer>
        heading
      </header>

      <div className="space-y-4 p-4">
        <TableTest />
      </div>
    </div>
  );
}
