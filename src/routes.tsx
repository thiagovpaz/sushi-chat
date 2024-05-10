import { createBrowserRouter } from 'react-router-dom';

import { PrivateRoute } from '@/components/PrivateRoute';

import { AuthenticatedLayout } from '@/layouts/AuthenticatedLayout';

import { SignIn } from '@/pages/SignIn';
import { SignUp } from '@/pages/SignUp';
import { Rooms } from '@/pages/Rooms';
import { Chat } from '@/pages/Chat';
import { Message } from '@/pages/Message';
import { NoMatch } from '@/pages/NoMatch';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <AuthenticatedLayout />
      </PrivateRoute>
    ),
    errorElement: <NoMatch />,
    children: [
      {
        path: '/rooms',
        element: <Rooms />,
      },
      {
        path: '/rooms/:id',
        element: <Chat />,
      },
      {
        path: '/messages',
        element: <Message />,
      },
    ],
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
