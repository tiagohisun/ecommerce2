
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';


function ContactPage() {
  return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-2xl font-bold mb-4">Contact Us</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="bg-white p-4 shadow rounded-lg">
					<form>
						<div className="mb-4">
							<label htmlFor="name" className="block font-medium mb-2">
								Name:
							</label>
							<input
								type="text"
								id="name"
								name="name"
								className="border border-gray-300 rounded-lg p-2 w-full"
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="email" className="block font-medium mb-2">
								Email:
							</label>
							<input
								type="email"
								id="email"
								name="email"
								className="border border-gray-300 rounded-lg p-2 w-full"
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="message" className="block font-medium mb-2">
								Message:
							</label>
							Type 'string' is not assignable to type 'number'.
						</div>
						<button
							type="submit"
							className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
						>
							Submit
						</button>
					</form>
				</div>
				<div className="bg-white p-4 shadow rounded-lg flex flex-col justify-center space-y-4">
					<div>
						<p className="font-medium mb-2">Email:</p>
						<p>info@dentalxrayunits.com</p>
					</div>
					<div>
						<p className="font-medium mb-2">Phone:</p>
						<p>1-800-123-4567</p>
					</div>
					<div className="space-x-4">
						<a
							href="#"
							className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
						>
							<FaFacebook className="text-2xl" />
						</a>
						<a
							href="#"
							className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
						>
							<FaTwitter className="text-2xl" />
						</a>
						<a
							href="#"
							className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
						>
							<FaInstagram className="text-2xl" />
						</a>
					</div>
				</div>
			</div>
			<svg
				width={20}
				height={21}
				viewBox="0 0 20 21"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="flex-grow-0 flex-shrink-0 w-5 h-5 relative"
				preserveAspectRatio="none"
			>
				<path
					d="M4.16669 10.5H15.8334M15.8334 10.5L10 4.66663M15.8334 10.5L10 16.3333"
					stroke="#667085"
					strokeWidth="1.67"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</div>
	);
}

export default ContactPage;