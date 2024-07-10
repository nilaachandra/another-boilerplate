"use client"
import React from "react";
import ThemeToggle from "./ThemeToggler";
import { usePathname } from "next/navigation";
import { Link } from "next-view-transitions";



type NavLink = {
  linkName : string,
  href: string,
}
const navLinks: { [key: string]: NavLink } = {
  "/": { linkName: "Home", href: "/" },
  "/dashboard": { linkName: "Dashboard", href: "/dashboard" },
  "/auth/login": { linkName: "Login", href: "/login" },
  "/auth/signup": { linkName: "Signup", href: "/signup" },
};
const NavBar = () => {
  const pathname = usePathname() || "/";
  return (
    <header className="w-full flex flex-col justify-between items-center">
      <div className="w-full flex justify-between items-center">
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
      </div>
      <div className="link-container w-full flex items-center gap-4 mt-3">
        {Object.entries(navLinks).map(([path, { linkName }]) => (
          <Link
            key={path}
            href={path}
            className={
              pathname === path ? "underline font-semibold" : "text-zinc-500"
            }
          >
            {linkName}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default NavBar;
