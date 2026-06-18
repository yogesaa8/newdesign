import React from 'react'
import institute from '../../../assets/insti.png'

const Institute = () => {
  return (
    <>
      <section class="lg:pt-10 lg:pb-10 pt-0  lg:pl-8 lg:pr-8 h-full">
        <div class="rounded-2xl bg-indigo-50 py-10 overflow-hidden m-5 lg:m-0 2xl:py-16 xl:py-8  lg:rounded-tl-2xl lg:rounded-bl-2xl ">
          <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 gap-14 items-center lg:grid-cols-12 lg:gap-32">
              <div class="w-full xl:col-span-5 lg:col-span-6 2xl:-mx-5 xl:mx-0">
                <div class="flex items-center text-sm font-medium text-gray-500 justify-center lg:justify-start">
                  <span class="bg-indigo-600 py-1 px-3 rounded-2xl text-xs font-medium text-white mr-3 ">
                    #1
                  </span>
                  Partner Institute Opportunity
                </div>
                <h1 class="py-8 text-center text-gray-900 font-bold font-manrope text-5xl lg:text-left leading-17.5">
                  Learn With Our {" "}
                  <span class="text-indigo-600">Trusted Partner Institute</span>
                </h1>
                <p class=" text-gray-500 text-lg text-center lg:text-left">
                  Students coming through our platform can now access guided offline learning, expert mentorship, and a better academic environment through our partner institute.
                </p>
                <div class="mt-8 mb-8 flex items-center justify-center lg:justify-start gap-4 flex-col sm:flex-row">
                  <button class="bg-indigo-600 rounded-full py-3 px-7 text-base font-semibold text-white hover:bg-indigo-700 cursor-pointer transition-all duration-500 md:w-fit w-full">
                    Explore Program
                  </button>
                  <button class="bg-transparent border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-100 py-3 px-7 text-base font-semibold rounded-full transition-all duration-500 md:w-fit w-full">
                    Know More
                  </button>
                </div>

                {/* <div class="flex items-center flex-col lg:flex-row">
                  <div class="flex items-center">
                    <img
                      src="https://pagedone.io/asset/uploads/1694846673.png"
                      alt="Rounded image"
                      class="border-2 border-solid border-indigo-50 rounded-full relative z-50"
                    />
                    <img
                      src="https://pagedone.io/asset/uploads/1694846691.png"
                      alt="Rounded image"
                      class="border-2 border-solid border-indigo-50 rounded-full relative z-30 -ml-3"
                    />
                    <img
                      src="https://pagedone.io/asset/uploads/1694846704.png"
                      alt="Rounded image"
                      class="border-2 border-solid border-indigo-50 rounded-full relative z-20 -ml-3"
                    />
                  </div>
                  <span class="mt-3 text-base text-gray-600 font-medium lg:ml-3">
                    People have joined
                  </span>
                </div> */}
              </div>
              <div class="w-full xl:col-span-7  lg:col-span-6 block">
                <div class="w-full  sm:w-auto lg:w-150">
                  <img
                    src={institute}
                    alt="Dashboard image"
                    class="rounded-l-3xl"
                    class="w-full  lg:h-auto "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Institute