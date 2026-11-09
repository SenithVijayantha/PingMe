import {
  memo,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CircleUser,
  EllipsisVertical,
  LogOut,
  Pencil,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router";

import icon from "../assets/icon.svg";
import { useAuth } from "../../context/AuthContext";
import { useChat } from "../../context/ChatContext";
import type { User } from "../types";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scroll-area";

const preloadProfilePage = () => {
  void import("../pages/ProfilePage");
};

type UserRowProps = {
  user: User;
  isSelected: boolean;
  isOnline: boolean;
  unseenCount: number;
  onSelect: (user: User) => void;
};

// Memoized so one user's status/count update does not re-render every row.
const UserRow = memo(function UserRow({
  user,
  isSelected,
  isOnline,
  unseenCount,
  onSelect,
}: UserRowProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(user)}
      className={cn(
        "flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none",
        isSelected && "bg-accent"
      )}
    >
      <Avatar className="size-9">
        {user.profilePic ? (
          <AvatarImage src={user.profilePic} alt={user.fullName} />
        ) : null}
        <AvatarFallback>
          <CircleUser className="size-4" />
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{user.fullName}</p>
        <p
          className={cn(
            "flex items-center gap-1.5 text-xs",
            isOnline
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-muted-foreground"
          )}
        >
          <span
            className={cn(
              "size-1.5 rounded-full",
              isOnline ? "bg-emerald-500" : "bg-muted-foreground/40"
            )}
          />
          {isOnline ? "Online" : "Offline"}
        </p>
      </div>

      {unseenCount > 0 ? (
        <Badge className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] leading-none text-primary-foreground">
          {unseenCount}
        </Badge>
      ) : null}
    </button>
  );
});

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
  } = useChat();
  const { logout, onlineUsers } = useAuth();
  const [searchInput, setSearchInput] = useState("");
  const deferredSearchInput = useDeferredValue(searchInput);
  const navigate = useNavigate();

  const normalizedQuery = deferredSearchInput.trim().toLowerCase();

  const onlineUserIds = useMemo(() => new Set(onlineUsers), [onlineUsers]);

  const filteredUsers = useMemo(
    () =>
      normalizedQuery
        ? users.filter((user) =>
            user.fullName.toLowerCase().includes(normalizedQuery)
          )
        : users,
    [users, normalizedQuery]
  );

  const handleSelectUser = useCallback(
    (user: User) => {
      setSelectedUser(user);
      setUnseenMessages((prev) => {
        if (!prev[user._id]) return prev;
        return { ...prev, [user._id]: 0 };
      });
    },
    [setSelectedUser, setUnseenMessages]
  );

  useEffect(() => {
    void getUsers();
    // getUsers is intentionally omitted: the chat provider recreates it on
    // every render, so depending on it would trigger a fetch loop.
  }, [onlineUsers]);

  return (
    <div className="flex h-full flex-col bg-sidebar">
      {/* Header */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b px-4">
        <div className="flex items-center gap-2">
          <img src={icon} alt="" className="size-5" />
          <span className="font-heading text-base font-semibold tracking-widest uppercase">
            PingMe
          </span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon-sm" aria-label="Open menu" />
            }
          >
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem
              onClick={() => navigate("/profile")}
              onMouseEnter={preloadProfilePage}
              onFocus={preloadProfilePage}
            >
              <Pencil />
              Edit Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => void logout()}
            >
              <LogOut />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Search */}
      <div className="shrink-0 p-3">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-0 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            name="search-user"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search user..."
            className="pl-6"
            autoComplete="off"
          />
        </div>
      </div>

      {/* Chats */}
      <ScrollArea className="min-h-0 flex-1 overflow-hidden">
        <div className="flex flex-col gap-1 px-2 pb-3">
          {filteredUsers.map((user) => (
            <UserRow
              key={user._id}
              user={user}
              isSelected={selectedUser?._id === user._id}
              isOnline={onlineUserIds.has(user._id)}
              unseenCount={unseenMessages[user._id] ?? 0}
              onSelect={handleSelectUser}
            />
          ))}

          {filteredUsers.length === 0 ? (
            <p className="px-2 py-6 text-center text-sm text-muted-foreground">
              No users found.
            </p>
          ) : null}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
