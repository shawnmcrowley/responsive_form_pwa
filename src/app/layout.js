import "./globals.css";

export const metadata = {
  title: "Responsive Interactive Form Example with PWA",
  description: "Responsive Design Form for Desktop/Web/Mobile",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next15", "pwa", "next-pwa"],
  authors: [
    {
      name: "Shawn M. Crowley",
      url: "https://www.linkedin.com/in/shawnmcrowley/",
    },
  ],  
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
