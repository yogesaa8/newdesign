import React, { useState } from "react";

const CreateJobListing = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobType: "Full-time",
    location: "",
    salaryMin: "",
    salaryMax: "",
    description: "",
    skillInput: "",
  });

  const [skills, setSkills] = useState([
    { id: 1, name: "React.js" },
    { id: 2, name: "Tailwind CSS" },
  ]);

  // Requirements State
  const [customQuestions, setCustomQuestions] = useState([]);
  const [questionInput, setQuestionInput] = useState("");
  const [questionSuggestions] = useState([
    "Why should we hire you?",
    "What are your salary expectations?",
    "Are you willing to relocate?",
    "What is your notice period?",
    "Do you have experience working remotely?",
    "Describe a challenging project you handled.",
    "What are your long-term career goals?",
    "Why are you leaving your current job?",
  ]);

  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    if (formData.skillInput.trim()) {
      const newSkill = {
        id: Date.now(),
        name: formData.skillInput.trim(),
      };
      setSkills((prev) => [...prev, newSkill]);
      setFormData((prev) => ({ ...prev, skillInput: "" }));
    }
  };

  const handleRemoveSkill = (skillId) => {
    setSkills((prev) => prev.filter((skill) => skill.id !== skillId));
  };

  // Question Functionalities
  const handleAddQuestion = (questionText) => {
    const text = questionText.trim() || questionInput.trim();
    if (
      text &&
      !customQuestions.some(
        (q) => q.question.toLowerCase() === text.toLowerCase(),
      )
    ) {
      setCustomQuestions((prev) => [
        ...prev,
        { id: Date.now(), question: text },
      ]);
      setQuestionInput("");
      setShowSuggestions(false);
    }
  };

  const handleRemoveQuestion = (id) => {
    setCustomQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSaveDraft = () => {
    const dataToSave = { ...formData, skills, customQuestions };
    console.log("Saving draft:", dataToSave);
    alert("Draft saved successfully!");
  };

  const handlePublish = () => {
    const dataToPublish = { ...formData, skills, customQuestions };
    console.log("Publishing job:", dataToPublish);
    alert("Job Published successfully!");
  };

  return (
    <div className="flex-1">
      <main className="overflow-y-auto p-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-10">
            <h1 className="mb-2 font-headline text-4xl font-extrabold tracking-tight text-slate-800">
              Create New Job Listing
            </h1>
            <p className="text-slate-500">
              Follow the steps to attract the best talent for your enterprise
              team.
            </p>
          </div>

          {/* Multi-Step Indicator */}
          <div className="mb-12 flex items-center gap-4">
            <div
              className="group flex cursor-pointer items-center gap-2"
              onClick={() => setCurrentStep(1)}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full font-bold transition-colors ${
                  currentStep >= 1
                    ? "bg-orange-600 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                1
              </div>
              <span
                className={`font-semibold transition-colors ${
                  currentStep >= 1 ? "text-slate-800" : "text-slate-500"
                }`}
              >
                Job Details
              </span>
            </div>
            <div className="h-px flex-1 bg-slate-200"></div>
            <div
              className="group flex cursor-pointer items-center gap-2"
              onClick={() => setCurrentStep(2)}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full font-bold transition-colors ${
                  currentStep >= 2
                    ? "bg-orange-600 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                2
              </div>
              <span
                className={`font-medium transition-colors ${
                  currentStep >= 2 ? "text-slate-800" : "text-slate-500"
                }`}
              >
                Requirements
              </span>
            </div>
          </div>

          {/* Form Card */}
          <div className="space-y-10 rounded border border-slate-200 bg-white p-8 shadow-sm">
            {/* STEP 1: Job Details */}
            {currentStep === 1 && (
              <>
                <section className="space-y-6">
                  <div>
                    <label
                      className="mb-2 block text-sm font-bold uppercase tracking-wider text-slate-400"
                      htmlFor="jobTitle"
                    >
                      Job Title
                    </label>
                    <input
                      id="jobTitle"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      className="w-full rounded border border-slate-300 bg-slate-50 p-4 text-slate-800 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-1 focus:ring-orange-400"
                      placeholder="e.g. Senior Frontend Architect"
                      type="text"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label
                        className="mb-2 block text-sm font-bold uppercase tracking-wider text-slate-400"
                        htmlFor="jobType"
                      >
                        Job Type
                      </label>
                      <div className="relative">
                        <select
                          id="jobType"
                          name="jobType"
                          value={formData.jobType}
                          onChange={handleInputChange}
                          className="w-full appearance-none rounded border border-slate-300 bg-slate-50 p-4 pr-10 text-slate-800 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-1 focus:ring-orange-400"
                        >
                          <option>Full-time</option>
                          <option>Contract</option>
                          <option>Part-time</option>
                          <option>Freelance</option>
                        </select>
                        <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                          expand_more
                        </span>
                      </div>
                    </div>

                    <div>
                      <label
                        className="mb-2 block text-sm font-bold uppercase tracking-wider text-slate-400"
                        htmlFor="location"
                      >
                        Location
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                          location_on
                        </span>
                        <input
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="w-full rounded border border-slate-300 bg-slate-50 p-4 pl-12 text-slate-800 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-1 focus:ring-orange-400"
                          placeholder="San Francisco, CA (or Remote)"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                <section className="space-y-6">
                  <div>
                    <label className="mb-2 block text-sm font-bold uppercase tracking-wider text-slate-400">
                      Salary Range (Annual)
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="relative flex-1">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                          ${" "}
                        </span>
                        <input
                          name="salaryMin"
                          value={formData.salaryMin}
                          onChange={handleInputChange}
                          className="w-full rounded border border-slate-300 bg-slate-50 p-4 pl-8 text-slate-800 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-1 focus:ring-orange-400"
                          placeholder="80,000"
                          type="number"
                        />
                      </div>
                      <span className="font-medium text-slate-500">to</span>
                      <div className="relative flex-1">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                          ${" "}
                        </span>
                        <input
                          name="salaryMax"
                          value={formData.salaryMax}
                          onChange={handleInputChange}
                          className="w-full rounded border border-slate-300 bg-slate-50 p-4 pl-8 text-slate-800 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-1 focus:ring-orange-400"
                          placeholder="120,000"
                          type="number"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold uppercase tracking-wider text-slate-400">
                      Job Description
                    </label>
                    <div className="overflow-hidden rounded border border-slate-200 bg-white transition focus-within:border-orange-400 focus-within:ring-1 focus-within:ring-orange-400">
                      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 p-2">
                        <button
                          className="rounded p-2 text-slate-500 transition-colors hover:bg-white hover:text-orange-600"
                          type="button"
                        >
                          <span className="material-symbols-outlined">
                            format_bold
                          </span>
                        </button>
                        <button
                          className="rounded p-2 text-slate-500 transition-colors hover:bg-white hover:text-orange-600"
                          type="button"
                        >
                          <span className="material-symbols-outlined">
                            format_italic
                          </span>
                        </button>
                        <button
                          className="rounded p-2 text-slate-500 transition-colors hover:bg-white hover:text-orange-600"
                          type="button"
                        >
                          <span className="material-symbols-outlined">
                            format_list_bulleted
                          </span>
                        </button>
                        <button
                          className="rounded p-2 text-slate-500 transition-colors hover:bg-white hover:text-orange-600"
                          type="button"
                        >
                          <span className="material-symbols-outlined">
                            link
                          </span>
                        </button>
                        <div className="mx-1 h-6 w-px bg-slate-200"></div>
                        <button
                          className="rounded p-2 text-slate-500 transition-colors hover:bg-white hover:text-orange-600"
                          type="button"
                        >
                          <span className="material-symbols-outlined">
                            image
                          </span>
                        </button>
                      </div>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full border-none p-4 text-sm text-slate-700 outline-none focus:ring-0"
                        placeholder="Describe the role, responsibilities, and team culture..."
                        rows="8"
                      />
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-bold uppercase tracking-wider text-slate-400">
                      Required Skills
                    </label>
                    <div className="relative">
                      <input
                        name="skillInput"
                        value={formData.skillInput}
                        onChange={handleInputChange}
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          (e.preventDefault(), handleAddSkill())
                        }
                        className="w-full rounded border border-slate-300 bg-slate-50 p-4 pr-20 text-slate-800 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-1 focus:ring-orange-400"
                        placeholder="Add a skill (e.g. React, Python, Figma)"
                        type="text"
                      />
                      <button
                        onClick={handleAddSkill}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded bg-orange-600 px-4 py-1.5 text-sm font-bold text-white transition-opacity hover:bg-orange-700"
                        type="button"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="flex items-center gap-2 rounded bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700"
                      >
                        {skill.name}
                        <button
                          onClick={() => handleRemoveSkill(skill.id)}
                          className="material-symbols-outlined text-sm text-slate-400 hover:text-slate-600"
                          type="button"
                        >
                          close
                        </button>
                      </span>
                    ))}
                  </div>
                </section>
              </>
            )}

            {/* STEP 2: Requirements & Custom Questions */}
            {currentStep === 2 && (
              <section className="space-y-8">
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <label className="text-sm font-bold uppercase tracking-wider text-slate-400">
                      Custom Application Questions
                    </label>
                    <span className="rounded bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                      {customQuestions.length} Added
                    </span>
                  </div>

                  <p className="mb-6 text-sm text-slate-500">
                    Add specific questions for candidates to answer when
                    applying. You can write your own or use our suggestions.
                  </p>

                  <div className="relative mb-6">
                    <input
                      type="text"
                      value={questionInput}
                      onChange={(e) => setQuestionInput(e.target.value)}
                      onFocus={() => setShowSuggestions(true)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddQuestion(questionInput);
                        }
                      }}
                      className="w-full rounded border border-slate-300 bg-slate-50 p-4 pr-28 text-slate-800 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-1 focus:ring-orange-400"
                      placeholder="Type a custom question..."
                    />
                    <div className="absolute right-3 top-1/2 flex -translate-y-1/2 gap-2">
                      <button
                        onClick={() => setShowSuggestions(!showSuggestions)}
                        className="rounded border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
                        type="button"
                      >
                        Suggest
                      </button>
                      <button
                        onClick={() => handleAddQuestion(questionInput)}
                        className="rounded bg-orange-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-orange-700"
                        type="button"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Suggestions Dropdown */}
                  {showSuggestions && (
                    <div className="mb-8 rounded border border-slate-200 bg-white p-4 shadow-lg">
                      <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                        <span className="material-symbols-outlined text-sm text-orange-500">
                          auto_awesome
                        </span>
                        Suggested Questions
                      </div>
                      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        {questionSuggestions.map((suggestion, index) => {
                          const isAdded = customQuestions.some(
                            (q) =>
                              q.question.toLowerCase() ===
                              suggestion.toLowerCase(),
                          );
                          return (
                            <button
                              key={index}
                              onClick={() =>
                                !isAdded && handleAddQuestion(suggestion)
                              }
                              disabled={isAdded}
                              className={`flex items-center gap-3 rounded border p-3 text-left text-sm transition ${
                                isAdded
                                  ? "cursor-not-allowed border-green-100 bg-green-50 text-green-600"
                                  : "border-slate-100 bg-slate-50 text-slate-700 hover:border-orange-200 hover:bg-orange-50"
                              }`}
                              type="button"
                            >
                              {isAdded ? (
                                <span className="material-symbols-outlined text-base text-green-500">
                                  check_circle
                                </span>
                              ) : (
                                <span className="material-symbols-outlined text-base text-slate-400">
                                  add_circle_outline
                                </span>
                              )}
                              <span className="font-medium">{suggestion}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Added Questions List */}
                  {customQuestions.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-slate-700">
                        Added Questions:
                      </h4>
                      {customQuestions.map((q, index) => (
                        <div
                          key={q.id}
                          className="group flex items-center justify-between rounded border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300"
                        >
                          <div className="flex items-center gap-4">
                            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-50 text-sm font-bold text-orange-600">
                              {index + 1}
                            </span>
                            <p className="text-sm font-medium text-slate-800">
                              {q.question}
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemoveQuestion(q.id)}
                            className="rounded p-2 text-slate-400 opacity-0 transition group-hover:opacity-100 hover:bg-red-50 hover:text-red-500"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-lg">
                              delete
                            </span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {customQuestions.length === 0 && !showSuggestions && (
                    <div className="flex flex-col items-center justify-center rounded border-2 border-dashed border-slate-200 py-12 text-center">
                      <span className="material-symbols-outlined mb-3 text-4xl text-slate-300">
                        quiz
                      </span>
                      <p className="font-semibold text-slate-500">
                        No custom questions added yet
                      </p>
                      <p className="mt-1 text-sm text-slate-400">
                        Click 'Suggest' to see common questions or type your
                        own.
                      </p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Footer Actions */}
            <div className="flex items-center justify-between border-t border-slate-200 pt-10">
              <button
                onClick={handleSaveDraft}
                className="px-6 py-3 font-bold text-slate-500 transition-colors hover:text-slate-800"
                type="button"
              >
                Save as Draft
              </button>
              <div className="flex gap-4">
                {currentStep > 1 && (
                  <button
                    onClick={handleBack}
                    className="rounded border border-slate-300 bg-white px-8 py-3 font-bold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 hover:shadow-md"
                    type="button"
                  >
                    Back
                  </button>
                )}
                {currentStep < 2 ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 rounded bg-orange-600 px-10 py-3 font-bold text-white shadow-lg transition-transform hover:scale-[1.02] hover:bg-orange-700"
                    type="button"
                  >
                    Next Step
                    <span className="material-symbols-outlined">
                      arrow_forward
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={handlePublish}
                    className="flex items-center gap-2 rounded bg-orange-600 px-10 py-3 font-bold text-white shadow-lg transition-transform hover:scale-[1.02] hover:bg-orange-700"
                    type="button"
                  >
                    Publish Job
                    <span className="material-symbols-outlined">send</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Tips / Sidebar Content */}
          {currentStep === 1 && (
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded border border-slate-200 bg-orange-50/50 p-6">
                <div className="mb-3 flex items-center gap-3">
                  <span className="material-symbols-outlined text-orange-600">
                    lightbulb
                  </span>
                  <h3 className="font-bold text-slate-800">Writing Tips</h3>
                </div>
                <p className="text-sm leading-relaxed text-slate-600">
                  Clearly define the first 90 days. Candidates love knowing
                  exactly what success looks like in a new role.
                </p>
              </div>
              <div className="rounded border border-slate-200 bg-slate-50 p-6">
                <div className="mb-3 flex items-center gap-3">
                  <span className="material-symbols-outlined text-orange-600">
                    auto_awesome
                  </span>
                  <h3 className="font-bold text-slate-800">AI Optimizer</h3>
                </div>
                <p className="text-sm leading-relaxed text-slate-600">
                  Your description has a high readability score! Consider adding
                  more specific technical milestones.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CreateJobListing;
