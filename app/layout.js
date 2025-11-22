export const metadata = {
  title: "FileDB Pastebin",
  description: "A simple serverless pastebin"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
