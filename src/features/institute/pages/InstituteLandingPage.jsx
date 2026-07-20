import { InstituteCard } from "../components/InstituteCards";
import { InstituteHero } from "../components/InstituteHero";
import { RevealSection } from "../components/InstituteSections";
import { SectionTitle } from "../components/InstituteUI";
import { useHashScroll } from "../hooks/useInstituteHashScroll";

export default function InstituteLandingPage({ data }) {
  useHashScroll();
  const order = data.landingPage.institutesSection.instituteOrder || [];
  const rank = (id) => {
    const index = order.indexOf(id);
    return index === -1 ? Number.MAX_SAFE_INTEGER : index;
  };
  const institutes = [...data.institutes]
    .filter((item) => item.status !== "hidden")
    .sort((a, b) => rank(a.id) - rank(b.id));
  return (
    <>
      <InstituteHero hero={data.landingPage.hero} />
      <RevealSection id={data.landingPage.institutesSection.id}>
        <SectionTitle
          title={data.landingPage.institutesSection.title}
          description={data.landingPage.institutesSection.description}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {institutes.map((institute) => (
            <InstituteCard key={institute.id} institute={institute} />
          ))}
        </div>
      </RevealSection>
    </>
  );
}
