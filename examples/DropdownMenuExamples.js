"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuEmptyIcon,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu";
import Button from "@/components/Button";
import { BadgeAlert, ChevronDown, User2 } from "lucide-react";
import { useState } from "react";

// onOpenChange, onPointerDown - https://github.com/radix-ui/primitives/issues/2418
const DropdownMenuExamples = () => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        asChild
        onPointerDown={(e) => e.preventDefault()}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Button
          variant="secondary"
          suffix={<ChevronDown size={24} color="black" />}
        >
          Menu
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent loop>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeAlert color="green" size={20} />
            Edit profile
            <DropdownMenuShortcut>⇧⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <DropdownMenuEmptyIcon />
            Edit profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <User2 size={20} />
            Open in LinkedIn
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <DropdownMenuEmptyIcon />
            <span className="text-red-500">Sync status</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <DropdownMenuEmptyIcon />
              Invite
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent loop>
                <DropdownMenuItem>Invite to project</DropdownMenuItem>
                <DropdownMenuItem>Invite to team</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Invite</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent loop>
                      <DropdownMenuItem>Invite to project</DropdownMenuItem>
                      <DropdownMenuItem>Invite to team</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <DropdownMenuEmptyIcon />
            Add to pipeline (1st beta afternoon)
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>
            <DropdownMenuEmptyIcon />
            More actions
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <DropdownMenuEmptyIcon />
            Edit profile
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuExamples;
