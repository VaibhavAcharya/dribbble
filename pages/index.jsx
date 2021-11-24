import { useEffect } from "react";
import { useRouter } from "next/router";

import { setCookie } from "./../utils/cookies";

import Layout from "./../components/Layout";
import { useUser } from "../utils/auth";

export const getServerSideProps = async (ctx) => {
  const code = ctx?.query?.code;

  if (code) {
    try {
      const res = await fetch(
        `https://dribbble.com/oauth/token?client_id=${process.env.NEXT_PUBLIC_DRIBBBLE_CLIENT_ID}&client_secret=${process.env.DRIBBBLE_CLIENT_SECRET}&code=${code}`,
        {
          method: "POST",
        }
      );
      const data = await res.json();

      if (data?.access_token) {
        setCookie(ctx?.res, "auth", data);
      } else {
        console.error(data);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return {
    props: {},
  };
};

const Home = () => {
  const Router = useRouter();
  const { isLoading, isLoggedIn } = useUser();

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      Router.push("/dashboard");
    }
  }, [isLoading, isLoggedIn]);

  return (
    <Layout className="grid place-items-center">
      <button
        className="font-archivo bg-gray-900 hover:bg-gray-800 text-white px-4 py-1 rounded disabled:opacity-50"
        disabled={isLoading}
        onClick={() => {
          Router.push({
            pathname: "https://dribbble.com/oauth/authorize",
            query: {
              client_id: process.env.NEXT_PUBLIC_DRIBBBLE_CLIENT_ID,
            },
          });
        }}
      >
        Integrate Dribbble
      </button>
    </Layout>
  );
};

export default Home;
