"use client";

import Button from "@/components/Button";
import { RefreshCcw } from "lucide-react";
import { clearPath, clearTag } from "@/app/(examples)/users/clear_cache_action";
import { startTransition, useTransition } from "react";

const RefreshUserButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    // The function you pass to startTransition must be synchronous
    // See: https://react.dev/reference/react/useTransition#react-doesnt-treat-my-state-update-as-a-transition
    startTransition(async () => {
      await clearTag("users");
    });
  };

  return (
    <Button
      variant="primary"
      prefix={<RefreshCcw />}
      onClick={handleClick}
      loading={isPending}
    >
      Refresh
    </Button>
  );
};

export default RefreshUserButton;
