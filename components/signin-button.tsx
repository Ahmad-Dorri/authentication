'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const SigninButton = () => {
  const router = useRouter();
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <button className="bg-rose-400 p-4" onClick={() => signOut()}>
        LogOut from {session.user.name}
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
