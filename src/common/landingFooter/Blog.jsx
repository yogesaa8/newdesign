"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function BlogSection() {
  return (
    <>
      <section className="py-24 bg-surface-container-low">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* LEFT CONTENT */}
            <div className="w-full lg:w-2/5 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-4xl font-bold text-on-surface mb-5">
                  Our latest <span className="text-primary">blogs</span>
                </h2>

                <p className="text-outline mb-10 max-w-md">
                  Welcome to our blog section, where knowledge meets
                  inspiration. Explore insightful articles, expert tips, and the
                  latest trends in our field.
                </p>

                <button className="border border-outline-variant rounded-full px-6 py-3 font-semibold hover:bg-surface-container transition">
                  View All
                </button>
              </div>

              {/* ARROWS */}
              <div className="flex gap-4 mt-10">
                <button className="swiper-button-prev-custom w-10 h-10 flex items-center justify-center rounded-full border border-primary text-primary hover:bg-primary hover:text-on-primary transition">
                  ←
                </button>
                <button className="swiper-button-next-custom w-10 h-10 flex items-center justify-center rounded-full border border-primary text-primary hover:bg-primary hover:text-on-primary transition">
                  →
                </button>
              </div>
            </div>

            {/* RIGHT SLIDER */}
            <div className="w-full lg:w-3/5">
              <Swiper
                modules={[Navigation]}
                navigation={{
                  nextEl: ".swiper-button-next-custom",
                  prevEl: ".swiper-button-prev-custom",
                }}
                spaceBetween={24}
                loop={true}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                }}
              >
                {blogs.map((blog, i) => (
                  <SwiperSlide key={i}>
                    <div className="group">
                      <img
                        src={blog.image}
                        alt="blog"
                        className="rounded-2xl w-full h-56 object-cover mb-6"
                      />

                      <h3 className="text-lg font-semibold text-on-surface mb-3 group-hover:text-primary transition">
                        {blog.title}
                      </h3>

                      <p className="text-outline text-sm mb-5">{blog.desc}</p>

                      <a className="text-primary font-semibold flex items-center gap-2">
                        Read more →
                      </a>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
      {/* 2nd Section */}
      <section class="py-24 ">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex justify-center  gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
            <div class="group w-full max-lg:max-w-xl lg:w-1/3 border border-outline-variant rounded-2xl">
              <div class="flex items-center">
                <img
                  src="https://pagedone.io/asset/uploads/1696244317.png"
                  alt="blogs tailwind section"
                  class="rounded-t-2xl w-full object-cover"
                />
              </div>
              <div class="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-surface-container-low">
                <span class="text-primary font-medium mb-3 block">
                  Jan 01, 2023
                </span>
                <h4 class="text-xl text-on-surface font-medium leading-8 mb-5">
                  Clever ways to invest in product to organize your portfolio
                </h4>
                <p class="text-outline leading-6 mb-10">
                  Discover smart investment strategies to streamline and
                  organize your portfolio..
                </p>
                <a
                  href="javascript:;"
                  class="cursor-pointer text-lg text-primary font-semibold"
                >
                  Read more..
                </a>
              </div>
            </div>
            <div class="group w-full max-lg:max-w-xl lg:w-1/3 border border-outline-variant rounded-2xl">
              <div class="flex items-center">
                <img
                  src="https://pagedone.io/asset/uploads/1696244340.png"
                  alt="blogs tailwind section"
                  class="rounded-t-2xl w-full object-cover"
                />
              </div>
              <div class="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-surface-container-low">
                <span class="text-primary font-medium mb-3 block">
                  Feb 01, 2023
                </span>
                <h4 class="text-xl text-on-surface font-medium leading-8 mb-5">
                  How to grow your profit through systematic investment with us
                </h4>
                <p class="text-outline leading-6 mb-10">
                  Unlock the power of systematic investment with us and watch
                  your profits soar. Our..
                </p>
                <a
                  href="javascript:;"
                  class="cursor-pointer text-lg text-primary font-semibold"
                >
                  Read more..
                </a>
              </div>
            </div>
            <div class="group w-full max-lg:max-w-xl lg:w-1/3 border border-outline-variant rounded-2xl">
              <div class="flex items-center">
                <img
                  src="https://pagedone.io/asset/uploads/1696244356.png"
                  alt="blogs tailwind section"
                  class="rounded-t-2xl w-full object-cover"
                />
              </div>
              <div class="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-surface-container-low">
                <span class="text-primary font-medium mb-3 block">
                  Mar 01, 20233
                </span>
                <h4 class="text-xl text-on-surface font-medium leading-8 mb-5">
                  How to analyze every holdings of your portfolio
                </h4>
                <p class="text-outline leading-6 mb-10">
                  Our comprehensive guide will equip you with the tools and
                  insights needed to..
                </p>
                <a
                  href="javascript:;"
                  class="cursor-pointer text-lg text-primary font-semibold"
                >
                  Read more..
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const blogs = [
  {
    image: "https://pagedone.io/asset/uploads/1696244059.png",
    title: "How to grow your profit through systematic investment with us",
    desc: "Unlock the power of systematic investment with us and watch your profits soar...",
  },
  {
    image: "https://pagedone.io/asset/uploads/1696244074.png",
    title: "Clever ways to invest in product to organize your portfolio",
    desc: "Discover smart investment strategies to streamline and organize your portfolio...",
  },
  {
    image: "https://pagedone.io/asset/uploads/1696244059.png",
    title: "How to grow your profit through systematic investment with us",
    desc: "Unlock the power of systematic investment with us and watch your profits soar...",
  },
];
