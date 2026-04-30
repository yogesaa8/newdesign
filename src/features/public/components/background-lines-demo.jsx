import React from "react";
import { PiBuildingOfficeLight, PiSuitcaseLight } from "react-icons/pi";
import { FiUsers } from "react-icons/fi";
import spotify from "../../../assets/hero/spotify.png";
import slack from "../../../assets/hero/slack.png";
import adobe from "../../../assets/hero/adobe.png";
import dribble from "../../../assets/hero/dribble.png";
import google from "../../../assets/hero/google.png";
import { BackgroundLines } from "../../../components/ui/background-lines";

export default function BackgroundLinesDemo() {
  return (
    <BackgroundLines className="min-h-screen bg-linear-to-r from-black via-black/90 to-black">
      <div className="relative min-h-screen flex flex-col">

        <div className="flex-1 flex items-center justify-center">
          
          <div className='w-full max-w-7xl'>
            <div className="flex flex-col gap-6 items-center text-center px-6 mt-4 md:mt-16 pb-8">

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-white">
                Find Your Dream Job Today!
              </h1>
              <p className="text-slate-300 max-w-xl mb-8">
                Connecting Talent with Opportunity: Your Gateway to Career Success
              </p>

              {/* Search Bar */}
              <div className="w-full md:max-w-4xl bg-white rounded-xl overflow-hidden flex flex-col md:flex-row border border-outline-variant shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
                <input
                  type="text"
                  placeholder="Job Title or Company"
                  className="flex-1 px-4 py-4 bg-slate-100 text-on-surface placeholder:text-slate-400 outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary"
                />
                <input
                  type="text"
                  placeholder="Select Location"
                  className="flex-1 px-4 py-3 bg-slate-100 text-on-surface placeholder:text-slate-400 outline-none border-t md:border-t-0 md:border-l border-outline-variant focus:ring-4 focus:ring-primary/10 focus:border-primary"
                />
                <input
                  type="text"
                  placeholder="Select Category"
                  className="flex-1 px-4 py-3 bg-slate-100 text-on-surface placeholder:text-slate-400 outline-none border-t md:border-t-0 md:border-l border-outline-variant focus:ring-4 focus:ring-primary/10 focus:border-primary"
                />
                <button className="bg-primary px-6 py-4 md:py-3 text-on-primary font-medium shadow-[0_8px_20px_rgba(37,99,235,0.25)] hover:bg-primary-hover active:bg-primary-active border-t md:border-t-0 transition-colors">
                  Search Job
                </button>
              </div>

              {/* Stats - FIXED */}
              <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-6 md:mt-16 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary-container text-primary p-3 rounded-full">
                    <PiSuitcaseLight className='h-5 w-5 md:h-8 md:w-8' />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-left text-white">25,850</p>
                    <p className="text-slate-300 text-xs md:text-sm text-left">Jobs</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-primary-container text-primary p-3 rounded-full">
                    <FiUsers className='h-5 w-5 md:h-8 md:w-8' />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-left text-white">10,250</p>
                    <p className="text-slate-300 text-xs md:text-sm">Candidates</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-primary-container text-primary p-3 rounded-full">
                    <PiBuildingOfficeLight className='h-5 w-5 md:h-8 md:w-8' />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-left text-white">18,400</p>
                    <p className="text-slate-300 text-xs md:text-sm">Companies</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Companies Section */}
        <div className="border-t border-white/10 bg-inverse-surface py-8 md:py-12 px-6 md:px-16 flex flex-wrap justify-center gap-6 md:gap-10 text-slate-300">
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
