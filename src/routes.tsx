import { createBrowserRouter } from 'react-router-dom';

import { App } from '@/App';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
]);

export { router };
