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

function ThemeToggle() {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="theme" aria-label="Switch theme">
            <ThemeIcon />
          </Button>
        }
      />
      <PopoverContent align="start">
        <PopoverHeader>
          <PopoverTitle>Select Theme</PopoverTitle>
          <PopoverDescription>
            Switch between light and dark modes or use the system preference.
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
}

export default ThemeToggle;
