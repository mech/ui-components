"use client";

import { FormProvider } from "react-hook-form";
import cn from "@/lib/cn";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/Drawer";
import Button from "@/components/Button";
import { BugBeetle } from "@phosphor-icons/react";

export default function RHFormProvider({
  children,
  form,
  formData,
  onSubmit,
  debug = false,
  className,
}) {
  const classNames = cn("space-y-4", className);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={classNames}>
        {children}

        {debug && formData && (
          <Drawer modal={false}>
            <DrawerTrigger>
              <Button
                variant="bgIcon"
                prefix={<BugBeetle weight="fill" size={24} color="#e11d48" />}
              />
            </DrawerTrigger>

            <DrawerContent
              // offset
              side="bottom"
              onInteractOutside={(e) => e.preventDefault()}
            >
              <div className="h-full space-y-2 bg-amber-50 p-4 text-sm">
                <h1 className="font-bold text-amber-700">FormData Inspector</h1>
                <pre>{JSON.stringify(formData, null, 2)}</pre>
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </form>
    </FormProvider>
  );
}
