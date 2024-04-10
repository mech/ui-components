import Button from "@/components/Button";
import { ChevronDown, RefreshCcw, Smile } from "lucide-react";

const ButtonExamples = () => (
  <div className="flex flex-wrap items-center gap-4">
    <Button variant="primary" prefix={<Smile />} suffix={<RefreshCcw />}>
      Hello button!
    </Button>
    <Button variant="primary" outline>
      Outline
    </Button>
    <Button variant="secondary" outline suffix={<ChevronDown color="black" />}>
      Menu
    </Button>
    <Button variant="destructive" outline>
      Outline
    </Button>
    <Button variant="primary" loading prefix={<RefreshCcw />}>
      Refresh
    </Button>
    <Button variant="destructive" loading>
      Delete it!
    </Button>
    <Button disabled>Delete it!</Button>
    <Button variant="primary" size="sm">
      Hello button!
    </Button>
    <Button
      variant="primary"
      size="sm"
      pill
      prefix={<RefreshCcw size={16} strokeWidth={2.5} />}
      suffix={<ChevronDown size={18} strokeWidth={2.5} />}
    >
      Pill button
    </Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="ghost">Hello button!</Button>
    <Button variant="ghost" disabled>
      Disabled ghost
    </Button>
    <Button variant="destructive" size="lg">
      Delete it!
    </Button>
    <Button variant="destructive" size="lg" pill>
      Delete it!
    </Button>
    <Button variant="bgIcon">
      <Smile />
    </Button>
  </div>
);

export default ButtonExamples;
