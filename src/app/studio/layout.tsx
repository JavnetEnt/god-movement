export const metadata = {
  title: 'God Movement Admin Studio',
  description: 'Content management dashboard for God Movement e.V.'
};

export default function StudioLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}