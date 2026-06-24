function EmptyPanelState({ heading = "", paragraph = "" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
      <div className="flex flex-col gap-2">
        <p className="preset-3-medium text-foreground">{heading}</p>
        <p className="preset-5 text-nav">{paragraph}</p>
      </div>
    </div>
  );
}

export default EmptyPanelState;
