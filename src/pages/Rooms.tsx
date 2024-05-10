import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { TextInput } from '@/components/TextInput';

import { api } from '@/services/api';

const RoomSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

interface RoomData {
  id?: string;
  title: string;
  description: string;
}
const Rooms = () => {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState<RoomData[]>([]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RoomData>({
    resolver: zodResolver(RoomSchema),
  });

  const handleEnterInRoom = useCallback(
    (room_id: string) => {
      navigate(`/rooms/${room_id}`);
    },
    [navigate],
  );

  const onCreateRoom = useCallback(
    async (roomData: RoomData) => {
      try {
        const { data } = await toast.promise(api.post('/rooms', roomData), {
          pending: 'Creating',
          success: 'Created',
          error: 'Failed to create',
        });

        setRooms((oldState) => [...oldState, data]);

        navigate(`/rooms/${data.id}`);
      } catch (e) {
        console.log(e);
      }
    },
    [navigate],
  );

  useEffect(() => {
    api.get('/rooms').then(({ data }) => {
      setRooms(data);
    });
  }, []);

  return (
    <>
      <h2 className="mt-10 text-xl font-bold">Enter in our rooms</h2>

      <div className="flex max-h-[260px] w-full flex-wrap gap-1 overflow-scroll p-10">
        {rooms.map((room) => (
          <button
            onClick={() => handleEnterInRoom(room.id!)}
            key={room.id}
            className="h-[30px] w-[80px] rounded-md bg-amber-500 transition hover:bg-amber-400"
            title={room.description}
          >
            {room.title}
          </button>
        ))}
        {rooms.length === 0 && (
          <div className="w-full text-center">No Rooms 😞</div>
        )}
      </div>

      <div className="my-5 flex font-bold">OR</div>

      <form
        onSubmit={handleSubmit(onCreateRoom)}
        className="flex w-full flex-col gap-2 px-3"
      >
        <>
          <TextInput
            placeholder="Your title"
            {...register('title')}
            error={errors.title}
          />
          <TextInput
            placeholder="Our little peace of heaven"
            {...register('description')}
            error={errors.description}
          />
          <Button type="submit">Create Your Room</Button>
        </>
      </form>
    </>
  );
};

export { Rooms };
