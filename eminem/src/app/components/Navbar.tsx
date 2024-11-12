import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <Link href="/" className="flex items-center space-x-4">
        <img src="/favicon.ico" alt="UpMovie Logo" className="w-8 h-8" />
        <span className="text-2xl font-bold">UpMovie</span>
      </Link>
      <div className="flex space-x-6">
     
        <Link href="/auth">
          <p className="hover:text-gray-300">Sign Up/Sign In</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;