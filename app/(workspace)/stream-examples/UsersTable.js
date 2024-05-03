import { getUsers } from "@/app/(examples)/users/getUsers";

export default async function UsersTable({ currentPage }) {
  const res = await getUsers({ page: currentPage });
  const users = res.data.users;

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
