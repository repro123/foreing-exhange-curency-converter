"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import ThemeIcon from "@/features/theme/ThemeIcon";
import ThemeSelector from "@/features/theme/ThemeSelector";
import { useTheme } from "next-themes";
import { useState } from "react";

function ThemeToggle() {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button variant="theme" aria-label="Switch theme">
            <ThemeIcon />
          </Button>
        }
      />
      <PopoverContent align="start">
        <PopoverHeader>
          <PopoverTitle id="select-theme">Select Theme</PopoverTitle>
          <PopoverDescription>
            Current theme: <span className="capitalize">{theme}</span>
          </PopoverDescription>
          <ThemeSelector aria="select-theme" onSelect={() => setOpen(false)} />
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
}

export default ThemeToggle;
