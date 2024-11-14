import type {NextAuthConfig} from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/admin/login',
    },
    callbacks: {
        authorized({auth, request: {nextUrl}}) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/admin');
            if (isOnDashboard) {
                return isLoggedIn;
            }
            return true;
        },
    },
    providers: [],
} satisfies NextAuthConfig;