import { ArrowUpRight, Clock, Monitor, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Pills, SmartImage } from "./InstituteUI";

export function InstituteCard({ institute }) {
  const card = institute.landingCard;
  const cover = card.coverImage || institute.detailPage?.hero?.image;
  return (
    <article className="reveal-card group overflow-hidden rounded-[1.75rem] border border-[#EADFD9] bg-white shadow-[0_18px_55px_rgba(10,10,10,0.07)]">
      <div className="relative h-56 overflow-hidden bg-[#F7F5F2]">
        <SmartImage
          image={cover}
          hideContainerOnError
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        {institute.isDummy && (
          <span className="absolute left-4 top-4 rounded-full bg-[#FFF1E9] px-3 py-1 text-xs font-bold text-[#FF6B35]">
            {institute.dummyNotice}
          </span>
        )}
        <div className="absolute bottom-4 left-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/70 bg-white p-2 shadow-lg">
          <SmartImage
            image={card.logo}
            hideContainerOnError
            className="h-full w-full object-contain"
          />
        </div>
      </div>
      <div className="p-6 sm:p-7">
        <h3 className="break-words font-serif text-2xl text-[#0A0A0A]">
          {card.name}
        </h3>
        <p className="mt-3 line-clamp-3 leading-7 text-[#6F6F76]">
          {card.shortDescription}
        </p>
        <div className="mt-5">
          <Pills items={card.fields} />
        </div>
        {card.keyFeatures?.length > 0 && (
          <ul className="mt-5 grid gap-2 text-sm text-[#6F6F76] sm:grid-cols-2">
            {card.keyFeatures.slice(0, 4).map((feature) => (
              <li key={feature} className="flex gap-2">
                <Sparkles
                  className="mt-0.5 shrink-0 text-[#8500FA]"
                  size={15}
                />
                {feature}
              </li>
            ))}
          </ul>
        )}
        <Link
          to={`/institute/${institute.slug}`}
          className="mt-6 inline-flex items-center gap-2 font-semibold text-[#8500FA] hover:gap-3"
        >
          {card.viewDetailsButton?.label}
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </article>
  );
}

export function CourseCard({ course }) {
  const card = course.card;
  return (
    <article className="reveal-card group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[#EADFD9] bg-white">
      <div className="h-48 overflow-hidden bg-[#F7F5F2]">
        <SmartImage
          image={card.thumbnail}
          hideContainerOnError
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Pills items={card.badges} />
        <h3 className="mt-4 break-words font-serif text-2xl leading-tight text-[#0A0A0A]">
          {card.name}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#6F6F76]">
          {card.shortDescription}
        </p>
        <div className="mt-5 flex flex-wrap gap-4 text-sm text-[#6F6F76]">
          {card.duration && (
            <span className="flex items-center gap-2">
              <Clock size={16} />
              {card.duration}
            </span>
          )}
          {card.modes?.length > 0 && (
            <span className="flex min-w-0 items-center gap-2">
              <Monitor className="shrink-0" size={16} />
              <span className="break-words">{card.modes.join(" · ")}</span>
            </span>
          )}
        </div>
        <Link
          to={`/course/${course.slug}`}
          className="mt-6 inline-flex items-center gap-2 self-start font-semibold text-[#8500FA] hover:gap-3"
        >
          {card.viewDetailsButton?.label}
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </article>
  );
}
