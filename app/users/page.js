export const metadata = {
  title: "Users metadata",
};

async function getUsers() {
  const res = await fetch("http://192.168.1.235:3000/api/users", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}

export default async function Page() {
  const users = await getUsers();

  return (
    <div className="p-4">
      <h1>Users: {users.length}</h1>
      <p>Users will be listed here</p>
    </div>
  );
}
