import { useMemo } from "react";
import { CircleUser, LogOut } from "lucide-react";

import { useChat } from "../../context/ChatContext";
import { useAuth } from "../../context/AuthContext";
import type { Message } from "../types";
import { AvatarViewer } from "./AvatarViewer";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { ScrollArea } from "../components/ui/scroll-area";

const RightSidebar = () => {
  const { selectedUser, messages } = useChat();
  const { logout, onlineUsers } = useAuth();

  const mediaMessages = useMemo(
    () =>
      messages.filter(
        (msg): msg is Message & { image: string } => Boolean(msg.image)
      ),
    [messages]
  );

  if (!selectedUser) return null;

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="flex h-full flex-col bg-sidebar">
      {/* Profile */}
      <div className="flex shrink-0 flex-col items-center gap-3 border-b p-6">
        <AvatarViewer
          src={selectedUser.profilePic}
          alt={selectedUser.fullName}
        >
          <Avatar size="lg" className="size-20">
            {selectedUser.profilePic ? (
              <AvatarImage
                src={selectedUser.profilePic}
                alt={selectedUser.fullName}
              />
            ) : null}
            <AvatarFallback>
              <CircleUser className="size-10" />
            </AvatarFallback>
          </Avatar>
        </AvatarViewer>

        <div className="flex items-center gap-2">
          <span
            className={
              isOnline
                ? "size-2 rounded-full bg-emerald-500"
                : "size-2 rounded-full bg-muted-foreground/40"
            }
          />
          <h2 className="text-center font-heading text-lg font-semibold tracking-widest uppercase">
            {selectedUser.fullName}
          </h2>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          {selectedUser.bio || "No bio yet."}
        </p>
      </div>

      {/* Media */}
      <div className="min-h-0 flex-1 p-4">
        <p className="mb-3 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Media
        </p>

        {mediaMessages.length > 0 ? (
          <ScrollArea className="h-64 overflow-hidden">
            <div className="grid grid-cols-2 gap-2 pr-2">
              {mediaMessages.map((msg) => (
                <button
                  key={msg._id}
                  type="button"
                  onClick={() =>
                    window.open(msg.image, "_blank", "noopener,noreferrer")
                  }
                  className="overflow-hidden rounded-md border focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <img
                    src={msg.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-24 w-full object-cover transition-transform hover:scale-105"
                  />
                </button>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <p className="text-sm text-muted-foreground">No media found.</p>
        )}
      </div>

      {/* Logout */}
      <div className="shrink-0 border-t p-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => void logout()}
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default RightSidebar;
