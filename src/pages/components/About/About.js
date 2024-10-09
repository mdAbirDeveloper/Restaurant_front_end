/* eslint-disable @next/next/no-img-element */
// components/About.js

import Link from "next/link";

const About = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        
        {/* Image Section */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <img
            src="/about.png" // Replace with your image path
            alt="About Us"
            className="rounded-lg shadow-lg hover:shadow-2xl w-full md:w-3/4 mx-auto"
          />
        </div>

        {/* Text Section */}
        <div className="md:w-1/2 md:pl-12 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            About Us
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            We are committed to providing you with the best dining experience.
            Our chefs use the freshest ingredients, crafting dishes that are as
            delicious as they are beautiful. Whether its a casual lunch or a
            special dinner, we strive to make every meal a memorable one.
          </p>
          <Link
            href="/components/Menu/Menu"
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Explore Our Menu
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
