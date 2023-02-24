import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ReactElement, useMemo } from 'react';
import { IntlProvider } from 'react-intl';
import { LANGUAGES } from '../lang';
import { wrapper } from '../store/store';

function MasterLayout ({ children, session }: { children: ReactElement, session: Session }) {
    const { locale, defaultLocale } = useRouter();

    const messages = useMemo(() => {
        switch (locale) {
            case LANGUAGES.en_US.locale:
                return LANGUAGES.en_US.messages;
            case LANGUAGES.vi_VN.locale:
                return LANGUAGES.vi_VN.messages;
            default:
                return LANGUAGES.vi_VN.messages;
        }
    }, [locale]);

    return (
        <SessionProvider session={session}>
            <IntlProvider messages={messages} locale={locale as string} defaultLocale={defaultLocale}>
                {children}
            </IntlProvider>
        </SessionProvider>
    );
}

export default wrapper.withRedux(MasterLayout);
