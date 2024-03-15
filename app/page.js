import { Horse, Sun } from "@phosphor-icons/react/dist/ssr";
import ButtonExamples from "@/examples/ButtonExamples";
import DropdownMenuExamples from "@/examples/DropdownMenuExamples";
import DialogExamples from "@/examples/DialogExamples";
import AccordionExamples from "@/examples/AccordionExamples";
import Button from "@/components/Button";

import { Popover, PopoverTrigger, PopoverContent } from "@/components/Popover";

export default function Home() {
  return (
    <main className="space-y-4 p-4">
      <Horse color="purple" size="64" weight="fill" />
      <ButtonExamples />

      <div className="flex gap-4">
        <DropdownMenuExamples />
        <DialogExamples />
      </div>

      {/*<AccordionExamples />*/}

      <Popover>
        <PopoverTrigger>
          <Button
            variant="ghost"
            prefix={<Sun size={24} weight="bold" />}
          ></Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <div className="space-y-2">
            <h1 className="font-semibold">Profile</h1>
            <p>Settings</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
              consequuntur distinctio error excepturi impedit laudantium nam
              quidem quod rerum voluptatibus. Id praesentium quia quo? Eos
              itaque nulla rem sapiente voluptatibus?
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </main>
  );
}
