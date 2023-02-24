import type { AppProps } from 'next/app';
import { ReactElement } from 'react';
import { NextPage } from 'next';
import MasterLayout from '../components/containers/MasterLayout';

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactElement;
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp ({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout || ((page) => <MasterLayout>{page}</MasterLayout>);

    return getLayout(<Component {...pageProps} />);
}

export default MyApp;
