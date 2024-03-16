"use client";

import { Horse, Sun } from "@phosphor-icons/react/dist/ssr";
import ButtonExamples from "@/examples/ButtonExamples";
import DropdownMenuExamples from "@/examples/DropdownMenuExamples";
import DialogExamples from "@/examples/DialogExamples";
import AccordionExamples from "@/examples/AccordionExamples";
import PopoverExamples from "@/examples/PopoverExamples";
import Button from "@/components/Button";
import LoremIpsum from "@/components/LoremIpsum";
import Input from "@/components/Input";

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
} from "@/components/Drawer";

export default function Home() {
  return (
    <main className="space-y-4 p-4">
      <Horse color="purple" size="64" weight="fill" />
      {/*<ButtonExamples />*/}

      {/*<div className="flex gap-4">*/}
      {/*  <DropdownMenuExamples />*/}
      {/*  <DialogExamples />*/}
      {/*</div>*/}

      {/*<AccordionExamples />*/}
      {/*<PopoverExamples />*/}

      <Drawer modal={false}>
        <DrawerTrigger>
          <Button variant="secondary">Inspector</Button>
        </DrawerTrigger>
        <DrawerContent
          side="right"
          className="w-1/2"
          onInteractOutside={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <div className="flex items-center justify-between p-4">
            <strong>Some inspecting to do</strong>
            <DrawerClose asChild>
              <Button variant="secondary">Close</Button>
            </DrawerClose>
          </div>

          <section className="space-y-4 p-4">
            <LoremIpsum p={10} />
          </section>
        </DrawerContent>
      </Drawer>

      <div className="flex flex-wrap items-start gap-4">
        <Input
          // size="sm"
          label="Email"
          // prefix="https://"
          // suffix={<Sun size="24" weight="bold" />}
          // errorMessage="Gosh!! What is happening!?"
          // helpText="Just try to enter whatever you want"
        />

        <Button>Submit</Button>
      </div>
    </main>
  );
}
