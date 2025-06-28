import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className='min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-white to-indigo-50'>
      <div className='mx-auto pt-16 px-4 md:py-8'>
        <h1 className=' text-5xl text-center md:text-6xl mb-8 font-black  '>
          Contact <span className='text-blue-700 italic'>X</span> Made <br />{' '}
          <span className='text-[#006eff]'>
            Contact Management <br /> Breeze.
          </span>
        </h1>
        <p className='my-6 mx-auto text-center text-gray-600 '>
          Say goodbye to messy contact lists. Contact X makes managing people a
          breeze—fast, reliable, and effortless.
        </p>
        <section className='flex justify-center items-center w-1/6 gap-x-4 mx-auto'>
          <Link
            to={'/contacts'}
            className='text-white btn font-bold  md:text-md border-none bg-blue-600 hover:bg-blue-700 '
          >
            Get started
          </Link>

          <Link
            to={'/contacts'}
            className='text-gray-600 border border-gray-300 font-bold btn md:text-md btn-ghost'
          >
            Its Free 100%
          </Link>
        </section>
      </div>

      {/* <div className=' relative md:w-1/2  md:order-none'>
        <img
          src='../../asset/contac hero 1.png'
          alt='img'
          className=' w-[90%] md:w-[75%] hover:scale-105 duration-700 bg-cover mt-24 mx-auto'
        />
        <img
          src='../../asset/contact  2.png'
          alt='img'
          className='w-24 hidden md:block  transform hover:rotate-[360deg] duration-200 -rotate-45 absolute top-16 left-8 object-center mx-auto'
        />

        <img
          src='../../asset/contact 3.png'
          alt='img'
          className='w-24  hidden md:block hover:rotate-[360deg] duration-200 transform rotate-45 absolute top-16 right-8 object-center mx-auto'
        />

        <img
          src='../../asset/contact 4.png'
          alt='img'
          className='w-16  hidden md:block transform hover:rotate-[360deg] duration-200 rotate-45 absolute top-4 right-4 left-4 object-center mx-auto'
        />
      </div> */}
    </div>
  );
}
