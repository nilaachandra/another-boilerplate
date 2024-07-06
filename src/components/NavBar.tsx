import Image from "next/image";
import React from "react";
import ThemeToggle from "./ThemeToggler";
import Link from "next/link";

const NavBar = () => {
  return (
    <header className="w-full flex justify-between items-center">
      <Link
        href={"/"}
        className="font-bold leading-none dark:bg-white bg-black dark:text-black text-white p-2 rounded-md"
      >
        Another <br /> Boilerplate
      </Link>
      <div className="flex items-center gap-3">
        <a href="" className="font-semibold text-blue-600">
          ⭐ on Github
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default NavBar;
