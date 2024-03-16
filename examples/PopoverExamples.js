import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import Button from "@/components/Button";
import { Sun } from "@phosphor-icons/react/dist/ssr";

const PopoverExamples = () => {
  return (
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
            quidem quod rerum voluptatibus. Id praesentium quia quo? Eos itaque
            nulla rem sapiente voluptatibus?
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverExamples;
