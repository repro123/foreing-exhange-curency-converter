"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

function LogBtn() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error("Test error boundary");
  }

  return (
    <Button
      size="lg"
      variant="outline"
      className="uppercase preset-5-medium"
      onClick={() => setShouldThrow(true)}
    >
      Log conversion
    </Button>
  );
}

export default LogBtn;
