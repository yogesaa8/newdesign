import { useEffect, useRef, useState } from "react";
import toast from "@/lib/toast";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../../store";
import { useCompanyStore } from "../../store/companyStore";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "https://nodebackend-smx3.onrender.com/api/v1"
).replace(/\/$/, "");

const jobTypeOptions = [
  ["full_time", "Full time"],
  ["part_time", "Part time"],
  ["internship", "Internship"],
  ["contract", "Contract"],
  ["freelance", "Freelance"],
  ["temporary", "Temporary"],
];

const workModeOptions = [
  ["remote", "Remote"],
  ["onsite", "Onsite"],
  ["hybrid", "Hybrid"],
];

const salaryTypeOptions = [
  ["monthly", "Monthly"],
  ["yearly", "Yearly"],
  ["hourly", "Hourly"],
  ["stipend", "Stipend"],
];

const questionTypeOptions = [
  ["text", "Text"],
  ["number", "Number"],
  ["yes_no", "Yes / No"],
  ["single_choice", "Single choice"],
  ["multiple_choice", "Multiple choice"],
  ["file_upload", "File upload"],
  ["url", "URL"],
];

const choiceQuestionTypes = ["single_choice", "multiple_choice"];

const getLocationList = (payload) => {
  const data = payload?.data ?? payload?.result ?? payload;
  return data?.locations ?? data?.items ?? (Array.isArray(data) ? data : []);
};

const getLocationLabel = (location = {}) =>
  [location.city, location.state].filter(Boolean).join(", ") ||
  location.name ||
  location.location_name ||
  "";

const emptyJobForm = {
  job_title: "",
  job_type: "internship",
  work_mode: "remote",
  location_id: "",
  job_location: "",
  city: "",
  state: "",
  country: "India",
  min_salary: "",
  max_salary: "",
  salary_currency: "INR",
  salary_type: "monthly",
  experience_min: "",
  experience_max: "",
  education_required: "",
  short_description: "",
  full_description: "",
  responsibilities: "",
  requirements: "",
  benefits: "",
  openings: 1,
  application_deadline: "",
  is_featured: false,
  is_urgent: false,
};

const emptyQuestion = {
  question_text: "",
  question_type: "text",
  is_required: false,
  optionsText: "",
};

const numberOrEmpty = (value) => (value === "" ? "" : Number(value));

const toJobPayload = (formData, isPublished) => ({
  ...formData,
  min_salary: numberOrEmpty(formData.min_salary),
  max_salary: numberOrEmpty(formData.max_salary),
  experience_min: numberOrEmpty(formData.experience_min),
  experience_max: numberOrEmpty(formData.experience_max),
  openings: numberOrEmpty(formData.openings),
  is_published: isPublished,
});

const toQuestionPayload = (question, index) => {
  const payload = {
    question_text: question.question_text,
    question_type: question.question_type,
    is_required: question.is_required,
    order_number: index + 1,
  };

  if (choiceQuestionTypes.includes(question.question_type)) {
    payload.options = question.optionsText
      .split("\n")
      .map((option) => option.trim())
      .filter(Boolean)
      .map((option_text, optionIndex) => ({
        option_text,
        order_number: optionIndex + 1,
      }));
  }

  return payload;
};

