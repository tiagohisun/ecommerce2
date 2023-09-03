import React from "react";
import Footer from "./Home/components/Footer";
import Header from "./Home/components/Header";
import Head from "next/head";


interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<>
			<Head>
				<title>Your App Title</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				{/* Add any other meta tags or links you need */}
			</Head>
			<div className="overflow-x-hidden">
				<Header />
				{children}
				<Footer />
			</div>
		</>
	);
}
