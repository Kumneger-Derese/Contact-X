import { useDispatch, useSelector } from 'react-redux';
import Logo from '../public/user.png';
import { Link } from 'react-router-dom';
import {
  AiOutlineContacts,
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineUser,
} from 'react-icons/ai';
import { useLogoutUserMutation } from '../slices/userApiSlice';
import { clearCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { apiSlice } from '../slices/apiSlice';

export default function SideBar() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((store) => store.auth);
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      dispatch(clearCredentials());
      dispatch(apiSlice.util.resetApiState());
      toast.success(res);
    } catch (error) {
      toast.error(error?.data?.message || 'Logout failed');
    }
  };

  return (
    <div className='hidden w-0 md:w-52 md:flex flex-col  text-white '>
      <div className='md:fixed inset-0 md:w-52 border-r-2 bg-neutral-700 border-neutral-content/50 '>
        <div className='mb-4 flex items-center p-3'>
          <img
            src={userInfo.image ? userInfo.image : Logo}
            alt={userInfo.name}
            className='size-12 rounded-full text-neutral p-1 object-center'
          />

          <div className='flex flex-col p-2'>
            <p className=' text-sm md:font-semibold'>{userInfo.name}</p>
            <p className=' text-sm md:font-semibold'>{userInfo.email}</p>
          </div>
        </div>

        <div className='flex  flex-col justify-between  max-h-screen'>
          <div className='flex gap-y-2 flex-1 flex-col w-full px-2 mt-12'>
            <Link
              to={'/'}
              className='flex items-center gap-2 text-white hover:bg-sky-500 bg-sky-700 text-center  font-medium px-6 py-2 mb-3 rounded-lg'
            >
              <span>
                <AiOutlineHome size={18} />
              </span>
              Home
            </Link>
            <Link
              to={'/create-contact'}
              className='flex items-center gap-2 text-white hover:bg-sky-500 bg-sky-700 text-center  font-medium px-6 py-2 mb-3 rounded-lg'
            >
              <span>
                <AiOutlineContacts size={18} />
              </span>
              Create
            </Link>
            <Link
              to={'/profile'}
              className='flex items-center gap-2 text-white hover:bg-sky-500 bg-sky-700  text-center  font-medium px-6 py-2 mb-3 rounded-lg'
            >
              <span>
                <AiOutlineUser size={18} />
              </span>
              Profile
            </Link>
          </div>

          <div className='mb-4 mt-52 w-full px-2'>
            {userInfo && (
              <button
                onClick={handleLogout}
                className='flex items-center w-full gap-2 text-white hover:bg-red-600 bg-red-800 text-center btn border-none shadow-none  font-medium rounded-lg'
              >
                <span>
                  <AiOutlineLogout size={18} />
                </span>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
