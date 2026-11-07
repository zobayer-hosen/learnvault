"use client";

import { Menu, X } from "lucide-react";
import { useRef } from "react";
import { Logo } from "./logo";
import { SidebarContent } from "./sidebar-content";

export function MobileNav() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="-ml-1.5 flex size-9 items-center justify-center rounded-lg text-fg-muted hover:bg-surface-muted hover:text-fg lg:hidden"
        aria-label="Open navigation"
        aria-haspopup="dialog"
      >
        <Menu aria-hidden className="size-5" />
      </button>
      <dialog
        ref={dialogRef}
        aria-label="Navigation"
        onClick={(event) => {
          // Clicking the backdrop (the dialog element itself) closes the drawer.
          if (event.target === event.currentTarget) close();
        }}
        className="m-0 h-dvh max-h-none w-72 max-w-[85vw] border-r border-border bg-background p-0 text-fg open:animate-slide-in backdrop:bg-black/30 backdrop:backdrop-blur-[2px] lg:hidden"
      >
        <div className="flex h-full flex-col px-4 pt-4 pb-5">
          <div className="mb-6 flex items-center justify-between">
            <Logo />
            <button
              type="button"
              onClick={close}
              className="flex size-9 items-center justify-center rounded-lg text-fg-muted hover:bg-surface-muted hover:text-fg"
              aria-label="Close navigation"
            >
              <X aria-hidden className="size-5" />
            </button>
          </div>
          <SidebarContent onNavigate={close} />
        </div>
      </dialog>
    </>
  );
}
