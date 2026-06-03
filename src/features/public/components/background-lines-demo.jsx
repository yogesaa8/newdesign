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
    <>
      <BackgroundLines className="bg-linear-to-r from-[#121212] via-[#121212]/90 to-[#121212]">
        <div className="relative flex min-h-[760px] flex-col items-center justify-center px-4 py-16 md:min-h-screen">
          <div className="flex w-full items-center justify-center">
            <div className="w-full max-w-7xl">
              <div className="flex flex-col gap-6 items-center text-center px-6">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-[#FFFFFF]">
                  Your First Job, Our First Priority.
                </h1>
                <p className="text-[#8A827C] dark:text-[#9CA3AF] max-w-xl mb-8">
                  FirstJobIndia helps freshers and final-year students in India
                  land verified first jobs with the right resume, the right
                  roles, and the right recruiters.
                </p>

                {/* Search Bar */}
                <div className="w-full md:max-w-4xl bg-white rounded overflow-hidden flex flex-col md:flex-row border border-[#E0D8D3] dark:border-[#333333] shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
                  <input
                    type="text"
                    placeholder="Role you want, e.g. Frontend Developer"
                    className="flex-1 px-4 py-4 bg-[#FFF7F3] dark:bg-[#121212] text-[#5C534D] dark:text-[#9CA3AF] placeholder:text-[#8A827C] dark:placeholder:text-[#9CA3AF] outline-none focus:ring-4 focus:ring-[#FC9664]/30 focus:border-[#FC9664]"
                  />
                  <input
                    type="text"
                    placeholder="City in India, e.g. Bengaluru"
                    className="flex-1 px-4 py-3 bg-[#FFF7F3] dark:bg-[#121212] text-[#5C534D] dark:text-[#9CA3AF] placeholder:text-[#8A827C] dark:placeholder:text-[#9CA3AF] outline-none border-t md:border-t-0 md:border-l border-[#E0D8D3] dark:border-[#333333] focus:ring-4 focus:ring-[#FC9664]/30 focus:border-[#FC9664]"
                  />
                  <input
                    type="text"
                    placeholder="Sector, e.g. IT or Marketing"
                    className="flex-1 px-4 py-3 bg-[#FFF7F3] dark:bg-[#121212] text-[#5C534D] dark:text-[#9CA3AF] placeholder:text-[#8A827C] dark:placeholder:text-[#9CA3AF] outline-none border-t md:border-t-0 md:border-l border-[#E0D8D3] dark:border-[#333333] focus:ring-4 focus:ring-[#FC9664]/30 focus:border-[#FC9664]"
                  />
                  <button className="bg-[#FC9664] hover:bg-[#E8854F] px-6 py-4 md:py-3 text-[#2D2926] font-medium shadow-[0_8px_20px_rgba(37,99,235,0.25)] active:bg-[#E8854F] border-t md:border-t-0 transition-colors">
                    Find first jobs
                  </button>
                </div>

                {/* Stats - FIXED */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-6 md:mt-16 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-orange-200 dark:bg-[#2D2926] text-orange-900 p-3 rounded-full">
                      <PiSuitcaseLight className="h-5 w-5 md:h-8 md:w-8" />
                    </div>
                    <div>
                      <p className="font-bold text-lg text-left text-[#FFFFFF]">
                        Verified
                      </p>
                      <p className="text-[#8A827C] dark:text-[#9CA3AF] text-xs md:text-sm text-left">
                        first-job listings
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="bg-orange-200 dark:bg-[#2D2926] text-orange-900 p-3 rounded-full">
                      <FiUsers className="h-5 w-5 md:h-8 md:w-8" />
                    </div>
                    <div>
                      <p className="font-bold text-lg text-left text-[#FFFFFF]">
                        Free
                      </p>
                      <p className="text-[#8A827C] dark:text-[#9CA3AF] text-xs md:text-sm">
                        job alerts by role
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="bg-orange-200 dark:bg-[#2D2926] text-orange-900 p-3 rounded-full">
                      <PiBuildingOfficeLight className="h-5 w-5 md:h-8 md:w-8" />
                    </div>
                    <div>
                      <p className="font-bold text-lg text-left text-[#FFFFFF]">
                        Vetted
                      </p>
                      <p className="text-[#8A827C] dark:text-[#9CA3AF] text-xs md:text-sm">
                        Indian employers
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BackgroundLines>
      {/* Companies Section */}
      <div className="border-t border-[#E0D8D3]/10 dark:border-[#333333] bg-[#121212] py-8 md:py-12 px-6 md:px-16 flex flex-wrap justify-center gap-6 md:gap-10 text-[#8A827C] dark:text-[#9CA3AF]">
        <div className="flex items-center gap-2">
          <img src={spotify} alt="Spotify logo, featured FirstJobIndia hiring partner" className="h-7 md:h-12" />
          <span className="text-xl md:text-4xl">Spotify</span>
        </div>
        <div className="flex items-center gap-2">
          <img src={slack} alt="Slack logo, featured FirstJobIndia hiring partner" className="h-7 md:h-12" />
          <span className="text-xl md:text-4xl">Slack</span>
        </div>
        <div className="flex items-center gap-2">
          <img src={adobe} alt="Adobe logo, featured FirstJobIndia hiring partner" className="h-7 md:h-12" />
          <span className="text-xl md:text-4xl">Adobe</span>
        </div>
        <div className="flex items-center gap-2">
          <img src={dribble} alt="Dribbble logo, featured FirstJobIndia hiring partner" className="h-7 md:h-12" />
          <span className="text-xl md:text-4xl">Dribble</span>
        </div>
        <div className="flex items-center gap-2">
          <img src={google} alt="Google logo, featured FirstJobIndia hiring partner" className="h-7 md:h-12" />
          <span className="text-xl md:text-4xl">Google</span>
        </div>
      </div>
    </>
  );
}
