import React, { FC } from "react";
import Link from "next/link";

interface SidebarProps {
	setActivePage: (page: string) => void;
}

import {
	FiPieChart,
	FiUsers,
	FiFileText,
	FiMail,
	FiPhone,
	FiMenu,
} from "react-icons/fi";

const Sidebar: FC<SidebarProps> = ({ setActivePage }) => {
	return (
		<div className="fixed inset-y-0 left-0 w-64 bg-blue-500 text-white flex-none z-10 overflow-hidden">
			<div className="flex items-center justify-between h-16 px-4">
				<h1 className="text-2xl font-bold">Dental04</h1>
				<button className="lg:hidden text-white focus:outline-none">
					<FiMenu className="w-6 h-6" />
				</button>
			</div>
			<nav className="mt-6 px-2 space-y-1">
				<Link
					href="/admin/components/customers"
					className="block px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
					onClick={(e) => {
						e.preventDefault();
						setActivePage("customers");
					}}
				>
					Customers CRUD
				</Link>
				<Link
					href="/admin/components/products"
					className="block px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
					onClick={(e) => {
						e.preventDefault();
						setActivePage("products");
					}}
				>
					Products CRUD
				</Link>

				<Link
					href="/admin/components/blog"
					className="block px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
					onClick={(e) => {
						e.preventDefault();
						setActivePage("blog");
					}}
				>
					Blog CRUD
				</Link>

				<Link
					href="/admin/newsletter"
					className="block px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
				>
					Newsletter
				</Link>
			</nav>
		</div>
	);
};

export default Sidebar;
