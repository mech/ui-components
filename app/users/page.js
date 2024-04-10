import RefreshUserButton from "@/app/users/RefreshUserButton";
import { getUsers } from "@/app/users/getUsers";
import Link from "next/link";

export const metadata = {
  title: "Users",
};

// export const dynamic = "force-dynamic";

// async function getUsers() {
//   const res = await fetch("http://192.168.1.235:3000/api/users", {
//     method: "POST",
//     next: {
//       tags: ["users"],
//     },
//   });
//
//   if (!res.ok) {
//     throw create Error("Failed to fetch users");
//   }
//
//   return res.json();
// }

export default async function Page() {
  const users = await getUsers();

  return (
    <div className="space-y-4 p-4">
      <h1 className="flex items-center justify-between text-lg font-semibold">
        Users: {users.length}
        <RefreshUserButton />
      </h1>
      <div className="divide-y">
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

const User = ({ user }) => (
  <Link
    href={`/users/${user.id}`}
    className="flex items-center justify-between py-1 transition-colors hover:bg-gray-50"
  >
    <div>
      <p>{user.name}</p>
      <span className="text-sm text-gray-500">{user.email}</span>
    </div>
    <div className="rounded-full border border-orange-200 bg-amber-50 px-1.5 py-0.5 text-xs text-orange-500">
      {user.status}
    </div>
  </Link>
);
