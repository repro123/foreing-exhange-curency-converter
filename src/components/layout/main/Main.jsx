import MainContainer from "@/components/layout/containers/MainContainer";
import CheckRateSection from "@/features/check-rates/CheckRateSection";
import CheckRatesSectionSkeleton from "@/features/check-rates/CheckRatesSectionSkeleton";
import ComparePanelWrapper from "@/features/compare/ComparePanelWrapper";
import TabsSection from "@/features/tabs/TabsSection";
import { Suspense } from "react";

function Main({ searchParams }) {
  const from = searchParams.from ?? "USD";
  const amount = Number(searchParams.amount ?? "1000");

  return (
    <main className="px-4">
      <MainContainer>
        <Suspense fallback={<CheckRatesSectionSkeleton />}>
          <CheckRateSection searchParams={searchParams} />
        </Suspense>

        <TabsSection
          comparePanel={
            <Suspense fallback={<p>Loading compare...</p>}>
              <ComparePanelWrapper from={from} amount={amount} />
            </Suspense>
          }
        />
      </MainContainer>
    </main>
  );
}

export default Main;
