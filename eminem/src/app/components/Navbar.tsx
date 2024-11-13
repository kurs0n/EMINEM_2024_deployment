import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Home</Link>
        <div className="space-x-4">
          <Link href="/movies" className="hover:text-gray-300">Manage Movies</Link>
          <Link href="/auth">
            <p className="hover:text-gray-300">Sign Up/Sign In</p>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;