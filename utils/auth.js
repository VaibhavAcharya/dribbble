import useSWR from "swr";

export const useUser = () => {
  const { isValidating, data, error, mutate } = useSWR(
    "/api/auth/session",
    (url) => {
      return fetch(url).then(async (res) => {
        return await res.json();
      });
    }
  );

  const isLoggedIn = data?.access_token ?? null;

  const logout = async () => {
    if (isLoggedIn) {
      try {
        const res = await fetch(`/api/auth/logout`);
        mutate();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const getUser = async () => {
    if (isLoggedIn) {
      try {
        const res = await fetch(
          `https://api.dribbble.com/v2/user?access_token=${data?.access_token}`
        );

        return await res.json();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const getShots = async () => {
    if (isLoggedIn) {
      try {
        const res = await fetch(
          `https://api.dribbble.com/v2/user/shots?access_token=${data?.access_token}`
        );

        return await res.json();
      } catch (e) {
        console.error(e);
      }
    }
  };

  return {
    isLoading: isValidating,
    isLoggedIn,
    logout,
    getUser,
    getShots,
  };
};
