import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const { userInfo } = useSelector((store) => store.auth);

  return userInfo ? <Outlet /> : <Navigate to={'/login'} />;
}
