// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });


    // Handle API Routes: Bot Token Verification
    if (url.pathname.startsWith('/api/tvshows')) {
        const authheader = req.headers.get('Authorization');

        // Check if session is valid for API routes
        if (token) {
            return NextResponse.next();
        }

        // Check if the Authorization header matches the bot token
        if (authheader && authheader === `Bearer ${process.env.BOT_AUTH}`) {
            return NextResponse.next();
        }

        
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Handle Non-API Routes (e.g., /list): User Session Verification via NextAuth
    if (!token) {
        const loginUrl = new URL('/api/auth/signin', req.url);
        return NextResponse.redirect(loginUrl);
    }

    // Allow the request if there's a valid user session
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/list',          // User session verification for this page
        '/api/tvshows',    // Bot verification for API routes
    ],
};
