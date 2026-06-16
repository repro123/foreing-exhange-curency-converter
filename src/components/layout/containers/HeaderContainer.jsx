function HeaderContainer({ children }) {
  return (
    <div className="w-full max-w-480 mx-auto flex items-center gap-4 justify-between">
      {children}
    </div>
  );
}

export default HeaderContainer;
