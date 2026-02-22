import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface IConfirmationDialogProps {
  triggerChildren?: React.ReactNode;
  title?: string;
  description?: string;
  handleConfirm?: () => void;
  handleCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  titleClassName?: string;
  overlayClassName?: string;
}
export function ConfirmationDialog({
  triggerChildren,
  description,
  handleCancel,
  handleConfirm,
  confirmText = "Continue",
  cancelText = "Cancel",
  title = "Are you absolutely sure?",
  titleClassName,
  overlayClassName,
}: IConfirmationDialogProps) {
  return (
    <AlertDialog
    // open={true}
    // onOpenChange={(open) => {
    //   if (!open) {
    //     handleCancel?.();
    //   }
    // }}
    >
      {/* <AlertDialog
      open={true}
      onOpenChange={(open) => {
        if (!open) {
          handleCancel?.();
        }
      }}
    > */}
      <AlertDialogTrigger asChild>
        {triggerChildren || (
          <button className="rounded-lg bg-blue-500 px-4 py-2 text-white">
            {title}
          </button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent
        className="rounded-lg bg-white max-sm:w-11/12"
        overlayClassName={overlayClassName}
      >
        <AlertDialogHeader>
          <AlertDialogTitle
            className={`text-base font-semibold leading-3 md:text-lg md:leading-normal lg:text-xl ${titleClassName}`}
          >
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="">
          <AlertDialogCancel
            onClick={() => {
              if (handleCancel) handleCancel();
            }}
          >
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              if (handleConfirm) handleConfirm();
            }}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
