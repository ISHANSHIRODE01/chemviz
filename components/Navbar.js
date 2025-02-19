"use client";
import { FaSearch } from "react-icons/fa";
import React, { useState } from "react";
import { UserButton, useSession } from '@clerk/clerk-react'
import { elements } from "./../data/Elementsdata";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const { isLoaded, session, isSignedIn } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredElements, setFilteredElements] = useState(elements);
  const router = useRouter(); // Using router for navigation

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = elements.filter(
      (element) =>
        element.name.toLowerCase().includes(value.toLowerCase()) ||
        element.symbol.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredElements(filtered);
  };

  const handleElementClick = (elementName) => {
    if (typeof elementName === "string") {
      setSearchTerm("");
      setFilteredElements([]);
      setTimeout(() => {
        router.push(`/elements/${elementName.toLowerCase()}`);
      }, 100);
    } else {
      console.error("Element name is not a string:", elementName);
    }
  };

  return (
    <header className="p-4 dark:bg-gray-100 dark:text-gray-800">
      <div className="container flex items-center justify-between h-16 mx-auto">
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <Link href="/" className="flex items-center px-4 -mb-1">
              Home
            </Link>
          </li>
          <li className="flex">
            <Link href="/About" className="flex items-center px-4 -mb-1">
              About
            </Link>
          </li>
          <li className="flex">
            <Link href="/Contact" className="flex items-center px-4 -mb-1">
              Contact
            </Link>
          </li>
        </ul>

        <Link
          href="/"
          aria-label="Back to homepage"
          className="flex items-center mx-auto"
        >
          <svg
            fill="currentColor"
            viewBox="0 0 32 32"
            className="w-8 h-8 text-violet-600 dark:text-violet-600"
          >
            <path d="M27.912 7.289l-10.324-5.961c-0.455-0.268-1.002-0.425-1.588-0.425s-1.133 0.158-1.604 0.433l0.015-0.008-10.324 5.961c-0.955 0.561-1.586 1.582-1.588 2.75v11.922c0.002 1.168 0.635 2.189 1.574 2.742l0.016 0.008 10.322 5.961c0.455 0.267 1.004 0.425 1.59 0.425 0.584 0 1.131-0.158 1.602-0.433l-0.014 0.008 10.322-5.961c0.955-0.561 1.586-1.582 1.588-2.75v-11.922c-0.002-1.168-0.633-2.189-1.573-2.742zM27.383 21.961c0 0.389-0.211 0.73-0.526 0.914l-0.004 0.002-10.324 5.961c-0.152 0.088-0.334 0.142-0.53 0.142s-0.377-0.053-0.535-0.145l0.005 0.002-10.324-5.961c-0.319-0.186-0.529-0.527-0.529-0.916v-11.922c0-0.389 0.211-0.73 0.526-0.914l0.004-0.002 10.324-5.961c0.152-0.090 0.334-0.143 0.53-0.143s0.377 0.053 0.535 0.144l-0.006-0.002 10.324 5.961c0.319 0.185 0.529 0.527 0.529 0.916z"></path>
            <path d="M22.094 19.451h-0.758c-0.188 0-0.363 0.049-0.515 0.135l0.006-0.004-4.574 2.512-5.282-3.049v-6.082l5.282-3.051 4.576 2.504c0.146 0.082 0.323 0.131 0.508 0.131h0.758c0.293 0 0.529-0.239 0.529-0.531v-0.716c0-0.2-0.11-0.373-0.271-0.463l-0.004-0.002-5.078-2.777c-0.293-0.164-0.645-0.26-1.015-0.26-0.39 0-0.756 0.106-1.070 0.289l0.010-0.006-5.281 3.049c-0.636 0.375-1.056 1.055-1.059 1.834v6.082c0 0.779 0.422 1.461 1.049 1.828l0.009 0.006 5.281 3.049c0.305 0.178 0.67 0.284 1.061 0.284 0.373 0 0.723-0.098 1.027-0.265l-0.012 0.006 5.080-2.787c0.166-0.091 0.276-0.265 0.276-0.465v-0.716c0-0.293-0.238-0.529-0.529-0.529z"></path>
          </svg>
        </Link>

        <div className="flex items-center md:space-x-4 relative">
          <div className="relative">
            <input
              type="search"
              name="Search"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              onClick={handleElementClick}
              autoComplete="off"
              className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none dark:bg-gray-100 dark:text-gray-800 focus:dark:bg-gray-50"
            />
            <button
              type="submit"
              title="Search"
              className="absolute left-2 top-2"
            >
              <FaSearch className="w-4 h-4 dark:text-gray-800" />
            </button>

            {/* Search Results Dropdown */}
            {searchTerm && (
              <div className="absolute left-0 right-0 mt-1 bg-white shadow-lg rounded-md z-10">
                <ul className="max-h-60 overflow-auto">
                  {filteredElements.length > 0 ? (
                    filteredElements.map((element) => (
                      <li
                        key={element.id}
                        className="px-4 py-2 hover:bg-gray-100"
                      >
                        <button
                          onClick={() => handleElementClick(element.name)}
                          className="w-full text-left"
                        >
                          {element.name} ({element.symbol})
                        </button>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-gray-500">
                      No results found
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
          {session && (
            <div
              className="relative hidden lg:block"
              onMouseEnter={() => setIsMenuOpen(true)}
              onMouseLeave={() => setIsMenuOpen(false)}
            >
              <UserButton />
            </div>
          )}
          {!session && (
            <Link href="/sign-in">
              <button
                type="button"
                className="hidden px-6 py-2 font-semibold rounded lg:block bg-violet-600 dark:bg-violet-600 dark:text-gray-50"
              >
                SignUP
              </button>
            </Link>
          )}
        </div>
        {/* Mobile Menu Button */}
        <div className=" lg:hidden items-center space-x-4">
          <UserButton />
        </div>
        <button
          title="Open menu"
          type="button"
          className="p-4 lg:hidden"
          onClick={toggleMenu}
        >
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-gray-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <ul className="space-y-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 dark:text-gray-200">
            <li>
              <Link href="/" className="block py-2 px-4">
                Home
              </Link>
            </li>
            <li>
              <Link href="/About" className="block py-2 px-4">
                About
              </Link>
            </li>
            <li>
              <Link href="/Contact" className="block py-2 px-4">
                Contact
              </Link>
            </li>
            <li>
              {!session && (
                <Link href="/sign-in">
                  <button
                    type="button"
                    className="block w-full py-2 px-4 font-semibold rounded dark:bg-violet-600 dark:text-gray-50"
                  >
                    SignUP
                  </button>
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
