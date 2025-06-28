import { HiCheckCircle, HiIdentification, HiPhone } from 'react-icons/hi2';
import { featuresData } from '../constants';

export default function Features() {
  return (
    <div className='mx-auto' id='features'>
      <h1 className='my-14 text-center font-bold text-3xl md:text-4xl'>
        Features
      </h1>

      <div className='flex flex-col sm:flex-row flex-wrap gap-4 mx-8 sm:mx-auto  items-center justify-center'>
        {featuresData.map(({ id, icon: Icon, title, description }) => (
          <section
            key={id}
            className='card flex w-72 flex-col  min-h-72 bg-base-30 border mb-8 md:mb-0 p-8'
          >
            <p className='avatar size-16 mb-4 flex items-center justify-center mx-auto rounded-full  bg-stone-200 '>
              <Icon
                className='mx-auto  text-sky-600 hover:shadow-lg hover:scale-105 duration-30'
                size={32}
              />
            </p>

            <h2 className='font-bold text-lg text-center mb-2'>{title}</h2>
            <p className='tracking-wide font-medium text-base text-gray-600'>
              {description}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
