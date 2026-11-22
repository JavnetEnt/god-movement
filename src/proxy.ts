import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except API routes, /studio, static files, and Next.js internals
  matcher: ['/((?!api|studio|_next|_vercel|.*\\..*).*)']
};