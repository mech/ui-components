import { getUser } from "@/app/(workspace)/dbusers2/getUser";
import { IdentificationBadge } from "@phosphor-icons/react/dist/ssr";
import { InfoIcon } from "lucide-react";
import Card from "@/components/Card";

export default async function UserDetails({ id }) {
  const res = await getUser({ id });
  const user = res.data.user;

  return (
    <div>
      <div className="space-y-4 p-4 data-[fetching=true]:opacity-20">
        <h1 className="flex items-center gap-2 text-lg font-semibold leading-tight">
          <IdentificationBadge weight="fill" size={32} className="shrink-0" />{" "}
          {user.name}
        </h1>

        <div className="divide-y">
          <div className="flex items-center justify-between gap-8 py-2">
            <span className="text-gray-500">ID</span>
            <span className="truncate">{user.id}</span>
          </div>
          <div className="flex items-center justify-between gap-8 py-2">
            <span className="text-gray-500">Name</span>
            <strong className="truncate">{user.name}</strong>
          </div>
          <div className="flex items-center justify-between gap-8 py-2">
            <span className="text-gray-500">Email</span>
            <a
              href={`mailto:${user.email}`}
              className="truncate text-blue-700 dark:text-blue-400"
            >
              {user.email}
            </a>
          </div>
          <div className="flex items-center justify-between gap-2 py-2">
            <span className="flex items-center gap-1 truncate text-gray-500">
              Status
              <InfoIcon size={18} />
            </span>
            <span>{user.status}</span>
          </div>
          <div className="flex items-center justify-between gap-2 py-2">
            <span className="text-gray-500">Created</span>
            <span className="truncate">{user.createdAt}</span>
          </div>
        </div>

        <ul className="no-scrollbar flex items-center gap-8 overflow-y-hidden overflow-x-scroll overscroll-contain border-b pb-1">
          <li>
            <div className="flex flex-col items-center">
              Tab 1<span className="h-1 w-3/5 rounded-full bg-blue-500"></span>
            </div>
          </li>
          <li>Tab 2</li>
          <li>Tab 3</li>
        </ul>

        <Card>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
          architecto assumenda at atque dicta ea error excepturi, facere fugit
          id impedit in iste, minus molestias necessitatibus repellat suscipit,
          velit voluptatem.
        </Card>
      </div>
    </div>
  );
}
