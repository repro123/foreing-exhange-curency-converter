import LogoSVG from "@/components/SVGs/LogoSVG";
import NavDots from "@/components/ui/NavDots";
import CurrenciesNumber from "@/features/currencies-number/CurrenciesNumber";
import CurrenciesNumberSkeleton from "@/features/currencies-number/CurrenciesNumberSkeleton";
import ThemeToggle from "@/features/theme/ThemeToggle";

import { Suspense } from "react";

function HeaderContainer() {
  return (
    <div className="w-full max-w-480 mx-auto flex items-center gap-4 justify-between">
      <LogoSVG />

      <div className="preset-6 md:preset-4 flex items-center gap-4">
        <div className="flex items-center gap-2 text-nav">
          <Suspense fallback={<CurrenciesNumberSkeleton />}>
            <CurrenciesNumber />
          </Suspense>

          <NavDots />

          <p>EOD</p>

          <NavDots />

          <p>ECB Data</p>
        </div>

        <ThemeToggle />
      </div>
    </div>
  );
}

export default HeaderContainer;
