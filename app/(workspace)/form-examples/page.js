"use client";

import { useForm, FormProvider } from "react-hook-form";
import { Switch } from "@/components/Switch";
import { Checkbox } from "@/components/Checkbox";
import Button from "@/components/Button";
import FormCol from "@/components/FormCol";
import Card from "@/components/Card";
import { useState } from "react";
import Input from "@/components/Input";
import { RadioGroup, RadioGroupItem } from "@/components/RadioGroup";
import MultiSelectExamples from "@/examples/MultiSelectExamples";
import UrqlProvider from "@/app/(workspace)/fetch-examples/UrqlProvider";

export default function Page() {
  const [formData, setFormData] = useState({});
  const form = useForm({
    defaultValues: {
      enableNotification1: false,
      enableNotification2: false,
      name: "",
      rr: "3",
    },
  });
  const { handleSubmit } = form;

  const onSubmit = (data) => {
    setFormData(data);
  };

  return (
    <div className="p-4">
      <UrqlProvider>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h1>Form examples</h1>

            <Card className="space-y-4">
              <FormCol>
                <label className="flex cursor-pointer items-center gap-2">
                  Enable notification <Switch name="enableNotification1" />
                </label>

                <label className="flex cursor-pointer items-center gap-2">
                  Enable notification <Checkbox name="enableNotification2" />
                </label>
              </FormCol>

              <Input name="name" label="Name" />

              <RadioGroup name="rr">
                <label className="flex items-center gap-2">
                  <RadioGroupItem value="1" /> One
                </label>
                <label className="flex items-center gap-2">
                  <RadioGroupItem value="2" /> Two
                </label>
                <label className="flex items-center gap-2">
                  <RadioGroupItem value="3" /> Three
                </label>
              </RadioGroup>

              <MultiSelectExamples />

              <Button type="submit">Submit</Button>
            </Card>

            <Card>
              <pre>{JSON.stringify(formData, null, 2)}</pre>
            </Card>
          </form>
        </FormProvider>
      </UrqlProvider>
    </div>
  );
}
