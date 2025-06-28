import { Outlet } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <div className={``}>
      <Outlet />
      <ToastContainer
        position='top-center'
        pauseOnFocusLoss={false}
        transition={Zoom}
        autoClose={2000}
        progressStyle={{ background: 'none' }}
      />
    </div>
  );
}
