import React, { useState } from 'react';

type Customer = {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
};

type Props = {
  customer: Customer;
  onSubmit: (customer: Customer) => void;
};

const CustomerForm: React.FC<Props> = ({ customer, onSubmit }) => {
	const [name, setName] = useState(customer.name);
	const [email, setEmail] = useState(customer.email);
	const [phoneNumber, setPhoneNumber] = useState(customer.phoneNumber);
	const [address, setAddress] = useState(customer.address);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit({ ...customer, name, email, phoneNumber, address });
	};
	return (
		<div className="max-w-3xl mx-auto px-4 py-8">
			<h2 className="text-3xl font-bold mb-6">Add Customer</h2>
			<form onSubmit={handleSubmit} style={{ height: '80vh', overflow: 'scroll' }}>
				<div>
					<label
						htmlFor="name"
						className="block text-sm font-medium text-gray-700"
					>
						Name
					</label>
					<input
						type="text"
						id="name"
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
					/>
				</div>
				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-700"
					>
						Email
					</label>
					<input
						type="email"
						id="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
					/>
				</div>
				<div>
					<label
						htmlFor="phone-number"
						className="block text-sm font-medium text-gray-700"
					>
						Phone Number
					</label>
					<input
						type="tel"
						id="phone-number"
						placeholder="Phone Number"
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
					/>
				</div>
				<div>
					<label
						htmlFor="address"
						className="block text-sm font-medium text-gray-700"
					>
						Address
					</label>
					<input
						type="text"
						id="address"
						placeholder="Address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
					/>
				</div>
				<button
					type="submit"
					className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
				>
					Submit
				</button>
			</form>

			<div className="mt-12">
				<h2 className="text-3xl font-bold mb-6">Customers List</h2>
				{/* Render customers list from Google Contacts here */}
			</div>
		</div>
	);
};

export default CustomerForm;