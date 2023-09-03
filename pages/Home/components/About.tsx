// components/AboutUs.js
import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-darkBlue text-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center md:text-left">
          About Dental04
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="prose text-lg md:pr-8">
            <p>
              Dental04 is a leading provider of high-quality, used dental X-ray
              units. We are committed to helping dental professionals access
              reliable and affordable imaging solutions for their practices. Our
              expert team sources, refurbishes, and tests every unit we sell,
              ensuring it meets or exceeds industry standards.
            </p>
            <p>
              With years of experience in the dental industry, we understand the
              importance of offering reliable equipment at competitive prices.
              Our goal is to make dental X-ray technology accessible to all,
              helping dental practices worldwide deliver exceptional patient
              care.
            </p>
          </div>
          <div className="w-full h-64 md:h-auto overflow-hidden rounded-lg shadow-xl">
            <img
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
              src="https://via.placeholder.com/500x300?text=Sample+Image" // Replace this URL with your own image URL
              alt="Dental X-ray unit"
            />
          </div>
        </div>
        <div className="mt-12">
          <h3 className="text-3xl font-bold mb-6 text-center text-white">
            Why Choose Us
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="text-skyBlue text-4xl mb-4">
                <i className="fas fa-check-circle"></i>
              </div>
              <h4 className="text-2xl font-semibold mb-4 text-lighterDarkBlue">
                Reliability
              </h4>
              <p className="text-lg text-lighterDarkBlue">
                Our equipment meets or exceeds industry standards to ensure your
                dental practice runs smoothly.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="text-center">
              <div className="text-skyBlue text-4xl mb-4">
                <i className="fas fa-dollar-sign"></i>
              </div>
              <h4 className="text-2xl font-semibold mb-4 text-lighterDarkBlue">
                Affordability
              </h4>
              <p className="text-lg text-lighterDarkBlue">
                We provide cost-effective solutions to help you invest in the
                best technology without breaking the bank.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="text-center">
              <div className="text-skyBlue text-4xl mb-4">
                <i className="fas fa-headset"></i>
              </div>
              <h4 className="text-2xl font-semibold mb-4 text-lighterDarkBlue">
                Customer Support
              </h4>
              <p className="text-lg text-lighterDarkBlue">
                Our dedicated team is here to assist you with any questions or
                issues you may have, ensuring your satisfaction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;