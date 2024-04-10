export default function Layout({ children }) {
  return (
    <html>
      <body>
        <h1>User layout 1</h1>
        <main>{children}</main>
      </body>
    </html>
  );
}
