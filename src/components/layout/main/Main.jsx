import MainContainer from "@/components/layout/containers/MainContainer";
import CheckRateSection from "@/features/check-rates/CheckRateSection";
import CheckRatesSectionSkeleton from "@/features/check-rates/CheckRatesSectionSkeleton";
import ComparePanelSkeleton from "@/features/compare/ComparePanelSkeleton";
import ComparePanelWrapper from "@/features/compare/ComparePanelWrapper";
import HistoryPanelWrapper from "@/features/history/HistoryPanelWrapper";
import TabsSection from "@/features/tabs/TabsSection";
import { Suspense } from "react";

function Main({ searchParams }) {
  const from = searchParams?.from ?? "USD";
  const to = searchParams?.to ?? "EUR";
  const amount = Number(searchParams.amount ?? "1000");
  const period = searchParams.period ?? "1M";

  return (
    <main className="px-4">
      <MainContainer>
        <Suspense fallback={<CheckRatesSectionSkeleton />}>
          <CheckRateSection searchParams={searchParams} />
        </Suspense>

        <TabsSection
          comparePanel={
            <Suspense fallback={<ComparePanelSkeleton />}>
              <ComparePanelWrapper from={from} amount={amount} />
            </Suspense>
          }
          historyPanel={
            <Suspense fallback={<p>Loading...</p>}>
              <HistoryPanelWrapper
                fromCurrency={from}
                toCurrency={to}
                period={period}
              />
            </Suspense>
          }
        />
      </MainContainer>
    </main>
  );
}

export default Main;
