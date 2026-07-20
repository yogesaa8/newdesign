import { Link } from "react-router-dom";
import { Action, Pills, SmartImage } from "./InstituteUI";

export function InstituteHero({ hero, logo, backLabel, backTo }) {
  const primary = hero.primaryButton || hero.enrollButton;
  return (
    <section className="relative isolate overflow-hidden bg-[#0A0A0F] px-5 py-16 text-white sm:px-8 sm:py-24 lg:py-28">
      <SmartImage
        image={hero.backgroundImage || hero.image}
        eager
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,10,15,.98),rgba(10,10,15,.78),rgba(133,0,250,.28))]" />
      <div className="mx-auto max-w-7xl">
        {backLabel && (
          <Link
            to={backTo}
            className="mb-8 inline-block break-words text-sm font-semibold text-[#C6AFFF]"
          >
            ← {backLabel}
          </Link>
        )}
        <div className="max-w-4xl">
          {logo && (
            <div className="mb-6 flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-white p-2">
              <SmartImage
                image={logo}
                hideContainerOnError
                className="h-full w-full object-contain"
              />
            </div>
          )}
          {hero.eyebrow && (
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C6AFFF]">
              {hero.eyebrow}
            </p>
          )}
          <h1 className="mt-4 max-w-4xl break-words font-serif text-4xl leading-[1.08] sm:text-5xl lg:text-7xl">
            {hero.title}
          </h1>
          {(hero.description || hero.subtitle) && (
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/72 sm:text-lg">
              {hero.description || hero.subtitle}
            </p>
          )}
          {hero.badges && (
            <div className="mt-6">
              <Pills items={hero.badges} light />
            </div>
          )}
          {(primary || hero.secondaryButton) && (
            <div className="mt-8 flex flex-wrap gap-3">
              <Action
                button={primary}
                className="!bg-[#FF6B35] !text-white hover:!bg-[#FF9566]"
              />
              <Action
                button={hero.secondaryButton}
                className="!border !border-white/20 !bg-white/10 hover:!bg-white/20"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
