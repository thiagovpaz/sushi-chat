import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { TextInput } from '@/components/TextInput';

const RoomSchema = z.object({
  room_name: z.string().min(1),
});

interface RoomData {
  room_name: string;
}
const Rooms = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RoomData>({
    resolver: zodResolver(RoomSchema),
  });
  const handleEnterInRoom = useCallback((room_id: string) => {
    navigate(`/rooms/${room_id}`);
  }, []);

  const onCreateRoom = useCallback((_: RoomData) => {
    navigate(`/rooms/${new Date().getTime()}`);
  }, []);

  return (
    <>
      <h2 className="mt-10 text-xl font-bold">Enter in our rooms</h2>

      <div className="flex max-h-[260px] w-full flex-wrap gap-1 overflow-scroll p-10">
        {Array.from({ length: 100 }, (_, i) => i).map((v) => (
          <button
            onClick={() => handleEnterInRoom(String(v + 1))}
            key={`room_${v}`}
            className="h-[30px] w-[80px] rounded-md bg-amber-500 transition hover:bg-amber-400"
          >
            ROOM {v + 1}
          </button>
        ))}
      </div>

      <div className="my-5 flex font-bold">OR</div>

      <form
        onSubmit={handleSubmit(onCreateRoom)}
        className="flex w-full flex-col gap-2 px-3"
      >
        <>
          <TextInput
            placeholder="Your little peace of heaven"
            {...register('room_name')}
            error={errors.room_name}
          />
          <Button type="submit">Create Your Room</Button>
        </>
      </form>
    </>
  );
};

export { Rooms };
