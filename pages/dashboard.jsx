import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
          <svg
            className="w-8 h-8 fill-current text-gray-800"
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Dribbble</title>
            <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z" />
          </svg>
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
        <button className="border-2 px-4 py-1 font-archivo font-bold text-sm rounded-lg">
          Show More ▼
        </button>
      </div>
    </Layout>
  );
};

export default Dashboard;
