import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import {
  BadgeAlert,
  ChevronRight,
  EllipsisVertical,
  User2,
  Star,
} from "lucide-react";
import Input from "@/components/Input";
import { useState } from "react";
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

const AppBar = () => {
  //

  return (
    <div className="sticky inset-0 grid h-screen grid-rows-[auto,1fr,auto] space-y-3 bg-background p-4 text-gray-800 dark:text-gray-400">
      <div className="space-y-4">
        <div className="grid grid-cols-[16px,20px,1fr] items-center gap-2 rounded-full bg-amber-100 py-1 text-black dark:bg-amber-900 dark:text-amber-500">
          <HomeIcon className="col-start-2" />
          <span className="text-lg font-normal subpixel-antialiased">Home</span>
        </div>

        <div className="grid grid-cols-[16px,20px,1fr] items-center gap-2">
          <NotificationIcon className="col-start-2" />
          <span className="text-lg font-normal subpixel-antialiased">
            Notifications
          </span>
        </div>

        <div className="grid grid-cols-[16px,20px,1fr] items-center gap-2">
          <SearchIcon className="col-start-2" />
          <span className="text-lg font-normal subpixel-antialiased">
            Search...
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <div className="text-gray-500">WORKSPACE</div>
          <Input
            placeholder="Filter workspace"
            size="sm"
            prefix={<FilterIcon />}
            prefixStyling={false}
          />
        </div>
      </div>

      <div className="space-y-4 overflow-y-auto">
        <Accordion type="multiple" className="space-y-4">
          <AccordionItem outline={false} value="organizations">
            <AccordionTrigger
              arrow={false}
              className="grid grid-cols-[16px,20px,1fr] gap-2 text-justify [&[data-state=open]>.accordion-arrow]:rotate-90"
            >
              <ChevronRight className="accordion-arrow transition-transform duration-150" />
              <OrganizationIcon />
              <div className="flex items-center justify-between">
                <div className="text-lg font-normal subpixel-antialiased">
                  Organizations
                </div>
                <div onClick={(e) => e.stopPropagation()}></div>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <div className="mt-2 grid grid-cols-[44px,1fr] gap-2">
                <ul className="col-start-2 leading-loose">
                  <li>Subscriptions</li>
                  <li>Members</li>
                  <li>Access Rights</li>
                  <li>Governance</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem outline={false} value="projects">
            <AccordionTrigger
              arrow={false}
              className="grid grid-cols-[16px,20px,1fr] gap-2 text-justify [&[data-state=open]>.accordion-arrow]:rotate-90"
            >
              <ChevronRight className="accordion-arrow transition-transform duration-150" />
              <ProjectIcon />
              <div className="flex items-center justify-between">
                <div className="text-lg font-normal subpixel-antialiased">
                  Projects
                </div>
                <div onClick={(e) => e.stopPropagation()}></div>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <div className="mt-2 grid grid-cols-[44px,1fr] gap-2">
                <ul className="col-start-2 leading-loose">
                  <li>Quotations</li>
                  <li>Entitlements</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem outline={false} value="contractors">
            <AccordionTrigger
              arrow={false}
              className="grid grid-cols-[16px,20px,1fr] gap-2 text-justify [&[data-state=open]>.accordion-arrow]:rotate-90"
            >
              <ChevronRight className="accordion-arrow transition-transform duration-150" />
              <ContractorIcon />
              <div className="flex items-center justify-between">
                <div className="text-lg font-normal subpixel-antialiased">
                  Contractors
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  <div className="rounded-full border border-gray-400 bg-gray-200 px-2 py-0.5 text-xs font-normal">
                    2.5k
                  </div>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <div className="mt-2 grid grid-cols-[44px,1fr] gap-2">
                <ul className="col-start-2 leading-loose">
                  <li>Currently Hired</li>
                  <li>Onboarding</li>
                  <li>Work Pass</li>
                  <li>Renewal</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem outline={false} value="payrolls">
            <AccordionTrigger
              arrow={false}
              className="grid grid-cols-[16px,20px,1fr] gap-2 text-justify [&[data-state=open]>.accordion-arrow]:rotate-90"
            >
              <ChevronRight className="accordion-arrow transition-transform duration-150" />
              <PayrollIcon />
              <div className="flex items-center justify-between">
                <div className="text-lg font-normal subpixel-antialiased">
                  Payrolls
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  <DropdownMenuOne />
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <div className="mt-2 grid grid-cols-[44px,1fr] gap-2">
                <ul className="col-start-2 leading-loose">
                  <li>Leaves</li>
                  <li>Timesheets</li>
                  <li>Claims</li>
                  <li>Recently Approved</li>
                  <li>Reports</li>
                  <li className="flex items-center justify-between">
                    <span>Apr 24</span>
                    <Star size={16} />
                  </li>
                  <li>May 24</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="grid grid-cols-[16px,20px,1fr] items-center gap-2">
          <RecentIcon className="col-start-2" />
          <span className="text-lg font-normal subpixel-antialiased">
            Recent
          </span>
        </div>
      </div>

      <div className="text-gray-500">SUPPORTS</div>

      <div className="grid grid-cols-[16px,20px,1fr] items-center gap-2">
        <HelpAndSupportIcon className="col-start-2" />
        <span className="text-lg font-normal subpixel-antialiased">
          Help &amp; Support
        </span>
      </div>

      <div className="grid grid-cols-[16px,20px,1fr] items-center gap-2">
        <SettingsIcon className="col-start-2" />
        <span className="text-lg font-normal subpixel-antialiased">
          Settings
        </span>
      </div>

      <div className="grid grid-cols-[16px,20px,1fr] items-center gap-2">
        <ChangelogIcon className="col-start-2" />
        <span className="text-lg font-normal subpixel-antialiased">
          Changelog
        </span>
      </div>
    </div>
  );
};

const RecentIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="19.203"
      className={className}
    >
      <path
        fill="currentcolor"
        fillRule="nonzero"
        d="M20 9.603a9.6 9.6 0 0 1-16.189 6.982.8.8 0 0 1 1.1-1.164 8 8 0 1 0-.168-11.475c-.353.357-.685.708-1.008 1.057l1.631 1.634A.8.8 0 0 1 4.8 8.003h-4a.8.8 0 0 1-.8-.8v-4a.8.8 0 0 1 1.366-.566L2.6 3.873c.322-.35.654-.7 1.006-1.055A9.6 9.6 0 0 1 20 9.603Zm-9.6-5.6a.8.8 0 0 0-.8.8v4.8a.8.8 0 0 0 .388.686l4 2.4a.8.8 0 1 0 .824-1.372L11.2 9.15V4.803a.8.8 0 0 0-.8-.8Z"
      />
    </svg>
  );
};
const HomeIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20.008"
      className={className}
    >
      <path
        fill="currentcolor"
        fillRule="nonzero"
        d="M19.76 9.415 10.592.247a.833.833 0 0 0-1.184 0L.24 9.415a.833.833 0 0 0-.175.908c.128.311.43.515.767.517h1.042c.115 0 .208.093.208.208v8.126c0 .46.373.834.834.834h4.792a.208.208 0 0 0 .208-.209v-3.958a2.084 2.084 0 1 1 4.168 0v3.958c0 .116.093.209.208.209h4.792c.46 0 .834-.373.834-.834v-8.126c0-.115.093-.208.208-.208h1.042a.833.833 0 0 0 .767-.517.833.833 0 0 0-.175-.908Z"
      />
    </svg>
  );
};
const FilterIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
      <path
        fill="#757575"
        fillRule="nonzero"
        d="M9.005 18a8.61 8.61 0 0 1-3.479-.709 9.237 9.237 0 0 1-2.867-1.95 9.237 9.237 0 0 1-1.95-2.867A8.61 8.61 0 0 1 0 8.995c0-1.229.235-2.387.704-3.474a9.173 9.173 0 0 1 1.95-2.876A9.123 9.123 0 0 1 5.526.699 8.685 8.685 0 0 1 8.996 0c1.228 0 2.386.233 3.473.7a9.053 9.053 0 0 1 2.872 1.945 9.278 9.278 0 0 1 1.95 2.876A8.62 8.62 0 0 1 18 8.995a8.659 8.659 0 0 1-.704 3.479 9.222 9.222 0 0 1-4.817 4.817A8.62 8.62 0 0 1 9.005 18Zm0-1.649c1.019 0 1.973-.19 2.862-.57.89-.38 1.67-.906 2.344-1.58a7.318 7.318 0 0 0 1.575-2.343c.377-.89.565-1.844.565-2.863a7.262 7.262 0 0 0-.565-2.862 7.318 7.318 0 0 0-6.79-4.484 7.229 7.229 0 0 0-2.859.565 7.332 7.332 0 0 0-3.914 3.919 7.262 7.262 0 0 0-.565 2.862c0 1.02.189 1.974.565 2.863.377.89.902 1.67 1.575 2.344a7.382 7.382 0 0 0 2.344 1.58c.89.38 1.844.569 2.863.569Zm-4.679-9.06c-.21 0-.38-.06-.51-.18a.62.62 0 0 1-.194-.478c0-.198.065-.355.195-.472a.73.73 0 0 1 .51-.176h9.356c.21 0 .381.058.514.176.133.117.2.274.2.472a.613.613 0 0 1-.2.477.736.736 0 0 1-.514.18H4.326Zm1.26 2.9a.74.74 0 0 1-.51-.181.607.607 0 0 1-.203-.477c0-.198.068-.355.204-.473a.752.752 0 0 1 .51-.176h6.845c.21 0 .382.059.514.176.133.118.2.275.2.473a.613.613 0 0 1-.2.477.736.736 0 0 1-.514.18H5.586Zm1.297 2.9a.706.706 0 0 1-.5-.182.62.62 0 0 1-.195-.477.61.61 0 0 1 .195-.468c.13-.12.296-.18.5-.18h4.252c.204 0 .37.06.5.18a.61.61 0 0 1 .195.468.62.62 0 0 1-.194.477.706.706 0 0 1-.5.181H6.882Z"
      />
    </svg>
  );
};
const HomeIcon24 = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23.996"
      height="24.006"
      className={className}
    >
      <path
        fill="currentcolor"
        fillRule="nonzero"
        d="m23.708 11.296-11-11a1 1 0 0 0-1.42 0l-11 11a1 1 0 0 0-.21 1.09 1 1 0 0 0 .92.62h1.25a.25.25 0 0 1 .25.25v9.75a1 1 0 0 0 1 1h5.75a.25.25 0 0 0 .25-.25v-4.75a2.5 2.5 0 1 1 5 0v4.75c0 .138.112.25.25.25h5.75a1 1 0 0 0 1-1v-9.75a.25.25 0 0 1 .25-.25h1.25a1 1 0 0 0 .92-.62 1 1 0 0 0-.21-1.09Z"
      />
    </svg>
  );
};
const NotificationIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="22.385"
      className={className}
    >
      <g fill="none" fillRule="nonzero">
        <path
          fill="currentcolor"
          d="M9.995 22.385c-1.791 0-3.106-1.315-3.244-2.798h6.498c-.138 1.483-1.452 2.798-3.254 2.798ZM11.32.37a5.077 5.077 0 0 0-1.22 3.307c0 2.808 2.3 5.119 5.119 5.119.589 0 1.156-.102 1.683-.295.076.606.117 1.254.13 1.938.084 1.219.275 2.724.974 3.455.912.943 1.993 1.897 1.993 2.957 0 .774-.604 1.283-1.6 1.283H1.6c-1.006 0-1.6-.51-1.6-1.283 0-1.06 1.07-2.014 1.993-2.957.7-.731.89-2.236.975-3.455.074-4.07 1.155-6.868 3.974-7.886.392-1.388 1.495-2.48 3.053-2.48.49 0 .935.107 1.326.297Z"
        />
        <path
          fill="#FF3B30"
          d="M15.22 7.345c2.003 0 3.678-1.653 3.678-3.667C18.898 1.653 17.223 0 15.22 0a3.687 3.687 0 0 0-3.678 3.678c0 2.014 1.654 3.667 3.678 3.667Z"
        />
      </g>
    </svg>
  );
};
const NotificationIcon24 = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24.623">
      <g fill="none" fillRule="nonzero">
        <path
          fill="currentcolor"
          d="M10.994 24.623c-1.97 0-3.416-1.445-3.567-3.078h7.146c-.151 1.633-1.597 3.078-3.579 3.078ZM12.454.408a5.584 5.584 0 0 0-1.343 3.638c0 3.09 2.53 5.63 5.631 5.63.648 0 1.272-.112 1.852-.324.083.667.128 1.38.142 2.132.093 1.34.303 2.996 1.072 3.8C20.811 16.323 22 17.373 22 18.538c0 .851-.664 1.411-1.76 1.411H1.76c-1.107 0-1.76-.56-1.76-1.41 0-1.166 1.178-2.216 2.192-3.253.77-.805.98-2.46 1.072-3.801.082-4.477 1.271-7.555 4.372-8.674C8.068 1.282 9.28.082 10.994.082c.54 0 1.03.117 1.46.326Z"
        />
        <path
          fill="#FF3B30"
          d="M16.742 8.08c2.203 0 4.046-1.82 4.046-4.034C20.788 1.819 18.945 0 16.742 0a4.055 4.055 0 0 0-4.046 4.046c0 2.215 1.82 4.033 4.046 4.033Z"
        />
      </g>
    </svg>
  );
};
const SearchIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      className={className}
    >
      <path
        fill="currentcolor"
        fillRule="nonzero"
        d="M10.005 20a9.567 9.567 0 0 1-3.865-.787 10.263 10.263 0 0 1-3.186-2.167A10.263 10.263 0 0 1 .787 13.86 9.567 9.567 0 0 1 0 9.995c0-1.366.26-2.652.782-3.86A10.192 10.192 0 0 1 2.95 2.939 10.136 10.136 0 0 1 6.14.777 9.65 9.65 0 0 1 9.995 0c1.365 0 2.652.259 3.86.777a10.06 10.06 0 0 1 3.19 2.162c.92.923 1.643 1.988 2.168 3.196A9.578 9.578 0 0 1 20 9.995a9.62 9.62 0 0 1-.782 3.865 10.246 10.246 0 0 1-5.353 5.353 9.578 9.578 0 0 1-3.86.787Zm-1.06-6.938c.398 0 .78-.056 1.148-.17a4.526 4.526 0 0 0 1.024-.458l2.49 2.491c.214.22.46.33.742.33a.85.85 0 0 0 .648-.263.93.93 0 0 0 .247-.664.815.815 0 0 0-.077-.35 1.205 1.205 0 0 0-.21-.308l-2.512-2.512c.212-.33.38-.688.504-1.076.124-.387.185-.794.185-1.22 0-.768-.188-1.471-.566-2.11A4.278 4.278 0 0 0 11.05 5.23a4.042 4.042 0 0 0-2.105-.566c-.769 0-1.47.19-2.105.571-.635.381-1.143.89-1.523 1.529a4.022 4.022 0 0 0-.572 2.1c0 .775.19 1.48.572 2.115.38.635.888 1.14 1.523 1.518a4.042 4.042 0 0 0 2.105.566Zm0-1.451c-.508 0-.97-.124-1.385-.37a2.84 2.84 0 0 1-.998-1 2.636 2.636 0 0 1-.376-1.378c0-.494.126-.95.376-1.37.25-.418.583-.754.998-1.008.416-.254.877-.381 1.385-.381.5 0 .959.125 1.374.376.415.25.748.585.999 1.003.25.419.375.879.375 1.38 0 .5-.125.96-.375 1.379a2.84 2.84 0 0 1-.999.998c-.415.247-.873.37-1.374.37Z"
      />
    </svg>
  );
};
const SearchIcon24 = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <path
        fill="currentcolor"
        fillRule="nonzero"
        d="M12.006 24c-1.647 0-3.193-.315-4.638-.945a12.316 12.316 0 0 1-3.823-2.6 12.316 12.316 0 0 1-2.6-3.823C.315 15.187 0 13.641 0 11.994c0-1.639.313-3.183.939-4.632a12.23 12.23 0 0 1 2.6-3.835A12.163 12.163 0 0 1 7.368.933 11.58 11.58 0 0 1 11.994 0c1.639 0 3.183.31 4.632.933a12.07 12.07 0 0 1 3.829 2.594 12.37 12.37 0 0 1 2.6 3.835c.63 1.45.945 2.993.945 4.632 0 1.647-.313 3.193-.939 4.638a12.295 12.295 0 0 1-6.423 6.423c-1.45.63-2.993.945-4.632.945Zm-1.272-8.325c.478 0 .937-.068 1.377-.204.44-.136.85-.32 1.23-.55l2.988 2.99c.256.263.552.395.89.395.32 0 .58-.105.778-.315.198-.21.296-.476.296-.797a.977.977 0 0 0-.092-.42 1.446 1.446 0 0 0-.253-.37l-3.014-3.014c.255-.396.457-.826.605-1.291.148-.465.222-.953.222-1.464 0-.922-.226-1.766-.68-2.532a5.133 5.133 0 0 0-1.821-1.828 4.85 4.85 0 0 0-2.526-.68c-.922 0-1.764.229-2.526.686A5.235 5.235 0 0 0 6.38 8.115a4.826 4.826 0 0 0-.686 2.52c0 .93.229 1.777.686 2.538a5.2 5.2 0 0 0 1.828 1.822 4.85 4.85 0 0 0 2.526.68Zm0-1.742c-.61 0-1.163-.148-1.661-.445a3.408 3.408 0 0 1-1.199-1.198 3.164 3.164 0 0 1-.45-1.655c0-.593.15-1.14.45-1.643.301-.502.7-.906 1.199-1.21a3.122 3.122 0 0 1 1.66-.457c.602 0 1.152.15 1.65.45.498.301.897.703 1.198 1.205.3.502.45 1.054.45 1.655s-.15 1.153-.45 1.655c-.3.503-.7.902-1.198 1.198a3.165 3.165 0 0 1-1.65.445Z"
      />
    </svg>
  );
};
const ContractorIcon24 = () => {
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
const ContractorIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
      <path
        fill="currentcolor"
        fillRule="nonzero"
        d="M17.917 0H2.083C.933 0 0 .933 0 2.083v15.834A2.083 2.083 0 0 0 2.083 20h15.834A2.083 2.083 0 0 0 20 17.917V2.083A2.083 2.083 0 0 0 17.917 0ZM3.75 15.208a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Zm-1.25-5a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0Zm2.083 3.125a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0Zm2.084-3.125a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0Zm1.25 5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Zm.833-1.875a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0Zm2.083-3.125a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0Zm1.25 5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Zm.834-1.875a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0Zm3.333 1.875a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Zm0-3.75a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z"
      />
    </svg>
  );
};
const PayrollIcon24 = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      <g fill="currentcolor" fillRule="nonzero">
        <path d="M10.468 11.234a.255.255 0 0 0 .255-.255V.255A.255.255 0 0 0 10.468 0H3.83A3.83 3.83 0 0 0 0 3.83v7.149c0 .14.114.255.255.255h10.213ZM7.915 7.149H6.383a.255.255 0 0 0-.255.255v1.532a.766.766 0 0 1-1.532 0V7.404a.255.255 0 0 0-.256-.255H2.81a.766.766 0 1 1 0-1.532H4.34a.255.255 0 0 0 .256-.255V3.83a.766.766 0 0 1 1.532 0v1.532c0 .14.114.255.255.255h1.532a.766.766 0 0 1 0 1.532ZM12.255 10.979c0 .14.115.255.256.255h11.234a.255.255 0 0 0 .255-.255v-7.15A3.83 3.83 0 0 0 20.17 0h-7.66a.255.255 0 0 0-.255.255V10.98Zm7.915-3.83h-5.106a.766.766 0 0 1 0-1.532h5.106a.766.766 0 0 1 0 1.532ZM10.723 13.021a.255.255 0 0 0-.255-.255H.255a.255.255 0 0 0-.255.255v7.15A3.83 3.83 0 0 0 3.83 24h6.638a.255.255 0 0 0 .255-.255V13.02ZM2.81 16.085a.766.766 0 1 1 1.02-1.021l1.318 1.317a.255.255 0 0 0 .368 0l1.379-1.317a.766.766 0 1 1 1.02 1.021l-1.286 1.348a.255.255 0 0 0 0 .368l1.287 1.348c.26.29.26.73 0 1.021-.29.26-.73.26-1.021 0l-1.348-1.287a.255.255 0 0 0-.368 0L3.83 20.17c-.291.26-.73.26-1.021 0a.766.766 0 0 1 0-1.021l1.317-1.318a.255.255 0 0 0 0-.367l-1.317-1.379ZM12.51 12.766a.255.255 0 0 0-.255.255v10.724c0 .14.115.255.256.255h7.66A3.83 3.83 0 0 0 24 20.17v-7.149a.255.255 0 0 0-.255-.255H12.51Zm1.788 3.83a.776.776 0 0 1 .766-.766h5.106a.766.766 0 0 1 0 1.532h-5.106a.776.776 0 0 1-.766-.766Zm.766 2.298h5.106a.766.766 0 0 1 0 1.532h-5.106a.766.766 0 1 1 0-1.532Z" />
      </g>
    </svg>
  );
};
const PayrollIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
      <g fill="currentcolor" fillRule="nonzero">
        <path d="M8.723 9.362a.213.213 0 0 0 .213-.213V.213A.213.213 0 0 0 8.723 0H3.191A3.191 3.191 0 0 0 0 3.191V9.15c0 .117.095.213.213.213h8.51ZM6.596 5.957H5.319a.213.213 0 0 0-.213.213v1.277a.638.638 0 0 1-1.276 0V6.17a.213.213 0 0 0-.213-.213H2.34a.638.638 0 1 1 0-1.276h1.277a.213.213 0 0 0 .213-.213V3.191a.638.638 0 0 1 1.276 0v1.277c0 .118.096.213.213.213h1.277a.638.638 0 0 1 0 1.276ZM10.213 9.149c0 .117.095.213.213.213h9.361A.213.213 0 0 0 20 9.149V3.19A3.191 3.191 0 0 0 16.809 0h-6.383a.213.213 0 0 0-.213.213v8.936Zm6.596-3.192h-4.256a.638.638 0 1 1 0-1.276h4.256a.638.638 0 1 1 0 1.276ZM8.936 10.851a.213.213 0 0 0-.213-.213H.213a.213.213 0 0 0-.213.213v5.958A3.191 3.191 0 0 0 3.191 20h5.532a.213.213 0 0 0 .213-.213v-8.936ZM2.34 13.404a.638.638 0 1 1 .851-.85L4.29 13.65a.213.213 0 0 0 .307 0l1.149-1.098a.638.638 0 1 1 .85.851l-1.072 1.124a.213.213 0 0 0 0 .306l1.073 1.123a.638.638 0 0 1 0 .852.638.638 0 0 1-.851 0L4.62 15.736a.213.213 0 0 0-.306 0L3.19 16.81a.638.638 0 0 1-.85 0 .638.638 0 0 1 0-.852l1.097-1.097a.213.213 0 0 0 0-.307L2.34 13.404ZM10.426 10.638a.213.213 0 0 0-.213.213v8.936c0 .118.095.213.213.213h6.383A3.191 3.191 0 0 0 20 16.809V10.85a.213.213 0 0 0-.213-.213h-9.361Zm1.489 3.192a.647.647 0 0 1 .638-.639h4.256a.638.638 0 1 1 0 1.277h-4.256a.647.647 0 0 1-.638-.638Zm.638 1.915h4.256a.638.638 0 1 1 0 1.276h-4.256a.638.638 0 1 1 0-1.276Z" />
      </g>
    </svg>
  );
};
const ProjectIcon24 = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <g fill="currentcolor" fillRule="nonzero">
        <path d="M16.767 1.341a.5.5 0 0 0-.32-.49 11.905 11.905 0 0 0-3.691-.85.49.49 0 0 0-.36.13.49.49 0 0 0-.17.34 12.425 12.425 0 0 1-3.872 8.323 12.435 12.435 0 0 1-7.883 3.441.51.51 0 0 0-.34.17.49.49 0 0 0-.13.36c.081 1.268.365 2.514.84 3.692a.5.5 0 0 0 .49.32 16.286 16.286 0 0 0 10.314-4.411A16.256 16.256 0 0 0 16.767 1.34Z" />
        <path d="M.761 10.205a10.534 10.534 0 0 0 6.232-2.851A10.524 10.524 0 0 0 10.195.77a.5.5 0 0 0-.2-.43.49.49 0 0 0-.39-.11A12.005 12.005 0 0 0 .22 9.604a.48.48 0 0 0 .12.4.53.53 0 0 0 .42.2ZM23.92 10.685a.27.27 0 0 0-.22-.22.23.23 0 0 0-.26.15A24.2 24.2 0 0 1 10.605 23.45a.24.24 0 0 0-.15.26c.02.112.107.2.22.22.43 0 .87.07 1.31.07A12.005 12.005 0 0 0 24 12.005c0-.45 0-.89-.08-1.32Z" />
        <path d="M22.59 6.933a1.06 1.06 0 0 0-.09-.74 12.115 12.115 0 0 0-3.062-3.611.51.51 0 0 0-.5-.07.48.48 0 0 0-.31.4 18.237 18.237 0 0 1-5.632 10.914 18.287 18.287 0 0 1-10.104 4.812.48.48 0 0 0-.39.31.51.51 0 0 0 .07.5 12.115 12.115 0 0 0 3.611 3.061 1 1 0 0 0 .74.09A22.159 22.159 0 0 0 22.59 6.933Z" />
      </g>
    </svg>
  );
};
const ProjectIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
      <g fill="currentcolor" fillRule="nonzero">
        <path d="M13.973 1.118a.417.417 0 0 0-.267-.409A9.92 9.92 0 0 0 10.63.001a.408.408 0 0 0-.3.108.408.408 0 0 0-.142.283 10.354 10.354 0 0 1-3.226 6.936 10.362 10.362 0 0 1-6.57 2.868.425.425 0 0 0-.283.142.408.408 0 0 0-.108.3 9.92 9.92 0 0 0 .7 3.076c.064.168.229.275.408.267a13.572 13.572 0 0 0 8.595-3.676 13.547 13.547 0 0 0 4.269-9.187Z" />
        <path d="M.634 8.504a8.779 8.779 0 0 0 5.194-2.376A8.77 8.77 0 0 0 8.496.643a.417.417 0 0 0-.167-.359.408.408 0 0 0-.325-.092 10.004 10.004 0 0 0-7.82 7.812.4.4 0 0 0 .1.333.442.442 0 0 0 .35.167ZM19.933 8.904a.225.225 0 0 0-.183-.183.192.192 0 0 0-.217.125A20.166 20.166 0 0 1 8.837 19.54a.2.2 0 0 0-.125.217c.017.094.09.167.184.184.358 0 .725.058 1.092.058A10.004 10.004 0 0 0 20 10.004c0-.375 0-.741-.067-1.1Z" />
        <path d="M18.825 5.778a.884.884 0 0 0-.075-.617 10.096 10.096 0 0 0-2.551-3.01.425.425 0 0 0-.417-.058.4.4 0 0 0-.259.334 15.198 15.198 0 0 1-4.693 9.095 15.24 15.24 0 0 1-8.42 4.01.4.4 0 0 0-.325.258.425.425 0 0 0 .058.417 10.096 10.096 0 0 0 3.01 2.55c.188.104.409.131.617.076A18.465 18.465 0 0 0 18.825 5.778Z" />
      </g>
    </svg>
  );
};
const OrganizationIcon24 = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24.338">
      <g fill="currentcolor" fillRule="nonzero">
        <path d="m5.864 11.532 6.067-4.457a.274.274 0 0 0-.055-.47l-5.42-2.552a.285.285 0 0 0-.395.219l-.635 7.019a.274.274 0 0 0 .438.24ZM15.347 6.265l9.198 3.044c.24.077.077-.252.077-.252L18.117.888a.274.274 0 0 0-.46 0l-2.474 4.994a.274.274 0 0 0 .164.383ZM13.967 18.934l-7.72-3.493a.274.274 0 0 0-.372.329l1.927 6.427a.285.285 0 0 0 .384.175l5.792-2.901a.274.274 0 0 0-.01-.537ZM12.993 8.324 6.379 13.25a.274.274 0 0 0 0 .47l8.355 3.833a.274.274 0 0 0 .383-.295l-1.741-8.76a.274.274 0 0 0-.383-.175ZM17.23 16.952l5.475-6.11a.285.285 0 0 0-.12-.449l-7.161-2.376a.274.274 0 0 0-.362.317l1.698 8.487a.274.274 0 0 0 .47.131ZM20.428 22.821l-3.964-2.639a.274.274 0 0 0-.274 0l-7.895 3.942s-.284.252.164.208l11.881-1.28c.197-.044.208-.154.088-.23ZM24.852 10.853l-7.02 7.873a.274.274 0 0 0 .055.405l3.45 2.3a.909.909 0 0 1 .252.284c.109.176.219.165.295-.087.57-1.971 3.077-10.567 3.11-10.666.033-.098-.077-.186-.142-.109ZM13.267 5.444a.274.274 0 0 0 .328-.12L16.059.395a.274.274 0 0 0-.274-.394c-1.894.35-8.256 1.51-9.756 1.817-.208 0-.12.175-.12.175l7.358 3.45ZM3.39 12.824c.14.006.262-.1.273-.24.099-1.096.526-5.925.745-8.443a.274.274 0 0 0-.515-.143L.028 12.43a.274.274 0 0 0 .24.394H3.39ZM3.839 14.653a.263.263 0 0 0-.263-.187H.455a.274.274 0 0 0-.219.428l5.957 8.453s.274.263.175-.099c-.526-1.828-2.2-7.49-2.53-8.595Z" />
      </g>
    </svg>
  );
};
const OrganizationIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19.47">
      <g fill="currentcolor" fillRule="nonzero">
        <path d="M4.691 9.226 9.544 5.66a.219.219 0 0 0-.043-.377l-4.337-2.04a.228.228 0 0 0-.315.175l-.508 5.615a.219.219 0 0 0 .35.193ZM12.278 5.012l7.358 2.435c.193.062.061-.201.061-.201L14.494.71a.219.219 0 0 0-.368 0l-1.98 3.994a.219.219 0 0 0 .132.307ZM11.174 15.147l-6.176-2.794a.219.219 0 0 0-.298.263l1.542 5.142a.228.228 0 0 0 .307.14l4.634-2.321a.22.22 0 0 0-.01-.43ZM10.394 6.659 5.104 10.6a.219.219 0 0 0 0 .377l6.683 3.066a.219.219 0 0 0 .307-.237L10.7 6.799a.219.219 0 0 0-.307-.14ZM13.784 13.562l4.38-4.888a.228.228 0 0 0-.096-.36l-5.73-1.9a.219.219 0 0 0-.288.254l1.358 6.789a.219.219 0 0 0 .376.105ZM16.342 18.257l-3.17-2.111a.219.219 0 0 0-.22 0L6.636 19.3s-.228.201.132.166l9.504-1.025c.158-.035.167-.123.07-.184ZM19.881 8.682l-5.615 6.299a.219.219 0 0 0 .044.324l2.76 1.84c.082.06.15.138.2.227.088.14.176.132.237-.07.456-1.577 2.462-8.453 2.488-8.532.026-.079-.061-.149-.114-.088ZM10.613 4.355c.1.035.21-.005.263-.096L12.847.317A.219.219 0 0 0 12.628 0c-1.515.28-6.605 1.21-7.805 1.454-.167 0-.097.14-.097.14l5.887 2.76ZM2.712 10.26a.21.21 0 0 0 .219-.194c.079-.876.42-4.739.595-6.754a.219.219 0 0 0-.411-.113L.022 9.944a.219.219 0 0 0 .193.315h2.497ZM3.07 11.722a.21.21 0 0 0-.21-.149H.365a.219.219 0 0 0-.175.342l4.765 6.763s.22.21.14-.08c-.42-1.462-1.76-5.991-2.023-6.876Z" />
      </g>
    </svg>
  );
};
const HelpAndSupportIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      className={className}
    >
      <path
        fill="currentcolor"
        fillRule="nonzero"
        d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10C19.994 4.48 15.52.006 10 0Zm0 16.154a1.154 1.154 0 1 1 0-2.308 1.154 1.154 0 0 1 0 2.308Zm.77-4.685v.07a.77.77 0 1 1-1.54 0v-.77A.77.77 0 0 1 10 10c1.272 0 2.308-.865 2.308-1.923S11.272 6.154 10 6.154c-1.272 0-2.308.865-2.308 1.923v.385a.77.77 0 1 1-1.538 0v-.385c0-1.909 1.725-3.462 3.846-3.462s3.846 1.553 3.846 3.462c0 1.671-1.323 3.07-3.077 3.392Z"
      />
    </svg>
  );
};
const SettingsIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      className={className}
    >
      <path
        fill="currentcolor"
        fillRule="nonzero"
        d="M10.005 20a9.567 9.567 0 0 1-3.865-.787 10.263 10.263 0 0 1-3.186-2.167A10.263 10.263 0 0 1 .787 13.86 9.567 9.567 0 0 1 0 9.995c0-1.366.26-2.652.782-3.86A10.192 10.192 0 0 1 2.95 2.939 10.136 10.136 0 0 1 6.14.777 9.65 9.65 0 0 1 9.995 0c1.365 0 2.652.259 3.86.777a10.06 10.06 0 0 1 3.19 2.162c.92.923 1.643 1.988 2.168 3.196A9.578 9.578 0 0 1 20 9.995a9.62 9.62 0 0 1-.782 3.865 10.246 10.246 0 0 1-5.353 5.353 9.578 9.578 0 0 1-3.86.787Zm0-4.406a3.069 3.069 0 0 0 .36-.02l.268.525c.096.206.26.291.494.257a.444.444 0 0 0 .242-.139.475.475 0 0 0 .118-.262l.083-.597c.123-.035.242-.07.355-.108.113-.038.221-.081.324-.13l.432.382c.151.158.337.185.556.082.172-.11.244-.274.216-.494l-.144-.597c.11-.075.213-.15.31-.226.095-.076.178-.148.246-.217l.556.217c.199.089.377.04.535-.145.144-.157.155-.332.031-.524l-.319-.515a3.381 3.381 0 0 0 .35-.618l.618.031c.226.007.37-.093.432-.298.082-.213.034-.385-.144-.515l-.484-.38a8.311 8.311 0 0 0 .144-.7l.546-.186c.22-.069.33-.216.33-.443 0-.206-.11-.346-.33-.422l-.546-.185a9.673 9.673 0 0 0-.144-.7l.484-.38c.171-.145.223-.313.154-.505-.068-.22-.22-.323-.453-.309l-.607.02-.175-.324a5.085 5.085 0 0 0-.175-.293l.32-.504c.123-.193.112-.371-.032-.536-.158-.171-.333-.216-.525-.133l-.576.216a2.23 2.23 0 0 0-.242-.227 2.982 2.982 0 0 0-.304-.216l.144-.587c.028-.24-.044-.408-.216-.504-.206-.117-.39-.09-.556.082l-.432.37-.33-.123a4.194 4.194 0 0 0-.35-.113l-.082-.597c-.034-.22-.154-.35-.36-.391a.46.46 0 0 0-.283.051.507.507 0 0 0-.211.196l-.268.535a3.486 3.486 0 0 0-.36-.02 3.069 3.069 0 0 0-.36.02l-.288-.535c-.096-.199-.258-.281-.484-.247-.213.041-.34.172-.381.391l-.072.597c-.117.034-.23.074-.34.119-.11.044-.22.084-.33.118l-.431-.37c-.172-.165-.354-.193-.546-.083-.192.103-.268.271-.226.504l.123.587a5.612 5.612 0 0 0-.545.443l-.546-.216c-.206-.083-.384-.038-.535.133-.144.158-.162.333-.052.525l.33.515a9.325 9.325 0 0 0-.34.618l-.607-.021c-.234-.014-.381.09-.443.309-.075.185-.027.353.144.504l.474.381a9.35 9.35 0 0 0-.072.355c-.021.113-.038.228-.052.345l-.566.185c-.213.076-.32.216-.32.422 0 .22.107.367.32.443l.566.185a6.833 6.833 0 0 0 .124.7l-.474.381c-.171.137-.22.309-.144.515.062.205.21.305.443.298l.607-.03a3.814 3.814 0 0 0 .34.617l-.33.515a.47.47 0 0 0-.056.277c.01.097.043.179.097.247.158.193.344.24.556.145l.536-.217c.075.07.157.141.247.217.089.075.188.15.298.226l-.123.587c-.042.226.034.394.226.504.199.11.38.086.546-.072l.422-.391a6.111 6.111 0 0 0 .679.237l.072.597a.52.52 0 0 0 .134.262.474.474 0 0 0 .257.14c.22.033.378-.052.474-.258l.288-.525a2.557 2.557 0 0 0 .36.02ZM5.61 9.984c0-.727.154-1.398.463-2.012A4.417 4.417 0 0 1 7.32 6.444L8.78 8.955c-.274.316-.411.666-.411 1.05 0 .378.137.72.411 1.03l-1.503 2.46a4.44 4.44 0 0 1-1.214-1.519 4.411 4.411 0 0 1-.453-1.991Zm4.395-4.446c.762 0 1.457.171 2.085.514a4.366 4.366 0 0 1 1.544 1.406 4.38 4.38 0 0 1 .725 2.002h-2.83a1.86 1.86 0 0 0-.628-.808 1.55 1.55 0 0 0-.916-.283 1.415 1.415 0 0 0-.32.03L8.204 5.91c.57-.248 1.17-.371 1.801-.371Zm0 8.904c-.652 0-1.266-.13-1.842-.392l1.492-2.45c.076.014.14.021.196.021h.134c.35 0 .657-.096.92-.288.265-.192.473-.467.624-.823h2.83a4.412 4.412 0 0 1-2.27 3.412 4.241 4.241 0 0 1-2.084.52ZM9.43 9.995c0-.144.056-.271.17-.381a.551.551 0 0 1 .396-.165c.165 0 .302.053.412.16a.551.551 0 0 1 0 .782.55.55 0 0 1-.412.17.543.543 0 0 1-.396-.17.543.543 0 0 1-.17-.396Z"
      />
    </svg>
  );
};
const ChangelogIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="12"
      className={className}
    >
      <path
        fill="currentcolor"
        fillRule="nonzero"
        d="M6 5.333v1.334C6 7.403 5.403 8 4.667 8V4C5.403 4 6 4.597 6 5.333Zm14-4v9.334c0 .736-.597 1.333-1.333 1.333H1.333A1.333 1.333 0 0 1 0 10.667V1.333C0 .597.597 0 1.333 0h17.334C19.403 0 20 .597 20 1.333Zm-12.667 4a2.667 2.667 0 0 0-2.666-2.666H4a.667.667 0 0 0-.667.666v5.334c0 .368.299.666.667.666h.667a2.667 2.667 0 0 0 2.666-2.666V5.333Zm2.667 0V4h1.333a.667.667 0 1 0 0-1.333h-2a.667.667 0 0 0-.666.666v5.334c0 .368.298.666.666.666h2a.667.667 0 1 0 0-1.333H10V6.667h.667a.667.667 0 0 0 0-1.334H10Zm6.848-2.641a.667.667 0 0 0-.823.46l-.858 3.052-.859-3.051a.667.667 0 0 0-1.283.361l1.5 5.334a.667.667 0 0 0 1.283 0l1.5-5.334a.667.667 0 0 0-.46-.822Z"
      />
    </svg>
  );
};

const DropdownMenuOne = () => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        onPointerDown={(e) => {
          e.preventDefault();
        }}
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <EllipsisVertical />
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
          <DropdownMenuItem>
            <DropdownMenuEmptyIcon />
            <span className="text-red-500 dark:text-red-300">Sync status</span>
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

export { AppBar };
