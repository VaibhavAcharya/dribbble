const Layout = ({ children, className = "" }) => {
  return (
    <div
      className={`${[
        "container min-h-screen mx-auto p-4 bg-white",
        className,
      ].join(" ")}`}
    >
      {children}
    </div>
  );
};

export default Layout;
