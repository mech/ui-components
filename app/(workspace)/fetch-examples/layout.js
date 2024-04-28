export default function Layout(props) {
  return (
    <div className="space-y-4 p-4">
      <h1 className="font-bold">Fetch Layout</h1>

      <pre>{JSON.stringify(props, null, 2)}</pre>

      {props.children}
    </div>
  );
}
