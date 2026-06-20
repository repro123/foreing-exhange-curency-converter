import Header from "@/components/layout/header/Header";
import Aside from "@/components/layout/aside/Aside";
import Main from "@/components/layout/main/Main";

export default async function Home({ searchParams }) {
  const params = await searchParams;

  return (
    <>
      <Header />
      <Aside />
      <Main searchParams={params} />
    </>
  );
}
