const PlaceholderTab = ({ activeTab }) => {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center rounded-xl border-2 border-dashed border-n-200 bg-white">
      <span className="material-symbols-outlined mb-4 text-5xl text-n-300">construction</span>
      <h3 className="text-xl font-semibold text-n-700">
        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Module
      </h3>
      <p className="mt-2 text-sm text-n-400">UI design for this section is under progress.</p>
    </div>
  );
};

export default PlaceholderTab;
