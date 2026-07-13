"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function CopyLinkButton() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      setCopied(true);
      toast.success("Link copied to clipboard.");

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link.");
    }
  }, []);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.altKey && e.key === "c") {
        e.preventDefault();
        handleCopy();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [handleCopy]);

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={handleCopy}
      className="gap-2 preset-5-medium uppercase"
      title="Copy link to clipboard (Alt + C)"
      disabled={copied}
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
