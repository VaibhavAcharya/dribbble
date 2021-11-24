import Head from "next/head";

import "tailwindcss/tailwind.css";

const _App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>Dribbble</title>
        <meta name="description" content="Dribbble client." />
        <link rel="shortcut icon" href="/logo.svg" type="image/x-icon" />
      </Head>

      <Component {...pageProps} />
    </>
  );
};

export default _App;
