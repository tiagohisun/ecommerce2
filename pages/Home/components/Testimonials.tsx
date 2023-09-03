// components/Testimonials.js
import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Dr. John Doe",
      title: "Dentist",
      image: "https://via.placeholder.com/150x150?text=Dr.+John+Doe", // Replace with your own image URL
      text: "Dental04 has been my go-to provider for dental X-ray units for several years. Their equipment is reliable, and their customer support is outstanding.",
    },
    {
      name: "Dr. Jane Smith",
      title: "Orthodontist",
      image: "https://via.placeholder.com/150x150?text=Dr.+Jane+Smith", // Replace with your own image URL
      text: "The used dental X-ray units from Dental04 have been a great investment for my practice. They offer excellent quality at affordable prices.",
    },
    {
      name: "Dr. Richard Brown",
      title: "Endodontist",
      image: "https://via.placeholder.com/150x150?text=Dr.+Richard+Brown", // Replace with your own image URL
      text: "I highly recommend Dental04 for any dental professional looking for reliable, cost-effective dental X-ray solutions. Their products and services are top-notch.",
    },
  ];

  return (
    <div className="bg-skyBlue text-darkBlue py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-xl">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 overflow-hidden rounded-full mr-4">
                  <img
                    className="w-full h-full object-cover"
                    src={testimonial.image}
                    alt={testimonial.name}
                  />
                </div>
                <div>
                  <h4 className="text-xl font-semibold">{testimonial.name}</h4>
                  <p className="text-lighterDarkBlue">{testimonial.title}</p>
                </div>
              </div>
              <p className="text-lg">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
