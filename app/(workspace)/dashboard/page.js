"use client";

import {
  ChevronRight,
  ChevronDown,
  EllipsisVertical,
  BadgeAlert,
  User2,
} from "lucide-react";
import { useState } from "react";
import cn from "@/lib/cn";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
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

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  const viewBox = isOpen ? "0 4 24 24" : "0 0 10 24";
  const classNames = cn(
    "flex w-full flex-col items-start gap-0 transition-all [&[data-state=open]>div>svg]:rotate-90",
  );

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="w-1/2 space-y-4 p-4">
      <div className="flex items-start justify-between">
        <Accordion type="single" collapsible className="flex-1">
          <AccordionItem outline={false} value="contractors">
            <AccordionTrigger
              arrow={false}
              className="grid grid-cols-[16px_24px_1fr] gap-2 text-justify [&[data-state=open]>.accordion-arrow]:rotate-90"
            >
              <ChevronRight className="accordion-arrow shrink-0 transition-transform duration-150" />
              <ContractorIcon />
              <div className=" text-xl font-normal subpixel-antialiased">
                Contractors
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <div className="mt-2 grid grid-cols-[48px_1fr] gap-2">
                <span></span>
                <ul className="leading-loose">
                  <li>Currently Hired</li>
                  <li>Onboarding</li>
                  <li>Work Pass</li>
                  <li>Renewal</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <DropdownMenuOne />
      </div>

      <div className="flex items-start justify-between">
        <Accordion type="single" collapsible className="flex-1">
          <AccordionItem outline={false} value="contractors">
            <AccordionTrigger
              arrow={false}
              className="grid grid-cols-[16px_24px_1fr] gap-2 text-justify [&[data-state=open]>.accordion-arrow]:rotate-90"
            >
              <ChevronRight className="accordion-arrow shrink-0 transition-transform duration-150" />
              <PayrollIcon />
              <div className=" text-xl font-normal subpixel-antialiased">
                Payroll
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <div className="mt-2 grid grid-cols-[48px_1fr] gap-2">
                <span></span>
                <ul className="leading-loose">
                  <li>Leaves</li>
                  <li>Timesheets</li>
                  <li>Claims</li>
                  <li>Recently Approved</li>
                  <li>Reports</li>
                  <li>Apr 24</li>
                  <li>May 24</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <DropdownMenuOne />
      </div>
    </div>
  );
}

const DropdownMenuOne = () => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        asChild
        onPointerDown={(e) => {
          e.preventDefault();
        }}
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <Button
          variant="ghost"
          prefix={<EllipsisVertical />}
          className="py-0"
        />
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

const ContractorIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={24}
      width={24}
    >
      <path
        d="M21.5 0h-19A2.5 2.5 0 0 0 0 2.5v19A2.5 2.5 0 0 0 2.5 24h19a2.5 2.5 0 0 0 2.5 -2.5v-19A2.5 2.5 0 0 0 21.5 0Zm-17 18.25a1.5 1.5 0 1 1 -1.5 1.5 1.5 1.5 0 0 1 1.5 -1.5Zm-1.5 -6a1.5 1.5 0 1 1 1.5 1.5 1.5 1.5 0 0 1 -1.5 -1.5ZM5.5 16A1.5 1.5 0 1 1 7 17.5 1.5 1.5 0 0 1 5.5 16ZM8 12.25a1.5 1.5 0 1 1 1.5 1.5 1.5 1.5 0 0 1 -1.5 -1.5Zm1.5 6a1.5 1.5 0 1 1 -1.5 1.5 1.5 1.5 0 0 1 1.5 -1.5Zm1 -2.25a1.5 1.5 0 1 1 1.5 1.5 1.5 1.5 0 0 1 -1.5 -1.5Zm2.5 -3.75a1.5 1.5 0 1 1 1.5 1.5 1.5 1.5 0 0 1 -1.5 -1.5Zm1.5 6a1.5 1.5 0 1 1 -1.5 1.5 1.5 1.5 0 0 1 1.5 -1.5Zm1 -2.25a1.5 1.5 0 1 1 1.5 1.5 1.5 1.5 0 0 1 -1.5 -1.5Zm4 2.25a1.5 1.5 0 1 1 -1.5 1.5 1.5 1.5 0 0 1 1.5 -1.5Zm0 -4.5a1.5 1.5 0 1 1 1.5 -1.5 1.5 1.5 0 0 1 -1.5 1.5Z"
        fill="currentcolor"
        strokeWidth={1}
      />
    </svg>
  );
};

const PayrollIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <g fill="#000" fillRule="nonzero">
        <path d="M10.468 11.234a.255.255 0 0 0 .255-.255V.255A.255.255 0 0 0 10.468 0H3.83A3.83 3.83 0 0 0 0 3.83v7.149c0 .14.114.255.255.255h10.213ZM7.915 7.149H6.383a.255.255 0 0 0-.255.255v1.532a.766.766 0 0 1-1.532 0V7.404a.255.255 0 0 0-.256-.255H2.81a.766.766 0 1 1 0-1.532H4.34a.255.255 0 0 0 .256-.255V3.83a.766.766 0 0 1 1.532 0v1.532c0 .14.114.255.255.255h1.532a.766.766 0 0 1 0 1.532ZM12.255 10.979c0 .14.115.255.256.255h11.234a.255.255 0 0 0 .255-.255v-7.15A3.83 3.83 0 0 0 20.17 0h-7.66a.255.255 0 0 0-.255.255V10.98Zm7.915-3.83h-5.106a.766.766 0 0 1 0-1.532h5.106a.766.766 0 0 1 0 1.532ZM10.723 13.021a.255.255 0 0 0-.255-.255H.255a.255.255 0 0 0-.255.255v7.15A3.83 3.83 0 0 0 3.83 24h6.638a.255.255 0 0 0 .255-.255V13.02ZM2.81 16.085a.766.766 0 1 1 1.02-1.021l1.318 1.317a.255.255 0 0 0 .368 0l1.379-1.317a.766.766 0 1 1 1.02 1.021l-1.286 1.348a.255.255 0 0 0 0 .368l1.287 1.348c.26.29.26.73 0 1.021-.29.26-.73.26-1.021 0l-1.348-1.287a.255.255 0 0 0-.368 0L3.83 20.17c-.291.26-.73.26-1.021 0a.766.766 0 0 1 0-1.021l1.317-1.318a.255.255 0 0 0 0-.367l-1.317-1.379ZM12.51 12.766a.255.255 0 0 0-.255.255v10.724c0 .14.115.255.256.255h7.66A3.83 3.83 0 0 0 24 20.17v-7.149a.255.255 0 0 0-.255-.255H12.51Zm1.788 3.83a.776.776 0 0 1 .766-.766h5.106a.766.766 0 0 1 0 1.532h-5.106a.776.776 0 0 1-.766-.766Zm.766 2.298h5.106a.766.766 0 0 1 0 1.532h-5.106a.766.766 0 1 1 0-1.532Z" />
      </g>
    </svg>
  );
};
