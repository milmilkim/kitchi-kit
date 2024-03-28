import type { Metadata, Viewport } from 'next';
import { PrimeReactProvider } from 'primereact/api';
import 'primeicons/primeicons.css';
import { NextAuthProvider } from '@/app/SessionProvider';

import '@/app/globals.css';
import 'primereact/resources/themes/viva-light/theme.css';

import MainLayout from '../components/layout/MainLayout';
import { ModalProvider } from '@/contexts/ModalContext';

import Modal from '@/components/Modal';

import config from '@/meta';

export const metadata: Metadata = {
  title: config.APP_KOR_NAME,
  description: config.APP_DESCRIPTION,
  themeColor: config.META_THEME_COLOR,

  openGraph: {
    title: config.APP_KOR_NAME,
    description: config.APP_DESCRIPTION,
    siteName: config.APP_KOR_NAME,
    locale: 'ko_KR',
    type: 'website',
  },
};

export const viewPort: Viewport = {
  themeColor: '#B1C1EE',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <NextAuthProvider>
          <PrimeReactProvider>
            <ModalProvider>
              <MainLayout>{children}</MainLayout>
              <Modal />
            </ModalProvider>
          </PrimeReactProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
