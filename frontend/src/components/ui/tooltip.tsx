import {
  Arrow,
  Portal,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

interface ToolTipProps {
  triggerChildren?: React.ReactNode;
  message: string;
  messageStyle?: string;
  onClick?: () => void;
  preventDefault?: boolean;
}

export default function ToolTip({
  triggerChildren,
  message,
  onClick,
  messageStyle,
  preventDefault = true,
}: ToolTipProps) {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            onClick={(e) => {
              if (preventDefault) {
                e.preventDefault();
              }
              if (onClick) onClick();
            }}
          >
            {triggerChildren}
          </TooltipTrigger>
          <Portal>
            <TooltipContent sideOffset={5} className="z-50">
              <div
                className={`message rounded-sm bg-primary-700 px-3 py-1 text-sm font-semibold text-white ${messageStyle}`}
              >
                {message}
              </div>
              <Arrow
                className="TooltipArrow rounded"
                style={{ fill: "#417EC9" }}
              />
            </TooltipContent>
          </Portal>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
