import React, { useState, useEffect, useRef } from "react";
import "react-quill-new/dist/quill.snow.css";
import {
  FiCamera,
  FiGithub,
  FiLinkedin,
  FiGlobe,
  FiUser,
  FiBriefcase,
  FiPlus,
  FiEdit3,
  FiTrash2,
  FiExternalLink,
  FiAward,
  FiMapPin,
  FiAlertTriangle,
} from "react-icons/fi";
import Breadcrumb from "../../../../components/ui/Breadcrumb";
import Modal from "../../../../components/ui/Modal";
import ReactQuill from "react-quill-new";
import toast from "@/lib/toast";
import { useAuthStore } from "../../../../store/authStore";
import { useSeekerProfileStore } from "../../store/seekerProfileStore";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");

const INPUT_CLASS =
  "w-full rounded-lg border border-n-200 bg-n-50 px-4 py-2.5 text-sm text-n-900 outline-none placeholder:text-n-400 transition focus:border-sk-primary focus:ring-2 focus:ring-sk-primary/10";
const LABEL_CLASS = "mb-2 block text-sm font-medium text-n-700";

const Profile = () => {
  const [modalType, setModalType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [description, setDescription] = useState("");
  const [, setSubmitError] = useState("");
  const [isDeleteProfileOpen, setIsDeleteProfileOpen] = useState(false);

  const showSubmitError = (message) => {
    setSubmitError(message);
    toast.error(message);
  };

  const [locationSearch, setLocationSearch] = useState("");
  const [locationResults, setLocationResults] = useState([]);
  const [locationLoading, setLocationLoading] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const locationDebounce = useRef(null);
  const locationDropdownRef = useRef(null);

  const [streams, setStreams] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/meta`)
      .then((r) => r.json())
      .then((data) => {
        const raw = data?.data?.streams ?? data?.streams ?? data?.result?.streams ?? [];
        setStreams(Array.isArray(raw) ? raw : []);
      })
      .catch(() => {});
  }, []);

  const accessToken = useAuthStore((state) => state.accessToken);
  const {
    profile,
    experiences,
    projects,
    educations,
    isLoading,
    isSaving,
    error,
    fetchSeekerProfile,
    fetchExperiences,
    fetchProjects,
    fetchEducations,
    addExperience,
    addProject,
    addEducation,
    updateExperience,
    updateProject,
    updateEducation,
    deleteExperience,
    deleteProject,
    deleteEducation,
    updateSeekerProfile,
    completeSeekerProfile,
    deleteSeekerProfile,
  } = useSeekerProfileStore();

  const displayName = profile.full_name || profile.name || "Complete your profile";
  const displayRole = profile.target_role || profile.position || "Add your target role";
  const initials = displayName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  useEffect(() => {
    if (!accessToken) return;
    Promise.allSettled([
      fetchSeekerProfile(accessToken),
      fetchExperiences(accessToken),
      fetchProjects(accessToken),
      fetchEducations(accessToken),
    ]);
  }, [accessToken, fetchSeekerProfile, fetchExperiences, fetchProjects, fetchEducations]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (editItem) {
      setDescription(editItem.description || "");
    } else {
      setDescription("");
    }
  }, [editItem]);

  const handleLocationSearch = (e) => {
    const query = e.target.value;
    setLocationSearch(query);
    setSelectedLocationId("");
    setShowLocationDropdown(true);
    clearTimeout(locationDebounce.current);
    if (!query.trim()) {
      setLocationResults([]);
      return;
    }
    locationDebounce.current = setTimeout(async () => {
      setLocationLoading(true);
      try {
        const res = await fetch(
          `${API_BASE_URL}/locations?search=${encodeURIComponent(query.trim())}`,
        );
        const data = await res.json();
        const raw = data?.data ?? data?.locations ?? data?.result ?? data ?? [];
        setLocationResults(Array.isArray(raw) ? raw : []);
      } catch {
        setLocationResults([]);
      } finally {
        setLocationLoading(false);
      }
    }, 300);
  };

  const handleSelectLocation = (loc) => {
    setSelectedLocationId(loc.id);
    setLocationSearch(loc.state ? `${loc.city}, ${loc.state}` : loc.city);
    setLocationResults([]);
    setShowLocationDropdown(false);
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditItem(item);
    setSubmitError("");
    if (type === "profile") {
      const city = profile.location_city || "";
      const state = profile.location_state || "";
      setLocationSearch(city ? (state ? `${city}, ${state}` : city) : "");
      setSelectedLocationId(profile.location_id || "");
      setLocationResults([]);
      setShowLocationDropdown(false);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditItem(null);
    setModalType(null);
    setDescription("");
    setSubmitError("");
    setLocationSearch("");
    setSelectedLocationId("");
    setLocationResults([]);
    setShowLocationDropdown(false);
  };

  const handleDelete = async (section, id) => {
    if (!accessToken) {
      showSubmitError("Session expired. Please login again.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this?")) return;
    try {
      if (section === "projects") {
        await deleteProject(id, accessToken);
        toast.success("Project deleted successfully.");
      } else if (section === "experience") {
        await deleteExperience(id, accessToken);
        toast.success("Experience deleted successfully.");
      } else if (section === "education") {
        await deleteEducation(id, accessToken);
        toast.success("Education deleted successfully.");
      }
    } catch (error) {
      showSubmitError(error.message);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!accessToken) {
      showSubmitError("Session expired. Please login again.");
      return;
    }
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    try {
      if (modalType === "project") {
        const payload = {
          title: data.title,
          duration: data.duration,
          description,
          project_url: data.project_url,
          tech_stack: data.tech_stack,
        };
        if (editItem) {
          await updateProject(editItem.id, payload, accessToken);
          toast.success("Project updated successfully.");
        } else {
          await addProject(payload, accessToken);
          toast.success("Project added successfully.");
        }
      } else if (modalType === "experience") {
        const payload = {
          title: data.title,
          company_name: data.company_name,
          start_date: data.start_date,
          end_date: data.is_current ? null : data.end_date,
          is_current: data.is_current === "on",
          description,
        };
        if (editItem) {
          await updateExperience(editItem.id, payload, accessToken);
          toast.success("Experience updated successfully.");
        } else {
          await addExperience(payload, accessToken);
          toast.success("Experience added successfully.");
        }
      } else if (modalType === "education") {
        const payload = {
          degree: data.degree,
          institution_name: data.institution_name,
          start_year: data.start_year ? Number(data.start_year) : undefined,
          end_year: data.end_year ? Number(data.end_year) : undefined,
          description,
          grade: data.grade,
        };
        if (editItem) {
          await updateEducation(editItem.id, payload, accessToken);
          toast.success("Education updated successfully.");
        } else {
          await addEducation(payload, accessToken);
          toast.success("Education added successfully.");
        }
      } else if (modalType === "profile") {
        if (!selectedLocationId) {
          showSubmitError("Please select a location from the dropdown.");
          return;
        }
        const profilePayload = {
          full_name: data.full_name,
          location_id: selectedLocationId,
          stream: data.stream,
          degree: data.degree,
          graduation_year: data.graduation_year ? Number(data.graduation_year) : undefined,
          college_name_manual: data.college_name_manual,
          bio: data.bio,
          target_role: data.target_role,
          cover_photo_url: data.cover_photo_url,
          linkedin_url: data.linkedin_url,
          github_url: data.github_url,
          portfolio_url: data.portfolio_url,
          skills: data.skills,
        };
        const isNewProfile = !profile.full_name && !profile.name;
        if (isNewProfile) {
          await completeSeekerProfile(profilePayload, accessToken);
          toast.success("Profile created successfully.");
        } else {
          await updateSeekerProfile(profilePayload, accessToken);
          toast.success("Profile updated successfully.");
        }
      } else {
        showSubmitError("This section is not connected to the API.");
        return;
      }
      closeModal();
    } catch (error) {
      showSubmitError(error.message);
    }
  };

  const handleDeleteProfile = async () => {
    if (!accessToken) {
      showSubmitError("Session expired. Please login again.");
      return;
    }
    try {
      await deleteSeekerProfile(accessToken);
      setIsDeleteProfileOpen(false);
      setSubmitError("");
      toast.success("Profile deleted successfully.");
    } catch (error) {
      showSubmitError(error.message);
    }
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "clean"],
    ],
  };

  return (
    <>
      <Breadcrumb pageName="My Profile" />

      {isLoading && (
        <div className="mb-4 rounded-lg border border-n-200 bg-white px-4 py-3 text-sm text-n-500 shadow-sm">
          Loading seeker profile...
        </div>
      )}

      {/* Profile header card */}
      <div className="overflow-hidden rounded-xl border border-n-200 bg-white shadow-sm">
        {/* Cover */}
        <div className="relative h-32 md:h-48">
          {profile.cover ? (
            <img src={profile.cover} alt="cover" className="h-full w-full object-cover object-center" />
          ) : (
            <div className="h-full w-full bg-gradient-to-r from-sk-bg via-white to-co-surface" />
          )}
          <div className="absolute bottom-3 right-4">
            <button
              onClick={() => openModal("profile")}
              className="flex items-center gap-2 rounded-lg bg-white/90 px-4 py-1.5 text-sm font-medium text-n-700 shadow-sm backdrop-blur-sm transition hover:bg-white hover:shadow-md"
            >
              <FiCamera size={15} /> Change Cover
            </button>
          </div>
        </div>

        {/* Avatar + info */}
        <div className="px-6 pb-6 text-center">
          <div className="relative z-10 mx-auto -mt-12 h-24 w-24 rounded-full ring-4 ring-white shadow-md">
            {profile.avatar ? (
              <img src={profile.avatar} alt="profile" className="h-full w-full rounded-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-sk-surface text-2xl font-bold text-sk-primary">
                {initials || "U"}
              </div>
            )}
          </div>

          <div className="mt-4">
            <h3 className="text-2xl font-bold text-n-900">{displayName}</h3>
            <p className="mt-1 text-sm font-medium text-n-500">{displayRole}</p>

            <div className="mx-auto mt-3 max-w-lg">
              <p className="text-sm leading-6 text-n-500">
                {profile.bio || "Add your profile bio to help recruiters understand your goals."}
              </p>
            </div>

            {/* Social links */}
            <div className="mt-5 flex items-center justify-center gap-3">
              {[
                { href: profile.github_url, icon: <FiGithub size={19} /> },
                { href: profile.linkedin_url, icon: <FiLinkedin size={19} /> },
                { href: profile.portfolio_url, icon: <FiGlobe size={19} /> },
              ].map(({ href, icon }, i) => (
                <a
                  key={i}
                  href={href || undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-full p-2 transition ${
                    href ? "text-n-500 hover:bg-sk-surface hover:text-sk-primary" : "pointer-events-none text-n-300"
                  }`}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Profile Details */}
        <div className="rounded-xl border border-n-200 bg-white shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between border-b border-n-100 px-6 py-4">
            <h3 className="flex items-center gap-2 font-semibold text-n-900">
              <FiUser size={18} className="text-sk-primary" /> Profile Details
            </h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => openModal("profile")}
                className="flex items-center gap-1.5 text-sm font-medium text-n-500 transition hover:text-sk-primary hover:underline"
              >
                <FiEdit3 size={15} /> Edit
              </button>
              <button
                onClick={() => setIsDeleteProfileOpen(true)}
                disabled={isSaving}
                className="flex items-center gap-1.5 text-sm font-medium text-n-500 transition hover:text-error hover:underline disabled:cursor-not-allowed disabled:opacity-70"
              >
                <FiTrash2 size={15} /> Delete
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
              {[
                { label: "Full Name", value: profile.full_name || profile.name },
                {
                  label: "Location",
                  value: profile.location_city
                    ? (profile.location_state ? `${profile.location_city}, ${profile.location_state}` : profile.location_city)
                    : null,
                  icon: profile.location_city ? <FiMapPin size={13} className="text-sk-primary shrink-0" /> : null,
                },
                { label: "Stream", value: profile.stream },
                { label: "Degree", value: profile.degree },
                { label: "Graduation Year", value: profile.graduation_year },
                { label: "College", value: profile.college_name_manual },
                { label: "Target Role", value: profile.target_role || profile.position },
                { label: "Skills", value: profile.skills },
              ].map(({ label, value, icon }) => (
                <div key={label}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-n-400">{label}</p>
                  <p className={`mt-1 flex items-center gap-1 text-sm text-n-700 ${!value ? "italic text-n-400" : ""}`}>
                    {icon}{value || "Not added"}
                  </p>
                </div>
              ))}
              <div className="md:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-n-400">Bio</p>
                <p className={`mt-1 text-sm text-n-700 ${!profile.bio ? "italic text-n-400" : ""}`}>
                  {profile.bio || "Not added"}
                </p>
              </div>
              {[
                { label: "Cover Photo URL", value: profile.cover_photo_url },
                { label: "LinkedIn URL", value: profile.linkedin_url },
                { label: "GitHub URL", value: profile.github_url },
                { label: "Portfolio URL", value: profile.portfolio_url },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-n-400">{label}</p>
                  <p className={`mt-1 break-all text-sm text-n-700 ${!value ? "italic text-n-400" : ""}`}>
                    {value || "Not added"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className="rounded-xl border border-n-200 bg-white shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between border-b border-n-100 px-6 py-4">
            <h3 className="flex items-center gap-2 font-semibold text-n-900">
              <FiBriefcase size={18} className="text-sk-primary" /> Projects
            </h3>
            <button
              onClick={() => openModal("project")}
              className="flex items-center gap-1.5 text-sm font-medium text-n-500 transition hover:text-sk-primary hover:underline"
            >
              <FiPlus size={15} /> Add Project
            </button>
          </div>
          <div className="p-6">
            {projects.length === 0 ? (
              <p className="text-sm italic text-n-400">No projects added yet.</p>
            ) : (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="rounded-xl border border-n-200 bg-white p-5 transition hover:border-sk-primary hover:shadow-md"
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <h4 className="font-bold text-n-900">{proj.title}</h4>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => openModal("project", proj)}
                          className="rounded-lg p-1.5 text-n-400 transition hover:bg-sk-surface hover:text-sk-primary"
                        >
                          <FiEdit3 size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete("projects", proj.id)}
                          className="rounded-lg p-1.5 text-n-400 transition hover:bg-error-bg hover:text-error"
                        >
                          <FiTrash2 size={15} />
                        </button>
                      </div>
                    </div>
                    <p className="mb-3 text-xs text-n-400">{proj.duration}</p>
                    <div
                      className="mb-4 text-sm text-n-500 rich-text-content"
                      dangerouslySetInnerHTML={{ __html: proj.description }}
                    />
                    <a
                      href={proj.link?.startsWith("http") ? proj.link : `https://${proj.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm font-medium text-sk-primary transition hover:text-sk-pressed hover:underline"
                    >
                      <FiExternalLink size={13} /> View Project
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Experience */}
        <div className="rounded-xl border border-n-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-n-100 px-6 py-4">
            <h3 className="flex items-center gap-2 font-semibold text-n-900">
              <FiBriefcase size={18} className="text-sk-primary" /> Experience
            </h3>
            <button
              onClick={() => openModal("experience")}
              className="flex items-center gap-1.5 text-sm font-medium text-n-500 transition hover:text-sk-primary hover:underline"
            >
              <FiPlus size={15} /> Add
            </button>
          </div>
          <div className="p-6">
            {experiences.length === 0 ? (
              <p className="text-sm italic text-n-400">No experience added yet.</p>
            ) : (
              <div className="border-l-2 border-n-200 pl-5 space-y-5">
                {experiences.map((exp) => (
                  <div key={exp.id} className="relative">
                    <span className="absolute -left-[26px] top-1 w-3 h-3 rounded-full bg-sk-primary shrink-0" />
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-n-900">{exp.role}</h4>
                        <p className="text-xs text-n-500 mt-0.5">{exp.company} · {exp.period}</p>
                      </div>
                      <div className="flex gap-1.5 shrink-0 ml-3">
                        <button
                          onClick={() => openModal("experience", exp)}
                          className="rounded-lg p-1.5 text-n-400 transition hover:bg-sk-surface hover:text-sk-primary"
                        >
                          <FiEdit3 size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete("experience", exp.id)}
                          className="rounded-lg p-1.5 text-n-400 transition hover:bg-error-bg hover:text-error"
                        >
                          <FiTrash2 size={15} />
                        </button>
                      </div>
                    </div>
                    <div
                      className="mt-2 text-sm text-n-500 rich-text-content"
                      dangerouslySetInnerHTML={{ __html: exp.description }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Education */}
        <div className="rounded-xl border border-n-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-n-100 px-6 py-4">
            <h3 className="flex items-center gap-2 font-semibold text-n-900">
              <FiAward size={18} className="text-sk-primary" /> Education
            </h3>
            <button
              onClick={() => openModal("education")}
              className="flex items-center gap-1.5 text-sm font-medium text-n-500 transition hover:text-sk-primary hover:underline"
            >
              <FiPlus size={15} /> Add
            </button>
          </div>
          <div className="p-6">
            {educations.length === 0 ? (
              <p className="text-sm italic text-n-400">No education added yet.</p>
            ) : (
              <div className="grid grid-cols-1 gap-5">
                {educations.map((edu) => (
                  <div
                    key={edu.id}
                    className="rounded-xl border border-n-200 bg-white p-5 transition hover:border-sk-primary hover:shadow-md"
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-n-900">{edu.degree}</h4>
                        <p className="text-xs text-n-400 mt-0.5">{edu.institution} · {edu.period}</p>
                      </div>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => openModal("education", edu)}
                          className="rounded-lg p-1.5 text-n-400 transition hover:bg-sk-surface hover:text-sk-primary"
                        >
                          <FiEdit3 size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete("education", edu.id)}
                          className="rounded-lg p-1.5 text-n-400 transition hover:bg-error-bg hover:text-error"
                        >
                          <FiTrash2 size={15} />
                        </button>
                      </div>
                    </div>
                    {edu.description && (
                      <div
                        className="mt-2 line-clamp-3 text-sm text-n-500 rich-text-content"
                        dangerouslySetInnerHTML={{ __html: edu.description }}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={`${editItem ? "Edit" : "Add"} ${modalType}`}
        size={modalType === "profile" ? "lg" : "md"}
      >
        <form onSubmit={handleSave} className="space-y-4">
          {modalType === "profile" && (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={LABEL_CLASS}>Full Name</label>
                  <input name="full_name" defaultValue={profile.full_name || profile.name} required className={INPUT_CLASS} />
                </div>
                <div>
                  <label className={LABEL_CLASS}>Location</label>
                  <div className="relative" ref={locationDropdownRef}>
                    <input
                      type="text"
                      value={locationSearch}
                      onChange={handleLocationSearch}
                      onFocus={() => locationSearch && setShowLocationDropdown(true)}
                      placeholder="Search city or state..."
                      autoComplete="off"
                      className={INPUT_CLASS}
                    />
                    {locationLoading && (
                      <span className="absolute right-3 top-2.5 text-xs text-n-400">Searching...</span>
                    )}
                    {showLocationDropdown && locationResults.length > 0 && (
                      <div className="absolute z-50 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-n-200 bg-white shadow-lg">
                        {locationResults.map((loc) => (
                          <button
                            key={loc.id}
                            type="button"
                            onMouseDown={() => handleSelectLocation(loc)}
                            className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-n-700 hover:bg-sk-surface hover:text-sk-primary"
                          >
                            <FiMapPin size={13} className="shrink-0 text-sk-primary" />
                            <span>{loc.city}{loc.state ? `, ${loc.state}` : ""}</span>
                          </button>
                        ))}
                      </div>
                    )}
                    {selectedLocationId && (
                      <p className="mt-1 text-xs text-success">✓ Location selected</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={LABEL_CLASS}>Stream <span className="text-error">*</span></label>
                  {streams.length > 0 ? (
                    <select name="stream" defaultValue={profile.stream} required className={INPUT_CLASS}>
                      <option value="">Select stream</option>
                      {streams.map((s) => (<option key={s} value={s}>{s}</option>))}
                    </select>
                  ) : (
                    <input name="stream" defaultValue={profile.stream} required placeholder="e.g. Engineering & Technology" className={INPUT_CLASS} />
                  )}
                </div>
                <div>
                  <label className={LABEL_CLASS}>Degree <span className="text-error">*</span></label>
                  <input name="degree" defaultValue={profile.degree} required placeholder="e.g. B.Tech Computer Science" className={INPUT_CLASS} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={LABEL_CLASS}>Graduation Year <span className="text-error">*</span></label>
                  <input type="number" name="graduation_year" defaultValue={profile.graduation_year} required min="1990" max="2035" placeholder="2025" className={INPUT_CLASS} />
                </div>
                <div>
                  <label className={LABEL_CLASS}>College Name</label>
                  <input name="college_name_manual" defaultValue={profile.college_name_manual} placeholder="e.g. MIT Pune" className={INPUT_CLASS} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={LABEL_CLASS}>Target Role</label>
                  <input name="target_role" defaultValue={profile.target_role || profile.position} className={INPUT_CLASS} />
                </div>
                <div>
                  <label className={LABEL_CLASS}>Cover Photo URL</label>
                  <input name="cover_photo_url" defaultValue={profile.cover_photo_url || profile.cover} placeholder="https://example.com/cover.jpg" className={INPUT_CLASS} />
                </div>
              </div>

              <div>
                <label className={LABEL_CLASS}>Bio</label>
                <textarea name="bio" defaultValue={profile.bio} rows="4" className={`${INPUT_CLASS} resize-none`} />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={LABEL_CLASS}>LinkedIn URL</label>
                  <input name="linkedin_url" defaultValue={profile.linkedin_url} placeholder="https://linkedin.com/in/..." className={INPUT_CLASS} />
                </div>
                <div>
                  <label className={LABEL_CLASS}>GitHub URL</label>
                  <input name="github_url" defaultValue={profile.github_url} placeholder="https://github.com/..." className={INPUT_CLASS} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={LABEL_CLASS}>Portfolio URL</label>
                  <input name="portfolio_url" defaultValue={profile.portfolio_url} placeholder="https://yourportfolio.com" className={INPUT_CLASS} />
                </div>
                <div>
                  <label className={LABEL_CLASS}>Skills</label>
                  <input name="skills" defaultValue={profile.skills} placeholder="React, Node.js, PostgreSQL" className={INPUT_CLASS} />
                </div>
              </div>
            </>
          )}

          {(modalType === "project" || modalType === "experience" || modalType === "education") && (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={LABEL_CLASS}>{modalType === "education" ? "Degree" : "Title"}</label>
                  <input
                    name={modalType === "education" ? "degree" : "title"}
                    defaultValue={editItem?.[modalType === "education" ? "degree" : "title"] || editItem?.role}
                    required
                    className={INPUT_CLASS}
                  />
                </div>
                <div>
                  <label className={LABEL_CLASS}>
                    {modalType === "project" ? "Duration" : modalType === "experience" ? "Company" : "Institution"}
                  </label>
                  <input
                    name={modalType === "project" ? "duration" : modalType === "experience" ? "company_name" : "institution_name"}
                    defaultValue={
                      editItem?.[modalType === "project" ? "duration" : modalType === "experience" ? "company_name" : "institution_name"] ||
                      editItem?.company || editItem?.institution
                    }
                    required
                    className={INPUT_CLASS}
                  />
                </div>
              </div>

              {modalType === "experience" && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={LABEL_CLASS}>Start Date</label>
                    <input type="date" name="start_date" defaultValue={editItem?.start_date} required className={INPUT_CLASS} />
                  </div>
                  <div>
                    <label className={LABEL_CLASS}>End Date</label>
                    <input type="date" name="end_date" defaultValue={editItem?.end_date} className={INPUT_CLASS} />
                  </div>
                </div>
              )}

              {modalType === "experience" && (
                <label className="flex items-center gap-2 text-sm font-medium text-n-700 cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_current"
                    defaultChecked={Boolean(editItem?.is_current)}
                    className="h-4 w-4 accent-sk-primary"
                  />
                  Currently working here
                </label>
              )}

              {modalType === "education" && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className={LABEL_CLASS}>Start Year</label>
                    <input type="number" name="start_year" defaultValue={editItem?.start_year} min="1950" max="2100" className={INPUT_CLASS} />
                  </div>
                  <div>
                    <label className={LABEL_CLASS}>End Year</label>
                    <input type="number" name="end_year" defaultValue={editItem?.end_year} min="1950" max="2100" className={INPUT_CLASS} />
                  </div>
                  <div>
                    <label className={LABEL_CLASS}>Grade</label>
                    <input name="grade" defaultValue={editItem?.grade} placeholder="8.5 CGPA" className={INPUT_CLASS} />
                  </div>
                </div>
              )}

              {modalType === "project" && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={LABEL_CLASS}>Project URL</label>
                    <input name="project_url" defaultValue={editItem?.project_url || editItem?.link} placeholder="https://github.com/..." className={INPUT_CLASS} />
                  </div>
                  <div>
                    <label className={LABEL_CLASS}>Tech Stack</label>
                    <input name="tech_stack" defaultValue={editItem?.tech_stack || editItem?.techStack} placeholder="React, Node.js" className={INPUT_CLASS} />
                  </div>
                </div>
              )}

              <div>
                <label className={LABEL_CLASS}>Description</label>
                <div className="overflow-hidden rounded-lg border border-n-200 transition focus-within:border-sk-primary focus-within:ring-2 focus-within:ring-sk-primary/10">
                  <ReactQuill
                    theme="snow"
                    value={description}
                    onChange={setDescription}
                    modules={quillModules}
                    className="[&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-n-100 [&_.ql-toolbar]:bg-n-50 [&_.ql-container]:text-sm [&_.ql-stroke]:stroke-[#6B7280] [&_.ql-fill]:fill-[#6B7280] [&_.ql-picker-label]:text-[#6B7280] [&_.ql-active_.ql-stroke]:stroke-[#FF6B35] [&_.ql-active_.ql-fill]:fill-[#FF6B35] [&_.ql-active]:text-[#FF6B35] [&_.ql-toolbar_button:hover_.ql-stroke]:stroke-[#FF6B35] [&_.ql-toolbar_button:hover_.ql-fill]:fill-[#FF6B35]"
                  />
                </div>
              </div>
            </>
          )}

          <div className="flex flex-col-reverse gap-3 border-t border-n-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="w-full rounded-lg border border-n-200 bg-white px-6 py-2 text-sm font-medium text-n-700 transition hover:bg-n-50 sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="w-full rounded-lg bg-sk-primary px-6 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-sk-hover disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Profile Modal */}
      <Modal
        isOpen={isDeleteProfileOpen}
        onClose={() => !isSaving && setIsDeleteProfileOpen(false)}
        title="Delete Profile"
      >
        <div className="space-y-5">
          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-error-bg text-error">
              <FiAlertTriangle size={20} />
            </div>
            <div>
              <h4 className="text-base font-semibold text-n-900">Delete your seeker profile?</h4>
              <p className="mt-2 text-sm leading-6 text-n-500">
                Your profile details will be deleted, but your account will remain active.
                You can complete your profile again later.
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-n-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setIsDeleteProfileOpen(false)}
              disabled={isSaving}
              className="w-full rounded-lg border border-n-200 bg-white px-6 py-2 text-sm font-medium text-n-700 transition hover:bg-n-50 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDeleteProfile}
              disabled={isSaving}
              className="w-full rounded-lg bg-error px-6 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {isSaving ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </Modal>

      <style>{`
        .ql-container {
          min-height: 150px;
          font-size: 14px;
          border: none !important;
        }
        .rich-text-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .rich-text-content ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .rich-text-content p {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </>
  );
};

export default Profile;
