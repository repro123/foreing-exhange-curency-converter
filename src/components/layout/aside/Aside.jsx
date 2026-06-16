import AsideContainer from "@/components/layout/containers/AsideContainer";
import LiveMarketsLabel from "@/features/scrolling-ticker/LiveMarketsLabel";
import TickerWrapper from "@/features/scrolling-ticker/TickerWrapper";
import TickerWrapperSkeleton from "@/features/scrolling-ticker/TickerWrapperSkeleton";
import { Suspense } from "react";

function Aside() {
  return (
    <aside className="bg-card-base h-10 w-full">
      <AsideContainer>
        <LiveMarketsLabel />

        <Suspense fallback={<TickerWrapperSkeleton />}>
          <TickerWrapper />
        </Suspense>
      </AsideContainer>
    </aside>
  );
}

export default Aside;
