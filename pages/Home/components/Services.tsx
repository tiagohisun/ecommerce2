import React from "react";
import { FaTools, FaUsers, FaHeadset } from "react-icons/fa";

const ServiceCard = ({ title, description, Icon }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md">
      <Icon size={48} className="text-darkBlue mb-4" />
      <h3 className="text-xl font-semibold mb-2 text-darkBlue">{title}</h3>
      <p className="text-base leading-relaxed text-gray-600 text-center">
        {description}
      </p>
    </div>
  );
};

const Services = () => {
  const services = [
    {
      title: "Innovative X-ray Technology",
      description:
        "Explore state-of-the-art dental x-ray units that offer efficient and precise imaging.",
      Icon: FaTools,
    },
    {
      title: "Trusted Dental Experts",
      description:
        "Our team of experienced dental professionals will guide you through the selection process.",
      Icon: FaUsers,
    },
    {
      title: "Outstanding Customer Support",
      description:
        "Rely on our dedicated customer service team for assistance before and after your purchase.",
      Icon: FaHeadset,
    },
  ];

  return (
    <section className="bg-skyBlue py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index}>
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
