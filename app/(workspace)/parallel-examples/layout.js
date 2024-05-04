import PanelContainer2 from "@/app/(workspace)/parallel-examples/PanelContainer2";

export default function Layout({ children, slot }) {
  return <PanelContainer2 master={slot} details={children} />;
}
