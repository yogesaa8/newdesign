import InstiHero from "./component/InstiHero";
import PartnerHeader from "../public/components/PartnerHeader";
import Course from "./component/Course";

const InstituteMainPage = () => {
     return (
          <div>
               <PartnerHeader ctaLabel="Institute demo" />
               <InstiHero />
               <Course />
          </div>
     );
};

export default InstituteMainPage;
