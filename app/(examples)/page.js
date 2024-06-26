"use client";

import { Horse, Sun } from "@phosphor-icons/react/dist/ssr";
import ButtonExamples from "@/examples/ButtonExamples";
import DropdownMenuExamples from "@/examples/DropdownMenuExamples";
import DialogExamples from "@/examples/DialogExamples";
import AccordionExamples from "@/examples/AccordionExamples";
import PopoverExamples from "@/examples/PopoverExamples";
import FloatingExamples from "@/examples/FloatingExamples";
import DownshiftExamples from "@/examples/DownshiftExamples";
import Button from "@/components/Button";
import LoremIpsum from "@/components/LoremIpsum";
import Input from "@/components/Input";
import { Switch } from "@/components/Switch";
import { Checkbox } from "@/components/Checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/RadioGroup";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/InputOTP";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
} from "@/components/Drawer";
import cn from "@/lib/cn";
import { useForm, FormProvider, useController } from "react-hook-form";
import MultipleSelectionDownshiftExamples from "@/examples/MultipleSelectionDownshiftExamples";
import {
  SegmentedControlRoot,
  SegmentedControlItem,
} from "@/components/SegmentedControl";
import Pagination from "@/components/Pagination";
import { useState } from "react";
import Card from "@/components/Card";
import FormCol from "@/components/FormCol";
import { HandPalm } from "@phosphor-icons/react/dist/ssr";
import { MultiSelect } from "@/components/MultiSelect";
import MultiSelectExamples from "@/examples/MultiSelectExamples";
import UrqlProvider from "@/app/(workspace)/fetch-examples/UrqlProvider";
import DraggableExamples from "@/examples/DraggableExamples";
import { GripVertical } from "lucide-react";

const TagRenderer = ({ selectedItem, index, getSelectedItemProps }) => {
  return (
    <div
      key={`selected-item-${index}`}
      className="cursor-pointer rounded-full bg-gray-200 px-2 py-1 text-xs text-black outline-none focus:bg-blue-500 focus:text-white dark:bg-neutral-400"
      {...getSelectedItemProps({ selectedItem, index })}
    >
      {selectedItem.nationality}
    </div>
  );
};

const TagRenderer2 = ({ selectedItem, index, getSelectedItemProps }) => {
  return (
    <div
      key={`selected-item-${index}`}
      className="cursor-pointer rounded-md bg-gray-200 px-2 py-1 text-xs text-black outline-none focus:bg-blue-500 focus:text-white dark:bg-neutral-400"
      {...getSelectedItemProps({ selectedItem, index })}
    >
      {selectedItem.nationality}
    </div>
  );
};

const TagNormal = ({ selectedItem, index, getSelectedItemProps }) => {
  return selectedItem.itemName;
};

const draggableItems = [
  { id: 1, name: "mech", visible: true },
  { id: 2, name: "mechai", visible: false },
  { id: 3, name: "swee", visible: true },
];

