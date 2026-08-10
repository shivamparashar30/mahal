import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { Playfair_Display } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Pratap Mahal by Taj | Royal Heritage. Modern Luxury.',
  description:
    'Experience timeless grandeur in the heart of Rajasthan. Pratap Mahal by Taj offers luxury suites, fine dining, royal weddings, and curated experiences in a centuries-old palace.',
  keywords: [
    'luxury hotel',
    'Rajasthan',
    'heritage hotel',
    'Taj Hotels',
    'palace hotel',
    'royal wedding',
    'Udaipur',
  ],
  openGraph: {
    title: 'Pratap Mahal by Taj',
    description: 'Royal Heritage. Modern Luxury. Experience timeless grandeur in Rajasthan.',
    type: 'website',
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
