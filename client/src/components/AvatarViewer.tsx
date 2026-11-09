import type { ReactNode } from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type AvatarViewerProps = {
  src?: string | null;
  alt: string;
  children: ReactNode;
  className?: string;
};

/**
 * Wraps an avatar in a clickable trigger and opens the image in a full-size
 * lightbox. When no image is available the avatar is rendered untouched.
 */
export function AvatarViewer({
  src,
  alt,
  children,
  className,
}: AvatarViewerProps) {
  if (!src) return <>{children}</>;

  const label = alt ? `View ${alt}'s profile picture` : "View profile picture";

  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger
        render={
          <button
            type="button"
            aria-label={label}
            title={label}
            className={cn(
              "group/avatar-viewer relative inline-flex shrink-0 cursor-zoom-in rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              className
            )}
          />
        }
      >
        {children}
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />

        <DialogPrimitive.Popup className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 outline-none transition duration-200 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
          <DialogPrimitive.Title className="sr-only">
            {alt || "Profile picture"}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Full size profile picture{alt ? ` of ${alt}` : ""}.
          </DialogPrimitive.Description>

          <div className="relative">
            <img
              src={src}
              alt={alt}
              draggable={false}
              className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-2xl ring-1 ring-white/10"
            />

            <DialogPrimitive.Close
              render={
                <Button
                  variant="secondary"
                  size="icon-sm"
                  aria-label="Close image preview"
                  className="absolute top-2 right-2 bg-background/80 backdrop-blur hover:bg-background"
                />
              }
            >
              <X />
            </DialogPrimitive.Close>
          </div>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
