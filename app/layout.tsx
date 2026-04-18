import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import DeveloperBadge from '@/components/DeveloperBadge';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Quran App',
  description: 'Read and explore the Holy Quran',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri&family=Noto+Naskh+Arabic&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <DeveloperBadge />
      </body>
    </html>
  );
}