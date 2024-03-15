import { Horse } from "@phosphor-icons/react/dist/ssr";
import ButtonExamples from "@/examples/ButtonExamples";
import DropdownMenuExamples from "@/examples/DropdownMenuExamples";
import DialogExamples from "@/examples/DialogExamples";
import AccordionExamples from "@/examples/AccordionExamples";

export default function Home() {
  return (
    <main className="space-y-4 p-4">
      <Horse color="purple" size="64" weight="fill" />
      {/*<ButtonExamples />*/}

      <div className="flex gap-4">
        <DropdownMenuExamples />
        <DialogExamples />
      </div>

      <AccordionExamples />
    </main>
  );
}
