function CachedDataNotice({ title = "Saved data", children }) {
  return (
    <div
      role="status"
      className="mb-4 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-primary"
    >
      <p className="preset-5-medium uppercase">{title}</p>
      <p className="preset-5 mt-1 text-foreground">{children}</p>
    </div>
  );
}

export default CachedDataNotice;
