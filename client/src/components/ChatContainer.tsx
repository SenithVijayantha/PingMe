import { useRef, useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  CircleUser,
  ImagePlus,
  Loader2,
  MessageSquare,
  Send,
} from "lucide-react";
import toast from "react-hot-toast";

import { avatarIcon } from "../assets/assets";
import { formatDate, cn } from "@/lib/utils";
import { useChat } from "../../context/ChatContext";
import { useAuth } from "../../context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scroll-area";

const ChatContainer = () => {
  const {
    messages,
    selectedUser,
    sendMessage,
    getMessages,
    isUploading,
  } = useChat();
  const { authUser, onlineUsers } = useAuth();

  const scrollEnd = useRef<HTMLDivElement>(null);

  const [messageTextInput, setMessageTextInput] = useState("");

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (messageTextInput.trim() === "") return;

    await sendMessage({ text: messageTextInput.trim() });
    setMessageTextInput("");
  };

  const handleSendImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const file = input.files?.[0];

    if (!file || !file.type.startsWith("image/")) {
      toast.error("Select an image file");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = async () => {
      if (typeof reader.result === "string") {
        await sendMessage({ image: reader.result });
      }
      input.value = "";
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!authUser) return null;

  if (!selectedUser) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-muted">
          <MessageSquare className="size-8 text-muted-foreground" />
        </div>
        <div>
          <p className="font-heading text-lg font-semibold tracking-widest uppercase">
            Ping Me
          </p>
          <p className="text-sm text-muted-foreground">
            Chat with anyone around the world.
          </p>
        </div>
      </div>
    );
  }

  const isSelectedUserOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-3 border-b px-4">
        <Avatar className="size-9">
          {selectedUser.profilePic ? (
            <AvatarImage
              src={selectedUser.profilePic}
              alt={selectedUser.fullName}
            />
          ) : null}
          <AvatarFallback>
            <CircleUser className="size-4" />
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">
            {selectedUser.fullName}
          </p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span
              className={cn(
                "size-1.5 rounded-full",
                isSelectedUserOnline
                  ? "bg-emerald-500"
                  : "bg-muted-foreground/40"
              )}
            />
            {isSelectedUserOnline ? "Online" : "Offline"}
          </p>
        </div>
      </header>

      {/* Messages */}
      <ScrollArea className="min-h-0 flex-1 overflow-hidden">
        <div className="flex flex-col gap-4 p-4">
          {messages.map((msg) => {
            const isMine = msg.senderId === authUser._id;
            const avatarSrc = isMine
              ? authUser.profilePic
              : selectedUser.profilePic;

            return (
              <div
                key={msg._id}
                className={cn(
                  "flex items-end gap-2",
                  isMine && "flex-row-reverse"
                )}
              >
                <Avatar size="sm">
                  {avatarSrc ? (
                    <AvatarImage src={avatarSrc} alt="" />
                  ) : (
                    <AvatarImage src={avatarIcon} alt="" />
                  )}
                  <AvatarFallback>
                    <CircleUser className="size-3" />
                  </AvatarFallback>
                </Avatar>

                <div
                  className={cn(
                    "flex max-w-[75%] flex-col gap-1",
                    isMine ? "items-end" : "items-start"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm break-words",
                      isMine
                        ? "rounded-br-none bg-primary text-primary-foreground"
                        : "rounded-bl-none bg-muted text-foreground"
                    )}
                  >
                    {msg.image ? (
                      <img
                        src={msg.image}
                        alt="Attachment"
                        className="max-h-64 max-w-full rounded-md object-cover"
                      />
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    )}
                  </div>
                  <time className="text-[10px] text-muted-foreground">
                    {formatDate(msg.createdAt)}
                  </time>
                </div>
              </div>
            );
          })}
          <div ref={scrollEnd} />
        </div>
      </ScrollArea>

      {/* Composer */}
      <form
        onSubmit={handleSendMessage}
        className="flex shrink-0 items-center gap-2 border-t p-3"
      >
        <Input
          type="text"
          value={messageTextInput}
          onChange={(e) => setMessageTextInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
          autoComplete="off"
        />

        <input
          id="send-images"
          type="file"
          accept="image/png, image/jpeg"
          hidden
          onChange={handleSendImage}
        />

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Attach image"
          onClick={() => document.getElementById("send-images")?.click()}
        >
          <ImagePlus />
        </Button>

        <Button
          type="submit"
          size="icon-sm"
          aria-label="Send message"
          disabled={isUploading}
        >
          {isUploading ? <Loader2 className="animate-spin" /> : <Send />}
        </Button>
      </form>
    </div>
  );
};

export default ChatContainer;
