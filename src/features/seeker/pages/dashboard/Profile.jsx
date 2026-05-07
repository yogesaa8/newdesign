import React, { useState, useEffect, useRef } from "react";
import "react-quill-new/dist/quill.snow.css";
import {
  FiCamera,
  FiGithub,
  FiLinkedin,
  FiGlobe,
  FiTarget,
  FiUser,
  FiBriefcase,
  FiHeart,
  FiPlus,
  FiEdit3,
  FiTrash2,
  FiExternalLink,
  FiAward,
} from "react-icons/fi";
import Breadcrumb from "../../../../components/ui/Breadcrumb";
import Modal from "../../../../components/ui/Modal";
import { profileData } from "../../data/mockData";
import ReactQuill from "react-quill-new";

const Profile = () => {
  const [profile, setProfile] = useState(profileData);

  const [modalType, setModalType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [description, setDescription] = useState("");

  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);

  useEffect(() => {
    if (editItem) {
      setDescription(editItem.description || "");
    } else {
      setDescription("");
    }
  }, [editItem]);

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditItem(null);
    setModalType(null);
    setDescription("");
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfile((prev) => ({
        ...prev,
        [type]: url,
      }));
    }
  };

  const handleDelete = (section, id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      setProfile((prev) => ({
        ...prev,
        [section]: prev[section].filter((item) => item.id !== id),
      }));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const finalData = { ...data, description };

    if (modalType === "project") {
      if (editItem) {
        setProfile((prev) => ({
          ...prev,
          projects: prev.projects.map((p) =>
            p.id === editItem.id ? { ...p, ...finalData } : p,
          ),
        }));
      } else {
        setProfile((prev) => ({
          ...prev,
          projects: [...prev.projects, { id: Date.now(), ...finalData }],
        }));
      }
    } else if (modalType === "experience") {
      if (editItem) {
        setProfile((prev) => ({
          ...prev,
          experience: prev.experience.map((exp) =>
            exp.id === editItem.id ? { ...exp, ...finalData } : exp,
          ),
        }));
      } else {
        setProfile((prev) => ({
          ...prev,
          experience: [...prev.experience, { id: Date.now(), ...finalData }],
        }));
      }
    } else if (modalType === "education") {
      if (editItem) {
        setProfile((prev) => ({
          ...prev,
          education: prev.education.map((edu) =>
            edu.id === editItem.id ? { ...edu, ...finalData } : edu,
          ),
        }));
      } else {
        setProfile((prev) => ({
          ...prev,
          education: [...prev.education, { id: Date.now(), ...finalData }],
        }));
      }
    } else if (modalType === "personal") {
      setProfile((prev) => ({
        ...prev,
        personalDetails: { ...prev.personalDetails, ...data },
      }));
    } else if (modalType === "career") {
      setProfile((prev) => ({
        ...prev,
        careerProfile: { ...prev.careerProfile, ...data },
      }));
    } else if (modalType === "diversity") {
      setProfile((prev) => ({
        ...prev,
        diversityInclusion: { ...prev.diversityInclusion, ...data },
      }));
    }

    closeModal();
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

      <div className="overflow-hidden rounded border border-slate-200 bg-white shadow-sm">
        <div className="relative z-20 h-35 md:h-65">
          <img
            src={
              profile.cover ||
              "https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&auto=format&fit=crop&w=1440&q=80"
            }
            alt="cover"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute bottom-4 right-4">
            <button
              onClick={() => coverInputRef.current.click()}
              className="flex items-center gap-2 rounded-lg bg-white/90 py-1.5 px-4 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:shadow-md"
            >
              <FiCamera size={16} /> Change Cover
            </button>
            <input
              type="file"
              ref={coverInputRef}
              onChange={(e) => handleImageUpload(e, "cover")}
              className="hidden"
              accept="image/*"
            />
          </div>
        </div>

        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full p-1 sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              <img
                src={profile.avatar}
                alt="profile"
                className="h-full w-full rounded-full object-cover"
              />
              <button
                onClick={() => avatarInputRef.current.click()}
                className="absolute bottom-0 right-0 flex h-8.5 w-8.5 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm transition-all hover:bg-orange-50 hover:text-orange-600 sm:bottom-2 sm:right-2"
              >
                <FiCamera size={18} />
              </button>
              <input
                type="file"
                ref={avatarInputRef}
                onChange={(e) => handleImageUpload(e, "avatar")}
                className="hidden"
                accept="image/*"
              />
            </div>
          </div>

          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-slate-800">
              {profile.name}
            </h3>
            <p className="font-medium text-slate-600">{profile.position}</p>

            <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-3 rounded border border-slate-200 bg-white py-2.5 shadow-sm">
              <div className="flex flex-col items-center justify-center gap-1 border-r border-slate-200 px-4 xsm:flex-row">
                <span className="font-semibold text-slate-800">5+</span>
                <span className="text-sm text-slate-500">Exp</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-slate-200 px-4 xsm:flex-row">
                <span className="font-semibold text-slate-800">
                  {profile.applications?.length || 42}
                </span>
                <span className="text-sm text-slate-500">Apps</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                <span className="font-semibold text-slate-800">
                  {profile.completion}%
                </span>
                <span className="text-sm text-slate-500">Done</span>
              </div>
            </div>

            <div className="mx-auto max-w-180">
              <h4 className="font-semibold text-slate-800">About Me</h4>
              <p className="mt-4.5 text-slate-600">{profile.bio}</p>
            </div>

            <div className="mt-6.5 flex items-center justify-center gap-3.5">
              <button className="rounded-full p-2 text-slate-500 transition-all hover:bg-orange-50 hover:text-orange-600">
                <FiGithub size={20} />
              </button>
              <button className="rounded-full p-2 text-slate-500 transition-all hover:bg-orange-50 hover:text-orange-600">
                <FiLinkedin size={20} />
              </button>
              <button className="rounded-full p-2 text-slate-500 transition-all hover:bg-orange-50 hover:text-orange-600">
                <FiGlobe size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Career Profile */}
        <div className="rounded border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-7 py-4">
            <h3 className="flex items-center gap-2 font-medium text-slate-800">
              <FiTarget size={20} className="text-orange-600" /> Career Profile
            </h3>
            <button
              onClick={() => openModal("career")}
              className="flex items-center gap-1 text-sm font-medium text-slate-500 transition-all hover:text-orange-600 hover:underline"
            >
              <FiEdit3 size={16} /> Edit
            </button>
          </div>
          <div className="p-7">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Objective
                </label>
                <p className="mt-1 text-slate-700">
                  {profile.careerProfile.objective}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Target Role
                  </label>
                  <p className="mt-1 text-slate-700">
                    {profile.careerProfile.targetRole}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Salary
                  </label>
                  <p className="mt-1 text-slate-700">
                    {profile.careerProfile.desiredSalary}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Details */}
        <div className="rounded border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-7 py-4">
            <h3 className="flex items-center gap-2 font-medium text-slate-800">
              <FiUser size={20} className="text-orange-600" /> Personal Details
            </h3>
            <button
              onClick={() => openModal("personal")}
              className="flex items-center gap-1 text-sm font-medium text-slate-500 transition-all hover:text-orange-600 hover:underline"
            >
              <FiEdit3 size={16} /> Edit
            </button>
          </div>
          <div className="p-7">
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  DOB
                </label>
                <p className="mt-1 text-slate-700">
                  {profile.personalDetails.dob}
                </p>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Gender
                </label>
                <p className="mt-1 text-slate-700">
                  {profile.personalDetails.gender}
                </p>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Nationality
                </label>
                <p className="mt-1 text-slate-700">
                  {profile.personalDetails.nationality}
                </p>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Status
                </label>
                <p className="mt-1 text-slate-700">
                  {profile.personalDetails.maritalStatus}
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
              {profile.projects.map((proj) => (
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
                    href={`https://${proj.link}`}
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

        {/* Diversity & Inclusion */}
        <div className="rounded border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-7 py-4">
            <h3 className="flex items-center gap-2 font-medium text-slate-800">
              <FiHeart size={20} className="text-orange-600" /> Diversity &
              Inclusion
            </h3>
            <button
              onClick={() => openModal("diversity")}
              className="flex items-center gap-1 text-sm font-medium text-slate-500 transition-all hover:text-orange-600 hover:underline"
            >
              <FiEdit3 size={16} /> Edit
            </button>
          </div>
          <div className="p-7">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">
                  Ethnicity
                </span>
                <span className="text-sm text-slate-500">
                  {profile.diversityInclusion?.ethnicity || "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">
                  Pronouns
                </span>
                <span className="text-sm text-slate-500">
                  {profile.diversityInclusion?.pronouns || "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">
                  Disability Status
                </span>
                <span className="text-sm text-slate-500">
                  {profile.diversityInclusion?.disability || "N/A"}
                </span>
              </div>
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
              {profile.experience.map((exp) => (
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
              {profile.education.map((edu) => (
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
          {(modalType === "project" ||
            modalType === "experience" ||
            modalType === "education") && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    {modalType === "project"
                      ? "Title"
                      : modalType === "experience"
                        ? "Role"
                        : "Degree"}
                  </label>
                  <input
                    name={
                      modalType === "project"
                        ? "title"
                        : modalType === "experience"
                          ? "role"
                          : "degree"
                    }
                    defaultValue={
                      editItem?.[
                        modalType === "project"
                          ? "title"
                          : modalType === "experience"
                            ? "role"
                            : "degree"
                      ]
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
                          ? "company"
                          : "institution"
                    }
                    defaultValue={
                      editItem?.[
                        modalType === "project"
                          ? "duration"
                          : modalType === "experience"
                            ? "company"
                            : "institution"
                      ]
                    }
                    required
                    className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                  />
                </div>
              </div>

              {(modalType === "experience" || modalType === "education") && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Period
                    </label>
                    <input
                      name="period"
                      defaultValue={editItem?.period}
                      placeholder="e.g. 2021 - Present"
                      className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Location
                    </label>
                    <input
                      name="location"
                      defaultValue={editItem?.location}
                      className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                    />
                  </div>
                </div>
              )}

              {modalType === "project" && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Link
                  </label>
                  <input
                    name="link"
                    defaultValue={editItem?.link}
                    placeholder="github.com/..."
                    className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                  />
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

          {modalType === "career" && (
            <>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Objective
                </label>
                <textarea
                  name="objective"
                  defaultValue={profile.careerProfile.objective}
                  rows="4"
                  className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Target Role
                  </label>
                  <input
                    name="targetRole"
                    defaultValue={profile.careerProfile.targetRole}
                    className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Salary
                  </label>
                  <input
                    name="desiredSalary"
                    defaultValue={profile.careerProfile.desiredSalary}
                    className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                  />
                </div>
              </div>
            </>
          )}

          {modalType === "personal" && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  DOB
                </label>
                <input
                  type="date"
                  name="dob"
                  defaultValue={profile.personalDetails.dob}
                  className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Gender
                </label>
                <select
                  name="gender"
                  defaultValue={profile.personalDetails.gender}
                  className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Nationality
                </label>
                <input
                  name="nationality"
                  defaultValue={profile.personalDetails.nationality}
                  className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Marital Status
                </label>
                <select
                  name="maritalStatus"
                  defaultValue={profile.personalDetails.maritalStatus}
                  className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                >
                  <option>Single</option>
                  <option>Married</option>
                </select>
              </div>
            </div>
          )}

          {modalType === "diversity" && (
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Ethnicity
                </label>
                <input
                  name="ethnicity"
                  defaultValue={profile.diversityInclusion?.ethnicity}
                  className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Pronouns
                </label>
                <input
                  name="pronouns"
                  defaultValue={profile.diversityInclusion?.pronouns}
                  className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Disability Status
                </label>
                <input
                  name="disability"
                  defaultValue={profile.diversityInclusion?.disability}
                  className="w-full rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                />
              </div>
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
              className="rounded bg-orange-600 px-6 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-orange-700"
            >
              Save
            </button>
          </div>
        </form>
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
