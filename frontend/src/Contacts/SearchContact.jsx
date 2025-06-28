import { useState } from 'react';
import { useSearchContactMutation } from '../slices/contactApiSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { HiXMark } from 'react-icons/hi2';

export default function SearchContact() {
  const [name, setName] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState([]);

  const [searchContact] = useSearchContactMutation();

  const handleSearch = async () => {
    try {
      const res = await searchContact({ name }).unwrap();
      setResult(res);
      console.log('res', res);
    } catch (error) {
      toast.error(error.data?.message);
    }
  };

  return (
    <div className='gap-2 flex items-center relative'>
      <input
        type='search'
        placeholder='Search by name..'
        onChange={(e) => setName(e.target.value)}
        className={`input input-md font-semibold placeholder:text-gray-500 md:w-full my-1
          focus:bg-transparent border-gray-500 rounded text-sm max-w-xs`}
        onFocus={() => setIsOpen(true)}
      />
      <button
        onClick={handleSearch}
        className='btn btn-md text-white border-none bg-gray-800'
        type='submit'
      >
        Search
      </button>
      {isOpen && (
        <div className='absolute top-16 left-2 right-2 md:-right-24 md:-left-24 p-6 sm:p-8 rounded-md bottom-auto overflow-y-hidden z-[50]  text-primary font-semibold bg-neutral-50 shadow-lg'>
          <div className='flex justify-between items-center'>
            <p className='md:text-2xl font-medium'>Search results</p>
            <HiXMark
              onClick={() => setIsOpen(false)}
              className='fill-error font-bold text-2xl'
            />
          </div>
          <p className='mt-4'>
            {result?.length < 1 ? (
              // create a component for no contacts found
              <div className='flex p-12 border border-dashed flex-col items-center justify-center rounded-lg bg-gray-100 w-full h-48 mt-8'>
                <p className='text-gray-500  font-bold'>No contacts found</p>
              </div>
            ) : (
              result.map((res) => (
                <Link
                  className='block link text-blue-700 hover:text-blue-900'
                  to={`/contact-detail/${res._id}`}
                  key={res._id}
                >
                  {res.name}
                </Link>
              ))
            )}
          </p>
        </div>
      )}
    </div>
  );
}
