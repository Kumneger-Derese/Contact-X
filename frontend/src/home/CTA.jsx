import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function CTA() {
  const { userInfo } = useSelector((store) => store.auth);
  return (
    <div
      id='CTA'
      className='my-32 mx-2 md:mx-16 lg:mx-40  bg-gradient-to-br from-blue-300 to-blue-600 rounded-md'
    >
      <div className='p-8  flex flex-col items-center justify-center  w-full'>
        <h1 className=' text-center text-gray-700 font-extrabold mb-4 text-2xl md:text-5xl'>
          Make your Contact at your Fingertip.
        </h1>
        {userInfo ? (
          <Link
            to={'/create-contact'}
            className='text-white font-bold text-center py-2 px-4 rounded my-4  min-w-32 text-lg border-none block bg-amber-700 hover:bg-amber-800 hover:scale-105'
          >
            Create Now
          </Link>
        ) : (
          <Link
            to={'/register'}
            className='text-white font-bold text-center py-2 px-4 rounded my-4  w-32 text-lg border-none block bg-blue-600 hover:bg-blue-700 hover:scale-105'
          >
            Register
          </Link>
        )}
      </div>
    </div>
  );
}
