
import "../app/globals.css";

export const metadata = {
  title: "Sriram Chit Funds",
  description: "Your Trusted Chit Fund Service",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  );
}
