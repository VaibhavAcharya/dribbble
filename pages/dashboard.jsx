import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import Layout from "../components/Layout";
import { useUser } from "../utils/auth";

const Dashboard = () => {
  const Router = useRouter();
  const { isLoading, isLoggedIn, logout, getUser, getShots } = useUser();

  const [user, setUser] = useState(undefined);
  const [shots, setShots] = useState(undefined);

  useEffect(() => {
    if (!isLoading) {
      if (isLoggedIn) {
        (async () => {
          setUser(await getUser());
          setShots(await getShots());
        })();
      } else {
        Router.push("/");
      }
    }
  }, [isLoading, isLoggedIn]);

  return (
    <Layout className="flex flex-col items-stretch justify-start gap-8">
      <header className="flex flex-row flex-wrap items-center justify-between gap-2">
        <nav className="flex flex-row items-center justify-between gap-4">
          <Image src="/logo.svg" alt="logo" width={32} height={32} />
          <button
            className="font-archivo text-sm underline text-gray-700 hover:text-gray-600 disabled:opacity-50"
            disabled={isLoading}
            onClick={logout}
          >
            Remove account
          </button>
        </nav>
        <div className="px-4 py-1 bg-gray-200 font-archivo text-sm text-gray-600 rounded-full">
          {user?.html_url ?? "..."}
        </div>
      </header>
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {shots?.map((shot) => {
          return (
            <article key={shot.id}>
              <img
                src={shot.images.normal}
                className="max-w-full h-auto rounded-lg rounded-b-none"
              />
              <p className="p-2 border font-archivo font-bold rounded-lg rounded-t-none">
                {shot.title}
              </p>
            </article>
          );
        })}
      </main>
      <div className="flex flex-row items-center justify-center">
        <button className="border-2 px-4 py-1 flex flex-row items-center justify-center gap-2 font-archivo font-bold text-sm rounded-lg">
          <span>Show More</span>
          <svg
            height={22}
            width={22}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.5 8.5l-4 4-4-4"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </Layout>
  );
};

export default Dashboard;
