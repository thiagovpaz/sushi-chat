import { useNavigate } from 'react-router-dom';
import { MessageCircle, DoorOpen } from 'lucide-react';

import { useAuth } from '@/contexts/auth-context';

const UserDetails = () => {
  const { user, signOut } = useAuth();

  const navigate = useNavigate();

  return (
    <div className="flex w-full justify-between p-3">
      <span>
        Welcome, <b>{user?.name}</b>!
      </span>

      <button title="Change Room" onClick={() => navigate('/rooms')}>
        <DoorOpen />
      </button>
      <button title="Messages" onClick={() => navigate('/messages')}>
        <MessageCircle />
      </button>

      <button className="hover:underline" onClick={signOut}>
        Logout
      </button>
    </div>
  );
};

export { UserDetails };
