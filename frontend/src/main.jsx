import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './app/store.js';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import ProtectedRoute from './screens/ProtectedRoute.jsx';
import ContactScreen from './Contacts/ContactScreen.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import CreateContact from './Contacts/CreateContact.jsx';
import EditContact from './Contacts/EditContact.jsx';
import ContactDetail from './Contacts/ContactDetail.jsx';
import HomePage from './home/HomePage.jsx';
import Contacts from './Contacts/Contacts.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} errorElement={<ErrorPage />}>
      <Route index={true} path='/' element={<HomePage />}></Route>
      <Route path='/register' element={<RegisterScreen />}></Route>
      <Route path='/login' element={<LoginScreen />}></Route>

      <Route path='' element={<ProtectedRoute />}>
        <Route path='/contacts' element={<ContactScreen />}>
          <Route index element={<Contacts />} />
        </Route>

        <Route path='/contact-detail/:id' element={<ContactDetail />}></Route>
        <Route path='/create-contact' element={<CreateContact />}></Route>
        <Route path='/edit-contact/:id' element={<EditContact />}></Route>
        <Route path='/profile' element={<ProfileScreen />}></Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
