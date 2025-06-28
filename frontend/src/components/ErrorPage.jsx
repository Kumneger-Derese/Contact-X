import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className=' mt-48 text-4xl font-bold text-red-300 grid place-content-center place-items-center'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i className='font-black text-red-400 mt-8'>
          {error.statusText || error.message}
        </i>
      </p>
    </div>
  );
}
