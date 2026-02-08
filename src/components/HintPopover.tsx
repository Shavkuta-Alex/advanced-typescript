import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface HintPopoverProps {
  hint: string;
  index: number;
}

export function HintPopover({ hint, index }: HintPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="bg-white/15 border border-white/30 text-emerald-300 hover:bg-white/25 hover:text-emerald-200 text-xs mt-2"
        >
          Show Hint {index + 1}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-sm text-sm">{hint}</PopoverContent>
    </Popover>
  );
}
