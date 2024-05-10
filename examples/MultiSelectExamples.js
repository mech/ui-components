"use client";

import { MultiSelect } from "@/components/MultiSelect";
import { useState } from "react";
import { useQuery } from "urql";
import { useDebounce } from "use-debounce";
import Highlighter from "react-highlight-words";
import { matchSorter } from "match-sorter";

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
