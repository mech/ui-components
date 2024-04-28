import { getUser } from "@/app/(workspace)/dbusers2/getUser";
import { IdentificationBadge } from "@phosphor-icons/react/dist/ssr";
import { InfoIcon } from "lucide-react";

export default async function UserDetails({ searchParams }) {
  const id = searchParams?.pick;

  if (id === undefined) return null;

  const res = await getUser({ id });
  const user = res.data.user;

  return (
    <div className="space-y-4 p-4">
      <h1 className="flex items-center gap-2 text-lg font-semibold leading-tight">
        <IdentificationBadge weight="fill" size={32} className="shrink-0" />{" "}
        {user.name}
      </h1>

      <div className="divide-y">
        <div className="flex items-center justify-between gap-2 py-2">
          <span className="text-gray-500">ID</span>
          <span>{user.id}</span>
        </div>
        <div className="flex items-center justify-between gap-2 py-2">
          <span className="text-gray-500">Name</span>
          <strong>{user.name}</strong>
        </div>
        <div className="flex items-center justify-between gap-2 py-2">
          <span className="text-gray-500">Email</span>
          <a href={`mailto:${user.email}`} className="text-blue-700">
            {user.email}
          </a>
        </div>
        <div className="flex items-center justify-between gap-2 py-2">
          <span className="flex items-center gap-1 text-gray-500">
            Status
            <InfoIcon size={18} />
          </span>
          <span>{user.status}</span>
        </div>
        <div className="flex items-center justify-between gap-2 py-2">
          <span className="text-gray-500">Created</span>
          {user.createdAt}
        </div>
      </div>
    </div>
  );
}
