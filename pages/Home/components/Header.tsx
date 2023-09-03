"use client";
import Link from "next/link";
import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-color4 px-8 py-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link href="/">
            <span className="text-white text-2xl font-bold cursor-pointer">
              Dental04
            </span>
          </Link>
          <button
            className="block lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className={`text-white ${isOpen ? "hidden" : "block"}`}>
              ☰
            </span>
            <span className={`text-white ${isOpen ? "block" : "hidden"}`}>
              ╳
            </span>
          </button>
          <div
            className={`w-full lg:w-auto lg:flex ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <ul className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4">
              <li>
                <Link href="/">
                  <span className="nav-link text-white cursor-pointer">
                    Home
                  </span>
                </Link>
              </li>
              <Link href="/products">
                <span className="nav-link text-white cursor-pointer">
                  Products
                  <i className="hidden lg:inline-block fas fa-caret-down ml-1"></i>
                </span>
              </Link>
              <li>
                <Link href="/services">
                  <span className="nav-link text-white cursor-pointer">
                    Services
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className="nav-link text-white cursor-pointer">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="nav-link text-white cursor-pointer">
                    Contact Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/admin/page">
                  <span className="nav-link text-white cursor-pointer">
                    Admin Dashboard
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
