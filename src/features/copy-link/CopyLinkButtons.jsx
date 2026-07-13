"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(window.location.href);

      setCopied(true);
      toast.success("Link copied to clipboard.");

      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link.");
    }
  }

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={handleCopy}
      className="gap-2 preset-5-medium uppercase"
    >
      {copied ? (
        <>
          <Check />
          Copied!
        </>
      ) : (
        <>
          <Copy />
          Copy Link
        </>
      )}
    </Button>
  );
}
