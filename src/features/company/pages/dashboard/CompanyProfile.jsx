import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../../../../store/authStore";
import { useCompanyStore } from "../../store/companyStore";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");

const getWebsiteValue = (url = "") => url.replace(/^https?:\/\//, "");

const getLocationList = (payload) => {
  const data = payload?.data ?? payload?.result ?? payload;
  return data?.locations ?? data?.items ?? (Array.isArray(data) ? data : []);
};

const getLocationLabel = (location = {}) =>
  [location.city, location.state].filter(Boolean).join(", ") ||
  location.name ||
  location.location_name ||
  "";

const toFormData = (company = {}) => ({
  companyName: company.company_name || "",
  industry: company.industry || "",
  companySize: company.company_size || "",
  gstin: company.gstin || "",
  websiteUrl: getWebsiteValue(company.website || ""),
  linkedinUrl: company.linkedin_url || "",
  contactPerson: company.contact_person || "",
  contactDesignation: company.contact_designation || "",
  description: company.description || "",
  logoUrl: company.logo_url || "",
  locationId: company.location_id || "",
  locationName:
    company.location_name ||
    getLocationLabel(company.location) ||
    [company.location_city, company.location_state].filter(Boolean).join(", ") ||
    "",
});

const toApiPayload = (formData) => ({
  company_name: formData.companyName,
  industry: formData.industry,
  company_size: formData.companySize,
  gstin: formData.gstin,
  website: formData.websiteUrl
    ? formData.websiteUrl.startsWith("http")
      ? formData.websiteUrl
      : `https://${formData.websiteUrl}`
    : "",
  linkedin_url: formData.linkedinUrl,
  contact_person: formData.contactPerson,
  contact_designation: formData.contactDesignation,
  description: formData.description,
  logo_url: formData.logoUrl,
  location_id: formData.locationId,
});

const CompanyProfile = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const {
    company,
    isLoading,
    isSaving,
    isDeleting,
    fetchCompanyProfile,
    completeCompanyProfile,
    updateCompanyProfile,
    deleteCompanyProfile,
  } = useCompanyStore();

  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    companySize: "",
    gstin: "",
    websiteUrl: "",
    linkedinUrl: "",
    contactPerson: "",
    contactDesignation: "",
    description: "",
    logoUrl: "",
    locationId: "",
    locationName: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [locationSearch, setLocationSearch] = useState("");
  const [locationResults, setLocationResults] = useState([]);
  const [isSearchingLocations, setIsSearchingLocations] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const locationRef = useRef(null);

  const [hasChanges, setHasChanges] = useState(false);
   const [logoPreview, setLogoPreview] = useState(
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDJ3f2qzL0V93PhiZPpjgYkVEgbI3JXfdy6cL8hLdECdWCBq5Z0TaMpL8XaaNlU73kcE76A5EIcPxoasMrjhVDKDja_PYo_xZEYZHsSqD8_6ick9ERGf_C59n1C2GcdT6snX0RAVW02jdMPJmnLzncNhinQHjKZLKbxmAmjzsG73U6K9mMm-k0rp60jRi4tejgrCVRY0i3ryWo2ZSQVv_U-F1W0F7gJOqZnR0z0zQYmyD3LqHYVlF9HxfmAkYwt0MwaUjDadi6M3S-g",
  );
  const [coverPreview, setCoverPreview] = useState(
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBhN6YagKu3-ziidYGc7lfq8TgKFiNUdzKc9r9yMZEwxHRfcNwTaCUMdv-VanhEs6fquPhNiy-FlUS8bOtJ7Y15dCz_sIoV5JwMh_Q1gjf8Bqr3XHJLcczelQvvopTJ1SHjtovPOrjzTM8D2h6WTtqt90OL9XOhhNtDi5X6zQH6eYRtt-Um_c1gFdevaFCvXkYxrDXFdR6CftDCZp07qGL7fkKN7YeSiHhtVmrxDdc0t3j2oEVUY-X9hy8mFwqNvmnVJ3CO_5PK8O4b",
  );

  useEffect(() => {
    if (!accessToken) return;

    fetchCompanyProfile(accessToken).catch(() => {});
  }, [accessToken, fetchCompanyProfile]);

  useEffect(() => {
    if (!company) return;

    const nextFormData = toFormData(company);
    setFormData(nextFormData);
    if (company.logo_url) setLogoPreview(company.logo_url);
    setHasChanges(false);

    if (nextFormData.locationName) {
      setLocationSearch(nextFormData.locationName);
    } else if (nextFormData.locationId) {
      // API returned only location_id — resolve it to a display label
      fetch(`${API_BASE_URL}/locations`)
        .then((r) => r.json())
        .then((payload) => {
          const list = getLocationList(payload);
          const found = list.find((l) => l.id === nextFormData.locationId);
          const label = found ? getLocationLabel(found) : "";
          setLocationSearch(label);
          setFormData((prev) => ({ ...prev, locationName: label }));
        })
        .catch(() => {});
    } else {
      setLocationSearch("");
    }
  }, [company]);

  useEffect(() => {
    if (locationSearch.trim().length < 2 || formData.locationId) {
      setLocationResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearchingLocations(true);
      try {
        const response = await fetch(
          `${API_BASE_URL}/locations?search=${encodeURIComponent(locationSearch.trim())}`,
        );
        const payload = await response.json();
        setLocationResults(getLocationList(payload));
      } catch {
        setLocationResults([]);
      } finally {
        setIsSearchingLocations(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [locationSearch, formData.locationId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setShowLocationDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const validateRequiredFields = () => {
    const nextErrors = {};

    if (!formData.companyName.trim()) nextErrors.companyName = "Company name is required.";
    if (!formData.industry.trim()) nextErrors.industry = "Industry is required.";
    if (!formData.companySize.trim()) nextErrors.companySize = "Company size is required.";
    if (!formData.locationId) nextErrors.locationId = "Please select a location.";

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setHasChanges(true);
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleLocationSearchChange = (e) => {
    const { value } = e.target;
    setLocationSearch(value);
    setShowLocationDropdown(true);
    setFormData((prev) => ({
      ...prev,
      locationId: "",
      locationName: value,
    }));
    setHasChanges(true);
    if (fieldErrors.locationId) {
      setFieldErrors((prev) => ({ ...prev, locationId: "" }));
    }
  };

  const handleLocationSelect = (location) => {
    const label = getLocationLabel(location);
    setLocationSearch(label);
    setFormData((prev) => ({
      ...prev,
      locationId: location.id,
      locationName: label,
    }));
    setLocationResults([]);
    setShowLocationDropdown(false);
    setHasChanges(true);
    setFieldErrors((prev) => ({ ...prev, locationId: "" }));
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

  const handleLogoUrlChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, logoUrl: value }));
    if (value) setLogoPreview(value);
    setHasChanges(true);
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

  const handleSave = async () => {
    if (!accessToken) {
      toast.error("Session expired. Please login again.");
      return;
    }

    if (!validateRequiredFields()) {
      toast.error("Please fill all required fields.");
      return;
    }

    const toastId = toast.loading(company ? "Updating profile..." : "Saving profile...");
    try {
      if (company) {
        await updateCompanyProfile(toApiPayload(formData), accessToken);
      } else {
        await completeCompanyProfile(toApiPayload(formData), accessToken);
      }
      setHasChanges(false);
      toast.success(
        company ? "Profile updated successfully." : "Profile saved successfully.",
        { id: toastId },
      );
    } catch (err) {
      toast.error(err.message, { id: toastId });
    }
  };

  const handleDiscard = () => {
    const nextFormData = toFormData(company);
    setFormData(nextFormData);
    setLocationSearch(nextFormData.locationName);
    setFieldErrors({});
    setHasChanges(false);
  };

  const handleDeleteProfile = async () => {
    if (!accessToken) {
      toast.error("Session expired. Please login again.");
      return;
    }

    if (!window.confirm("Delete this company profile? Your account will remain active.")) {
      return;
    }

    const toastId = toast.loading("Deleting profile...");
    try {
      await deleteCompanyProfile(accessToken);
      const nextFormData = toFormData();
      setFormData(nextFormData);
      setLocationSearch(nextFormData.locationName);
      setFieldErrors({});
      setHasChanges(false);
      toast.success("Company profile deleted successfully.", { id: toastId });
    } catch (err) {
      toast.error(err.message, { id: toastId });
    }
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
              onClick={handleDeleteProfile}
              disabled={isDeleting || !company}
              className="rounded border border-red-200 bg-white px-6 py-2.5 font-semibold text-red-600 shadow-sm transition-all duration-200 hover:bg-red-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isDeleting ? "Deleting..." : "Delete Profile"}
            </button>
            <button
              onClick={handleDiscard}
              className="rounded border border-slate-300 bg-white px-6 py-2.5 font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:shadow-md"
            >
              Discard
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="rounded bg-orange-600 px-8 py-2.5 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-orange-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSaving ? "Saving..." : "Save Changes"}
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
                    GSTIN
                  </label>
                  <div className="flex items-center gap-2 rounded border border-slate-200 bg-slate-50 px-3 py-2 transition focus-within:border-orange-400 focus-within:bg-white focus-within:ring-1 focus-within:ring-orange-400">
                    <span className="text-sm text-slate-400 material-symbols-outlined">
                      badge
                    </span>
                    <input
                      name="gstin"
                      value={formData.gstin}
                      onChange={handleInputChange}
                      className="w-full border-none p-0 text-sm text-slate-700 outline-none focus:ring-0"
                      type="text"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Logo URL
                  </label>
                  <div className="flex items-center gap-2 rounded border border-slate-200 bg-slate-50 px-3 py-2 transition focus-within:border-orange-400 focus-within:bg-white focus-within:ring-1 focus-within:ring-orange-400">
                    <span className="text-sm text-slate-400 material-symbols-outlined">
                      image
                    </span>
                    <input
                      name="logoUrl"
                      value={formData.logoUrl}
                      onChange={handleLogoUrlChange}
                      placeholder="https://example.com/logo.png"
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
                    Company Name *
                  </label>
                  <input
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className={`w-full rounded border bg-slate-50 px-4 py-3 font-medium text-slate-800 outline-none transition focus:bg-white focus:ring-1 ${
                      fieldErrors.companyName
                        ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                        : "border-slate-200 focus:border-orange-400 focus:ring-orange-400"
                    }`}
                    type="text"
                  />
                  {fieldErrors.companyName && (
                    <p className="text-sm text-red-500">{fieldErrors.companyName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Industry *
                  </label>
                  <div className="relative">
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className={`w-full appearance-none rounded border bg-slate-50 px-4 py-3 font-medium text-slate-800 outline-none transition focus:bg-white focus:ring-1 ${
                        fieldErrors.industry
                          ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                          : "border-slate-200 focus:border-orange-400 focus:ring-orange-400"
                      }`}
                    >
                      <option value="">Select industry</option>
                      <option value="Technology">Technology</option>
                      <option value="Technology & SaaS">Technology & SaaS</option>
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
                  {fieldErrors.industry && (
                    <p className="text-sm text-red-500">{fieldErrors.industry}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Company Size *
                  </label>
                  <div className="relative">
                    <select
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleInputChange}
                      className={`w-full appearance-none rounded border bg-slate-50 px-4 py-3 font-medium text-slate-800 outline-none transition focus:bg-white focus:ring-1 ${
                        fieldErrors.companySize
                          ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                          : "border-slate-200 focus:border-orange-400 focus:ring-orange-400"
                      }`}
                    >
                      <option value="">Select size</option>
                      <option value="1-10">1-10</option>
                      <option value="11-50">11-50</option>
                      <option value="51-200">51-200</option>
                      <option value="201-1000">201-1000</option>
                      <option value="1000+">1000+</option>
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-sm">
                      expand_more
                    </span>
                  </div>
                  {fieldErrors.companySize && (
                    <p className="text-sm text-red-500">{fieldErrors.companySize}</p>
                  )}
                </div>

                <div className="space-y-2">
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

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Contact Person
                  </label>
                  <input
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    className="w-full rounded border border-slate-200 bg-slate-50 px-4 py-3 font-medium text-slate-800 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-1 focus:ring-orange-400"
                    type="text"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Contact Designation
                  </label>
                  <input
                    name="contactDesignation"
                    value={formData.contactDesignation}
                    onChange={handleInputChange}
                    className="w-full rounded border border-slate-200 bg-slate-50 px-4 py-3 font-medium text-slate-800 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-1 focus:ring-orange-400"
                    type="text"
                  />
                </div>

                <div ref={locationRef} className="relative space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    City / Location *
                  </label>
                  <input
                    type="text"
                    value={locationSearch}
                    onChange={handleLocationSearchChange}
                    onFocus={() => locationSearch.length >= 2 && setShowLocationDropdown(true)}
                    placeholder="Search city"
                    className={`w-full rounded border bg-slate-50 px-4 py-3 font-medium text-slate-800 outline-none transition focus:bg-white focus:ring-1 ${
                      fieldErrors.locationId
                        ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                        : "border-slate-200 focus:border-orange-400 focus:ring-orange-400"
                    }`}
                  />
                  {isSearchingLocations && (
                    <span className="absolute right-3 top-9 text-xs text-slate-400">
                      Searching...
                    </span>
                  )}
                  {showLocationDropdown && locationResults.length > 0 && (
                    <ul className="absolute z-20 mt-1 max-h-48 w-full overflow-y-auto rounded border border-slate-200 bg-white shadow-lg">
                      {locationResults.map((location) => (
                        <li
                          key={location.id}
                          onMouseDown={() => handleLocationSelect(location)}
                          className="cursor-pointer px-4 py-2 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-700"
                        >
                          {getLocationLabel(location)}
                        </li>
                      ))}
                    </ul>
                  )}
                  {fieldErrors.locationId && (
                    <p className="text-sm text-red-500">{fieldErrors.locationId}</p>
                  )}
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
                disabled={isSaving}
                className="rounded-lg bg-orange-600 px-6 py-2 text-xs font-bold text-white shadow-md disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSaving ? "Saving..." : "Save Now"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyProfile;
