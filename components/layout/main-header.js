import Link from "next/link";

//TODO: modify header when the user is loggen in, logout option, profile data option, what more??

function MainHeader() {
  return (
    <header className="flex justify-between p-5 bg-gray-200">
      <Link href="/" className="text-2xl font-bold">
        Your Logo
      </Link>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/features" className="text-gray-700 hover:text-black ">
              Features
            </Link>
          </li>
          <li>
            <Link href="/articles" className="text-gray-700 hover:text-black ">
              Articles
            </Link>
          </li>
          <li>
            <Link href="/login" className="text-gray-700 hover:text-black ">
              Log In
            </Link>
          </li>
          <li>
            <Link
              href="/authorization"
              className="text-gray-700 hover:text-black  "
            >
              Sign up
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
