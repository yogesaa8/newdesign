import React, { useState } from "react";

const CompanyProfile = () => {
  const [formData, setFormData] = useState({
    companyName: "RecruitPro Enterprise",
    industry: "Technology & SaaS",
    websiteUrl: "recruitpro.com/enterprise",
    linkedinUrl: "linkedin.com/company/recruitpro",
    twitterHandle: "@RecruitProHQ",
    description: `RecruitPro is a leading provider of AI-driven talent acquisition tools. We empower recruiters and hiring managers to build diverse, high-performing teams with speed and precision. Our mission is to humanize the hiring process through transparent data and intelligent automation.

Headquartered in San Francisco with remote teams worldwide, we pride ourselves on a culture of radical transparency, rapid iteration, and deep empathy for both candidates and employers.`,
  });

  const [hasChanges, setHasChanges] = useState(false);
   const [logoPreview, setLogoPreview] = useState(
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDJ3f2qzL0V93PhiZPpjgYkVEgbI3JXfdy6cL8hLdECdWCBq5Z0TaMpL8XaaNlU73kcE76A5EIcPxoasMrjhVDKDja_PYo_xZEYZHsSqD8_6ick9ERGf_C59n1C2GcdT6snX0RAVW02jdMPJmnLzncNhinQHjKZLKbxmAmjzsG73U6K9mMm-k0rp60jRi4tejgrCVRY0i3ryWo2ZSQVv_U-F1W0F7gJOqZnR0z0zQYmyD3LqHYVlF9HxfmAkYwt0MwaUjDadi6M3S-g",
  );
  const [coverPreview, setCoverPreview] = useState(
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBhN6YagKu3-ziidYGc7lfq8TgKFiNUdzKc9r9yMZEwxHRfcNwTaCUMdv-VanhEs6fquPhNiy-FlUS8bOtJ7Y15dCz_sIoV5JwMh_Q1gjf8Bqr3XHJLcczelQvvopTJ1SHjtovPOrjzTM8D2h6WTtqt90OL9XOhhNtDi5X6zQH6eYRtt-Um_c1gFdevaFCvXkYxrDXFdR6CftDCZp07qGL7fkKN7YeSiHhtVmrxDdc0t3j2oEVUY-X9hy8mFwqNvmnVJ3CO_5PK8O4b",
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setHasChanges(true);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
        setHasChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result);
        setHasChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log("Saving company profile:", formData);
    setHasChanges(false);
  };

  const handleDiscard = () => {
    setHasChanges(false);
  };

  const characterCount = formData.description.length;

  return (
    <div className="overflow-y-auto p-4 md:p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Page Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="mb-2 font-headline text-3xl font-extrabold tracking-tight text-slate-800 md:text-4xl">
              Company Profile
            </h1>
            <p className="max-w-xl font-body text-sm text-slate-500 md:text-base">
              Manage your organization's public identity across the RecruitPro
              network. This information is visible to potential applicants.
            </p>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden gap-3 md:flex">
            <button
              onClick={handleDiscard}
              className="rounded border border-slate-300 bg-white px-6 py-2.5 font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:shadow-md"
            >
              Discard
            </button>
            <button
              onClick={handleSave}
              className="rounded bg-orange-600 px-8 py-2.5 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-orange-700 active:scale-[0.98]"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Bento-style Form Layout */}
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-12">
          {/* Left Column: Identity & Branding */}
          <div className="space-y-4 md:space-y-6 lg:col-span-4">
            {/* Logo Upload Card */}
            <div className="rounded border border-slate-200 bg-white p-4 shadow-sm md:p-6">
              <h3 className="mb-4 font-headline text-base font-bold text-slate-800 md:mb-6 md:text-lg">
                Organization Logo
              </h3>
              <div className="flex flex-col items-center">
                <label
                  htmlFor="logo-upload"
                  className="group relative mb-4 cursor-pointer"
                >
                  <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded border-2 border-dashed border-slate-200 transition-colors group-hover:border-orange-300 md:h-32 md:w-32">
                    <img
                      alt="Employer Logo"
                      className="h-full w-full object-cover"
                      src={logoPreview}
                    />
                    <div className="absolute inset-0 flex items-center justify-center rounded bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="text-3xl text-white material-symbols-outlined">
                        cloud_upload
                      </span>
                    </div>
                  </div>
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/png,image/jpeg,image/svg+xml"
                    className="hidden"
                    onChange={handleLogoUpload}
                  />
                </label>
                <p className="text-center text-xs leading-relaxed text-slate-400">
                  Recommended size: 512x512px.
                  <br />
                  PNG or SVG preferred. Max 2MB.
                </p>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="rounded border border-slate-200 bg-white p-4 shadow-sm md:p-6">
              <h3 className="mb-4 font-headline text-base font-bold text-slate-800 md:text-lg">
                Digital Presence
              </h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    LinkedIn URL
                  </label>
                  <div className="flex items-center gap-2 rounded border border-slate-200 bg-slate-50 px-3 py-2 transition focus-within:border-orange-400 focus-within:bg-white focus-within:ring-1 focus-within:ring-orange-400">
                    <span className="text-sm text-slate-400 material-symbols-outlined">
                      link
                    </span>
                    <input
                      name="linkedinUrl"
                      value={formData.linkedinUrl}
                      onChange={handleInputChange}
                      className="w-full border-none p-0 text-sm text-slate-700 outline-none focus:ring-0"
                      type="text"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Twitter / X
                  </label>
                  <div className="flex items-center gap-2 rounded border border-slate-200 bg-slate-50 px-3 py-2 transition focus-within:border-orange-400 focus-within:bg-white focus-within:ring-1 focus-within:ring-orange-400">
                    <span className="text-sm text-slate-400 material-symbols-outlined">
                      alternate_email
                    </span>
                    <input
                      name="twitterHandle"
                      value={formData.twitterHandle}
                      onChange={handleInputChange}
                      className="w-full border-none p-0 text-sm text-slate-700 outline-none focus:ring-0"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Description */}
          <div className="space-y-4 md:space-y-6 lg:col-span-8">
            {/* General Info Card */}
            <div className="rounded border border-slate-200 bg-white p-4 shadow-sm md:p-8">
              <h3 className="mb-4 font-headline text-base font-bold text-slate-800 md:mb-8 md:text-lg">
                Core Details
              </h3>
              <div className="grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2 md:gap-x-8 md:gap-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Company Name
                  </label>
                  <input
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full rounded border border-slate-200 bg-slate-50 px-4 py-3 font-medium text-slate-800 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-1 focus:ring-orange-400"
                    type="text"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Industry
                  </label>
                  <div className="relative">
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="w-full appearance-none rounded border border-slate-200 bg-slate-50 px-4 py-3 font-medium text-slate-800 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-1 focus:ring-orange-400"
                    >
                      <option>Technology & SaaS</option>
                      <option>Financial Services</option>
                      <option>Healthcare</option>
                      <option>Manufacturing</option>
                      <option>E-commerce</option>
                      <option>Education</option>
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-sm">
                      expand_more
                    </span>
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Website URL
                  </label>
                  <div className="flex items-center rounded border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-orange-400 focus-within:bg-white focus-within:ring-1 focus-within:ring-orange-400">
                    <span className="mr-2 text-sm text-slate-400">https://</span>
                    <input
                      name="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleInputChange}
                      className="w-full border-none p-0 font-medium text-slate-700 outline-none focus:ring-0"
                      type="text"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2 md:col-span-2 md:pt-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Company Description
                    </label>
                    <span className="text-[10px] font-medium text-slate-400">
                      {characterCount} / 2000 characters
                    </span>
                  </div>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    maxLength={2000}
                    className="w-full resize-none rounded border border-slate-200 bg-slate-50 px-4 py-3 leading-relaxed text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-1 focus:ring-orange-400"
                    placeholder="Describe your company culture, mission, and what makes your organization a great place to work..."
                    rows="8"
                  />
                </div>
              </div>
            </div>

            {/* Secondary Banner Image */}
            <div className="group relative h-40 overflow-hidden rounded md:h-48">
              <img
                alt="Office Culture"
                className="h-full w-full object-cover"
                src={coverPreview}
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-4 md:p-6">
                <h4 className="font-headline text-base font-bold text-white md:text-lg">
                  Office Showcase
                </h4>
                <p className="text-xs text-white/80 md:text-sm">
                  Update your cover photo to give candidates a glimpse of your
                  workspace.
                </p>
              </div>
              <label
                htmlFor="cover-upload"
                className="absolute right-3 top-3 cursor-pointer rounded-full border border-white/30 bg-black/40 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md transition-all hover:bg-black/60 md:right-4 md:top-4"
              >
                Change Cover
                <input
                  id="cover-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleCoverUpload}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Mobile Action Bar - Fixed at bottom */}
        {hasChanges && (
          <div className="fixed bottom-4 left-4 right-4 z-50 flex items-center justify-between rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-xl backdrop-blur-md md:hidden">
            <span className="text-xs font-bold text-slate-700">Unsaved Changes</span>
            <div className="flex gap-2">
              <button
                onClick={handleDiscard}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700"
              >
                Discard
              </button>
              <button
                onClick={handleSave}
                className="rounded-lg bg-orange-600 px-6 py-2 text-xs font-bold text-white shadow-md"
              >
                Save Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyProfile;