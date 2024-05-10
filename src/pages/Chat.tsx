import { useForm } from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';
import { SendHorizonal, Clock8 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { twMerge } from 'tailwind-merge';
import { useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { z } from 'zod';
import { animateScroll } from 'react-scroll';

import { Button } from '@/components/Button';
import { TextInput } from '@/components/TextInput';

import { useAuth } from '@/contexts/auth-context';

import { api } from '@/services/api';
import { chat } from '@/services/chat';

interface MessageData {
  id?: string;
  content?: string;
  owner?: { id?: string; name?: string };
  created_at?: Date;
}

const ChatSchema = z.object({
  content: z.string().min(1),
});

const Chat = () => {
  const { handleSubmit, register, reset } = useForm<MessageData>({
    resolver: zodResolver(ChatSchema),
  });

  const { id: room_id } = useParams();

  const { user } = useAuth();

  const [isTyping, setIsTyping] = useState('');
  const [messages, setMessages] = useState<MessageData[]>([]);

  const onMessageSent = useCallback(
    async ({ content }: MessageData) => {
      try {
        room_id &&
          chat.sendMessage({ content, room_id, owner: { id: user.id! } });
      } catch (e) {
        console.log(e);
      }

      reset();
    },
    [reset, room_id, user.id],
  );

  useEffect(() => {
    api.get(`/messages?roomId=${room_id}`).then(({ data }) => {
      setMessages(data);
      chat.joinRoom(room_id!);
      setTimeout(() => {
        animateScroll.scrollToBottom({
          containerId: 'messages',
        });
      }, 500);
    });
  }, [room_id]);

  useEffect(() => {
    return () => {
      room_id && chat.leaveRoom(room_id);
    };
  }, [room_id]);

  useEffect(() => {
    chat.subscribeToMessages((d) => {
      setMessages((oldState) => [...oldState, d]);

      setTimeout(() => {
        animateScroll.scrollToBottom({
          containerId: 'messages',
        });
      }, 500);
    });
  }, []);

  chat.subscribeToTypingNotifications((name) => {
    setIsTyping(name);
    setTimeout(() => {
      setIsTyping('');
    }, 2000);
  });

  return (
    <div className="flex max-h-screen w-full flex-1 flex-col overflow-hidden py-3">
      <div
        id="messages"
        className="flex flex-1 flex-col gap-2 overflow-y-scroll bg-gray-50 p-3"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={twMerge(
              'flex flex-col rounded-md bg-green-300 p-3',
              message?.owner?.id === user.id
                ? 'self-end bg-yellow-300 text-right'
                : 'self-start bg-green-300 text-left',
            )}
          >
            <div>
              <span className="font-bold">{message?.owner?.name}</span>:{' '}
              {message.content}
            </div>
            <span className="flex items-center justify-start gap-1 text-sm text-gray-400">
              <Clock8 className="w-3" />
              {formatDistanceToNow(message.created_at!, {})}
            </span>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="text-center text-gray-600">Nothing here!</div>
        )}
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
          {...register('content')}
          onKeyUp={() => {
            chat.notifyTyping(room_id!, user.name);
          }}
        />
        <Button
          type="submit"
          className="flex w-[20%] items-center justify-center rounded-bl-none rounded-tl-none border-l-0"
        >
          <SendHorizonal className="text-gray-600" />
        </Button>
      </form>
      <div className="h-3 text-sm">{!!isTyping && <span>{isTyping}</span>}</div>
    </div>
  );
};

export { Chat };
