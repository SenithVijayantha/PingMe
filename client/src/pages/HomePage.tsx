import { Menu, EllipsisVertical } from "lucide-react";

import { useChat } from "../../context/ChatContext";

import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";
import { Button } from "../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";

const HomePage = () => {
  const { selectedUser } = useChat();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden w-80 shrink-0 border-r bg-sidebar lg:block">
        <Sidebar />
      </aside>

      <main className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <div className="flex h-14 shrink-0 items-center gap-2 border-b px-3 lg:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon-sm" aria-label="Open chats" />
              }
            >
              <Menu />
            </SheetTrigger>
            <SheetContent
              side="left"
              showCloseButton={false}
              className="w-80 p-0 data-[side=left]:w-80"
            >
              <SheetTitle className="sr-only">Chats</SheetTitle>
              <Sidebar />
            </SheetContent>
          </Sheet>

          <span className="font-heading text-sm font-semibold tracking-widest uppercase">
            PingMe
          </span>

          {selectedUser && (
            <div className="ml-auto">
              <Sheet>
                <SheetTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Open contact details"
                    />
                  }
                >
                  <EllipsisVertical />
                </SheetTrigger>
                <SheetContent
                  side="right"
                  showCloseButton={false}
                  className="w-80 p-0 data-[side=right]:w-80"
                >
                  <SheetTitle className="sr-only">Contact details</SheetTitle>
                  <RightSidebar />
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>

        <ChatContainer />
      </main>

      {/* Desktop contact sidebar */}
      {selectedUser && (
        <aside className="hidden w-80 shrink-0 border-l bg-sidebar lg:block">
          <RightSidebar />
        </aside>
      )}
    </div>
  );
};

export default HomePage;
