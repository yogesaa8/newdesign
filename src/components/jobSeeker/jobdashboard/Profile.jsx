import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Breadcrumb from "../components/ui/Breadcrumb";
import Modal from "../components/ui/Modal";
import { profileData } from "../data/mockData";
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
  FiFileText,
  FiDownload,
  FiUpload,
} from "react-icons/fi";

const Profile = () => {
  const [profile, setProfile] = useState(profileData);

  // Modal states
  const [modalType, setModalType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [description, setDescription] = useState("");

  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);

  // Update description state when editItem changes
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

      <div className="overflow-hidden rounded-2xl border border-stroke bg-white shadow-sm dark:border-strokedark dark:bg-boxdark">
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
              className="flex items-center gap-2 rounded bg-primary py-1.5 px-4 text-sm font-medium text-white hover:bg-opacity-90"
            >
              <FiCamera /> Change Cover
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
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white p-1 sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              <img
                src={profile.avatar}
                alt="profile"
                className="rounded-full h-full w-full object-cover"
              />
              <button
                onClick={() => avatarInputRef.current.click()}
                className="absolute bottom-0 right-0 flex h-8.5 w-8.5 items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
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
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              {profile.name}
            </h3>
            <p className="font-medium">{profile.position}</p>

            <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-secondary">
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  5+
                </span>
                <span className="text-sm text-body">Exp</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {profile.applications?.length || 42}
                </span>
                <span className="text-sm text-body">Apps</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {profile.completion}%
                </span>
                <span className="text-sm text-body">Done</span>
              </div>
            </div>

            <div className="mx-auto max-w-180">
              <h4 className="font-semibold text-black dark:text-white">
                About Me
              </h4>
              <p className="mt-4.5">{profile.bio}</p>
            </div>

            <div className="mt-6.5 flex items-center justify-center gap-3.5">
              <button className="hover:text-primary">
                <FiGithub size={20} />
              </button>
              <button className="hover:text-primary">
                <FiLinkedin size={20} />
              </button>
              <button className="hover:text-primary">
                <FiGlobe size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Career Profile */}
        <div className="rounded-2xl border border-stroke bg-white shadow-sm dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark flex justify-between items-center">
            <h3 className="font-medium text-black dark:text-white flex items-center gap-2">
              <FiTarget size={20} className="text-primary" /> Career Profile
            </h3>
            <button
              onClick={() => openModal("career")}
              className="text-primary flex items-center gap-1 text-sm font-medium hover:underline"
            >
              <FiEdit3 size={16} /> Edit
            </button>
          </div>
          <div className="p-7">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-bodydark2 uppercase tracking-wider">
                  Objective
                </label>
                <p className="text-body mt-1">
                  {profile.careerProfile.objective}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-bodydark2 uppercase tracking-wider">
                    Target Role
                  </label>
                  <p className="text-body mt-1">
                    {profile.careerProfile.targetRole}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-bodydark2 uppercase tracking-wider">
                    Salary
                  </label>
                  <p className="text-body mt-1">
                    {profile.careerProfile.desiredSalary}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Details */}
        <div className="rounded-2xl border border-stroke bg-white shadow-sm dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark flex justify-between items-center">
            <h3 className="font-medium text-black dark:text-white flex items-center gap-2">
              <FiUser size={20} className="text-primary" /> Personal Details
            </h3>
            <button
              onClick={() => openModal("personal")}
              className="text-primary flex items-center gap-1 text-sm font-medium hover:underline"
            >
              <FiEdit3 size={16} /> Edit
            </button>
          </div>
          <div className="p-7">
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              <div>
                <label className="text-xs font-semibold text-bodydark2 uppercase tracking-wider">
                  DOB
                </label>
                <p className="text-body mt-1">{profile.personalDetails.dob}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-bodydark2 uppercase tracking-wider">
                  Gender
                </label>
                <p className="text-body mt-1">
                  {profile.personalDetails.gender}
                </p>
              </div>
              <div>
                <label className="text-xs font-semibold text-bodydark2 uppercase tracking-wider">
                  Nationality
                </label>
                <p className="text-body mt-1">
                  {profile.personalDetails.nationality}
                </p>
              </div>
              <div>
                <label className="text-xs font-semibold text-bodydark2 uppercase tracking-wider">
                  Status
                </label>
                <p className="text-body mt-1">
                  {profile.personalDetails.maritalStatus}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className="col-span-1 lg:col-span-2 rounded-2xl border border-stroke bg-white shadow-sm dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark flex justify-between items-center">
            <h3 className="font-medium text-black dark:text-white flex items-center gap-2">
              <FiBriefcase size={20} className="text-primary" /> Projects
            </h3>
            <button
              onClick={() => openModal("project")}
              className="text-primary flex items-center gap-1 text-sm font-medium hover:underline"
            >
              <FiPlus size={16} /> Add Project
            </button>
          </div>
          <div className="p-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-5 rounded-2xl border border-stroke dark:border-strokedark bg-bg-soft dark:bg-primary/5"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-black dark:text-white">
                      {proj.title}
                    </h4>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal("project", proj)}
                        className="text-body hover:text-primary"
                      >
                        <FiEdit3 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete("projects", proj.id)}
                        className="text-body hover:text-danger"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-primary mb-3">{proj.duration}</p>
                  <div
                    className="text-sm text-body mb-4 rich-text-content"
                    dangerouslySetInnerHTML={{ __html: proj.description }}
                  ></div>
                  <a
                    href={`https://${proj.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary flex items-center gap-1 hover:underline"
                  >
                    <FiExternalLink size={14} /> View Project
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Diversity & Inclusion Section */}
        <div className="rounded-2xl border border-stroke bg-white shadow-sm dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark flex justify-between items-center">
            <h3 className="font-medium text-black dark:text-white flex items-center gap-2">
              <FiHeart size={20} className="text-primary" /> Diversity &
              Inclusion
            </h3>
            <button
              onClick={() => openModal("diversity")}
              className="text-primary flex items-center gap-1 text-sm font-medium hover:underline"
            >
              <FiEdit3 size={16} /> Edit
            </button>
          </div>
          <div className="p-7">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Ethnicity</span>
                <span className="text-sm text-body">
                  {profile.diversityInclusion?.ethnicity || "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Pronouns</span>
                <span className="text-sm text-body">
                  {profile.diversityInclusion?.pronouns || "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Disability Status</span>
                <span className="text-sm text-body">
                  {profile.diversityInclusion?.disability || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="rounded-2xl border border-stroke bg-white shadow-sm dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark flex justify-between items-center">
            <h3 className="font-medium text-black dark:text-white flex items-center gap-2">
              <FiBriefcase size={20} className="text-primary" /> Experience
            </h3>
            <button
              onClick={() => openModal("experience")}
              className="text-primary flex items-center gap-1 text-sm font-medium hover:underline"
            >
              <FiPlus size={16} /> Add
            </button>
          </div>
          <div className="p-7">
            <div className="flex flex-col gap-6">
              {profile.experience.map((exp) => (
                <div
                  key={exp.id}
                  className="border-b border-stroke pb-4 last:border-0 last:pb-0 dark:border-strokedark"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-black dark:text-white">
                        {exp.role}
                      </h4>
                      <p className="text-xs text-primary">
                        {exp.company} • {exp.period}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal("experience", exp)}
                        className="text-body hover:text-primary"
                      >
                        <FiEdit3 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete("experience", exp.id)}
                        className="text-body hover:text-danger"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div
                    className="mt-2 text-sm text-body rich-text-content"
                    dangerouslySetInnerHTML={{ __html: exp.description }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="col-span-1 lg:col-span-2 rounded-2xl border border-stroke bg-white shadow-sm dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark flex justify-between items-center">
            <h3 className="font-medium text-black dark:text-white flex items-center gap-2">
              <FiAward size={20} className="text-primary" /> Education
            </h3>
            <button
              onClick={() => openModal("education")}
              className="text-primary flex items-center gap-1 text-sm font-medium hover:underline"
            >
              <FiPlus size={16} /> Add
            </button>
          </div>
          <div className="p-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.education.map((edu) => (
                <div
                  key={edu.id}
                  className="p-5 rounded-2xl border border-stroke dark:border-strokedark bg-bg-soft/50 dark:bg-primary/5"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-black dark:text-white">
                        {edu.degree}
                      </h4>
                      <p className="text-xs text-primary">
                        {edu.institution} • {edu.period}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal("education", edu)}
                        className="text-body hover:text-primary"
                      >
                        <FiEdit3 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete("education", edu.id)}
                        className="text-body hover:text-danger"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                  {edu.description && (
                    <div
                      className="mt-2 text-sm text-body rich-text-content line-clamp-3"
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
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
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
                    className="w-full rounded border border-stroke bg-gray py-2 px-4 focus:border-primary outline-none dark:border-strokedark dark:bg-meta-4"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
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
                    className="w-full rounded border border-stroke bg-gray py-2 px-4 focus:border-primary outline-none dark:border-strokedark dark:bg-meta-4"
                  />
                </div>
              </div>

              {(modalType === "experience" || modalType === "education") && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                      Period
                    </label>
                    <input
                      name="period"
                      defaultValue={editItem?.period}
                      placeholder="e.g. 2021 - Present"
                      className="w-full rounded border border-stroke bg-gray py-2 px-4 focus:border-primary outline-none dark:border-strokedark dark:bg-meta-4"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                      Location
                    </label>
                    <input
                      name="location"
                      defaultValue={editItem?.location}
                      className="w-full rounded border border-stroke bg-gray py-2 px-4 focus:border-primary outline-none dark:border-strokedark dark:bg-meta-4"
                    />
                  </div>
                </div>
              )}

              {modalType === "project" && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Link
                  </label>
                  <input
                    name="link"
                    defaultValue={editItem?.link}
                    placeholder="github.com/..."
                    className="w-full rounded border border-stroke bg-gray py-2 px-4 focus:border-primary outline-none dark:border-strokedark dark:bg-meta-4"
                  />
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                  Description
                </label>
                <div className="bg-white dark:bg-meta-4">
                  <ReactQuill
                    theme="snow"
                    value={description}
                    onChange={setDescription}
                    modules={quillModules}
                    className="text-black dark:text-white"
                  />
                </div>
              </div>
            </>
          )}

          {modalType === "career" && (
            <>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Objective
                </label>
                <textarea
                  name="objective"
                  defaultValue={profile.careerProfile.objective}
                  rows="4"
                  className="w-full rounded border border-stroke bg-gray py-2 px-4 focus:border-primary outline-none dark:border-strokedark dark:bg-meta-4"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Target Role
                  </label>
                  <input
                    name="targetRole"
                    defaultValue={profile.careerProfile.targetRole}
                    className="w-full rounded border border-stroke bg-gray py-2 px-4 focus:border-primary outline-none dark:border-strokedark dark:bg-meta-4"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Salary
                  </label>
                  <input
                    name="desiredSalary"
                    defaultValue={profile.careerProfile.desiredSalary}
                    className="w-full rounded border border-stroke bg-gray py-2 px-4 focus:border-primary outline-none dark:border-strokedark dark:bg-meta-4"
                  />
                </div>
              </div>
            </>
          )}

          {modalType === "personal" && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium">DOB</label>
                <input
                  type="date"
                  name="dob"
                  defaultValue={profile.personalDetails.dob}
                  className="w-full rounded border border-stroke bg-gray py-2 px-4 focus:border-primary outline-none dark:border-strokedark dark:bg-meta-4"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Gender</label>
                <select
                  name="gender"
                  defaultValue={profile.personalDetails.gender}
                  className="w-full rounded border border-stroke bg-gray py-2 px-4 focus:border-primary outline-none dark:border-strokedark dark:bg-meta-4"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Nationality
                </label>
                <input
                  name="nationality"
                  defaultValue={profile.personalDetails.nationality}
                  className="w-full rounded border border-stroke bg-gray py-2 px-4 focus:border-primary outline-none dark:border-strokedark dark:bg-meta-4"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Marital Status
                </label>
                <select
                  name="maritalStatus"
                  defaultValue={profile.personalDetails.maritalStatus}
                  className="w-full rounded border border-stroke bg-gray py-2 px-4 focus:border-primary outline-none dark:border-strokedark dark:bg-meta-4"
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
                <label className="mb-2 block text-sm font-medium">
                  Ethnicity
                </label>
                <input
                  name="ethnicity"
                  defaultValue={profile.diversityInclusion?.ethnicity}
                  className="w-full rounded border border-stroke bg-gray py-2 px-4 focus:border-primary outline-none dark:border-strokedark dark:bg-meta-4"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Pronouns
                </label>
                <input
                  name="pronouns"
                  defaultValue={profile.diversityInclusion?.pronouns}
                  className="w-full rounded border border-stroke bg-gray py-2 px-4 focus:border-primary outline-none dark:border-strokedark dark:bg-meta-4"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Disability Status
                </label>
                <input
                  name="disability"
                  defaultValue={profile.diversityInclusion?.disability}
                  className="w-full rounded border border-stroke bg-gray py-2 px-4 focus:border-primary outline-none dark:border-strokedark dark:bg-meta-4"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-stroke dark:border-strokedark">
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-2 rounded border border-stroke font-medium hover:shadow-1 dark:border-strokedark"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded bg-primary font-medium text-white hover:bg-opacity-90"
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
        }
        .dark .ql-toolbar {
          background-color: #FFF1EB;
          border-color: #F4D8CC;
        }
        .dark .ql-container {
          border-color: #F4D8CC;
          background-color: #FFF1EB;
        }
        .dark .ql-stroke {
          stroke: #5E4A42;
        }
        .dark .ql-fill {
          fill: #5E4A42;
        }
        .dark .ql-picker {
          color: #5E4A42;
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
