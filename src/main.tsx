import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './global.css';
import 'react-toastify/dist/ReactToastify.css';

import { router } from './routes';
import { AuthProvider } from '@/contexts/auth-context';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <RouterProvider router={router} />
    <ToastContainer />
  </AuthProvider>,
);
