import React, { useState } from 'react';

const CompanyProfile = () => {
  const [formData, setFormData] = useState({
    companyName: 'RecruitPro Enterprise',
    industry: 'Technology & SaaS',
    websiteUrl: 'recruitpro.com/enterprise',
    linkedinUrl: 'linkedin.com/company/recruitpro',
    twitterHandle: '@RecruitProHQ',
    description: `RecruitPro is a leading provider of AI-driven talent acquisition tools. We empower recruiters and hiring managers to build diverse, high-performing teams with speed and precision. Our mission is to humanize the hiring process through transparent data and intelligent automation.

Headquartered in San Francisco with remote teams worldwide, we pride ourselves on a culture of radical transparency, rapid iteration, and deep empathy for both candidates and employers.`,
  }); // form data first all state has saved

  const [hasChanges, setHasChanges] = useState(false);
  const [logoPreview, setLogoPreview] = useState('https://lh3.googleusercontent.com/aida-public/AB6AXuDJ3f2qzL0V93PhiZPpjgYkVEgbI3JXfdy6cL8hLdECdWCBq5Z0TaMpL8XaaNlU73kcE76A5EIcPxoasMrjhVDKDja_PYo_xZEYZHsSqD8_6ick9ERGf_C59n1C2GcdT6snX0RAVW02jdMPJmnLzncNhinQHjKZLKbxmAmjzsG73U6K9mMm-k0rp60jRi4tejgrCVRY0i3ryWo2ZSQVv_U-F1W0F7gJOqZnR0z0zQYmyD3LqHYVlF9HxfmAkYwt0MwaUjDadi6M3S-g');
  const [coverPreview, setCoverPreview] = useState('https://lh3.googleusercontent.com/aida-public/AB6AXuBhN6YagKu3-ziidYGc7lfq8TgKFiNUdzKc9r9yMZEwxHRfcNwTaCUMdv-VanhEs6fquPhNiy-FlUS8bOtJ7Y15dCz_sIoV5JwMh_Q1gjf8Bqr3XHJLcczelQvvopTJ1SHjtovPOrjzTM8D2h6WTtqt90OL9XOhhNtDi5X6zQH6eYRtt-Um_c1gFdevaFCvXkYxrDXFdR6CftDCZp07qGL7fkKN7YeSiHhtVmrxDdc0t3j2oEVUY-X9hy8mFwqNvmnVJ3CO_5PK8O4b');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    console.log('Saving company profile:', formData); //here is console.log for checking the data is well formated or not 
    setHasChanges(false);
  };

  const handleDiscard = () => {
    setHasChanges(false);
  };

  const characterCount = formData.description.length;

  return (
    <div className="p-4 md:p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-cp-text-primary tracking-tight mb-2 font-headline">
              Company Profile
            </h1>
            <p className="text-cp-text-muted font-body max-w-xl text-sm md:text-base">
              Manage your organization's public identity across the RecruitPro network. 
              This information is visible to potential applicants.
            </p>
          </div>
          
          {/* Desktop Action Buttons */}
          <div className="hidden md:flex gap-3">
            <button 
              onClick={handleDiscard}
              className="px-6 py-2.5 rounded-lg font-semibold bg-cp-surface-high text-cp-text-secondary hover:bg-cp-surface-highest transition-all duration-200"
            >
              Discard
            </button>
            <button 
              onClick={handleSave}
              className="px-8 py-2.5 rounded-lg font-semibold text-cp-primary-text bg-gradient-to-br from-cp-primary to-cp-primary-light shadow-sm hover:opacity-90 active:scale-[0.98] transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Bento-style Form Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          {/* Left Column: Identity & Branding */}
          <div className="lg:col-span-4 space-y-4 md:space-y-6">
            {/* Logo Upload Card */}
            <div className="bg-cp-surface p-4 md:p-6 rounded-xl shadow-[0_1px_0_0_rgba(0,0,0,0.05)]">
              <h3 className="text-base md:text-lg font-bold mb-4 md:mb-6 text-cp-text-primary font-headline">
                Organization Logo
              </h3>
              <div className="flex flex-col items-center">
                <label htmlFor="logo-upload" className="relative group cursor-pointer mb-4">
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-cp-surface-container overflow-hidden flex items-center justify-center border-2 border-dashed border-cp-border group-hover:border-cp-primary transition-colors">
                    <img 
                      alt="Employer Logo" 
                      className="w-full h-full object-cover" 
                      src={logoPreview}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-2xl">
                      <span className="material-symbols-outlined text-white text-3xl">
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
                <p className="text-xs text-center text-cp-text-muted leading-relaxed">
                  Recommended size: 512x512px.<br />
                  PNG or SVG preferred. Max 2MB.
                </p>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-cp-surface p-4 md:p-6 rounded-xl shadow-[0_1px_0_0_rgba(0,0,0,0.05)]">
              <h3 className="text-base md:text-lg font-bold mb-4 text-cp-text-primary font-headline">
                Digital Presence
              </h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-cp-text-muted">
                    LinkedIn URL
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2 bg-cp-surface-low rounded-lg focus-within:ring-2 focus-within:ring-cp-primary/20">
                    <span className="material-symbols-outlined text-slate-400 text-sm">
                      link
                    </span>
                    <input 
                      name="linkedinUrl"
                      value={formData.linkedinUrl}
                      onChange={handleInputChange}
                      className="bg-transparent border-none p-0 w-full focus:ring-0 text-sm text-cp-text-primary outline-none" 
                      type="text"
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-cp-text-muted">
                    Twitter / X
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2 bg-cp-surface-low rounded-lg focus-within:ring-2 focus-within:ring-cp-primary/20">
                    <span className="material-symbols-outlined text-slate-400 text-sm">
                      alternate_email
                    </span>
                    <input 
                      name="twitterHandle"
                      value={formData.twitterHandle}
                      onChange={handleInputChange}
                      className="bg-transparent border-none p-0 w-full focus:ring-0 text-sm text-cp-text-primary outline-none" 
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Description */}
          <div className="lg:col-span-8 space-y-4 md:space-y-6">
            {/* General Info Card */}
            <div className="bg-cp-surface p-4 md:p-8 rounded-xl shadow-[0_1px_0_0_rgba(0,0,0,0.05)]">
              <h3 className="text-base md:text-lg font-bold mb-4 md:mb-8 text-cp-text-primary font-headline">
                Core Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4 md:gap-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-cp-text-muted">
                    Company Name
                  </label>
                  <input 
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-cp-surface-low border-none rounded-lg focus:ring-2 focus:ring-cp-primary/20 text-cp-text-primary font-medium outline-none" 
                    type="text"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-cp-text-muted">
                    Industry
                  </label>
                  <select 
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-cp-surface-low border-none rounded-lg focus:ring-2 focus:ring-cp-primary/20 text-cp-text-primary font-medium appearance-none outline-none"
                  >
                    <option>Technology & SaaS</option>
                    <option>Financial Services</option>
                    <option>Healthcare</option>
                    <option>Manufacturing</option>
                    <option>E-commerce</option>
                    <option>Education</option>
                  </select>
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-cp-text-muted">
                    Website URL
                  </label>
                  <div className="flex items-center px-4 py-3 bg-cp-surface-low rounded-lg focus-within:ring-2 focus-within:ring-cp-primary/20">
                    <span className="text-cp-text-muted mr-2 text-sm">https://</span>
                    <input 
                      name="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-none p-0 focus:ring-0 text-cp-text-primary font-medium outline-none" 
                      type="text"
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2 space-y-2 pt-2 md:pt-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-cp-text-muted">
                      Company Description
                    </label>
                    <span className="text-[10px] font-medium text-cp-text-muted">
                      {characterCount} / 2000 characters
                    </span>
                  </div>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    maxLength={2000}
                    className="w-full px-4 py-3 bg-cp-surface-low border-none rounded-lg focus:ring-2 focus:ring-cp-primary/20 text-cp-text-primary leading-relaxed resize-none outline-none" 
                    placeholder="Describe your company culture, mission, and what makes your organization a great place to work..." 
                    rows="8"
                  />
                </div>
              </div>
            </div>

            {/* Secondary Banner Image */}
            <div className="relative h-40 md:h-48 rounded-xl overflow-hidden group">
              <img 
                alt="Office Culture" 
                className="w-full h-full object-cover" 
                src={coverPreview}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4 md:p-6">
                <h4 className="text-white font-bold text-base md:text-lg font-headline">
                  Office Showcase
                </h4>
                <p className="text-white/80 text-xs md:text-sm">
                  Update your cover photo to give candidates a glimpse of your workspace.
                </p>
              </div>
              <label 
                htmlFor="cover-upload"
                className="absolute top-3 md:top-4 right-3 md:right-4 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer"
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
          <div className="md:hidden fixed bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex justify-between items-center z-50">
            <span className="text-xs font-bold text-cp-text-muted">Unsaved Changes</span>
            <div className="flex gap-2">
              <button 
                onClick={handleDiscard}
                className="px-4 py-2 rounded-lg font-bold text-cp-text-secondary bg-cp-surface-high text-xs"
              >
                Discard
              </button>
              <button 
                onClick={handleSave}
                className="px-6 py-2 rounded-lg font-bold text-cp-primary-text bg-cp-primary text-xs shadow-md"
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