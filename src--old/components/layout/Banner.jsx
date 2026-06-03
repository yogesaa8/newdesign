import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="w-full bg-orange-500 text-white px-3 py-2 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <p className="text-sm md:text-base font-medium">
          🚀 We’re continuously adding new features and improving our platform.
          Help us build a better product through your feedback.
        </p>

        <Link
          to="/reviews"
          className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded font-semibold text-sm  transition whitespace-nowrap"
        >
          Leave a Review
        </Link>
      </div>
    </div>
  );
};

export default Banner;
