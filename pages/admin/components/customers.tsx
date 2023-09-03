import React, { useState, useEffect } from "react";
import CustomerForm from "./customersform";
import { fetchCustomers, updateCustomer, deleteCustomer, createCustomer } from "../../api/customersAPI";

type Customer = {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
};

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    fetchCustomersList();
  }, []);

  const fetchCustomersList = async () => {
    const fetchedCustomers = await fetchCustomers();
    setCustomers(fetchedCustomers);
  };

  const handleCustomerEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  const handleCustomerUpdate = async (updatedCustomer: Customer) => {
    const savedCustomer = await updateCustomer(updatedCustomer._id, updatedCustomer);

    const updatedCustomers = customers.map((customer) =>
      customer._id === savedCustomer._id ? savedCustomer : customer
    );

    setCustomers(updatedCustomers);
    setSelectedCustomer(null); // Reset the selectedCustomer state
  };

  const handleCustomerDelete = async (customerId: string) => {
    await deleteCustomer(customerId);
    setCustomers(customers.filter((customer) => customer._id !== customerId));
  };

  const handleCustomerSubmit = async (customer: Customer) => {
    const newCustomer = await createCustomer(customer);
    setCustomers([...customers, newCustomer]);
  };

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-700 mb-2">Customers</h2>
      <div>
        <CustomerForm
          key={selectedCustomer?._id || "newCustomer"}
          customer={
            selectedCustomer || {
              _id: "",
              name: "",
              email: "",
              phoneNumber: "",
              address: "",
            }
          }
          onSubmit={selectedCustomer ? handleCustomerUpdate : handleCustomerSubmit}
        />
      </div>
      <div>
        {customers.map((customer) => (
          <div key={customer._id} className="flex items-center space-x-4 my-2">
            <div className="flex-1 flex items-center space-x-4">
              <h3 className="text-lg font-medium text-gray-700">
                {customer.name}
              </h3>
              <p>{customer.email}</p>
              <p>{customer.phoneNumber}</p>
              <p>{customer.address}</p>
            </div>
            <div className="space-x-2">
              <button
                className="py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
                onClick={() => handleCustomerEdit(customer)}
              >
                Update
              </button>
              <button
                className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={() => handleCustomerDelete(customer._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;
