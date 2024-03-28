import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PrimeReactProvider } from 'primereact/api';
import 'primeicons/primeicons.css';

import '@/app/globals.css';
import 'primereact/resources/themes/viva-light/theme.css';

import MainLayout from '../components/layout/MainLayout';
import { ModalProvider } from '@/contexts/ModalContext';

import Modal from '@/components/Modal';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KitchiKit',
  description: '키치하게 갑시다',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <PrimeReactProvider>
          <ModalProvider>
            <MainLayout>{children}</MainLayout>
            <Modal />
          </ModalProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
