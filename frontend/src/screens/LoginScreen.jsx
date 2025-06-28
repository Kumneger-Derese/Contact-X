import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { HiChevronLeft } from 'react-icons/hi2';
import { Link, useNavigate } from 'react-router-dom';

import { setCredentials } from '../slices/authSlice';
import { useLoginUserMutation } from '../slices/userApiSlice';
import { useJoiValidation } from '../hooks/useJoiValidation';
import { loginSchema } from '../schema/userSchema';
import ErrorMessage from '../components/ErrorMessage';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { validate } = useJoiValidation(loginSchema);
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { errors, isValid, value } = validate({ email, password });

      console.log(errors);

      if (!isValid) {
        setFormErrors(errors);
        return;
      }

      const res = await loginUser(value).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('User Logged in!');
      navigate('/contacts');
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className='flex flex-col px-4 sm:mx-auto w-full items-center min-h-screen justify-center relative'>
      <section className='bg-black rounded-box border-t-2 border-t-green-500 w-full sm:w-4/6 text-white  p-8'>
        <h1 className='lg:text-3xl text-center mx-auto font-black mb-4'>
          Login User
        </h1>

        {/* Back btn */}
        <Link
          to={'/'}
          className='absolute top-4 left-24 text-3xl text-white font-black'
        >
          <HiChevronLeft />
        </Link>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col  w-full sm:w-3/6 mx-auto gap-8'
        >
          <div>
            <label htmlFor='email' className='block'>
              Email:
              <input
                type='email'
                id='email'
                placeholder='example@gmail.com'
                className='input input-primary bg-transparent w-full border-2'
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <ErrorMessage error={formErrors.email} />
          </div>

          <div>
            <label htmlFor='password' className='block'>
              Password:
              <input
                id='password'
                type='password'
                placeholder='*********'
                className='input input-primary bg-transparent w-full border-2'
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <ErrorMessage error={formErrors.password} />
          </div>

          <Link to={'/register'}>
            Not already registered?{' '}
            <span className='text-amber-700 link font-medium pl-1'>
              Sign up
            </span>{' '}
          </Link>
          <button
            className='btn shadow-none border-none w-full bg-[orangered] hover:bg-[orangered]/70 disabled:bg-gray-500 text-white text-base font-bold'
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Login '}
          </button>
        </form>
      </section>
    </div>
  );
}
