"use client";

import { MultiSelect } from "@/components/MultiSelect";
import { useState } from "react";
import { useQuery } from "urql";
import { useDebounce } from "use-debounce";
import Highlighter from "react-highlight-words";
import { matchSorter } from "match-sorter";
import RaceBy from "@/components/RaceBy";
import {
  DatabaseBackup,
  MessageSquareDashed,
  Shapes,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const USERS_SEARCH = `
  query UsersSearch($page: Int!, $perPage: Int!, $query: String) {
    usersSearch(page: $page, perPage: $perPage, query: $query) {
      id
      name
      email
    }
  }
`;

const MultiSelectExamples = () => {
  // const [items, setItems] = useState(nationalities);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 300);

  const [result] = useQuery({
    query: USERS_SEARCH,
    variables: { page: 1, perPage: 25, query: debouncedQuery },
    pause: debouncedQuery.length === 0,
  });

  const { data, fetching, error } = result;

  const items = data?.usersSearch || [];

  const onInputValueChange = (value) => {
    setQuery(value);

    // setItems(
    //   matchSorter(nationalities, value, {
    //     keys: ["nationality"],
    //     baseSort: (a, b) => {
    //       return a.index < b.index ? -1 : 1;
    //     },
    //   }),
    // );
  };

  return (
    <MultiSelect
      fetching={fetching}
      name="users"
      label="Users"
      multiple={false}
      items={items}
      placeholder="Test"
      itemKey="id"
      itemName="name"
      onInputValueChange={onInputValueChange}
      menuWrapperClassName="grid grid-cols-4 p-2 gap-2"
    >
      <MultiSelect.Header>
        <div
          className="bg-background"
          onMouseDown={(e) => {
            // Must use onMouseDown, no need stopPropagation
            e.preventDefault();
          }}
        >
          <ul className="no-scrollbar flex cursor-pointer select-none flex-nowrap items-center gap-0 overflow-y-hidden overflow-x-scroll overscroll-contain border-b">
            <li className="rounded-mds flex-none border-r px-4 py-2 transition-colors hover:bg-gray-100 dark:hover:bg-neutral-800">
              <button
                className="flex items-center gap-1"
                onClick={() => console.log("Unread")}
              >
                <MessageSquareDashed className="shrink-0" />
                Unread
              </button>
            </li>
            <li className="rounded-mds flex-none border-r px-4 py-2 shadow-inner transition-colors hover:bg-gray-100 dark:hover:bg-neutral-800">
              <div className="flex flex-nowrap items-center gap-1">
                <Sparkles className="shrink-0" />
                AI Assistant
              </div>
            </li>
            <li className="rounded-mds flex-none border-r px-4 py-2 transition-colors hover:bg-gray-100 dark:hover:bg-neutral-800">
              <div className="flex items-center gap-1">
                <Shapes className="shrink-0" />
                <span className="flex-none">More Options...</span>
              </div>
            </li>
            <li className="rounded-mds flex-none border-r px-4 py-2 transition-colors hover:bg-gray-100 dark:hover:bg-neutral-800">
              <div className="flex items-center gap-1">
                <DatabaseBackup className="shrink-0" />
                <span className="flex-none">Data Insights</span>
              </div>
            </li>
          </ul>
        </div>
      </MultiSelect.Header>

      <MultiSelect.Tag>
        {({ selectedItem }) => selectedItem.name}
      </MultiSelect.Tag>

      <MultiSelect.Item className="rounded-md bg-gray-50">
        {({ item }) => (
          <div className="flex flex-col gap-0">
            <Highlighter
              textToHighlight={item.name}
              searchWords={query.split(/\s+/)}
            />
            <span className="text-sm text-gray-500 group-[.is-highlighted]:text-white">
              <Highlighter
                textToHighlight={item.email}
                searchWords={query.split(/\s+/)}
              />
            </span>
          </div>
        )}
      </MultiSelect.Item>
    </MultiSelect>
  );
};

export default MultiSelectExamples;
