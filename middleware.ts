export { default } from 'next-auth/middleware';

export const config = {
  // # if you add this (:path* after anything it means you can protect anything that starts with userPost)
  matcher: ['/userPost/:path*'],
};
