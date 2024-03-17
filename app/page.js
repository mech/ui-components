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
import { Switch } from "@/components/Switch";
import { Checkbox } from "@/components/Checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/RadioGroup";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/InputOTP";

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

      <div className="flex flex-wrap items-center gap-4">
        <Input
          // size="sm"
          label="Email"
          // prefix="https://"
          // suffix={<Sun size="24" weight="bold" />}
          // errorMessage="Gosh!! What is happening!?"
          // helpText="Just try to enter whatever you want"
        />

        <Button>Submit</Button>

        <Switch />
        <Checkbox checked="indeterminate" />
        <Checkbox />

        <RadioGroup>
          <RadioGroupItem value="1">One</RadioGroupItem>
          <RadioGroupItem value="2">Two</RadioGroupItem>
          <RadioGroupItem value="3">Three</RadioGroupItem>
        </RadioGroup>
      </div>

      <InputOTP
        maxLength={6}
        render={({ slots }) => (
          <>
            <InputOTPGroup>
              {slots.slice(0, 3).map((slot, index) => (
                <InputOTPSlot key={index} {...slot} />
              ))}
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              {slots.slice(3).map((slot, index) => (
                <InputOTPSlot key={index} {...slot} />
              ))}
            </InputOTPGroup>
          </>
        )}
      />
    </main>
  );
}
