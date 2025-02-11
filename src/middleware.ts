import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
/**
 * 公開ルート
 * (ここに公開されているルーティングを記載する)
 */
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/tmp-login(.*)']);

/**
 * 保護されたルート
 * (ここに認証が必要なルーティングを記載する)
 */
const isProtectedRoute = createRouteMatcher(['/']);

// 認証ミドルウェア
export default clerkMiddleware(async (auth, req) => {
    // 公開ルートの場合は認証をスキップ
    if (isPublicRoute(req)) return NextResponse.next();

    // 保護されたルートの場合は認証を行う
    await auth.protect();
});

// ミドルウェアの設定
export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
