import { createBrowserRouter } from 'react-router-dom';

import { PrivateRoute } from '@/components/PrivateRoute';

import { App } from '@/App';
import { SignIn } from '@/pages/SignIn';
import { SignUp } from '@/pages/SignUp';
import { Rooms } from '@/pages/Rooms';
import { NoMatch } from '@/pages/NoMatch';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    errorElement: <NoMatch />,
  },
  {
    path: '/rooms',
    element: (
      <PrivateRoute>
        <Rooms />
      </PrivateRoute>
    ),
  },
  {
    path: '/signin',
    element: (
      <PrivateRoute checkAuth>
        <SignIn />
      </PrivateRoute>
    ),
  },
  {
    path: '/signup',
    element: (
      <PrivateRoute checkAuth>
        <SignUp />
      </PrivateRoute>
    ),
  },
]);

export { router };
