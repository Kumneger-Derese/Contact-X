import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { setCredentials } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateUserMutation } from '../slices/userApiSlice';
import { useJoiValidation } from '../hooks/useJoiValidation';
import { profileSchema } from '../schema/userSchema';
import ErrorMessage from '../components/ErrorMessage';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const { validate } = useJoiValidation(profileSchema);
  const { userInfo } = useSelector((store) => store.auth);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setImage(userInfo?.image?.url);
  }, [userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, isValid, value } = validate({
      name,
      email,
      password,
      confirmPassword,
    });

    if (!isValid) {
      setFormErrors(errors);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', value.name);
      formData.append('email', value.email);
      formData.append('password', value.password);
      formData.append('image', image);

      const res = await updateUser(formData).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('User updated');
      navigate('/contacts');
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className='flex flex-col p-4 min-h-screen justify-center items-center'>
      <section className='bg-black text-white p-8 w-full sm:w-4/6 rounded-box border-t-2 border-t-green-500'>
        <h1 className='lg:text-3xl text-center font-black mb-4'>
          User Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className='flex flex-col mx-auto w-full sm:w-8/12 space-y-2'
        >
          <div>
            <label htmlFor='name' className='block label font-medium'>
              Name:
            </label>
            <input
              type='text'
              name='name'
              placeholder='John Doe'
              value={name}
              className='input input-primary bg-transparent w-full border-2'
              onChange={(e) => setName(e.target.value)}
            />
            <ErrorMessage error={formErrors.name} />
          </div>

          <div>
            <label htmlFor='image' className='block label font-medium'>
              Avatar:
            </label>

            <input
              type='file'
              accept='image/*'
              id='image'
              name='image'
              placeholder='Avatar'
              className='file-input file-input-primary bg-transparent  w-full border-2'
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div>
            <label htmlFor='email' className='block label font-medium'>
              Email:
            </label>
            <input
              type='email'
              name='email'
              placeholder='example@gmail.com'
              value={email}
              className='input input-primary bg-transparent w-full border-2'
              onChange={(e) => setEmail(e.target.value)}
            />
            <ErrorMessage error={formErrors.email} />
          </div>

          <div>
            <label htmlFor='password' className='block label font-medium'>
              Password:
            </label>

            <input
              type='password'
              name='password'
              placeholder='*********'
              className='input input-primary bg-transparent w-full border-2'
              onChange={(e) => setPassword(e.target.value)}
            />
            <ErrorMessage error={formErrors.password} />
          </div>

          <div>
            <label htmlFor='image' className='block label font-medium'>
              Confirm Password:
            </label>
            <input
              type='password'
              placeholder='*********'
              className='input input-primary bg-transparent w-full border-2'
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <ErrorMessage error={formErrors.confirmPassword} />
          </div>

          <button
            style={{
              cursor: isLoading ? 'not-allowed' : 'pointer',
              border: isLoading ? '1px solid crimson' : 'none',
            }}
            className='btn w-full border-none shadow-none bg-[crimson] hover:bg-[crimson]/70 disabled:bg-gray-500 mt-4 text-white font-bold text-base'
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Update'}
          </button>
        </form>
      </section>
    </div>
  );
}
