import institute from "../../../assets/insti.png";
import { Link } from "react-router-dom";

const LandingInstitute = () => {
  return (
    <section className="h-full pt-0 lg:px-8 lg:pb-10 lg:pt-10">
      <div className="m-5 overflow-hidden rounded-2xl bg-n-50 py-10 lg:m-0 lg:rounded-bl-2xl lg:rounded-tl-2xl xl:py-8 2xl:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-32">
            <div className="w-full lg:col-span-6 xl:col-span-5 xl:mx-0 2xl:-mx-5">
              <div className="flex items-center justify-center text-sm font-medium text-n-500 lg:justify-start">
                <span className="mr-3 rounded-2xl bg-co-primary px-3 py-1 text-xs font-medium text-white">
                  #1
                </span>
                Partner Institute Opportunity
              </div>
              <h1 className="py-8 text-center font-manrope text-5xl font-bold leading-17.5 text-n-900 lg:text-left">
                Learn With Our{" "}
                <span className="text-co-primary">
                  Trusted Partner Institute
                </span>
              </h1>
              <p className="text-center text-lg text-n-500 lg:text-left">
                Students coming through our platform can now access guided
                offline learning, expert mentorship, and a better academic
                environment through our partner institute.
              </p>
              <div className="mb-8 mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                <Link
                  to="/institute"
                  className="w-full cursor-pointer rounded-full bg-co-primary px-7 py-3 text-base font-semibold text-white transition-all duration-500 hover:bg-co-pressed md:w-fit"
                >
                  Explore Program
                </Link>
                <button
                  type="button"
                  className="w-full rounded-full border-2 border-co-primary bg-transparent px-7 py-3 text-base font-semibold text-co-primary transition-all duration-500 hover:bg-co-surface md:w-fit"
                >
                  Know More
                </button>
              </div>
            </div>
            <div className="block w-full lg:col-span-6 xl:col-span-7">
              <div className="w-full sm:w-auto lg:w-150">
                <img
                  src={institute}
                  alt="Institute program preview"
                  className="w-full rounded-l-3xl lg:h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingInstitute;
