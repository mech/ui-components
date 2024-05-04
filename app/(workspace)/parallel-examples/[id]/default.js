import UserDetails from "@/app/(workspace)/parallel-examples/[id]/UserDetails";

export default async function Page({ params }) {
  const { id } = params;

  return <UserDetails id={id} />;
}
