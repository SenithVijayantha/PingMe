import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import toast from "react-hot-toast";

import { useAuth } from "./AuthContext";
import type { Message, UnseenMessages, User } from "../src/types";

export interface ChatContextValue {
  messages: Message[];
  users: User[];
  selectedUser: User | null;
  getUsers: () => Promise<void>;
  sendMessage: (messageData: { text?: string; image?: string }) => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  setSelectedUser: Dispatch<SetStateAction<User | null>>;
  unseenMessages: UnseenMessages;
  setUnseenMessages: Dispatch<SetStateAction<UnseenMessages>>;
  isUploading: boolean;
}

export const ChatContext = createContext<ChatContextValue | null>(null);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [unseenMessages, setUnseenMessages] = useState<UnseenMessages>({});
  const [isUploading, setIsUploading] = useState(false);

  const { socket, axios } = useAuth();

  //   get all users for sidebar
  const getUsers = async () => {
    try {
      const { data } = await axios.get("/api/messages/users");
      if (data.success) {
        setUsers(data.users);
        setUnseenMessages(data.unseenMessages);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load users.");
    }
  };

  //   get messages for selected users
  const getMessages = async (userId: string) => {
    try {
      const { data } = await axios.get(`/api/messages/${userId}`);
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load messages.");
    }
  };

  //   send messages to selected user
  const sendMessage = async (messageData: { text?: string; image?: string }) => {
    if (!selectedUser) return;

    if (messageData.image) {
      setIsUploading(true);
    }
    try {
      const { data } = await axios.post(
        `/api/messages/send/${selectedUser._id}`,
        messageData
      );
      if (data.success) {
        setMessages((prevMessages) => [...prevMessages, data.newMessage]);
      } else {
        toast.error("Failed to send the message");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send the message");
    } finally {
      setIsUploading(false);
    }
  };

  // Listens for incoming messages via socket.
  // If the message is from the selected user, mark it as seen and add it to the chat.
  // Otherwise, increment the unseen message count for that sender.
  const subscribeToMessages = useCallback(() => {
    if (!socket) return;

    socket.on("newMessage", (newMessage: Message) => {
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        newMessage.seen = true;
        setMessages((prev) => [...prev, newMessage]);
        axios.put(`/api/messages/mark/${newMessage._id}`);
      } else {
        setUnseenMessages((prev) => ({
          ...prev,
          [newMessage.senderId]: (prev[newMessage.senderId] || 0) + 1,
        }));
      }
    });
  }, [socket, selectedUser, axios]);

  // Removes the 'newMessage' event listener to stop receiving real-time messages
  const unsubscribeFromMessages = useCallback(() => {
    if (socket) socket.off("newMessage");
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [socket, selectedUser, subscribeToMessages, unsubscribeFromMessages]);

  const value: ChatContextValue = {
    messages,
    users,
    selectedUser,
    getUsers,
    sendMessage,
    getMessages,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
    isUploading,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = (): ChatContextValue => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
