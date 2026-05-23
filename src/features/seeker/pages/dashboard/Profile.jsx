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
import toast from "react-hot-toast";
import { useAuthStore } from "../../../../store/authStore";
import { useSeekerProfileStore } from "../../store/seekerProfileStore";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");

const Profile = () => {
  const [modalType, setModalType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [description, setDescription] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isDeleteProfileOpen, setIsDeleteProfileOpen] = useState(false);

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
  }, [
    accessToken,
    fetchSeekerProfile,
    fetchExperiences,
    fetchProjects,
    fetchEducations,
  ]);

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
      setSubmitError("Session expired. Please login again.");
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
      setSubmitError(error.message);
      toast.error(error.message);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!accessToken) {
      setSubmitError("Session expired. Please login again.");
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
          setSubmitError("Please select a location from the dropdown.");
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
        setSubmitError("This section is not connected to the API.");
        return;
      }

      closeModal();
    } catch (error) {
      setSubmitError(error.message);
      toast.error(error.message);
    }
  };

  const handleDeleteProfile = async () => {
    if (!accessToken) {
      setSubmitError("Session expired. Please login again.");
      return;
    }

    try {
      await deleteSeekerProfile(accessToken);
      setIsDeleteProfileOpen(false);
      setSubmitError("");
      toast.success("Profile deleted successfully.");
    } catch (error) {
      setSubmitError(error.message);
      toast.error(error.message);
    }
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "clean"],
    ],
  };

  return (
    <>
      <Breadcrumb pageName="My Profile" />

      {(isLoading || error) && (
        <div className="mb-4 rounded border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
          {isLoading ? "Loading seeker profile..." : error}
        </div>
      )}

      {submitError && !isModalOpen && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
          {submitError}
        </div>
      )}

      <div className="overflow-hidden rounded border border-slate-200 bg-white shadow-sm">
        <div className="relative z-20 h-35 md:h-65">
          {profile.cover ? (
            <img
              src={profile.cover}
              alt="cover"
              className="h-full w-full object-cover object-center"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-r from-slate-100 via-orange-50 to-slate-100" />
          )}
          <div className="absolute bottom-4 right-4">
            <button
              onClick={() => openModal("profile")}
              className="flex items-center gap-2 rounded-lg bg-white/90 py-1.5 px-4 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:shadow-md"
            >
              <FiCamera size={16} /> Change Cover
            </button>
          </div>
        </div>

        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full p-1 sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt="profile"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-orange-100 text-3xl font-bold text-orange-700 sm:text-5xl">
                  {initials || "U"}
                </div>
              )}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-slate-800">
              {displayName}
            </h3>
            <p className="font-medium text-slate-600">{displayRole}</p>

            <div className="mx-auto max-w-180">
              <h4 className="font-semibold text-slate-800">About Me</h4>
              <p className="mt-4.5 text-slate-600">
                {profile.bio || "Add your profile bio to help recruiters understand your goals."}
              </p>
            </div>

            <div className="mt-6.5 flex items-center justify-center gap-3.5">
              <a
                href={profile.github_url || undefined}
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-full p-2 transition-all ${
                  profile.github_url
                    ? "text-slate-500 hover:bg-orange-50 hover:text-orange-600"
                    : "pointer-events-none text-slate-300"
                }`}
              >
                <FiGithub size={20} />
              </a>
              <a
                href={profile.linkedin_url || undefined}
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-full p-2 transition-all ${
                  profile.linkedin_url
                    ? "text-slate-500 hover:bg-orange-50 hover:text-orange-600"
                    : "pointer-events-none text-slate-300"
                }`}
              >
                <FiLinkedin size={20} />
              </a>
              <a
                href={profile.portfolio_url || undefined}
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-full p-2 transition-all ${
                  profile.portfolio_url
                    ? "text-slate-500 hover:bg-orange-50 hover:text-orange-600"
                    : "pointer-events-none text-slate-300"
                }`}
              >
                <FiGlobe size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* API Profile */}
        <div className="rounded border border-slate-200 bg-white shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-200 px-7 py-4">
            <h3 className="flex items-center gap-2 font-medium text-slate-800">
              <FiUser size={20} className="text-orange-600" /> Profile Details
            </h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => openModal("profile")}
                className="flex items-center gap-1 text-sm font-medium text-slate-500 transition-all hover:text-orange-600 hover:underline"
              >
                <FiEdit3 size={16} /> Edit
              </button>
              <button
                onClick={() => setIsDeleteProfileOpen(true)}
                disabled={isSaving}
                className="flex items-center gap-1 text-sm font-medium text-slate-500 transition-all hover:text-red-600 hover:underline disabled:cursor-not-allowed disabled:opacity-70"
              >
                <FiTrash2 size={16} /> Delete
              </button>
            </div>
          </div>
          <div className="p-7">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Full Name
                </label>
                <p className="mt-1 text-slate-700">
                  {profile.full_name || profile.name || "Not added"}
                </p>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Location
                </label>
                <p className="mt-1 flex items-center gap-1 text-slate-700">
                  {profile.location_city ? (
                    <>
                      <FiMapPin size={14} className="text-orange-500" />
                      {profile.location_state
                        ? `${profile.location_city}, ${profile.location_state}`
                        : profile.location_city}
                    </>
                  ) : (
                    "Not added"
                  )}
                </p>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Stream
                </label>
                <p className="mt-1 text-slate-700">
                  {profile.stream || "Not added"}
                </p>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Degree
                </label>
                <p className="mt-1 text-slate-700">
                  {profile.degree || "Not added"}
                </p>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Graduation Year
                </label>
                <p className="mt-1 text-slate-700">
                  {profile.graduation_year || "Not added"}
                </p>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  College
                </label>
                <p className="mt-1 text-slate-700">
                  {profile.college_name_manual || "Not added"}
                </p>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Target Role
                </label>
                <p className="mt-1 text-slate-700">
                  {profile.target_role || profile.position || "Not added"}
                </p>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Skills
                </label>
                <p className="mt-1 text-slate-700">
                  {profile.skills || "Not added"}
                </p>
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Bio
                </label>
                <p className="mt-1 text-slate-700">
                  {profile.bio || "Not added"}
                </p>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Cover Photo URL
                </label>
                <p className="mt-1 break-all text-slate-700">
                  {profile.cover_photo_url || "Not added"}
                </p>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  LinkedIn URL
                </label>
                <p className="mt-1 break-all text-slate-700">
                  {profile.linkedin_url || "Not added"}
                </p>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  GitHub URL
                </label>
                <p className="mt-1 break-all text-slate-700">
                  {profile.github_url || "Not added"}
                </p>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Portfolio URL
                </label>
                <p className="mt-1 break-all text-slate-700">
                  {profile.portfolio_url || "Not added"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className="col-span-1 rounded border border-slate-200 bg-white shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-200 px-7 py-4">
            <h3 className="flex items-center gap-2 font-medium text-slate-800">
              <FiBriefcase size={20} className="text-orange-600" /> Projects
            </h3>
            <button
              onClick={() => openModal("project")}
              className="flex items-center gap-1 text-sm font-medium text-slate-500 transition-all hover:text-orange-600 hover:underline"
            >
              <FiPlus size={16} /> Add Project
            </button>
          </div>
          <div className="p-7">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="rounded border border-slate-200 bg-white p-5 transition-all hover:border-orange-300 hover:shadow-md"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <h4 className="font-bold text-slate-800">{proj.title}</h4>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal("project", proj)}
                        className="rounded-md p-1 text-slate-400 transition-all hover:bg-orange-50 hover:text-orange-600"
                      >
                        <FiEdit3 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete("projects", proj.id)}
                        className="rounded-md p-1 text-slate-400 transition-all hover:bg-red-50 hover:text-red-500"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="mb-3 text-xs text-slate-500">{proj.duration}</p>
                  <div
                    className="mb-4 text-sm text-slate-600 rich-text-content"
                    dangerouslySetInnerHTML={{ __html: proj.description }}
                  ></div>
                  <a
                    href={
                      proj.link?.startsWith("http")
                        ? proj.link
                        : `https://${proj.link}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm font-medium text-orange-600 transition-all hover:text-orange-700 hover:underline"
                  >
                    <FiExternalLink size={14} /> View Project
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="rounded border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-7 py-4">
            <h3 className="flex items-center gap-2 font-medium text-slate-800">
              <FiBriefcase size={20} className="text-orange-600" /> Experience
            </h3>
            <button
              onClick={() => openModal("experience")}
              className="flex items-center gap-1 text-sm font-medium text-slate-500 transition-all hover:text-orange-600 hover:underline"
            >
              <FiPlus size={16} /> Add
            </button>
          </div>
          <div className="p-7">
            <div className="flex flex-col gap-6">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="border-b border-slate-100 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800">{exp.role}</h4>
                      <p className="text-xs text-slate-500">
                        {exp.company} • {exp.period}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal("experience", exp)}
                        className="rounded-md p-1 text-slate-400 transition-all hover:bg-orange-50 hover:text-orange-600"
                      >
                        <FiEdit3 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete("experience", exp.id)}
                        className="rounded-md p-1 text-slate-400 transition-all hover:bg-red-50 hover:text-red-500"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div
                    className="mt-2 text-sm text-slate-600 rich-text-content"
                    dangerouslySetInnerHTML={{ __html: exp.description }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="col-span-1 rounded border border-slate-200 bg-white shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-200 px-7 py-4">
            <h3 className="flex items-center gap-2 font-medium text-slate-800">
              <FiAward size={20} className="text-orange-600" /> Education
            </h3>
            <button
              onClick={() => openModal("education")}
              className="flex items-center gap-1 text-sm font-medium text-slate-500 transition-all hover:text-orange-600 hover:underline"
            >
              <FiPlus size={16} /> Add
            </button>
          </div>
          <div className="p-7">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {educations.map((edu) => (
                <div
                  key={edu.id}
                  className="rounded border border-slate-200 bg-white p-5 transition-all hover:border-orange-300 hover:shadow-md"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800">{edu.degree}</h4>
                      <p className="text-xs text-slate-500">
                        {edu.institution} • {edu.period}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal("education", edu)}
                        className="rounded-md p-1 text-slate-400 transition-all hover:bg-orange-50 hover:text-orange-600"
                      >
                        <FiEdit3 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete("education", edu.id)}
                        className="rounded-md p-1 text-slate-400 transition-all hover:bg-red-50 hover:text-red-500"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                  {edu.description && (
                    <div
                      className="mt-2 line-clamp-3 text-sm text-slate-600 rich-text-content"
                      dangerouslySetInnerHTML={{ __html: edu.description }}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={`${editItem ? "Edit" : "Add"} ${modalType}`}
      >
        <form onSubmit={handleSave} className="space-y-4">
          {modalType === "profile" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Full Name
                  </label>
                  <input
                    name="full_name"
                    defaultValue={profile.full_name || profile.name}
                    required
                    className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Location
                  </label>
                  <div className="relative" ref={locationDropdownRef}>
                    <input
                      type="text"
                      value={locationSearch}
                      onChange={handleLocationSearch}
                      onFocus={() => locationSearch && setShowLocationDropdown(true)}
                      placeholder="Search city or state..."
                      autoComplete="off"
                      className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                    />
                    {locationLoading && (
                      <span className="absolute right-3 top-2.5 text-xs text-slate-400">
                        Searching...
                      </span>
                    )}
                    {showLocationDropdown && locationResults.length > 0 && (
                      <div className="absolute z-50 mt-1 max-h-48 w-full overflow-y-auto rounded border border-slate-200 bg-white shadow-lg">
                        {locationResults.map((loc) => (
                          <button
                            key={loc.id}
                            type="button"
                            onMouseDown={() => handleSelectLocation(loc)}
                            className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-700"
                          >
                            <FiMapPin size={13} className="shrink-0 text-orange-400" />
                            <span>
                              {loc.city}
                              {loc.state ? `, ${loc.state}` : ""}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                    {selectedLocationId && (
                      <p className="mt-1 text-xs text-green-600">
                        ✓ Location selected
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Stream <span className="text-red-500">*</span>
                  </label>
                  {streams.length > 0 ? (
                    <select
                      name="stream"
                      defaultValue={profile.stream}
                      required
                      className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                    >
                      <option value="">Select stream</option>
                      {streams.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      name="stream"
                      defaultValue={profile.stream}
                      required
                      placeholder="e.g. Engineering & Technology"
                      className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                    />
                  )}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Degree <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="degree"
                    defaultValue={profile.degree}
                    required
                    placeholder="e.g. B.Tech Computer Science"
                    className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Graduation Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="graduation_year"
                    defaultValue={profile.graduation_year}
                    required
                    min="1990"
                    max="2035"
                    placeholder="2025"
                    className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    College Name
                  </label>
                  <input
                    name="college_name_manual"
                    defaultValue={profile.college_name_manual}
                    placeholder="e.g. MIT Pune"
                    className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Target Role
                  </label>
                  <input
                    name="target_role"
                    defaultValue={profile.target_role || profile.position}
                    className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Cover Photo URL
                  </label>
                  <input
                    name="cover_photo_url"
                    defaultValue={profile.cover_photo_url || profile.cover}
                    placeholder="https://example.com/cover.jpg"
                    className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Bio
                </label>
                <textarea
                  name="bio"
                  defaultValue={profile.bio}
                  rows="4"
                  className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    LinkedIn URL
                  </label>
                  <input
                    name="linkedin_url"
                    defaultValue={profile.linkedin_url}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    GitHub URL
                  </label>
                  <input
                    name="github_url"
                    defaultValue={profile.github_url}
                    placeholder="https://github.com/..."
                    className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Portfolio URL
                  </label>
                  <input
                    name="portfolio_url"
                    defaultValue={profile.portfolio_url}
                    placeholder="https://yourportfolio.com"
                    className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Skills
                  </label>
                  <input
                    name="skills"
                    defaultValue={profile.skills}
                    placeholder="React, Node.js, PostgreSQL"
                    className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                  />
                </div>
              </div>
            </>
          )}

          {(modalType === "project" ||
            modalType === "experience" ||
            modalType === "education") && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    {modalType === "education" ? "Degree" : "Title"}
                  </label>
                  <input
                    name={modalType === "education" ? "degree" : "title"}
                    defaultValue={
                      editItem?.[modalType === "education" ? "degree" : "title"] ||
                      editItem?.role
                    }
                    required
                    className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    {modalType === "project"
                      ? "Duration"
                      : modalType === "experience"
                        ? "Company"
                        : "Institution"}
                  </label>
                  <input
                    name={
                      modalType === "project"
                        ? "duration"
                        : modalType === "experience"
                          ? "company_name"
                          : "institution_name"
                    }
                    defaultValue={
                      editItem?.[
                        modalType === "project"
                          ? "duration"
                          : modalType === "experience"
                            ? "company_name"
                            : "institution_name"
                      ] ||
                      editItem?.company ||
                      editItem?.institution
                    }
                    required
                    className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                  />
                </div>
              </div>

              {modalType === "experience" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="start_date"
                      defaultValue={editItem?.start_date}
                      required
                      className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="end_date"
                      defaultValue={editItem?.end_date}
                      className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                    />
                  </div>
                </div>
              )}

              {modalType === "experience" && (
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <input
                    type="checkbox"
                    name="is_current"
                    defaultChecked={Boolean(editItem?.is_current)}
                    className="h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                  />
                  Currently working here
                </label>
              )}

              {modalType === "education" && (
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Start Year
                    </label>
                    <input
                      type="number"
                      name="start_year"
                      defaultValue={editItem?.start_year}
                      min="1950"
                      max="2100"
                      className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      End Year
                    </label>
                    <input
                      type="number"
                      name="end_year"
                      defaultValue={editItem?.end_year}
                      min="1950"
                      max="2100"
                      className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Grade
                    </label>
                    <input
                      name="grade"
                      defaultValue={editItem?.grade}
                      placeholder="8.5 CGPA"
                      className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                    />
                  </div>
                </div>
              )}

              {modalType === "project" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Project URL
                    </label>
                    <input
                      name="project_url"
                      defaultValue={editItem?.project_url || editItem?.link}
                      placeholder="https://github.com/..."
                      className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Tech Stack
                    </label>
                    <input
                      name="tech_stack"
                      defaultValue={editItem?.tech_stack || editItem?.techStack}
                      placeholder="React, Node.js"
                      className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Description
                </label>
                <div className="overflow-hidden rounded border border-slate-300 transition focus-within:border-orange-400 focus-within:ring-1 focus-within:ring-orange-400">
                  <ReactQuill
                    theme="snow"
                    value={description}
                    onChange={setDescription}
                    modules={quillModules}
                    className=" [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-slate-200 [&_.ql-toolbar]:bg-slate-50 [&_.ql-container]:text-sm [&_.ql-stroke]:stroke-slate-500 [&_.ql-fill]:fill-slate-500 [&_.ql-picker-label]:text-slate-500 [&_.ql-active_.ql-stroke]:stroke-orange-600 [&_.ql-active_.ql-fill]:fill-orange-600 [&_.ql-active]:text-orange-600 [&_.ql-toolbar button:hover_.ql-stroke]:stroke-orange-600 [&_.ql-toolbar button:hover_.ql-fill]:fill-orange-600"
                  />
                </div>
              </div>
            </>
          )}

          {submitError && (
            <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {submitError}
            </div>
          )}

          <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="rounded border border-slate-300 bg-white px-6 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="rounded bg-orange-600 px-6 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isDeleteProfileOpen}
        onClose={() => !isSaving && setIsDeleteProfileOpen(false)}
        title="Delete Profile"
      >
        <div className="space-y-5">
          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-red-50 text-red-600">
              <FiAlertTriangle size={22} />
            </div>
            <div>
              <h4 className="text-base font-semibold text-slate-900">
                Delete your seeker profile?
              </h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Your profile details will be deleted, but your account will remain active.
                You can complete your profile again later.
              </p>
            </div>
          </div>

          {submitError && (
            <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {submitError}
            </div>
          )}

          <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={() => setIsDeleteProfileOpen(false)}
              disabled={isSaving}
              className="rounded border border-slate-300 bg-white px-6 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDeleteProfile}
              disabled={isSaving}
              className="rounded bg-red-600 px-6 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
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
