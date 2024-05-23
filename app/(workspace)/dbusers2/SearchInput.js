"use client";

import Input from "@/components/Input";
import { Search } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";

export default function SearchInput() {
  const form = useForm();

  return (
    <FormProvider {...form}>
      <Input
        name="Search"
        prefix={<Search size={16} />}
        prefixStyling={false}
        placeholder="Cmd+K"
        wrapperClassName="focus-within:ring-0 focus-within:border-transparent border-transparent rounded-full bg-gray-100 w-[200px] focus-within:w-full transition-all duration-300"
      />
    </FormProvider>
  );
}
