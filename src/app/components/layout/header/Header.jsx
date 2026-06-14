import HeaderContainer from "@/app/components/layout/containers/HeaderContainer";

function Header({ children }) {
  return (
    <header className="p-4">
      <HeaderContainer>{children}</HeaderContainer>
    </header>
  );
}

export default Header;
