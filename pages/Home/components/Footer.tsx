import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-4">Your Logo</h3>
          </div>
          <div className="col-span-1">
            <ul className="space-y-4">
              <li>
                <Link href="/">
                  <span className="hover:text-gray-300">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className="hover:text-gray-300">About</span>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <span className="hover:text-gray-300">Services</span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="hover:text-gray-300">Contact</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-1"></div>
          <div className="col-span-1 flex items-center justify-end space-x-4">
            <Link href="#">
              <FaFacebook size={20} />
            </Link>
            <Link href="#">
              <FaTwitter size={20} />
            </Link>
            <Link href="#">
              <FaInstagram size={20} />
            </Link>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8">
          <p className="text-center text-sm">
            &copy; {new Date().getFullYear()} Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
