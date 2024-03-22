"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/Dialog";
import Button from "@/components/Button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/AlertDialog";
import { HandPalm } from "@phosphor-icons/react/dist/ssr";
import DropdownMenuExamples from "@/examples/DropdownMenuExamples";
import PopoverExamples from "@/examples/PopoverExamples";
import Select from "react-select";
import FloatingExamples from "@/examples/FloatingExamples";
import DownshiftExamples from "@/examples/DownshiftExamples";
import MultipleSelectionDownshiftExamples from "@/examples/MultipleSelectionDownshiftExamples";

const options = [
  {
    value: "chocolate",
    label: (
      <>
        Chocol<em className="bg-yellow-200">ate</em>
      </>
    ),
  },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
  { value: "mango", label: "Mango" },
  { value: "banana", label: "Banana" },
  { value: "apple", label: "Apple" },
  { value: "orange", label: "Orange" },
  { value: "grape", label: "Grape" },
  { value: "peach", label: "Peach" },
];

const DialogExamples = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button variant="secondary" outline>
            Open Dialog
          </Button>
        </DialogTrigger>
        <DialogContent preventClose>
          <DialogHeader>Profile</DialogHeader>
          <section className="space-y-4 py-2">
            <h1>testing...</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Cupiditate dolorum error facere illo incidunt iusto nulla placeat
              quis quos recusandae repellat reprehenderit similique sunt
              voluptates, voluptatibus. At exercitationem nisi ratione.
            </p>
          </section>
          <section className="space-y-4 py-4">
            <div>Please verify this is what you intended to do!</div>
            <div>
              <DropdownMenuExamples />
            </div>
            <div>
              <PopoverExamples />
            </div>
            <div>
              <Select
                options={options}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                menuPortalTarget={
                  typeof window !== "undefined" ? document.body : null
                }
              />
            </div>
            <div>
              <DownshiftExamples />
            </div>
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
          <section className="space-y-4 py-4">
            <div>Please verify this is what you intended to do!</div>
            <div>
              <DropdownMenuExamples />
            </div>
            <div>
              <PopoverExamples />
            </div>

            <Select
              options={options}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              menuPortalTarget={
                typeof window !== "undefined" ? document.body : null
              }
            />

            <FloatingExamples />
            <DownshiftExamples />
            <MultipleSelectionDownshiftExamples />
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
    </>
  );
};

export default DialogExamples;
