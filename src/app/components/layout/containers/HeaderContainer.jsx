import LogoSVG from "@/app/components/SVGs/LogoSVG";
import NavDots from "@/app/components/ui/NavDots";

function HeaderContainer() {
  return (
    <div className="w-full max-w-480 mx-auto border flex items-center gap-4 justify-between">
      <LogoSVG />

      <div className="preset-6 md:preset-4 ">
        <div className="flex items-center gap-2 text-nav">
          <span>55 currencies</span>
          <NavDots />

          <span>EOD</span>
          <NavDots />
          <span>ECB Data</span>
        </div>
      </div>
    </div>
  );
}

export default HeaderContainer;
