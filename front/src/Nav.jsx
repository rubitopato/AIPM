const Nav = () => {
  return (
    <nav className="bg-indigo-400 py-4">
      <div className="flex max-w-7xl mx-auto">
        <div className="w-1/2 text-center">
          Application Developed by:{" "}
          <span className="ml-2 bg-transparent font-semibold select-none py-2 px-2 rounded-full text-black hover:text-white hover:bg-indigo-600 transition-all">
            David Robredo
          </span>{" "}
          -{" "}
          <span className="bg-transparent font-semibold select-none py-2 p-4 rounded-full text-black hover:text-white hover:bg-indigo-600 transition-all">
            Rubén Gonzalez
          </span>{" "}
          -{" "}
          <span className="bg-transparent font-semibold select-none py-2 p-4 rounded-full text-black hover:text-white hover:bg-indigo-600 transition-all">
            Duarte Novas
          </span>
        </div>
        <div
          className="w-1/2 text-right "
          href="https://github.com/rubitopato/AIPM"
        >
          <a
            className="font-semibold text-white cursor-pointer py-2 px-6 hover:bg-indigo-700 bg-indigo-600 rounded-full"
            target="_blank"
            href="https://github.com/rubitopato/AIPM"
          >
            Github
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
