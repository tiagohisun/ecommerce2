import React from 'react';

import { XRayIcon, ToothIcon, CheckIcon } from '@heroicons/react/outline';

const services = [
  {
    id: 1,
    title: 'Digital X-Ray Units',
    description:
      'Our state-of-the-art digital X-ray units provide high-quality images, ensuring accurate diagnoses and efficient treatments.',
    icon: XRayIcon,
  },
  {
    id: 2,
    title: 'Dental Imaging Solutions',
    description:
      'We offer advanced dental imaging solutions to help dental professionals deliver precise and effective care to their patients.',
    icon: ToothIcon,
  },
  {
    id: 3,
    title: 'Installation & Support',
    description:
      'Our expert team provides installation and ongoing support to ensure your dental X-ray unit is always running smoothly.',
    icon: CheckIcon,
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl mx-auto text-center">
        <span className="text-2xl font-light">Dental04 Services</span>
        <div className="relative mt-4 grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map((service) => (
            <div key={service.id} className="bg-white shadow-md sm:rounded-lg text-left p-6">
              <service.icon className="h-12 w-12 text-indigo-400 mx-auto mb-6" />
              <h2 className="text-xl font-semibold mb-4">{service.title}</h2>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
