
import { Toast, toast as internalToast } from "@/components/ui/toast";
import { useToast as useToastInternal } from "@radix-ui/react-toast";
import { Dispatch, SetStateAction } from "react";

type ToastProps = React.ComponentProps<typeof Toast> & {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
};

type Toast = {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  dismiss: () => void;
};

const TOAST_LIMIT = 20;
const TOAST_REMOVE_DELAY = 1000000;

export const useToast = () => {
  const { toast: radixToast, ...rest } = useToastInternal();

  // This can be extracted into your lib folder if you
  // want to use custom dismiss logic
  function dismiss(toastId?: string) {
    radixToast.dismiss(toastId);
  }

  function toast(props: Omit<ToastProps, "id">) {
    const id = Math.random().toString(36).substring(2, 9);
    radixToast({
      ...props,
      id,
      onOpenChange: (open) => {
        if (!open) dismiss(id);
      },
    });

    return {
      id,
      dismiss: () => dismiss(id),
      update: (props: ToastProps) => radixToast({ ...props, id }),
    };
  }

  return {
    ...rest,
    toast,
    dismiss,
  };
};

export { toast };