const CreateJobListing = () => {
  const navigate = useNavigate();
  const locationRef = useRef(null);
  const accessToken = useAuthStore((state) => state.accessToken);
  const { createCompanyJob, createJobQuestion, isSaving, clearError } =
    useCompanyStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(emptyJobForm);
  const [questions, setQuestions] = useState([]);
  const [questionDraft, setQuestionDraft] = useState(emptyQuestion);
  const [locationSearch, setLocationSearch] = useState("");
  const [locationResults, setLocationResults] = useState([]);
  const [isSearchingLocations, setIsSearchingLocations] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [, setFormError] = useState("");

  const showFormError = (message) => {
    setFormError(message);
    toast.error(message);
  };

  useEffect(() => {
    if (locationSearch.trim().length < 2 || formData.location_id) {
      return undefined;
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
  }, [locationSearch, formData.location_id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setShowLocationDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;
    clearError();
    setFormError("");
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleQuestionChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFormError("");
    setQuestionDraft((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLocationSearchChange = (event) => {
    const { value } = event.target;
    clearError();
    setFormError("");
    setLocationSearch(value);
    setShowLocationDropdown(value.trim().length >= 2);
    setFormData((prev) => ({
      ...prev,
      location_id: "",
      job_location: value,
      city: "",
      state: "",
    }));

    if (value.trim().length < 2) {
      setLocationResults([]);
    }
  };

  const handleLocationSelect = (location) => {
    const label = getLocationLabel(location);
    setLocationSearch(label);
    setLocationResults([]);
    setShowLocationDropdown(false);
    setFormData((prev) => ({
      ...prev,
      location_id: location.id,
      job_location: label,
      city: location.city || prev.city,
      state: location.state || prev.state,
      country: location.country || prev.country,
    }));
  };

  const validateJob = () => {
    const requiredFields = [
      ["job_title", "Job title is required."],
      ["job_type", "Job type is required."],
      ["work_mode", "Work mode is required."],
      ["location_id", "Please select a location from the dropdown."],
      ["full_description", "Full description is required."],
      ["application_deadline", "Application deadline is required."],
    ];

    const missing = requiredFields.find(([field]) => !String(formData[field] || "").trim());
    if (missing) {
      showFormError(missing[1]);
      return false;
    }

    if (
      formData.min_salary !== "" &&
      formData.max_salary !== "" &&
      Number(formData.min_salary) > Number(formData.max_salary)
    ) {
      showFormError("Minimum salary cannot be greater than maximum salary.");
      return false;
    }

    if (
      formData.experience_min !== "" &&
      formData.experience_max !== "" &&
      Number(formData.experience_min) > Number(formData.experience_max)
    ) {
      showFormError("Minimum experience cannot be greater than maximum experience.");
      return false;
    }

    return true;
  };

  const handleAddQuestion = () => {
    const text = questionDraft.question_text.trim();
    if (!text) {
      showFormError("Question text is required.");
      return;
    }

    if (choiceQuestionTypes.includes(questionDraft.question_type)) {
      const options = questionDraft.optionsText
        .split("\n")
        .map((option) => option.trim())
        .filter(Boolean);

      if (options.length < 2) {
        showFormError("Single and multiple choice questions need at least 2 options.");
        return;
      }
    }

    setQuestions((prev) => [...prev, { ...questionDraft, id: Date.now() }]);
    setQuestionDraft(emptyQuestion);
  };

  const handleRemoveQuestion = (questionId) => {
    setQuestions((prev) => prev.filter((question) => question.id !== questionId));
  };

  const handleSubmit = async (isPublished) => {
    if (!accessToken) {
      showFormError("Session expired. Please sign in again.");
      return;
    }

    if (!validateJob()) {
      setCurrentStep(1);
      return;
    }

    clearError();
    setFormError("");

    try {
      const payload = await createCompanyJob(toJobPayload(formData, isPublished), accessToken);
      const job = payload?.data?.job;

      if (job?.id) {
        for (const [index, question] of questions.entries()) {
          await createJobQuestion(job.id, toQuestionPayload(question, index), accessToken);
        }
      }

      navigate("/company/jobs");
      toast.success(isPublished ? "Job published successfully." : "Job draft saved successfully.");
    } catch (submitError) {
      if (submitError.code === "COMPANY_NOT_APPROVED") {
        showFormError(
          "Your company profile is pending admin approval. Save this as a draft until publishing is enabled.",
        );
        return;
      }

      showFormError(submitError.message);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 md:px-8 md:py-8">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8500FA]">
            New job
          </p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#111114] md:text-3xl">
            Post a job
          </h1>
        </div>
        <div className="flex rounded-[8px] border border-[#E7DDD6] bg-white p-1">
          {[1, 2].map((step) => (
            <button
              key={step}
              onClick={() => setCurrentStep(step)}
              className={`rounded-[8px] px-3 py-2 text-sm font-bold transition-colors ${
                currentStep === step
                  ? "bg-[#111114] text-white"
                  : "text-[#4F4D55] hover:bg-[#F7F5F2]"
              }`}
              type="button"
            >
              {step === 1 ? "Role" : "Screening"}
            </button>
          ))}
        </div>
      </div>

      <section className="rounded-[8px] border border-[#E7DDD6] bg-white p-5 md:p-6">
        {currentStep === 1 ? (
          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Job title">
                <input
                  name="job_title"
                  value={formData.job_title}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="React Developer Intern"
                  type="text"
                />
              </Field>
              <div ref={locationRef} className="relative">
                <Field label="City / location">
                  <input
                    value={locationSearch}
                    onChange={handleLocationSearchChange}
                    onFocus={() =>
                      locationSearch.trim().length >= 2 && setShowLocationDropdown(true)
                    }
                    className={inputClass}
                    placeholder="Search city"
                    type="text"
                  />
                </Field>
                {isSearchingLocations && (
                  <span className="absolute right-3 top-10 text-xs font-semibold text-[#77737D]">
                    Searching
                  </span>
                )}
                {showLocationDropdown && locationResults.length > 0 && (
                  <ul className="absolute z-20 mt-1 max-h-48 w-full overflow-y-auto rounded-[8px] border border-[#E7DDD6] bg-white shadow-[0_18px_45px_rgba(17,17,20,0.08)]">
                    {locationResults.map((location) => (
                      <li
                        key={location.id}
                        onMouseDown={() => handleLocationSelect(location)}
                        className="cursor-pointer px-4 py-2 text-sm font-semibold text-[#4F4D55] hover:bg-[#F7F5F2]"
                      >
                        {getLocationLabel(location)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <Field label="Job type">
                <select
                  name="job_type"
                  value={formData.job_type}
                  onChange={handleInputChange}
                  className={inputClass}
                >
                  {jobTypeOptions.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Work mode">
                <select
                  name="work_mode"
                  value={formData.work_mode}
                  onChange={handleInputChange}
                  className={inputClass}
                >
                  {workModeOptions.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Readable location">
                <input
                  name="job_location"
                  value={formData.job_location}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Pune, Maharashtra, India"
                  type="text"
                />
              </Field>
              <Field label="Application deadline">
                <input
                  name="application_deadline"
                  value={formData.application_deadline}
                  onChange={handleInputChange}
                  className={inputClass}
                  type="date"
                />
              </Field>
              <Field label="City">
                <input name="city" value={formData.city} onChange={handleInputChange} className={inputClass} />
              </Field>
              <Field label="State">
                <input name="state" value={formData.state} onChange={handleInputChange} className={inputClass} />
              </Field>
              <Field label="Country">
                <input
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className={inputClass}
                />
              </Field>
              <Field label="Openings">
                <input
                  name="openings"
                  value={formData.openings}
                  onChange={handleInputChange}
                  className={inputClass}
                  min="1"
                  type="number"
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <Field label="Salary from">
                <input
                  name="min_salary"
                  value={formData.min_salary}
                  onChange={handleInputChange}
                  className={inputClass}
                  type="number"
                />
              </Field>
              <Field label="Salary to">
                <input
                  name="max_salary"
                  value={formData.max_salary}
                  onChange={handleInputChange}
                  className={inputClass}
                  type="number"
                />
              </Field>
              <Field label="Currency">
                <input
                  name="salary_currency"
                  value={formData.salary_currency}
                  onChange={handleInputChange}
                  className={inputClass}
                />
              </Field>
              <Field label="Salary type">
                <select
                  name="salary_type"
                  value={formData.salary_type}
                  onChange={handleInputChange}
                  className={inputClass}
                >
                  {salaryTypeOptions.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Field label="Experience min">
                <input
                  name="experience_min"
                  value={formData.experience_min}
                  onChange={handleInputChange}
                  className={inputClass}
                  type="number"
                />
              </Field>
              <Field label="Experience max">
                <input
                  name="experience_max"
                  value={formData.experience_max}
                  onChange={handleInputChange}
                  className={inputClass}
                  type="number"
                />
              </Field>
              <Field label="Education">
                <input
                  name="education_required"
                  value={formData.education_required}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Any graduate"
                />
              </Field>
            </div>

            <Field label="Short description">
              <input
                name="short_description"
                value={formData.short_description}
                onChange={handleInputChange}
                className={inputClass}
                placeholder="Frontend internship for freshers with React basics."
              />
            </Field>

            <Field label="Full description">
              <textarea
                name="full_description"
                value={formData.full_description}
                onChange={handleInputChange}
                className={`${inputClass} min-h-32 resize-y leading-6`}
                placeholder="Describe the role, team, expectations, and process."
              />
            </Field>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Field label="Responsibilities">
                <textarea
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleInputChange}
                  className={`${inputClass} min-h-28 resize-y leading-6`}
                />
              </Field>
              <Field label="Requirements">
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  className={`${inputClass} min-h-28 resize-y leading-6`}
                />
              </Field>
              <Field label="Benefits">
                <textarea
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleInputChange}
                  className={`${inputClass} min-h-28 resize-y leading-6`}
                />
              </Field>
            </div>

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm font-semibold text-[#4F4D55]">
                <input
                  name="is_urgent"
                  checked={formData.is_urgent}
                  onChange={handleInputChange}
                  className="h-4 w-4 accent-[#8500FA]"
                  type="checkbox"
                />
                Urgent
              </label>
              <label className="flex items-center gap-2 text-sm font-semibold text-[#4F4D55]">
                <input
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleInputChange}
                  className="h-4 w-4 accent-[#8500FA]"
                  type="checkbox"
                />
                Featured
              </label>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_180px_140px]">
              <Field label="Question">
                <input
                  name="question_text"
                  value={questionDraft.question_text}
                  onChange={handleQuestionChange}
                  className={inputClass}
                  placeholder="Why are you interested in this role?"
                />
              </Field>
              <Field label="Type">
                <select
                  name="question_type"
                  value={questionDraft.question_type}
                  onChange={handleQuestionChange}
                  className={inputClass}
                >
                  {questionTypeOptions.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </Field>
              <label className="flex items-end gap-2 pb-3 text-sm font-semibold text-[#4F4D55]">
                <input
                  name="is_required"
                  checked={questionDraft.is_required}
                  onChange={handleQuestionChange}
                  className="h-4 w-4 accent-[#8500FA]"
                  type="checkbox"
                />
                Required
              </label>
            </div>

            {choiceQuestionTypes.includes(questionDraft.question_type) && (
              <Field label="Options, one per line">
                <textarea
                  name="optionsText"
                  value={questionDraft.optionsText}
                  onChange={handleQuestionChange}
                  className={`${inputClass} min-h-28 resize-y leading-6`}
                  placeholder={"Diploma\nGraduate\nPost Graduate"}
                />
              </Field>
            )}

            <button
              onClick={handleAddQuestion}
              className="rounded-[8px] bg-[#111114] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#2B2B31]"
              type="button"
            >
              Add question
            </button>

            <div className="space-y-2">
              {questions.length === 0 ? (
                <div className="rounded-[8px] border border-dashed border-[#D9CDC5] bg-[#FDFBF9] p-5 text-sm font-semibold text-[#77737D]">
                  Screening questions are optional.
                </div>
              ) : (
                questions.map((question, index) => (
                  <div
                    key={question.id}
                    className="flex items-start justify-between gap-3 rounded-[8px] border border-[#E7DDD6] bg-[#FDFBF9] p-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#111114]">
                        {index + 1}. {question.question_text}
                      </p>
                      <p className="mt-1 text-xs font-semibold text-[#77737D]">
                        {questionTypeOptions.find(([value]) => value === question.question_type)?.[1]}
                        {question.is_required ? " - Required" : ""}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveQuestion(question.id)}
                      className="material-symbols-outlined text-[18px] text-[#8A8690] hover:text-red-600"
                      type="button"
                      aria-label="Remove question"
                    >
                      delete
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-col-reverse justify-between gap-3 border-t border-[#EFE7E1] pt-5 sm:flex-row sm:items-center">
          <button
            onClick={() => handleSubmit(false)}
            disabled={isSaving}
            className="rounded-[8px] border border-[#E7DDD6] bg-white px-4 py-2.5 text-sm font-bold text-[#4F4D55] transition-colors hover:bg-[#F7F5F2] disabled:opacity-60"
            type="button"
          >
            {isSaving ? "Saving..." : "Save draft"}
          </button>
          <div className="flex gap-2">
            {currentStep === 2 && (
              <button
                onClick={() => setCurrentStep(1)}
                className="rounded-[8px] border border-[#E7DDD6] bg-white px-4 py-2.5 text-sm font-bold text-[#4F4D55] transition-colors hover:bg-[#F7F5F2]"
                type="button"
              >
                Back
              </button>
            )}
            {currentStep === 1 ? (
              <button
                onClick={() => {
                  if (validateJob()) setCurrentStep(2);
                }}
                className="rounded-[8px] bg-[#FF6B35] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#E85F2F]"
                type="button"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={() => handleSubmit(true)}
                disabled={isSaving}
                className="rounded-[8px] bg-[#FF6B35] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#E85F2F] disabled:opacity-60"
                type="button"
              >
                {isSaving ? "Publishing..." : "Publish job"}
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

const inputClass =
  "w-full rounded-[8px] border border-[#E7DDD6] bg-[#FDFBF9] px-4 py-3 text-sm font-semibold text-[#111114] outline-none transition focus:border-[#8500FA] focus:bg-white";

const Field = ({ label, children }) => (
  <label className="block">
    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-[#77737D]">
      {label}
    </span>
    {children}
  </label>
);

export default CreateJobListing;
