
'use client'
import { MailIcon, PhoneIcon, LocationMarkerIcon } from '@heroicons/react/outline';
import '../styles/globals.css'
import Link from "next/link"
import React, { useState } from 'react'
import Image from 'next/image'

const units = [
    {
      id: 1,
      category: 'Portable X-Ray Units',
      model: 'DentalPro X100',
      price: 2500,
      location: 'New York, NY',
      brand: 'DentalPro',
    },
    {
      id: 2,
      category: 'Digital Panoramic X-Ray Units',
      model: 'DentalView V300',
      price: 15000,
      location: 'Los Angeles, CA',
      brand: 'DentalView',
    },
    {
      id: 3,
      category: 'Digital Cephalometric X-Ray Units',
      model: 'OrthoMax O200',
      price: 12000,
      location: 'Chicago, IL',
      brand: 'OrthoMax',
    },
  ];
  
  const Classifieds = () => {
    return (
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl mx-auto text-center">
          <span className="text-2xl font-light">Dental X-Ray Unit Classifieds</span>
          <div className="relative mt-4 grid grid-cols-1 gap-8 md:grid-cols-3">
            {units.map((unit) => (
              <div key={unit.id} className="bg-white shadow-md sm:rounded-lg text-left p-6">
                <h2 className="text-xl font-semibold mb-4">{unit.category}</h2>
                <p className="text-gray-600 mb-2">
                  <strong>Model:</strong> {unit.model}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Price:</strong> ${unit.price.toLocaleString()}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Location:</strong> {unit.location}
                </p>
                <p className="text-gray-600">
                  <strong>Brand:</strong> {unit.brand}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default Classifieds;
  