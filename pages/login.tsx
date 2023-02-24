import { getProviders, signIn } from 'next-auth/react';
import { Button } from '@mui/material';
import Head from 'next/head';
import { FormattedMessage } from 'react-intl';
import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { getToken } from 'next-auth/jwt';
import { NextPageWithLayout } from './_app';
import TranslateHelper from '../components/helpers/TranslateHelper';
import MasterLayout from '../components/containers/MasterLayout';
import PublicLayout from '../components/containers/Layout/PublicLayout';

const Login: NextPageWithLayout = ({ providers }: any) => {
    const renderIcon = (name: string) => {
        switch (name) {
            case 'Google':
                return 'Logo GG';
            case 'Facebook':
                return 'Logo FB';
            case 'LinkedIn':
                return 'Logo Linkedin';
            default:
                break;
        }
    };

    const router = useRouter();
    const res = router.query.result;

    return (
        <>
            <Head>
                <title>{TranslateHelper('app.common.login.title')}</title>
            </Head>
            <div className="p-login">
                <div className='p-login-block p-login-left'>
                    <div className='p-login-form'>
                        
                    {providers && !!Object.keys(providers).length && Object.values(providers).map((provider: any) => (
                                        <div key={provider.id} className='c-roundBtn'>
                                            <Button className='c-roundBtn-main' onClick={() => signIn(provider.id)} variant='contained' startIcon={renderIcon(provider.name)}></Button>
                                        </div>
                                    ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export async function getServerSideProps (context: any) {
    // eslint-disable-next-line no-unused-vars
    const { query, req, res } = context;
    let error = '';
    if (query.error) {
        error = query.error;
    }

    try {
        const secret = process.env.NEXTAUTH_SECRET;
        // eslint-disable-next-line no-unused-vars
        const token = await getToken({ req, secret });

        return { props: { providers: await getProviders(), loginError: error } };
    } catch (e) {
        return { props: { providers: await getProviders(), loginError: error } };
    }
}
Login.getLayout = function getLayout (page: ReactElement) {
    return (
        <MasterLayout>
            <PublicLayout>
                {page}
            </PublicLayout>
        </MasterLayout>
    );
};
export default Login;
