import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DUMMY = Array.from({ length: 20 }, (_, k) => k + 1).map((c) => ({
  name: `CHAT ${c} `,
  id: c + 1,
}));

const Message = () => {
  const navigate = useNavigate();

  const [chats, _] = useState(DUMMY);

  const handleOpenRoom = (chat_id: string) => {
    navigate(`/rooms/${chat_id}`);
  };

  return (
    <div className="flex h-screen w-[100%] flex-col justify-start gap-2 overflow-y-scroll">
      <h2 className="text-center text-lg font-bold">Messages</h2>

      {chats.map((chat) => {
        return (
          <button
            onClick={() => handleOpenRoom(String(chat.id))}
            key={`chat_${chat.id}`}
            className="flex h-[50px] max-h-[50px] min-h-[50px] w-[100%] items-center justify-center bg-zinc-300 transition hover:bg-green-300"
          >
            <span className="font-bold">{chat.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export { Message };
