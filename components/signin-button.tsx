'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const SigninButton = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if (session && session.user) {
    return (
      <button className="bg-rose-400 p-4" onClick={() => signOut()}>
        LogOut from{' '}
        <span className="text-violet-100 ">{session.user.name}</span>
      </button>
    );
  }
  return (
    <>
      <button
        className="bg-indigo-500 p-4 rounded-md text-white "
        onClick={() => signIn()}>
        SignIn
      </button>
      <div className=""></div>
      <button
        className="border-b-2 ml-2 p-2 text-indigo-500 hover:bg-indigo-500 hover:text-white hover:border-none rounded-md transition "
        onClick={() => router.push('/signUp')}>
        SignUp
      </button>
    </>
  );
};

export default SigninButton;
