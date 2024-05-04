import Tabs from "@/app/(workspace)/parallel-examples/[id]/Tabs";

export default function Layout({ children, tabs }) {
  // relative is for loading indicator
  return (
    <div className="relative">
      {children}
      <Tabs />
      {tabs}
    </div>
  );
}
