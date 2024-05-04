import UserPage from "@/app/(workspace)/dbusers/UserPage";
import { Fragment } from "react";

export default async function Page(props) {
  const { searchParams } = props;

  return (
    <Fragment>
      <div className="space-y-4 p-4">
        <h1 className="text-lg font-bold">Slot</h1>
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </div>

      <UserPage searchParams={searchParams} />
    </Fragment>
  );
}