export default function Home() {
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({});
  const [dItems, setDItems] = useState(draggableItems);
  const methods = useForm({
    // defaultValues: {
    //   linkedInUrl: "",
    // },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = methods;

  const submit = (data) => {
    const newDItems = dItems.map((item) => {
      return {
        ...item,
        visible: data[item.name]?.visible,
      };
    });

    data["items"] = newDItems;

    setFormData(data);
  };

  const nationalities = [
    { nationality: "Singaporean" },
    { nationality: "Malaysian" },
    { nationality: "Indonesian" },
  ];

  return (
    <UrqlProvider>
      <main className="space-y-4 p-4">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(submit)} className="space-y-4">
            <Card className="space-y-5">
              <DraggableExamples
                items={draggableItems}
                onDrop={(items) => {
                  setDItems(items);
                }}
              >
                {({ item }) => {
                  return (
                    <>
                      <GripVertical size={20} />
                      {item.name}
                      <Switch
                        defaultChecked={item.visible}
                        name={`${item.name}.visible`}
                        size="sm"
                        className="justify-self-end"
                      />
                    </>
                  );
                }}
              </DraggableExamples>

              <MultiSelectExamples />

              <MultiSelect
                name="ms-1"
                label="Nationality (MS)"
                multiple={true}
                items={nationalities}
                // itemKey="nationality"
                itemName="nationality"
                disabled={false}
              />

              <FormCol>
                <Input
                  name="location1"
                  label="Location One"
                  defaultValue="OMG"
                />
                <Input name="location3" label="Location Two" />

                <div className="flex items-center justify-center gap-4 self-center">
                  <HandPalm
                    color="red"
                    size="32"
                    weight="fill"
                    className="flex-none self-auto"
                  />
                  <Switch name="a" className="self-auto" />
                  <Checkbox name="b" className="self-auto" />
                </div>
              </FormCol>

              <FormCol className="data-[cols='1']:sm:grid-cols-2">
                <Input name="location2" label="Location Two" />
              </FormCol>

              <FormCol>
                <Input name="location11" label="Location One" />
                <Input name="location22" label="Location Two" />
              </FormCol>
            </Card>

            {/*<ButtonExamples />*/}

            <div>
              <h1>Segmented control</h1>

              <SegmentedControlRoot size="sm">
                <SegmentedControlItem value="1">Inbox</SegmentedControlItem>
                <SegmentedControlItem value="2">Profile</SegmentedControlItem>
                <SegmentedControlItem value="3">Roles</SegmentedControlItem>
              </SegmentedControlRoot>
            </div>

            <MultipleSelectionDownshiftExamples
              // displayCheckMark={false}
              // errorMessage="test"
              name="multi-select"
              size="md"
              defaultValue={[
                {
                  id: "5",
                  nationality: "Vietnamese",
                },
                { id: "7", nationality: "Myanmar" },
              ]}
              tagRenderer={({ index, selectedItem, getSelectedItemProps }) => (
                <TagRenderer
                  // key={`selected-item-${index}`}
                  index={index}
                  selectedItem={selectedItem}
                  getSelectedItemProps={getSelectedItemProps}
                />
              )}
            />

            {/*<DownshiftExamples />*/}
            {/*<FloatingExamples />*/}

            <div className="flex gap-4">
              <DropdownMenuExamples />
              <DialogExamples />
              <PopoverExamples />
            </div>

            <AccordionExamples />

            <div className="">
              <Drawer modal={false}>
                <DrawerTrigger>
                  <Button variant="secondary">Inspector</Button>
                </DrawerTrigger>
                <DrawerContent
                  side="left"
                  className="w-1/2"
                  onInteractOutside={(e) => e.preventDefault()}
                  onCloseAutoFocus={(e) => e.preventDefault()}
                >
                  <div className="flex items-center justify-between p-4">
                    <strong>Some inspecting to do</strong>
                    <DrawerClose asChild>
                      <Button variant="secondary">Close</Button>
                    </DrawerClose>
                  </div>

                  <section className="space-y-4 p-4">
                    <LoremIpsum p={1} />
                  </section>
                </DrawerContent>
              </Drawer>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <SegmentedControlRoot size="sm" defaultValue="1">
                <SegmentedControlItem value="1">Inbox</SegmentedControlItem>
                <SegmentedControlItem value="2">Profile</SegmentedControlItem>
                <SegmentedControlItem value="3">Roles</SegmentedControlItem>
              </SegmentedControlRoot>

              <SegmentedControlRoot defaultValue="2">
                <SegmentedControlItem value="1">Query</SegmentedControlItem>
                <SegmentedControlItem value="2">Filters</SegmentedControlItem>
                <SegmentedControlItem value="3">Sorts</SegmentedControlItem>
              </SegmentedControlRoot>

              <Input
                // size="lg"
                label="LinkedIn URL"
                prefix="https://"
                // prefixStyling={false}
                suffix={<Sun size="24" />}
                suffixStyling={false}
                placeholder="Enter your LinkedIn account"
                name="linkedInUrl"
                rules={{ required: true }}
                defaultValue="OMG"
                // errorMessage="Gosh!! What is happening!?"
                // helpText="Just try to enter whatever you want"
              />

              <Button>Submit</Button>

              <Switch name="switch-3" size="sm" rules={{ required: true }} />
              <Switch
                name="switch-1"
                // requiredMessage="Switch is required"
                // errorMessage={errors["switch-1"]?.message}
              />
              <Switch name="switch-2" />

              <Checkbox name="cb-0" checked="indeterminate" />
              <Checkbox name="cb-1" rules={{ required: true }} />

              <RadioGroup name="rr-1" defaultValue="2">
                <RadioGroupItem value="1">One</RadioGroupItem>
                <RadioGroupItem value="2">Two</RadioGroupItem>
                <RadioGroupItem value="3">Three</RadioGroupItem>
              </RadioGroup>
            </div>

            <InputOTP
              name="opt"
              requiredMessage="OTP is required"
              errorMessage={errors.opt?.message}
              maxLength={6}
              render={({ slots }) => (
                <>
                  <InputOTPGroup>
                    {slots.slice(0, 3).map((slot, index) => (
                      <InputOTPSlot key={index} {...slot} order={1} />
                    ))}
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    {slots.slice(3).map((slot, index) => (
                      <InputOTPSlot key={index} {...slot} order={2} />
                    ))}
                  </InputOTPGroup>
                </>
              )}
            />

            <div className="flex flex-col gap-1">
              <strong>Internal Page: {page}</strong>
              <Pagination
                currentPage={page}
                totalPages={40}
                onChange={(p) => setPage(p)}
              />
            </div>

            <div>
              <pre>{JSON.stringify(formData, null, 2)}</pre>
            </div>

            <Button type="submit">Test form</Button>
          </form>
        </FormProvider>

        {/*<Switch />*/}
      </main>
    </UrqlProvider>
  );
}
