import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/services/api.ts';

interface ChatsData {
  id: string;
  title: string;
  description: string;
}

const Message = () => {
  const navigate = useNavigate();

  const [chats, setChats] = useState<ChatsData[]>([]);

  const handleOpenRoom = (chat_id: string) => {
    navigate(`/rooms/${chat_id}`);
  };

  useEffect(() => {
    api.get('/user/chats').then(({ data }) => {
      setChats(data.joinedRooms);
    });
  }, []);

  return (
    <div className="flex h-screen w-[100%] flex-col justify-start gap-2 overflow-y-scroll">
      <h2 className="text-center text-lg font-bold">Messages</h2>

      {chats.map((chat) => {
        return (
          <button
            onClick={() => handleOpenRoom(String(chat.id))}
            key={`chat_${chat.id}`}
            className="flex h-[50px] max-h-[50px] min-h-[50px] w-[100%] flex-col items-center justify-center bg-zinc-300 transition hover:bg-green-300"
          >
            <span className="font-bold">{chat.title}</span>
            <span className="text-sm">{chat.description}</span>
          </button>
        );
      })}
      {chats.length === 0 && (
        <div className="text-center text-gray-400">Empty (TODO)</div>
      )}
    </div>
  );
};

export { Message };
