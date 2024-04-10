import Input from "@/components/Input";
import Button from "@/components/Button";
import { Switch } from "@/components/Switch";

export default function Page() {
  async function create(formDate) {
    "use server";

    console.log(formDate);
  }

  return (
    <div className="space-y-4 p-4">
      <h1>Test Server Actions</h1>

      <form action={create} className="space-y-4">
        <Input label="Email" name="email" />
        <Switch name="switch-1" />

        <Button>Submit</Button>
      </form>
    </div>
  );
}
