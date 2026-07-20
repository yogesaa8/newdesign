import { useParams } from "react-router-dom";
import instituteData from "./data/instituteData.json";
import CourseDetailPage from "./pages/CourseDetailPage";
import InstituteDetailPage from "./pages/InstituteDetailPage";
import InstituteLandingPage from "./pages/InstituteLandingPage";

const InstituteMainPage = () => {
  const { instituteSlug, courseSlug } = useParams();

  return (
    <div className="institute-site min-h-screen bg-[#FFF7F3] text-[#0A0A0A]">
      {courseSlug ? (
        <CourseDetailPage data={instituteData} />
      ) : instituteSlug ? (
        <InstituteDetailPage data={instituteData} />
      ) : (
        <InstituteLandingPage data={instituteData} />
      )}
    </div>
  );
};

export default InstituteMainPage;
