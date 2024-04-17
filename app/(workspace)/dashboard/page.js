"use client";

import { AppBar } from "@/components/AppBar";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/Drawer";
import Button from "@/components/Button";
import { Menu } from "lucide-react";

// overflow-y-auto to <main>
export default function Dashboard() {
  return (
    <div className="grid h-screen grid-cols-1 md:grid-cols-[240px_1fr]">
      <div className="hidden md:block">
        <AppBar />
      </div>
      <main className="w-full md:border-l">
        <header className="sticky top-0 flex items-center gap-2 border-b bg-background px-4 py-3">
          <Drawer modal={false}>
            <DrawerTrigger className="block md:hidden">
              <Button variant="secondary" outline prefix={<Menu />} size="sm" />
            </DrawerTrigger>
            <DrawerContent
              side="left"
              className="w-60"
              // onInteractOutside={(e) => e.preventDefault()}
              onCloseAutoFocus={(e) => e.preventDefault()}
            >
              <AppBar />
            </DrawerContent>
          </Drawer>
          heading
        </header>

        <div className="space-y-4 p-4">
          {Array.from({ length: 100 }).map((_, i) => (
            <p key={i}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Assumenda dolorum fugiat fugit ipsam provident qui recusandae
              tempora tenetur. Ab consectetur et exercitationem facilis ipsa
              labore, ullam. Architecto commodi ipsum repudiandae.
            </p>
          ))}

          <div className="rounded-lg bg-orange-700 p-4 text-orange-200">
            Test
          </div>
        </div>
      </main>
    </div>
  );
}
