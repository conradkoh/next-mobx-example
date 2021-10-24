import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AppContainerProvider } from '@client/infrastructure/app/container';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContainerProvider>
      <Component {...pageProps} />
    </AppContainerProvider>
  );
}
export default MyApp;
