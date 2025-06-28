import ContactCard from './ContactCard';
import { useGetContactsQuery } from '../slices/contactApiSlice';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { TiContacts } from 'react-icons/ti';
import LoadingSkeleton from '../components/LoadingSkeleton';
import SearchContact from './SearchContact';

export default function Contacts() {
  const [pageNumber, setPageNumber] = useState(1);

  const { data, isLoading, isError, error } = useGetContactsQuery(pageNumber);
  const [filteredContacts, setfilteredContacts] = useState();

  useEffect(() => {
    setfilteredContacts(data?.contacts);
  }, [data]);

  const allContact = () => {
    const contact = data?.contacts;
    setfilteredContacts(contact);
  };

  const favoriteContact = () => {
    const contact = data?.contacts?.filter((contact) => contact.favorite);
    setfilteredContacts(contact);
  };

  const businessContact = () => {
    const contact = data?.contacts?.filter(
      (contact) => contact.category === 'business'
    );
    setfilteredContacts(contact);
  };

  const familyContact = () => {
    const contact = data?.contacts?.filter(
      (contact) => contact.category === 'family'
    );
    setfilteredContacts(contact);
  };

  const friendsContact = () => {
    const contact = data?.contacts?.filter(
      (contact) => contact.category === 'friends'
    );
    setfilteredContacts(contact);
  };

  const classmateContact = () => {
    const contact = data?.contacts?.filter(
      (contact) => contact.category === 'classmate'
    );
    setfilteredContacts(contact);
  };

  const handleNext = (e) => {
    if (data?.currentPage < data?.totalPage) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    } else if (data?.currentPage >= data?.totalPage) {
      toast.warn('The last page');
      return;
    }
  };
  const handlePrev = () => {
    if (data?.currentPage === 1) {
      toast.warn('Cannot go back');
    } else {
      setPageNumber(pageNumber - 1);
    }
  };

  if (isLoading) {
    return (
      <div className='p-64 flex h-screen justify-center items-center bg-black  z-50'>
        <LoadingSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='h-screen p-64 text-red-500 font-bold text-lg flex justify-center items-center  z-50'>
        <p className='border-gray-600 border border-dashed rounded-md p-12'>
          {error?.data?.message || 'An error occurred'}
        </p>
      </div>
    );
  }

  const btnStyle = `btn btn-sm text-base-300 bg-base-content border-none hover:bg-base-300 hover:text-base-content
`;

  return (
    <div className='md:ml-52 px-8 pt-4 '>
      <div className='flex justify-between items-center mb-4 md:hidden'>
        <SearchContact />
      </div>
      <div className='mb-4 p-3 w-fit bg-base-300  flex  flex-wrap gap-2 rounded-lg'>
        <button
          className={` bg-amber-700 ${btnStyle} text-amber-100 `}
          onClick={allContact}
        >
          All
        </button>
        <button className={`${btnStyle}`} onClick={favoriteContact}>
          Favorite
        </button>
        <button className={`${btnStyle}`} onClick={businessContact}>
          Bussiness
        </button>
        <button className={`${btnStyle}`} onClick={familyContact}>
          Family
        </button>
        <button className={`${btnStyle}`} onClick={friendsContact}>
          Friends
        </button>
        <button className={`${btnStyle}`} onClick={classmateContact}>
          Classmate
        </button>
      </div>

      <h1 className='mt-4 mb-2 flex items-center gap-x-2 font-bold text-xl'>
        <span>
          <TiContacts />
        </span>
        Contacts ({data?.totalDocCount})
      </h1>

      <div className='flex flex-col gap-4 items-center w-full relative pb-10'>
        {filteredContacts?.length < 1 ? (
          // create a component for no contacts found
          <div className='flex p-12 border border-dashed flex-col items-center justify-center rounded-lg bg-gray-100 w-full h-48 mt-8'>
            <p className='text-gray-500  font-bold'>No contacts found</p>
          </div>
        ) : (
          filteredContacts?.map((contact) => (
            <ContactCard key={contact._id} contact={contact} />
          ))
        )}

        {/* Pagination control */}
        <div className='flex gap-4 fixed bottom-8 right-8'>
          <button
            onClick={handlePrev}
            disabled={data?.currentPage === 1}
            className='btn btn-sm font-bold bg-white  disabled:text-gray-500 text-blue-600 border-2 border-indigo-500 '
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            disabled={data?.currentPage === data?.totalPage}
            className='btn disabled:text-gray-500 bg-white btn-sm border-2 font-bold text-blue-600 border-indigo-500 '
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
