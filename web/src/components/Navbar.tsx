import { useEffect, useState } from "react";

const Navbar = () => {
  const [dark, setDark] = useState(
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [dark]);
  return (
    <nav className="max-w-3/4 h-16 mx-auto bg-slate-300 rounded-md flex justify-between items-center px-8 dark:bg-black dark:text-white ">
      <div>
        <h2>Habit-Hero</h2>
      </div>
      <ul>
        <li className=" rounded-lg  border-black border-1  dark:border-white">
          <button
            className=" flex items-center justify-center h-7.5 w-8"
            onClick={() => setDark(!dark)}
          >
            {dark ? "☀️" : "🌑"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
