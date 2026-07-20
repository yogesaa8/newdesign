import { Navigate, useParams } from "react-router-dom";
import { CourseCard } from "../components/InstituteCards";
import { InstituteHero } from "../components/InstituteHero";
import { DynamicSection, RevealSection } from "../components/InstituteSections";
import { SectionTitle } from "../components/InstituteUI";
import { orderedEntries } from "../lib/instituteContent";
import { useHashScroll } from "../hooks/useInstituteHashScroll";

export default function InstituteDetailPage({ data }) {
  useHashScroll();
  const { instituteSlug } = useParams();
  const institute = data.institutes.find(
    (item) => item.slug === instituteSlug && item.status !== "hidden",
  );
  if (!institute) return <Navigate to="/institute" replace />;
  const detail = institute.detailPage;
  return (
    <>
      <InstituteHero
        hero={detail.hero}
        logo={institute.landingCard?.logo}
        backLabel={data.landingPage?.institutesSection?.title}
        backTo="/institute#institutes"
      />
      {orderedEntries(detail, [
        "hero",
        "shortDescription",
        "courses",
        "coursesSection",
      ]).map(([name, value]) => (
        <DynamicSection key={name} name={name} value={value} />
      ))}
      {institute.courses?.length > 0 && (
        <RevealSection
          id={detail.coursesSection?.id || "courses"}
          className="bg-[#FFF1E9]"
        >
          <SectionTitle
            title={detail.coursesSection?.title}
            description={detail.coursesSection?.description}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {institute.courses
              .filter((course) => course.status !== "hidden")
              .map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
          </div>
        </RevealSection>
      )}
    </>
  );
}
