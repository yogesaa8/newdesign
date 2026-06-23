import MasterHeader from "../../../components/layout/MasterHeader";

const CompanyHeader = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <MasterHeader
      sidebarOpen={sidebarOpen}
      onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
      showSidebarToggle
    />
  );
};

export default CompanyHeader;
