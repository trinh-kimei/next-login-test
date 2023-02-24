import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import LinkedInProvider from 'next-auth/providers/linkedin';

export default NextAuth({
    pages: {
        signIn: '/candidate/sign-in'
    },
    providers: [
        FacebookProvider({
            clientId: process.env.NEXT_PUBLIC_FB_APPID as string,
            clientSecret: process.env.NEXT_PUBLIC_FB_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GG_CLIENTID as string,
            clientSecret: process.env.NEXT_PUBLIC_GG_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code'
                }
            }
        }),
        LinkedInProvider({
            clientId: process.env.NEXT_PUBLIC_LINKEDIN_CLIENTID as string,
            clientSecret: process.env.NEXT_PUBLIC_LINKEDIN_SECRET as string,
            token: {
                url: 'https://www.linkedin.com/oauth/v2/accessToken',
                async request ({
                    client,
                    params,
                    checks,
                    provider
                }) {
                    const response = await client.oauthCallback(provider.callbackUrl, params, checks, {
                        exchangeBody: {
                            client_id: process.env.NEXT_PUBLIC_LINKEDIN_CLIENTID,
                            client_secret: process.env.NEXT_PUBLIC_LINKEDIN_SECRET,
                            response_type: 'code',
                            scope: 'r_liteprofile r_emailaddress',
                            redirect_uri: process.env.NEXTAUTH_URL
                        }
                    });
                    return {
                        tokens: response
                    };
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn () {
            return true;
        },
        async jwt ({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.platform = account.provider;
                token.accessToken = account.id_token || account.access_token;
            }
            return token;
        },
        async session ({ session, token }) {
            // Send properties to the client, like an access_token from a provider.
            const data = {
                ...session,
                ...token
            };
            return data;
        }
    }
});
