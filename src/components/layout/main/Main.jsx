import MainContainer from "@/components/layout/containers/MainContainer";
import CheckRateSection from "@/features/check-rates/CheckRateSection";
import CheckRatesSectionSkeleton from "@/features/check-rates/CheckRatesSectionSkeleton";
import { Suspense } from "react";

function Main({ searchParams }) {
  return (
    <main className="px-4">
      <MainContainer>
        <Suspense fallback={<CheckRatesSectionSkeleton />}>
          <CheckRateSection searchParams={searchParams} />
        </Suspense>

        <section></section>
      </MainContainer>
    </main>
  );
}

export default Main;
