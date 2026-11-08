import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import type { Socket } from "socket.io-client";

import type {
  AuthState,
  ProfileUpdate,
  User,
  UserCredentials,
} from "../src/types";

const backendUrl = import.meta.env.VITE_BACKEND_URL as string;
axios.defaults.baseURL = backendUrl;
axios.defaults.withCredentials = true;

export interface AuthContextValue {
  axios: typeof axios;
  authUser: User | null;
  onlineUsers: string[];
  socket: Socket | null;
  login: (state: AuthState, credentials: UserCredentials) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (body: ProfileUpdate) => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : "Something went wrong";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  // checks if user is authenticated
  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/check", {
        withCredentials: true,
      });
      if (data.success) {
        setAuthUser(data.user);
        connectSocket(data.user);
      } else {
        setAuthUser(null);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  //   handle user authentication and socket connection
  const login = async (state: AuthState, credentials: UserCredentials) => {
    try {
      const { data } = await axios.post(`/api/auth/${state}`, credentials);
      if (data.success) {
        setAuthUser(data.userData);
        connectSocket(data.userData);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  //   handle user log out and socket disconnection
  const logout = async () => {
    const { data } = await axios.post("/api/auth/logout");

    if (data.success) {
      setAuthUser(null);
      setOnlineUsers([]);
      socket?.disconnect();
      toast.success(data.message);
    }
  };

  //   handle user profile updates
  const updateProfile = async (body: ProfileUpdate) => {
    try {
      const { data } = await axios.put("/api/auth/update-profile", body);
      if (data.success) {
        setAuthUser(data.user);
        toast.success(data.message);
      }
    } catch {
      toast.error("We couldn't update your profile. Please try again.");
    }
  };

  //   handle socket connection and online users updates
  const connectSocket = (userData: User) => {
    if (!userData || socket?.connected) return;
    const newSocket = io(backendUrl, {
      query: {
        userId: userData._id,
      },
    });
    newSocket.connect();
    setSocket(newSocket);
    newSocket.on("getOnlineUsers", (userIds: string[]) => {
      setOnlineUsers(userIds);
    });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (authUser) {
      connectSocket(authUser);
    }
  }, [authUser]);

  const value: AuthContextValue = {
    axios,
    authUser,
    onlineUsers,
    socket,
    login,
    logout,
    updateProfile,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
