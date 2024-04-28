import { getUsers } from "@/app/(examples)/users/getUsers";
import { getUser } from "@/app/(workspace)/dbusers2/getUser";

export default async function Users({ searchParams }) {
  const currentPage = Number(searchParams?.page) || 1;
  const res = await getUsers({ page: currentPage });
  const users = res.data.users;

  return (
    <div className="rounded-lg border bg-gray-50 p-4">
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
