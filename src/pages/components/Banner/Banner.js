import Link from "next/link";

const Banner = () => {
  return (
    <div
      className="relative h-[80vh] flex flex-col justify-center items-center text-center bg-cover bg-center"
      style={{
        backgroundImage: `url('/banner.webp')`, // Add the path to your background image
      }}
    >
      {/* Overlay for darkened background effect */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <div className="relative z-10">
        <h1 className="text-white text-4xl md:text-6xl font-extrabold drop-shadow-lg mb-4">
          Welcome to Our Restaurant
        </h1>
        <p className="text-white text-lg md:text-xl font-light drop-shadow-lg mb-6 max-w-2xl mx-auto">
          Indulge in a fine dining experience with an exquisite menu and a warm, inviting atmosphere.
        </p>
        <Link
          href="/components/Booking/Booking"
          className="bg-yellow-500 text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
        >
          Book Your Table Now
        </Link>
      </div>
    </div>
  );
};

export default Banner;
