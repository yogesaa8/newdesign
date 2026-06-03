import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="w-full bg-indigo-50 text-indigo-900 border-b border-indigo-100 px-3 py-2">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
        <p className="text-sm md:text-base font-medium sm:flex-1">
          We’re continuously adding new features and improving our platform.
          Help us build a better product through your feedback.
        </p>

        <Link
          to="/reviews"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded font-semibold text-sm  transition whitespace-nowrap"
        >
          Leave a Review
        </Link>
      </div>
    </div>
  );
};

export default Banner;
