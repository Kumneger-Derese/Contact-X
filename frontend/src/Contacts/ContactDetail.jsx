import {
  useDeleteContactMutation,
  useGetContactQuery,
} from '../slices/contactApiSlice';
import { HiStar } from 'react-icons/hi2';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AiOutlineCopy, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import LoadingSkeleton from '../components/LoadingSkeleton';

export default function ContactDetail() {
  const { id } = useParams();
  const { data: contact, isLoading } = useGetContactQuery(id);

  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();
  const navigate = useNavigate();

  if (isLoading || isDeleting) {
    return (
      <div className='p-64 flex justify-center items-center bg-black bg-opacity-40 z-50'>
        <LoadingSkeleton />
      </div>
    );
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this contact?'
    );
    if (!confirmDelete) return;

    // If the user confirms, proceed with deletion
    try {
      await deleteContact({ id, publicId: contact?.image?.public_id });
      navigate('/contacts');
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to delete contact');
    }
  };

  const handleClipBoard = () => {
    navigator.clipboard.writeText(`0${contact.phone}`);
    toast.success(`Contact Copied: 0${contact.phone}`);
  };

  return (
    <div className='flex justify-center px-4 sm:mx-auto items-center min-h-screen w-full'>
      <section className='p-8 m-6 sm:m-0 rounded-box bg-black text-gray-300 px-12 w-full sm:w-4/6'>
        {/* User Info */}
        <div className='flex flex-col text-xl mb-8 gap-y-4 font-bold'>
          <h1>
            Name:{' '}
            <span className='text-base font-normal text-stone-400 ml-2'>
              {contact?.name}
            </span>
          </h1>
          <h2>
            Phone:{' '}
            <span className='text-base font-normal text-stone-400 ml-2'>
              0{contact?.phone}
            </span>
          </h2>
          <p>
            Category:{' '}
            <span className='text-base font-normal text-stone-400 ml-2'>
              {contact?.category}
            </span>
          </p>
        </div>

        {/* Favorite */}
        <div className='text-2xl flex items-center gap-x-8'>
          <span className='text-xl'>Fav:</span>
          {contact?.favorite ? (
            <HiStar className='text-yellow-400' />
          ) : (
            <HiStar className='text-white/85' />
          )}
        </div>

        {/* Action Button */}
        <div className='flex gap-x-4 mt-8 justify-between'>
          <Link
            to={`/edit-contact/${contact?._id}`}
            className='btn btn-primary '
          >
            <AiOutlineEdit /> Edit
          </Link>

          <button onClick={handleClipBoard} className='btn btn-success'>
            <AiOutlineCopy /> Copy
          </button>

          <button
            onClick={() => handleDelete(contact?._id)}
            className='btn btn-error'
          >
            <AiOutlineDelete /> Delete
          </button>
        </div>
      </section>
    </div>
  );
}
