"use client";

import { Horse } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/Button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/Dialog";

import ButtonExamples from "@/examples/ButtonExamples";
import DropdownMenuExamples from "@/examples/DropdownMenuExamples";

export default function Home() {
  return (
    <main className="space-y-4 p-4">
      <Horse color="purple" size="64" weight="fill" />
      {/*<ButtonExamples />*/}

      <div className="flex gap-4">
        <DropdownMenuExamples />

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" outline>
              Open Dialog
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>Profile</DialogHeader>
            <h1>testing...</h1>
            <DialogFooter>Footer</DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
