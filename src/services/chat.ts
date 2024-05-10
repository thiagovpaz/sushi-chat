import { io, Socket } from 'socket.io-client';

interface IMessageData {
  id?: string;
  content?: string;
  owner?: { id?: string; name?: string };
  room_id?: string;
  created_at?: Date;
}

interface IMessageHandler {
  message: (data: IMessageData) => void;
  isTyping: (name: string) => void;
}

class ChatService {
  private readonly socket: Socket = io(import.meta.env.VITE_APP_API_WS, {
    autoConnect: false,
  });

  connect(token: string) {
    this.socket.auth = { token };
    this.socket.connect();
  }

  sendMessage(data: IMessageData) {
    this.socket.emit('message', data);
  }

  notifyTyping(roomId: string, username: string) {
    this.socket.emit('isTyping', { roomId, username });
  }

  subscribeToMessages(messageHandler: IMessageHandler['message']) {
    this.socket.on('message', messageHandler);
  }

  joinRoom(roomId: string) {
    this.socket.emit('join', roomId);
  }

  leaveRoom(roomId: string) {
    this.socket.emit('leave', roomId);
  }

  subscribeToTypingNotifications(
    typingNotificationsHandler: IMessageHandler['isTyping'],
  ) {
    this.socket.on('isTyping', typingNotificationsHandler);
  }

  disconnect() {
    this.socket.disconnect();
  }
}

export const chat = new ChatService();
