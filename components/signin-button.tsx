'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const SigninButton = () => {
  const router = useRouter();
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <button className="bg-rose-400 p-4" onClick={() => signOut()}>
        LogOut from <span className="text-violet-100">{session.user.name}</span>
      </button>
    );
  }
  return (
    <button
      className="bg-indigo-500 p-4 rounded-md text-white "
      onClick={() => signIn()}>
      SignIn
    </button>
  );
};

export default SigninButton;
