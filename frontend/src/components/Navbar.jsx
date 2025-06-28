import Logo from '../public/image1.png';

import { Link } from 'react-router-dom';
import SearchContact from '../Contacts/SearchContact';
import { useDispatch, useSelector } from 'react-redux';
import { HiBars3BottomRight } from 'react-icons/hi2';
import { AiOutlineLogout } from 'react-icons/ai';
import { useLogoutUserMutation } from '../slices/userApiSlice';
import { toast } from 'react-toastify';
import { clearCredentials } from '../slices/authSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((store) => store.auth);
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      dispatch(clearCredentials());
      toast.success(res);
    } catch (error) {
      console.log({ error });
      toast.error(error?.data?.message);
    }
  };

  const firstName = userInfo?.name?.split(' ')[0].at(0).toUpperCase();
  const lastName = userInfo?.name?.split(' ')[1]
    ? userInfo?.name?.split(' ')[1].at(0).toUpperCase()
    : '';

  return (
    <div
      className={`px-4 relative ml-0 md:p-0 md:ml-52 border-b border-b-gray-200 flex-1 text-neutral-500`}
    >
      <div
        className={`flex justify-between p-1
       z-[50] delay-75 duration-500 sticky top-2 items-center md:border-b-2 border-neutral-content/50`}
      >
        <Link to={'/contacts'} className='text-2xl text-gray-800 font-bold '>
          Contact <span className='text-blue-700 italic'>X</span>
        </Link>

        <div className='hidden md:flex '>
          <SearchContact />
        </div>

        <div className='dropdown md:hidden z-50 dropdown-left dropdown-bottom'>
          <div tabIndex={0} className='btn m-1' role='button'>
            <HiBars3BottomRight size={26} />
          </div>

          <ul
            className='dropdown-content bg-gray-300 border gap-y-2 font-bold border-gray-400 z-[10] menu p-2 rounded-md w-48'
            tabIndex={0}
          >
            <li>
              <Link className='menu' to={'/'}>
                Home
              </Link>
            </li>
            <li>
              <Link className='menu' to={'/create-contact'}>
                Create
              </Link>
            </li>
            <li>
              <Link className='menu' to={'/profile'}>
                Profile
              </Link>
            </li>

            {/* Logout Button */}
            <li>
              {userInfo && (
                <button
                  onClick={handleLogout}
                  className=' btn btm-sm flex items-center text-white hover:bg-red-600 bg-red-800 text-center rounded-lg'
                >
                  <span>
                    <AiOutlineLogout size={16} />
                  </span>
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>
        <div className='hidden md:flex text-white md:items-center'>
          <div className='bg-blue-600 avatar  p-2.5 rounded-full'>
            <Link to={'/profile'} className='font-bold'>
              {firstName + lastName}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
