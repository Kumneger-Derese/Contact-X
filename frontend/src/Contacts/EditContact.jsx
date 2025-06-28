import { useState } from 'react';
import {
  useGetContactQuery,
  useUpdateContactMutation,
} from '../slices/contactApiSlice';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useJoiValidation } from '../hooks/useJoiValidation';
import { updateContactSchema } from '../schema/contactSchema';
import ErrorMessage from '../components/ErrorMessage';

export default function EditContact() {
  const { id } = useParams();

  const { data: contact = [] } = useGetContactQuery(id);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState('');
  const [favorite, setFavorite] = useState('');
  const [category, setCategory] = useState('');

  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();
  const { validate } = useJoiValidation(updateContactSchema);
  const [updateContact, { isLoading }] = useUpdateContactMutation();

  useEffect(() => {
    if (contact) {
      setName(contact?.name);
      setPhone(contact?.phone);
      setCategory(contact?.category);
      setFavorite(contact?.favorite);
    }
  }, [contact]);

  // Handle update submit
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const updatedData = { name, phone, category, favorite };
      const { errors, isValid, value: editedData } = validate(updatedData);

      if (!isValid) {
        setFormErrors(errors);
        return;
      }

      const formData = new FormData();
      formData.append('name', editedData.name);
      formData.append('phone', editedData.phone);
      formData.append('image', image);
      formData.append('publicId', contact?.image?.public_id || '');
      formData.append('category', editedData.category);
      formData.append('favorite', editedData.favorite);

      await updateContact({ id, body: formData }).unwrap();
      toast.success('Contact Updated.');
      navigate('/contacts');
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className='mx-4 sm:mx-auto text-white h-screen justify-center items-center flex flex-col'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col w-full sm:w-4/6 px-8 md:px-20 space-y-2 bg-black border-t-2 border-t-green-500 py-4  rounded-lg shadow-lg'
      >
        <h1 className='my-4 font-black text-2xl sm:text-4xl w-3/6 mx-auto '>
          Edit Contact
        </h1>

        <div className=''>
          <label htmlFor='name' className='label mb-1 block font-medium'>
            Name
          </label>
          <input
            id='name'
            type='text'
            value={name}
            className='input input-primary bg-transparent w-full border-2'
            onChange={(e) => setName(e.target.value)}
          />
          <ErrorMessage error={formErrors.name} />
        </div>

        <div>
          <label htmlFor='image' className='label mb-1 block font-medium'>
            Avatar
          </label>
          <input
            type='file'
            accept='image/*'
            id='image'
            name='image'
            placeholder='Avatar'
            className='file-input input-primary bg-transparent w-full border-2'
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div>
          <label htmlFor='phone' className='label mb-1 block font-medium'>
            Phone
          </label>
          <input
            id='phone'
            type='tel'
            value={phone}
            className='input input-primary bg-transparent w-full border-2'
            onChange={(e) => setPhone(e.target.value)}
          />
          <ErrorMessage error={formErrors.phone} />
        </div>

        <div>
          <label htmlFor='category' className='label block font-medium mb-1'>
            category
          </label>
          <select
            name='category'
            id='category'
            value={category}
            className='select input-primary bg-gray-800 w-full'
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

        <div className='flex items-center gap-8'>
          <label htmlFor='name' className='font-medium label mb-1'>
            Favorite:
          </label>

          <input
            type='checkbox'
            className='checkbox input-secondary bg-transparent checkbox-md'
            checked={favorite}
            onChange={(e) => setFavorite(e.target.checked)}
          />
          <ErrorMessage error={formErrors.favorite} />
        </div>

        <button
          disabled={isLoading}
          style={{
            cursor: isLoading ? 'not-allowed' : 'pointer',
            border: isLoading ? '1px solid crimson' : 'none',
          }}
          className='btn border-none w-full disabled:bg-gray-600 bg-[crimson] font-bold text-white'
        >
          {isLoading ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  );
}
