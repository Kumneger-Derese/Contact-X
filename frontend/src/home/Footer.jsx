import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className='min-h-16 font-semibold flex-col py-4 md:py-0 md:flex-row px-4 sm:px-12 bg-base-300 items-center justify-between text-slate-800 flex '>
      <a href='#home' className='float-end'>
        Kontact.io@2024
      </a>

      <div className='flex gap-5 items-center'>
        <Link to={'/'}>Home</Link>
        <p>Privacy Policy</p>
        <p>Help</p>
        <p>Feedback</p>
      </div>
    </footer>
  );
}
