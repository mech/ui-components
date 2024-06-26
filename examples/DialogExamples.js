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
import { MultiSelect } from "@/components/MultiSelect";

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

const nationalities = [
  { nationality: "Singaporean" },
  { nationality: "Malaysian" },
  { nationality: "Indonesian" },
  { nationality: "Filipino" },
  { nationality: "Vietnamese" },
  { nationality: "Thai" },
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
            <div className="flex w-full justify-end gap-3">
              <Button outline variant="secondary">
                Close (if inside dialog)
              </Button>
              <Button>Update</Button>
            </div>
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
            <MultiSelect
              name="ms-1"
              label="Nationality (MS)"
              multiple={true}
              items={nationalities}
              // itemKey="nationality"
              itemName="nationality"
              disabled={false}
            />
            {/*<MultipleSelectionDownshiftExamples />*/}
          </section>

          <AlertDialogFooter>
            <AlertDialogCancel>
              <Button variant="ghost" pill>
                Dismiss
              </Button>
            </AlertDialogCancel>

            <Button type="submit" variant="secondary" outline pill>
              Apply
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DialogExamples;
