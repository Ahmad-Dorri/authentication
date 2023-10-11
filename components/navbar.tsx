import SigninButton from '@/components/signin-button';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="bg-white text-gray-700 w-full h-16 flex items-center px-4">
      <div className="mr-auto">
        <Link className="underline ml-2 text-blue-400" href="/">
          Home
        </Link>
        <Link className="underline ml-2 text-blue-400" href="/userPost">
          User Post
        </Link>
      </div>
      <SigninButton />
    </div>
  );
};

export default Navbar;
