import { Navigate, useParams } from "react-router-dom";
import { InstituteHero } from "../components/InstituteHero";
import { DynamicSection } from "../components/InstituteSections";
import { courseIndex, orderedEntries } from "../lib/instituteContent";
import { useHashScroll } from "../hooks/useInstituteHashScroll";

export default function CourseDetailPage({ data }) {
  useHashScroll();
  const { courseSlug } = useParams();
  const match = courseIndex(data.institutes).find(
    ({ course }) => course.slug === courseSlug && course.status !== "hidden",
  );
  if (!match) return <Navigate to="/institute" replace />;
  const { course, institute } = match;
  const enrollmentAction =
    course.detailPage.hero?.enrollButton ||
    course.detailPage.enrollment?.primaryButton;
  const hero = enrollmentAction
    ? {
        ...course.detailPage.hero,
        enrollButton: { ...enrollmentAction, label: "Enroll Now" },
      }
    : course.detailPage.hero;
  return (
    <>
      <InstituteHero
        hero={hero}
        backLabel={institute.landingCard?.name}
        backTo={`/institute/${institute.slug}`}
      />
      {orderedEntries(course.detailPage, ["hero"]).map(([name, value]) => (
        <DynamicSection key={name} name={name} value={value} />
      ))}
    </>
  );
}
