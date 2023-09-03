import React from "react";

const Newsletter = () => {
  return (
    <div className="bg-skyBlue px-4 py-16">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl text-white mb-6">Join Our Community</h2>
          <p className="text-lg md:text-xl text-white mb-12">
            Stay informed on the latest innovations in dental X-ray technology and special offers from Dental04.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="rounded-lg p-6 w-full md:w-auto mb-4 md:mb-0 md:mr-4">
            <h3 className="text-xl text-white mb-4">Subscribe to our newsletter</h3>
            <form className="w-full">
              <div className="flex flex-col md:flex-row">
                <input
                  type="email"
                  id="email"
                  className="w-full md:w-64 p-4 mb-4 md:mb-0 md:mr-4 text-sm border-2 border-white rounded-lg bg-white"
                  placeholder="Enter your email"
                  required
                />
                <button
                  type="submit"
                  className="text-white bg-darkBlue w-full md:w-auto py-3 px-8 rounded-lg transition-all duration-300 hover:bg-opacity-90"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
          <p className="text-center text-sm text-white px-6 py-3">
            We care about your data. Read our privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
