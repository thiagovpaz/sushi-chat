import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Button';

const NoMatch = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5">
      <div className="text-center">
        <h1 className="text-5xl">404</h1>
        <p>Not Found!</p>
      </div>

      <div className="w-[250px]">
        <Button onClick={() => navigate(-1)}>Back</Button>
      </div>
    </div>
  );
};

export { NoMatch };
