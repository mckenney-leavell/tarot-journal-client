"use client";
import { useAppContext } from "@/context/AuthProvider";
import { createSpread } from "@/data/spreads";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaAsterisk } from "react-icons/fa"

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isActiveId, setIsActiveId] = useState(0)
  const { token, setToken } = useAppContext()

  const router = useRouter()

	useEffect(() => {
		if (token) {
			setIsLoggedIn(true)
		}
	}, [token])


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);

  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Learn Tarot", href: "/cards" },  
    { name: "Add Reading", href: "/spreads/new" },
    { name: "Single Card Reading", href: "/spreads/random" },
    { name: "My Readings", href: "/spreads" },
  ];

  const getLoggedOutButtons = () => {
    return (
      <div className="flex flex-wrap">
        <Link 
          href="/login"
          className="bg-zinc-400 hover:bg-zinc-500 text-slate px-8 py-2 rounded-md m-2"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Login
        </Link>
        <Link 
          href="/register"
          className="bg-zinc-400 hover:bg-zinc-500 text-slate px-8 py-2 rounded-md m-2"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Sign Up
        </Link>
      </div>
    )
  }

  const getLoggedInButton = () => {
      return ( 
        <>
          {navItems.map((item, index) => (  
            <li
              key={index}
              className="flex items-center p-1 text-lg gap-x-2 text-(--clr-light-a0) hover:text-zinc-300"
            >
              <Link onClick={() => {setIsMobileMenuOpen(false); setIsActiveId(index)}} href={item.href} className={isActiveId === index ? "flex items-center text-(--clr-primary-a10)" : "flex items-center text-(--clr-light-a0)"}>
                {item.name}
              </Link>
            </li>
          ))} 
          <li className="flex items-center p-1 text-lg gap-x-2">
            <button 
              className="flex items-center text-(--clr-surface-tonal-a50)"
              onClick={() => {
                    localStorage.removeItem("token")
                    setIsLoggedIn(false)
                    setIsMobileMenuOpen(false)
                    setToken("")
                    router.push("/login")
                  }}
            >
              Logout
            </button>
          </li>
        </>
      )
  }

  return (
    
    <div>
      {!token ? "" : (
      <nav className="bg-(--clr-surface-tonal-a10) fixed w-full z-20 top-0 start-0 border-b border-(--clr-surface-tonal-a30)">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href="/"
            className="flex flex-row mr-4 block cursor-pointer py-1.5 text-(--clr-light-a0) font-bold text-2xl"
            onClick={() => setIsActiveId(0)}
          >
            <FaAsterisk className="flex-none text-(--clr-primary-a10) group-hover:text-(--clr-surface-tonal-a20) size-7 my-auto mr-4"/>
            TAROT JOURNAL
          </Link>

          <div className="lg:hidden">
            <button
              className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-zinc-500 transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              onClick={toggleMobileMenu}
              type="button"
            >
              <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </span>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`fixed top-0 left-0 min-h-screen w-64 bg-(--clr-surface-tonal-a0) shadow-lg transform transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            } lg:hidden z-50`}
          >
            <div className="flex flex-row items-center border-(--clr-surface-a30) pb-4">
              <Link
                href="/"
                className="cursor-pointer text-zinc-300 font-bold text-xl pt-4 ps-4"
              >
                <FaAsterisk className="flex-none text-(--clr-primary-a10) group-hover:text-(--clr-surface-tonal-a20) size-7 my-auto mr-4"/>
              </Link>
              <button
                onClick={toggleMobileMenu}
                className="absolute top-4 right-4 text-(--clr-light-a0) hover:text-slate-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <ul className="flex flex-col h-full gap-4 p-4">
                {isLoggedIn ? getLoggedInButton() : getLoggedOutButtons()}
            </ul>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              {isLoggedIn ? getLoggedInButton() : getLoggedOutButtons()}
            </ul>
          </div>
        </div>
      </nav>
    )}
    </div>
  
  )
  
}