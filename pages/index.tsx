import React, { Suspense } from "react";
import { ThemeProvider } from "styled-components";
import Layout from "./layout";
import Hero from "./Home/components/Hero";
import Services from "./Home/components/Services";
import About from "./Home/components/About";
import Products from "./Home/components/Products";
import Testimonials from "./Home/components/Testimonials";
import Newsletter from "./Home/components/Newsletter";
import Blog from "./Home/components/Blog";


const Home = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Layout>
				<Hero />
				<ThemeProvider theme={{ ThemeProvider }}>
					<Products />
				</ThemeProvider>
				<div className="bg-2D3E50">
					<Services />
				</div>
				<About />
				<Testimonials />
				<Newsletter />
				<Blog />
			</Layout>
		</Suspense>
	);
};

export default Home;
