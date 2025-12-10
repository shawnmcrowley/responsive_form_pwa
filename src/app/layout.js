import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import ServiceWorkerRegistration from "./components/ServiceWorkerRegistration";

export const metadata = {
  title: "Responsive Interactive App with PWA",
  description: "Responsive Design Desktop/Web/Mobile",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next16", "pwa"],
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
        <ServiceWorkerRegistration />
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
