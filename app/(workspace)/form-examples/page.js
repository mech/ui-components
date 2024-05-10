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
import RHFormProvider from "@/components/RHFormProvider";

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
        <RHFormProvider
          onSubmit={handleSubmit(onSubmit)}
          form={form}
          formData={formData}
          debug
        >
          <Card className="space-y-4">
            <RadioGroup name="rr" orientation="vertical">
              <label className="inline-flex w-auto items-center gap-2">
                <RadioGroupItem value="1" /> One
              </label>
              <label className="inline-flex items-center gap-2">
                <RadioGroupItem value="2" /> Two
              </label>
              <label className="inline-flex items-center gap-2">
                <RadioGroupItem value="3" /> Three
              </label>
            </RadioGroup>

            <FormCol>
              <label className="flex cursor-pointer items-center gap-2">
                Enable notification <Switch name="enableNotification1" />
              </label>

              <label className="flex cursor-pointer items-center gap-2">
                Enable notification <Checkbox name="enableNotification2" />
              </label>
            </FormCol>

            <Input name="name" label="Name" />

            <MultiSelectExamples />

            <Button type="submit">Submit</Button>
          </Card>
        </RHFormProvider>
      </UrqlProvider>
    </div>
  );
}
