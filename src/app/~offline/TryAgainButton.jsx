"use client";

function TryAgainButton() {
  return (
    <button
      onClick={() => window.location.reload()}
      className="mt-8 rounded-lg bg-primary px-4 py-2 text-primary-foreground"
    >
      Try Again
    </button>
  );
}

export default TryAgainButton;
