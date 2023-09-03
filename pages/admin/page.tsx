import React, { useState, useCallback } from "react";
import Sidebar from "./components/sidebar";
import DashboardContent from "./components/dashboardcontent";
import Products from "../admin/components/products";
import Blog from "../admin/components/blog"; // Import the BlogForm component
import Customers from "../admin/components/customers";


interface DashboardProps {
    products: Array<any>;
}

interface SidebarProps {
    setActivePage: (page: string) => void;
}

const Dashboard = ({ products }: DashboardProps) => {
    const [activePage, setActivePage] = useState("dashboard");

    const handleSetActivePage = useCallback((page: string) => {
        setActivePage(page);
    }, []);

    function renderActivePage() {
        switch (activePage) {
            case "dashboard":
                return <DashboardContent />;
            case "products":
                return <Products />;
            case "blog":
                return <Blog />;
            case "customers": // Add a new case for the customers
                return <Customers />;
            default:
                return <DashboardContent />;
        }
    }

    return (
        <div className="flex h-screen">
            <div className="w-64 bg-blue-500 text-white flex-none">
                <Sidebar setActivePage={handleSetActivePage} />
            </div>
            <div className="flex-1 flex flex-col ">

                <header className="flex items-center justify-between px-4 py-3 bg-white shadow-lg">
                    <h1 className="text-2xl font-bold">Dental04</h1>
                </header>
                <main className="flex-1 bg-gray-100">
                    {renderActivePage()}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
