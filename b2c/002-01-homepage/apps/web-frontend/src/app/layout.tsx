import Header from '../ui/Header';
import Footer from '../ui/Footer';
import './globals.css';

export const metadata = { title: 'eShop', description: 'eShop B2C' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
