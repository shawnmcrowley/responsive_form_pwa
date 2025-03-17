import "./globals.css";

export const metadata = {
  title: "Responsive Interactive Form Example with PWA",
  description: "Responsive Design Form for Desktop/Web/Mobile",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
