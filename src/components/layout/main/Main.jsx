import MainContainer from "@/components/layout/containers/MainContainer";
import CheckRateSection from "@/features/check-rates/CheckRateSection";
import CheckRatesSectionSkeleton from "@/features/check-rates/CheckRatesSectionSkeleton";
import { Suspense } from "react";

function Main(main) {
  return (
    <main className="px-4">
      <MainContainer>
        <Suspense fallback={<CheckRatesSectionSkeleton />}>
          <CheckRateSection />
        </Suspense>

        <section></section>
      </MainContainer>
    </main>
  );
}

export default Main;
