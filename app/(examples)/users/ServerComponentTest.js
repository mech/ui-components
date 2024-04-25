import { getUsers } from "@/app/(examples)/users/getUsers";
import { Dialog, DialogContent, DialogTrigger } from "@/components/Dialog";
import Button from "@/components/Button";

export default async function ServerComponentTest() {
  const users = await getUsers({ page: 4 });

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="secondary" outline>
          Open Dialog
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="p-4">
          <strong>Server Component: {users[0].name}</strong>
        </div>
      </DialogContent>
    </Dialog>
  );

  // return <strong>Server Component!!</strong>;
}
