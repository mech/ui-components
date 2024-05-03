"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pager() {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const pathname = usePathname();

  const navigate = (id) => () => {
    const params = new URLSearchParams(searchParams);
    params.set("id", id);
    push(`${pathname}?${params.toString()}`);
  };

  return (
    <nav>
      <ul className="flex items-center gap-2">
        <li>
          <button className="w-16 bg-gray-100 p-2" onClick={navigate(9350)}>
            9350
          </button>
        </li>
        <li>
          <button className="w-16 bg-gray-100 p-2" onClick={navigate(9351)}>
            9351
          </button>
        </li>
        <li>
          <button className="w-16 bg-gray-100 p-2" onClick={navigate(9352)}>
            9352
          </button>
        </li>
      </ul>
    </nav>
  );
}
