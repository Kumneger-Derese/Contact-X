import { productBenefits } from '../constants';

export default function Product() {
  return (
    <div
      className=' my-16 md:my-32 mx-8 min-h-screen flex flex-col'
      id='product'
    >
      <h1 className='my-16 font-bold text-center text-3xl md:text-4xl'>
        Our Product
      </h1>

      <div className='flex gap-y-20 flex-col items-center'>
        <section className='lg:w-4/6 relative'>
          <img
            src='../../asset/product.png'
            alt='product.png'
            className='w-[100%] mb-16 lg:w-[80%] z-[2000] lg:mx-auto product-shadow'
          />
        </section>

        {/*Right section*/}
        <div className='flex flex-col flex-wrap sm:flex-row  text-gray-700 justify-center items-center gap-8'>
          {productBenefits.map(({ id, icon: Icon, content }) => (
            <section
              key={id}
              className='rounded-md w-72 min-h-72 flex justify-center items-center border p-4 gap-x-4 border-gray-400 rounded-box'
            >
              <p className='font-bold text-lg md:text-xl bg-blue-100 rounded-full p-4'>
                <Icon size={26} className='text-blue-500' />
              </p>
              <p>{content}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
