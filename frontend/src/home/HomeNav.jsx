import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function HomeNav() {
  const { userInfo } = useSelector((store) => store.auth);

  return (
    <div className='bg-white sticky top-0 z-50'>
      {/* Navbar */}
      <div className='flex items-center py-4 sm:py-0 px-4 shadow-2xs font-semibold text-neutral-800'>
        <div className='flex-1'>
          <a className='text-2xl text-gray-800 font-bold'>
            Contact <span className='text-blue-700 italic'>X</span>
          </a>
        </div>

        {/* Navigation Links */}
        <div className='hidden md:flex items-center'>
          <ul className='menu menu-horizontal  mr-8 text-lg font-medium px-1'>
            <li>
              <a href='#features'>Features</a>
            </li>
            <li>
              <a href='#product'>Product</a>
            </li>
            <li>
              <a href='#CTA'>Start</a>
            </li>
          </ul>
        </div>

        {/* Login btn */}
        <div>
          {userInfo ? (
            <Link
              to={'/contacts'}
              className='btn text-white font-semibold  border-none  bg-blue-600 hover:bg-blue-700'
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to={'/login'}
              className='btn text-white font-semibold  border-none  bg-blue-600 hover:bg-blue-700'
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
