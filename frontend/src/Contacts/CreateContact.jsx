import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useCreateContactMutation } from '../slices/contactApiSlice';
import { useJoiValidation } from '../hooks/useJoiValidation';
import { createContactSchema } from '../schema/contactSchema';
import ErrorMessage from '../components/ErrorMessage';

export default function CreateContact() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState();
  const [image, setImage] = useState();
  const [category, setCategory] = useState('');
  const [favorite, setFavorite] = useState(false);

  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();
  const { validate } = useJoiValidation(createContactSchema);
  const [createContact, { isLoading }] = useCreateContactMutation();

  //* Handle contact Form submit
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const contactData = { name, phone, category, favorite };
      const { errors, isValid, value: validatedData } = validate(contactData);

      if (!isValid) {
        setFormErrors(errors);
        return;
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('phone', phone);
      formData.append('image', image);
      formData.append('category', category);
      formData.append('favorite', favorite);

      await createContact(formData).unwrap();
      toast.success('Contact created.');
      navigate('/contacts');
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className='mx-8 sm:mx-auto text-white h-screen justify-center items-center flex flex-col'>
      <form
        onSubmit={handleSubmit}
        encType='multipart/form-data'
        className='flex flex-col w-full sm:w-4/6 px-8 md:px-20 space-y-2 bg-black border-t-2 border-t-green-500 py-4  rounded-lg shadow-lg '
      >
        <h1 className='mt-4 font-black text-center text-2xl  mx-auto'>
          Create Contact
        </h1>

        {/* Name Input */}
        <div>
          <label htmlFor='name' className='label block mb-1 font-medium'>
            Name
          </label>
          <input
            id='name'
            type='text'
            placeholder='John Doe'
            className='input input-primary bg-transparent  w-full border-2'
            onChange={(e) => setName(e.target.value)}
          />
          <ErrorMessage error={formErrors.name} />
        </div>

        {/* Avata Input */}
        <div>
          <label htmlFor='image' className='label block mb-1 font-medium'>
            Avatar
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

        {/* Phone Input */}
        <div>
          <label htmlFor='tel' className='label block mb-1 font-medium'>
            Phone
          </label>
          <input
            id='tel'
            type='tel'
            placeholder='09107456678'
            className='input input-primary bg-transparent  w-full border-2'
            onChange={(e) => setPhone(e.target.value)}
          />
          <ErrorMessage error={formErrors.phone} />
        </div>

        {/* Category Input*/}
        <div>
          <label htmlFor='category' className='label block mb-1 font-medium'>
            Select Category
          </label>
          <select
            id='category'
            name='category'
            value={category}
            className='select select-primary w-full bg-gray-800 '
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value=''>Select category</option>
            <option value='business'>Business</option>
            <option value='family'>Family</option>
            <option value='classmate'>Classmate</option>
            <option value='friends'>Friends</option>
          </select>

          <ErrorMessage error={formErrors.category} />
        </div>

        {/* Favorite Input */}
        <div className='flex items-center gap-8'>
          <label htmlFor='name' className='label mb-1 font-medium'>
            Favorite
          </label>

          <input
            type='checkbox'
            className='checkbox bg-transparent input-secondary checkbox-md'
            checked={favorite}
            onChange={(e) => setFavorite(e.target.checked)}
          />
        </div>

        {/* Button */}
        <button
          type='submit'
          disabled={isLoading}
          style={{
            cursor: isLoading ? 'not-allowed' : 'pointer',
            border: isLoading ? '1px solid crimson' : 'none',
          }}
          className='btn w-full shadow-md hover:shadow-rose-500 disabled:bg-gray-600  bg-[crimson] font-bold text-white'
        >
          {isLoading ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  );
}
// This code defines a React component for creating a new contact. It includes form validation, file upload for an avatar, and handles form submission with error handling and success notifications.
// The form collects the contact's name, phone number, avatar image, category, and whether the contact is a favorite. It uses a custom hook for validation and integrates with a Redux slice for API calls. The component also displays error messages for invalid inputs and provides feedback upon successful creation of a contact.
// The form is styled using Tailwind CSS classes, and it includes a loading state for the submit button to indicate when the contact is being created. The component is responsive, adapting to different screen sizes with appropriate styling.
// This code is part of a larger application that manages contacts, allowing users to create, view, and edit their contacts. It uses React Router for navigation and Redux Toolkit for state management and API interactions.
