"use client";

import { Horse, HandPalm } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/Button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/Dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/AlertDialog";

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
          <DialogTrigger>
            <Button variant="secondary" outline>
              Open Dialog
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>Profile</DialogHeader>
            <section className="space-y-4 py-2">
              <h1>testing...</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Cupiditate dolorum error facere illo incidunt iusto nulla
                placeat quis quos recusandae repellat reprehenderit similique
                sunt voluptates, voluptatibus. At exercitationem nisi ratione.
              </p>
            </section>
            <DialogFooter>
              <Button>Update</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant="secondary" outline>
              Open Alert Dialog
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle className="flex items-center gap-1">
              <HandPalm color="red" size="32" weight="fill" />
              Stop!
            </AlertDialogTitle>
            <section className="space-y-4 py-2">
              Please verify this is what you intended to do!
            </section>
            <AlertDialogFooter className="justify-center">
              <AlertDialogCancel>
                <Button variant="secondary" outline pill>
                  Close
                </Button>
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </main>
  );
}
