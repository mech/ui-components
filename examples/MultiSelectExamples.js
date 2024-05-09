"use client";

import { MultiSelect } from "@/components/MultiSelect";
import { matchSorter } from "match-sorter";
import { useState } from "react";
import { useQuery } from "urql";
import { useDebounce } from "use-debounce";

const TagRenderer2 = ({ selectedItem, index, getSelectedItemProps }) => {
  return (
    <div
      key={`selected-item-${index}`}
      className="cursor-pointer rounded-md bg-gray-200 px-2 py-1 text-xs text-black outline-none focus:bg-blue-500 focus:text-white dark:bg-neutral-400"
      {...getSelectedItemProps({ selectedItem, index })}
    >
      {selectedItem.name}
    </div>
  );
};

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
      name="users"
      label="Users"
      multiple={false}
      items={items}
      placeholder="Test"
      itemKey="id"
      itemName="name"
      onInputValueChange={onInputValueChange}
    >
      <MultiSelect.Tag>
        {({ selectedItem }) => selectedItem.name}
      </MultiSelect.Tag>

      <MultiSelect.Item>
        {({ item }) => (
          <div className="flex flex-col gap-0">
            <span>{item.name}</span>
            <span className="text-sm text-gray-500 group-[.is-highlighted]:text-white">
              {item.email}
            </span>
          </div>
        )}
      </MultiSelect.Item>
    </MultiSelect>
  );
};

export default MultiSelectExamples;
