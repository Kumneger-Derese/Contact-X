import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../slices/userApiSlice';
import { useJoiValidation } from '../hooks/useJoiValidation';
import { registerSchema } from '../schema/userSchema';
import ErrorMessage from '../components/ErrorMessage';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { validate } = useJoiValidation(registerSchema);
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const { errors, isValid, value } = validate({ name, email, password });
      if (!isValid) {
        setFormErrors(errors);
        return;
      }

      const formData = new FormData();
      formData.append('name', value.name);
      formData.append('email', value.email);
      formData.append('password', value.password);

      const res = await registerUser(formData).unwrap();

      dispatch(setCredentials({ ...res }));
      toast.success('User created!');
      navigate('/contacts');
    } catch (error) {
      toast.error(error.data.message);
    }
  };
  return (
    <div className='flex flex-col px-4 min-h-screen w-full items-center justify-center'>
      <section className='bg-black text-white p-8 w-full sm:w-4/6 rounded-box border-t-2 border-t-green-500'>
        <h1 className='lg:text-3xl text-center font-black mb-4'>
          Register User
        </h1>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col w-full sm:w-3/6 mx-auto space-y-6'
        >
          <div className='mb-2'>
            <label htmlFor='name' className='block'>
              Name:
              <input
                type='text'
                id='name'
                name='name'
                placeholder='John Doe'
                className='input input-primary bg-transparent w-full border-2'
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <ErrorMessage error={formErrors.name} />
          </div>

          <div className='mb-2'>
            <label htmlFor='email' className='block'>
              Email:
              <input
                id='email'
                name='email'
                type='email'
                placeholder='example@gmail.com'
                className='input input-primary bg-transparent w-full border-2'
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <ErrorMessage error={formErrors.email} />
          </div>

          <div className='mb-2'>
            <label htmlFor='password' className='block'>
              Password:
              <input
                id='password'
                name='password'
                type='password'
                placeholder='*********'
                className='input input-primary bg-transparent w-full border-2'
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <ErrorMessage error={formErrors.password} />
          </div>

          <Link to={'/login'}>
            Already registered ?{' '}
            <span className='text-amber-700 link font-medium pl-1'>
              Sign in
            </span>
          </Link>
          <button
            className='btn w-full shadow-none border-none bg-[orangered] hover:bg-[orangered]/70 disabled:bg-gray-500 text-white font-bold text-base'
            disabled={isLoading}
          >
            {isLoading ? 'Processing' : 'Register'}
          </button>
        </form>
      </section>
    </div>
  );
}
