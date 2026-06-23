import MasterHeader from "../../../components/layout/MasterHeader";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <MasterHeader
      sidebarOpen={sidebarOpen}
      onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
      showSidebarToggle
    />
  );
};

export default Header;
