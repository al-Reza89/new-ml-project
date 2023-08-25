import Image from "next/image";
import HomePage from "./components/homePage/HomePage";
import getCollection from "./actions/getCollection";
import getCurrentUser from "./actions/getCurrentUser";
import EmptyState from "./components/EmptyState";

export default async function Home() {
  const currentUser = await getCurrentUser();

  console.log({ currentUser: currentUser });

  if (!currentUser) {
    return <EmptyState subtitle="You have to login first" title="Sorry" />;
  }

  const data = await getCollection();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-5  xl:px-10 xl:pt-10">
      <div className="gap-10 mt-24 ">
        <HomePage mlData={data} userId={currentUser.id} />
      </div>
      <div className="text-gray-400">
        All data scraped from{" "}
        <a
          href="https://www.rokomari.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          rokomari.com
        </a>
      </div>
    </main>
  );
}
