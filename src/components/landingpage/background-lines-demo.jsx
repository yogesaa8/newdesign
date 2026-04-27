import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { PiBuildingOfficeLight, PiSuitcaseLight } from "react-icons/pi";
import { FiUsers } from "react-icons/fi";
import spotify from "../../assets/hero/spotify.png";
import slack from "../../assets/hero/slack.png";
import adobe from "../../assets/hero/adobe.png";
import dribble from "../../assets/hero/dribble.png";
import google from "../../assets/hero/google.png";

export default function BackgroundLinesDemo() {
  return (
    <BackgroundLines className="min-h-screen bg-linear-to-r from-black via-gray-900 to-black">
      <div className="relative min-h-screen flex flex-col">

        <div className="flex-1 flex items-center justify-center">
          
          <div className='w-full max-w-7xl'>
            <div className="flex flex-col gap-6 items-center text-center px-6 mt-4 md:mt-16 pb-8">

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-white">
                Find Your Dream Job Today!
              </h1>
              <p className="text-gray-400 max-w-xl mb-8">
                Connecting Talent with Opportunity: Your Gateway to Career Success
              </p>

              {/* Search Bar */}
              <div className="w-full md:max-w-4xl bg-white rounded-xl overflow-hidden flex flex-col md:flex-row shadow-lg">
                <input
                  type="text"
                  placeholder="Job Title or Company"
                  className="flex-1 px-4 py-4 text-black outline-none"
                />
                <input
                  type="text"
                  placeholder="Select Location"
                  className="flex-1 px-4 py-3 text-black outline-none border-t md:border-t-0 md:border-l border-gray-200"
                />
                <input
                  type="text"
                  placeholder="Select Category"
                  className="flex-1 px-4 py-3 text-black outline-none border-t md:border-t-0 md:border-l border-gray-200"
                />
                <button className="bg-teal-500 px-6 py-4 md:py-3 text-white font-medium hover:bg-teal-600 border-t md:border-t-0">
                  Search Job
                </button>
              </div>

              {/* Stats - FIXED */}
              <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-6 md:mt-16 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-teal-500 p-3 rounded-full">
                    <PiSuitcaseLight className='h-5 w-5 md:h-8 md:w-8' />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-left text-white">25,850</p>
                    <p className="text-gray-400 text-xs md:text-sm text-left">Jobs</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-teal-500 p-3 rounded-full">
                    <FiUsers className='h-5 w-5 md:h-8 md:w-8' />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-left text-white">10,250</p>
                    <p className="text-gray-400 text-xs md:text-sm">Candidates</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-teal-500 p-3 rounded-full">
                    <PiBuildingOfficeLight className='h-5 w-5 md:h-8 md:w-8' />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-left text-white">18,400</p>
                    <p className="text-gray-400 text-xs md:text-sm">Companies</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Companies Section */}
        <div className="border-t border-gray-800 bg-black py-8 md:py-12 px-6 md:px-16 flex flex-wrap justify-center gap-6 md:gap-10 text-gray-400">
          <div className="flex items-center gap-2">
            <img src={spotify} alt="spotify" className='h-7 md:h-12' />
            <span className='text-xl md:text-4xl'>Spotify</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={slack} alt="slack" className='h-7 md:h-12' />
            <span className='text-xl md:text-4xl'>Slack</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={adobe} alt="adobe" className='h-7 md:h-12' />
            <span className='text-xl md:text-4xl'>Adobe</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={dribble} alt="dribble" className='h-7 md:h-12' />
            <span className='text-xl md:text-4xl'>Dribble</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={google} alt="Google" className='h-7 md:h-12' />
            <span className='text-xl md:text-4xl'>Google</span>
          </div>
        </div>

      </div>
    </BackgroundLines>
  );
}
