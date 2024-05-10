import { useForm } from 'react-hook-form';
import { useCallback, useState } from 'react';
import { SendHorizonal } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { TextInput } from '@/components/TextInput';

import { useAuth } from '@/contexts/auth-context';

const DUMMY = Array.from({ length: 2 }, (_, i) => i + 1).map((x) => {
  const isOwner = !!(x % 2);
  return {
    id: x + 1,
    message: 'Hello !!!!!',
    name: isOwner ? 'User A' : 'User B',
    owner: isOwner,
  };
});

interface ChatData {
  message: string;
}

const ChatSchema = z.object({
  message: z.string().min(1),
});

const Chat = () => {
  const { handleSubmit, register, reset } = useForm<ChatData>({
    resolver: zodResolver(ChatSchema),
  });

  const { user } = useAuth();

  const [messages, setMessages] = useState(DUMMY);

  const onMessageSent = useCallback(
    async ({ message }: ChatData) => {
      setMessages((oldState) => [
        ...oldState,
        {
          id: parseInt(new Date().getTime().toString()),
          message,
          owner: true,
          name: user.name,
        },
      ]);

      reset();
    },
    [reset, user.name],
  );

  return (
    <div className="flex max-h-screen w-full flex-1 flex-col overflow-hidden py-2">
      <div className="flex flex-1 flex-col gap-2 overflow-y-scroll bg-gray-50 p-3">
        {messages.map((message) => (
          <div
            key={`message_${message.id}`}
            className={twMerge(
              'flex rounded-md bg-green-300 p-3 text-right',
              message.owner
                ? 'self-end bg-yellow-300'
                : 'self-start bg-green-300',
            )}
          >
            <span className="font-bold">{message.name}</span>: OI?
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit(onMessageSent)}
        className="mt-2 flex w-[100%]"
        autoCapitalize="off"
        autoComplete="none"
      >
        <TextInput
          className="flex rounded-br-none rounded-tr-none border-r-0"
          placeholder="Type Here"
          {...register('message')}
        />
        <Button
          type="submit"
          className="flex w-[20%] items-center justify-center rounded-bl-none rounded-tl-none border-l-0"
        >
          <SendHorizonal className="text-gray-600" />
        </Button>
      </form>
    </div>
  );
};

export { Chat };
