import Contacts from './Contacts';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import { Outlet } from 'react-router-dom';

export default function ContactScreen() {
  return (
    <div className='relative'>
      <Navbar />
      <SideBar />
      <Outlet />
    </div>
  );
}
