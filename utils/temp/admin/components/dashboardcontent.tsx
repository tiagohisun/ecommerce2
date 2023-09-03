import React from "react";
import {
  FiPieChart,
  FiUsers,
  FiFileText,
  FiMail,
  FiPhone,
  FiMenu,
} from "react-icons/fi";

const dashboardcontent = () => {
  return (
 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <FiPieChart className="text-3xl text-blue-600 mr-4" />
          <div>
            <h2 className="text-lg font-bold mb-2">Revenue</h2>
            <p className="text-gray-600">$100,000</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
            <FiUsers className="text-3xl text-blue-600 mr-4" />
            <div>
              <h2 className="text-lg font-bold mb-2">Customers</h2>
              <p className="text-gray-600">1,000</p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
            <FiFileText className="text-3xl text-blue-600 mr-4" />
            <div>
              <h2 className="text-lg font-bold mb-2">Blog Posts</h2>
              <p className="text-gray-600">50</p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
            <FiMail className="text-3xl text-blue-600 mr-4" />
            <div>
              <h2 className="text-lg font-bold mb-2">Newsletters</h2>
              <p className="text-gray-600">10</p>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
          <ul className="bg-white shadow-lg rounded-lg divide-y divide-gray-200">
            <li className="p-4 flex">
              <div className="flex-shrink-0">
                <img
                  src="/avatar-1.jpg"
                  alt="Avatar"
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900">
                  John Doe
                </div>
                <div className="text-sm text-gray-500">
                  Purchased a dental x-ray unit
                </div>
                <div className="text-sm text-gray-500">2h ago</div>
              </div>
            </li>
            <li className="p-4 flex">
              <div className="flex-shrink-0">
                <img
                  src="/avatar-2.jpg"
                  alt="Avatar"
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900">
                  Jane Smith
                </div>
                <div className="text-sm text-gray-500">
                  Contacted support regarding a technical issue
                </div>
                <div className="text-sm text-gray-500">3h ago</div>
              </div>
            </li>
            <li className="p-4 flex">
              <div className="flex-shrink-0">
                <img
                  src="/avatar-3.jpg"
                  alt="Avatar"
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900">
                  Mike Johnson
                </div>
                <div className="text-sm text-gray-500">
                  Subscribed to the newsletter
                </div>
                <div className="text-sm text-gray-500">4h ago</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
  );
};

export default dashboardcontent;
