/* eslint-disable react-hooks/set-state-in-effect -- Editable profile state mirrors store data and async location search. */
import React, { useEffect, useRef, useState } from "react";
import toast from "@/lib/toast";
import { useAuthStore } from "../../../../store/authStore";
import { useCompanyStore } from "../../store/companyStore";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");

const defaultLogo =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDJ3f2qzL0V93PhiZPpjgYkVEgbI3JXfdy6cL8hLdECdWCBq5Z0TaMpL8XaaNlU73kcE76A5EIcPxoasMrjhVDKDja_PYo_xZEYZHsSqD8_6ick9ERGf_C59n1C2GcdT6snX0RAVW02jdMPJmnLzncNhinQHjKZLKbxmAmjzsG73U6K9mMm-k0rp60jRi4tejgrCVRY0i3ryWo2ZSQVv_U-F1W0F7gJOqZnR0z0zQYmyD3LqHYVlF9HxfmAkYwt0MwaUjDadi6M3S-g";

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
  const [hasChanges, setHasChanges] = useState(false);
  const [logoPreview, setLogoPreview] = useState(defaultLogo);
  const locationRef = useRef(null);

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
      fetch(`${API_BASE_URL}/locations`)
        .then((response) => response.json())
        .then((payload) => {
          const list = getLocationList(payload);
          const found = list.find((location) => location.id === nextFormData.locationId);
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setHasChanges(true);
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleLocationSearchChange = (event) => {
    const { value } = event.target;
    setLocationSearch(value);
    setShowLocationDropdown(true);
    setFormData((prev) => ({ ...prev, locationId: "", locationName: value }));
    setHasChanges(true);
    if (fieldErrors.locationId) {
      setFieldErrors((prev) => ({ ...prev, locationId: "" }));
    }
  };

  const handleLocationSelect = (location) => {
    const label = getLocationLabel(location);
    setLocationSearch(label);
    setFormData((prev) => ({ ...prev, locationId: location.id, locationName: label }));
    setLocationResults([]);
    setShowLocationDropdown(false);
    setHasChanges(true);
    setFieldErrors((prev) => ({ ...prev, locationId: "" }));
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result);
      setHasChanges(true);
    };
    reader.readAsDataURL(file);
  };

  const handleLogoUrlChange = (event) => {
    const { value } = event.target;
    setFormData((prev) => ({ ...prev, logoUrl: value }));
    if (value) setLogoPreview(value);
    setHasChanges(true);
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
      toast.success(company ? "Profile updated successfully." : "Profile saved successfully.", {
        id: toastId,
      });
    } catch (err) {
      toast.error(err.message, { id: toastId });
    }
  };

  const handleDiscard = () => {
    const nextFormData = toFormData(company);
    setFormData(nextFormData);
    setLocationSearch(nextFormData.locationName);
    setLogoPreview(nextFormData.logoUrl || defaultLogo);
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
      setLogoPreview(defaultLogo);
      setFieldErrors({});
      setHasChanges(false);
      toast.success("Company profile deleted successfully.", { id: toastId });
    } catch (err) {
      toast.error(err.message, { id: toastId });
    }
  };

  const inputClass =
    "w-full rounded-lg border border-n-200 bg-n-50 px-4 py-3 text-sm font-semibold text-n-900 outline-none transition focus:border-co-primary focus:bg-white";
  const labelClass =
    "mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-n-500";
  const characterCount = formData.description.length;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-8">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-co-primary">
            Profile
          </p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-n-900 md:text-3xl">
            Company profile
          </h1>
          {isLoading && <p className="mt-1 text-sm text-n-500">Loading profile...</p>}
        </div>

        <div className="flex flex-wrap gap-2">
          {/* <button
            onClick={handleDeleteProfile}
            disabled={isDeleting || !company}
            className="rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-bold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button> */}
          <button
            onClick={handleDiscard}
            disabled={!hasChanges}
            className="rounded-lg border border-n-200 bg-white px-4 py-2.5 text-sm font-bold text-n-700 transition-colors hover:bg-n-50 disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
          >
            Discard
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-lg bg-co-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-co-hover disabled:cursor-not-allowed disabled:opacity-70"
            type="button"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[320px_1fr]">
        <aside className="rounded-lg border border-n-200 bg-white p-5">
          <p className="text-sm font-bold text-n-900">Logo</p>
          <label
            htmlFor="logo-upload"
            className="mt-4 flex cursor-pointer flex-col items-center rounded-lg border border-dashed border-[#D9CDC5] bg-n-50 p-5 text-center transition-colors hover:bg-white"
          >
            <img
              src={logoPreview}
              alt="Employer logo"
              className="h-24 w-24 rounded-lg object-cover"
            />
            <span className="mt-3 text-sm font-bold text-co-primary">Upload logo</span>
            <input
              id="logo-upload"
              type="file"
              accept="image/png,image/jpeg,image/svg+xml"
              className="hidden"
              onChange={handleLogoUpload}
            />
          </label>

          <div className="mt-5">
            <label className={labelClass}>Logo URL</label>
            <input
              name="logoUrl"
              value={formData.logoUrl}
              onChange={handleLogoUrlChange}
              className={inputClass}
              placeholder="https://example.com/logo.png"
              type="text"
            />
          </div>

          <div className="mt-5 rounded-lg border border-n-100 bg-n-50 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-n-500">
              Status
            </p>
            <p className="mt-1 text-sm font-semibold text-n-900">
              {company ? "Profile saved" : "Profile incomplete"}
            </p>
          </div>
        </aside>

        <section className="rounded-lg border border-n-200 bg-white p-5 md:p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className={labelClass}>Company name *</label>
              <input
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className={`${inputClass} ${fieldErrors.companyName ? "border-red-400" : ""}`}
                type="text"
              />
              {fieldErrors.companyName && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.companyName}</p>
              )}
            </div>

            <div>
              <label className={labelClass}>Industry *</label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className={`${inputClass} ${fieldErrors.industry ? "border-red-400" : ""}`}
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
              {fieldErrors.industry && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.industry}</p>
              )}
            </div>

            <div>
              <label className={labelClass}>Company size *</label>
              <select
                name="companySize"
                value={formData.companySize}
                onChange={handleInputChange}
                className={`${inputClass} ${fieldErrors.companySize ? "border-red-400" : ""}`}
              >
                <option value="">Select size</option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value="201-1000">201-1000</option>
                <option value="1000+">1000+</option>
              </select>
              {fieldErrors.companySize && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.companySize}</p>
              )}
            </div>

            <div ref={locationRef} className="relative">
              <label className={labelClass}>City / location *</label>
              <input
                value={locationSearch}
                onChange={handleLocationSearchChange}
                onFocus={() => locationSearch.length >= 2 && setShowLocationDropdown(true)}
                className={`${inputClass} ${fieldErrors.locationId ? "border-red-400" : ""}`}
                placeholder="Search city"
                type="text"
              />
              {isSearchingLocations && (
                <span className="absolute right-3 top-10 text-xs font-semibold text-n-500">
                  Searching
                </span>
              )}
              {showLocationDropdown && locationResults.length > 0 && (
                <ul className="absolute z-20 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-n-200 bg-white shadow-[0_18px_45px_rgba(17,17,20,0.08)]">
                  {locationResults.map((location) => (
                    <li
                      key={location.id}
                      onMouseDown={() => handleLocationSelect(location)}
                      className="cursor-pointer px-4 py-2 text-sm font-semibold text-n-700 hover:bg-n-50"
                    >
                      {getLocationLabel(location)}
                    </li>
                  ))}
                </ul>
              )}
              {fieldErrors.locationId && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.locationId}</p>
              )}
            </div>

            <div>
              <label className={labelClass}>Website</label>
              <input
                name="websiteUrl"
                value={formData.websiteUrl}
                onChange={handleInputChange}
                className={inputClass}
                placeholder="company.com"
                type="text"
              />
            </div>

            <div>
              <label className={labelClass}>LinkedIn</label>
              <input
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleInputChange}
                className={inputClass}
                placeholder="https://linkedin.com/company/name"
                type="text"
              />
            </div>

            <div>
              <label className={labelClass}>Contact person</label>
              <input
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleInputChange}
                className={inputClass}
                type="text"
              />
            </div>

            <div>
              <label className={labelClass}>Contact designation</label>
              <input
                name="contactDesignation"
                value={formData.contactDesignation}
                onChange={handleInputChange}
                className={inputClass}
                type="text"
              />
            </div>

            <div>
              <label className={labelClass}>GSTIN</label>
              <input
                name="gstin"
                value={formData.gstin}
                onChange={handleInputChange}
                className={inputClass}
                type="text"
              />
            </div>

            <div className="md:col-span-2">
              <div className="mb-2 flex items-center justify-between gap-3">
                <label className="block text-xs font-bold uppercase tracking-[0.08em] text-n-500">
                  Description
                </label>
                <span className="text-xs font-semibold text-n-500">
                  {characterCount}/2000
                </span>
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                maxLength={2000}
                className="min-h-36 w-full resize-y rounded-lg border border-n-200 bg-n-50 px-4 py-3 text-sm leading-6 text-n-900 outline-none transition focus:border-co-primary focus:bg-white"
                placeholder="What candidates should know before applying."
              />
            </div>
          </div>
        </section>
      </div>

      {hasChanges && (
        <div className="fixed bottom-4 left-4 right-4 z-50 flex items-center justify-between gap-3 rounded-lg border border-n-200 bg-white/95 p-3 shadow-[0_18px_45px_rgba(17,17,20,0.12)] backdrop-blur md:hidden">
          <span className="text-sm font-bold text-n-900">Unsaved changes</span>
          <div className="flex gap-2">
            <button
              onClick={handleDiscard}
              className="rounded-lg border border-n-200 px-3 py-2 text-xs font-bold text-n-700"
              type="button"
            >
              Discard
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="rounded-lg bg-co-primary px-4 py-2 text-xs font-bold text-white disabled:opacity-70"
              type="button"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;
