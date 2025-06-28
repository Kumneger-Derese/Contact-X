/* eslint-disable react/prop-types */
import { HiStar } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ContactCard({ contact }) {
  const handleClipBoard = (contact) => {
    navigator.clipboard.writeText(`0${contact.phone}`);
    toast.success(`Contact Copied: 0${contact.phone}`);
  };

  return (
    <div className='w-full lg:w-5/6'>
      <ul className=' bg-neutral-600 text-white rounded-box shadow-md'>
        <li className='flex items-center gap-4 p-3'>
          {/* Contact image */}
          <div>
            <img
              src={contact?.image?.url}
              alt={contact?.name}
              className='size-12 rounded-full text-neutral p-1 object-center'
            />
          </div>

          {/* Contact details */}
          <div>
            <h2 className='text-base sm:font-semibold capitalize'>
              {contact.name}
            </h2>
            <div className='text-xs sm:font-semibold opacity-60'>
              0{contact.phone.toString().substring(0, 9)}
            </div>
            <div className='text-xs sm:font-semibold opacity-60'>
              #{contact.category}
            </div>
          </div>

          {/* Favorite star */}
          <div className='text-2xl'>
            {contact.favorite ? (
              <HiStar className='text-yellow-400' />
            ) : (
              <HiStar className='text-gray-50' />
            )}
          </div>

          {/* Action Button Group */}
          <div className='flex items-center gap-2 ml-auto'>
            {/* Copy btn */}
            <button
              to={`/contact-detail/${contact._id}`}
              className='btn btn-sm btn-primary text-gray-300'
              onClick={() => handleClipBoard(contact)}
            >
              Copy
            </button>

            {/* More btn */}
            <Link
              to={`/contact-detail/${contact._id}`}
              className='btn btn-sm btn-primary text-gray-300'
            >
              More
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
}
