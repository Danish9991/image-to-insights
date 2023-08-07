"use client" // this is a client component
import React, { useEffect } from "react"
import { useState } from "react"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from "next-themes"

interface NavItem {
  label: string
  page: string
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Home",
    page: "/",
  },
  {
    label: "Upload",
    page: "upload",
  }
]

export default function Navbar() {
    const router = useRouter();
    const { setTheme, theme } = useTheme()
   const [navbar, setNavbar] = useState(false)
   const [mount, setMount] = useState(false)
   const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light'); // Toggle between 'light' and 'dark'
  };

  useEffect(() => {
    if(!mount){
      setMount(true)
    }
  },[mount])

  if(!mount){
    return null
  }

    // Choose the icon based on the theme
    const themeIcon = theme === 'light' ? <FiSun size={20} /> : <FiMoon size={20} />;
    const themeLabel = theme === 'light' ? 'Light Mode' : 'Dark Mode';
  return (
    <header className="w-full mx-auto  px-4 sm:px-20 fixed top-0 z-50 shadow bg-white dark:bg-slate-800 dark:text-white">
      <div className="justify-between md:items-center md:flex">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link href="home">
              <div className="container flex items-center space-x-2">
                <h2 style={{fontFamily: "cursive"}} className="text-4xl font-bold">Insights</h2>
              </div>
            </Link>
          </div>
        </div>

        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <div className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              {NAV_ITEMS.map((item, idx) => {
                return (
                  <a
                    key={idx}
               
                    className={
                      "block cursor-pointer lg:inline-block text-neutral-900  hover:text-neutral-500 dark:text-white"
                    }
                    onClick={() =>router.push(item.page)}
                  >
                    {item.label}
                  </a>
                )
              })}
        <button className="flex items-center" onClick={toggleTheme}>
          {themeIcon}
          {/* {themeLabel} */}
        </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}