import Cookies from 'js-cookie';
import { Session } from 'next-auth';
import { useSession, signOut } from 'next-auth/react';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import MainContentSection from '../../MainContentSection';
import authService from '../../services/auth.service';
import { setAuthState } from '../../store/authSlice';

export default function UserLayout ({ children }: { children: ReactElement }) {
    interface Data extends Session {
        platform: string,
        accessToken: string
    }
    const { data, status } = useSession();
    const dispatch = useDispatch();

    const [session, setSession] = useState<Data>();

    useEffect(() => {
        setSession(data as Data);
    }, [data]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const responseForm = (res: any) => {
        const user = {
            name: res.data.users?.name,
            email: res.data.users?.email,
            avatar: res.data.users?.avatar,
            role: 'CANDIDATE'
        };
        localStorage.setItem('user', JSON.stringify(user));
        Cookies.set(process.env.accessToken_candidate as string, res.data.users.access_token, { expires: 7 });
        Cookies.set(process.env.refreshToken_candidate as string, res.data.users.refresh_token, { expires: 7 });
        dispatch(setAuthState({
            isLoggedIn: true,
            user
        }));
        signOut();
    };

    const socialLogin = useCallback((platform: string, accessToken: string) => {
        switch (platform) {
            case 'facebook':
                authService.socialLogin({ access_token: accessToken }, 'facebook')?.then((res) => {
                    if (!res.success) {
                        signOut();
                    } else {
                        responseForm(res);
                    }
                });
                break;
            case 'google':
                authService.socialLogin({ access_token: accessToken }, 'google')?.then((res) => {
                    if (!res.success) {
                        signOut();
                    } else {
                        responseForm(res);
                    }
                });
                break;
            case 'linkedin':
                authService.socialLogin({ code: accessToken, redirect_uri: process.env.NEXTAUTH_URL }, 'linkedin')?.then((res) => {
                    if (!res.success) {
                        signOut();
                    } else {
                        responseForm(res);
                    }
                });
                break;
            default:
                break;
        }
    }, [responseForm]);

    useEffect(() => {
        const userFromStorage = JSON.parse(localStorage.getItem('user') as string);
        if (userFromStorage && (Cookies.get(process.env.accessToken_candidate as string) || Cookies.get(process.env.accessToken_employer as string) || Cookies.get(process.env.accessToken_admin as string))) {
            dispatch(setAuthState({
                isLoggedIn: true,
                user: userFromStorage
            }));
            // when don't have user logged
        } else if (status === 'authenticated') {
            socialLogin(session?.platform as string, session?.accessToken as string);
        } else {
            localStorage.removeItem('user');
            Cookies.remove(process.env.accessToken_candidate as string);
            Cookies.remove(process.env.accessToken_employer as string);
            Cookies.remove(process.env.accessToken_admin as string);
        }
    }, [session, dispatch, status, socialLogin]);
    return (
        <>
            <MainContentSection>
                        {children}
                    </MainContentSection>
        </>
    );
}
