import { Button } from '@/components/Button';

import { useAuth } from '@/contexts/auth-context';

const Rooms = () => {
  const { signOut } = useAuth();

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-[200px] px-3">
        <Button onClick={signOut}>Logout</Button>
      </div>
    </div>
  );
};

export { Rooms };
