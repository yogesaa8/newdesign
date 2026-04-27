import React, { useState } from 'react';

const CreateJobListing = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobType: 'Full-time',
    location: '',
    salaryMin: '',
    salaryMax: '',
    description: '',
    skillInput: '',
  });

  const [skills, setSkills] = useState([
    { id: 1, name: 'React.js', type: 'primary' },
    { id: 2, name: 'Tailwind CSS', type: 'primary' },
    { id: 3, name: 'TypeScript', type: 'primary' },
    { id: 4, name: 'GraphQL', type: 'primary' },
    { id: 5, name: 'UI Design', type: 'tertiary' },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    if (formData.skillInput.trim()) {
      const newSkill = {
        id: Date.now(),
        name: formData.skillInput.trim(),
        type: 'primary',
      };
      setSkills(prev => [...prev, newSkill]);
      setFormData(prev => ({ ...prev, skillInput: '' }));
    }
  };

  const handleRemoveSkill = (skillId) => {
    setSkills(prev => prev.filter(skill => skill.id !== skillId));
  };

  const handleSaveDraft = () => {
    console.log('Saving draft:', formData, skills);
  };

  const handlePublish = () => {
    console.log('Publishing job:', formData, skills);
  };

  const handleBack = () => {
    console.log('Going back');
  };

  return (
    <div className="flex-1">
      <main className="p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-on-surface tracking-tight mb-2 font-headline">
              Create New Job Listing
            </h1>
            <p className="text-outline">
              Follow the steps to attract the best talent for your enterprise team.
            </p>
          </div>

          {/* Multi-Step Indicator */}
          <div className="flex items-center gap-4 mb-12">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">
                1
              </div>
              <span className="font-semibold text-primary">Job Details</span>
            </div>
            <div className="h-px flex-1 bg-surface-container-highest"></div>
            <div className="flex items-center gap-2 group cursor-pointer opacity-50">
              <div className="w-10 h-10 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-bold">
                2
              </div>
              <span className="font-medium">Requirements</span>
            </div>
            <div className="h-px flex-1 bg-surface-container-highest"></div>
            <div className="flex items-center gap-2 group cursor-pointer opacity-50">
              <div className="w-10 h-10 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-bold">
                3
              </div>
              <span className="font-medium">Settings</span>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_12px_32px_-4px_rgba(13,28,46,0.06)] space-y-10">
            {/* Section: Basic Information */}
            <section className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-on-surface uppercase tracking-wider mb-2" htmlFor="jobTitle">
                  Job Title
                </label>
                <input
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className="w-full bg-surface-container-low border-none rounded-lg p-4 text-on-surface focus:ring-2 focus:ring-primary/20 placeholder:text-outline/50 outline-none"
                  placeholder="e.g. Senior Frontend Architect"
                  type="text"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-on-surface uppercase tracking-wider mb-2" htmlFor="jobType">
                    Job Type
                  </label>
                  <div className="relative">
                    <select
                      id="jobType"
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleInputChange}
                      className="w-full appearance-none bg-surface-container-low border-none rounded-lg p-4 pr-10 text-on-surface focus:ring-2 focus:ring-primary/20 outline-none"
                    >
                      <option>Full-time</option>
                      <option>Contract</option>
                      <option>Part-time</option>
                      <option>Freelance</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
                      expand_more
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-on-surface uppercase tracking-wider mb-2" htmlFor="location">
                    Location
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                      location_on
                    </span>
                    <input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container-low border-none rounded-lg p-4 pl-12 text-on-surface focus:ring-2 focus:ring-primary/20 placeholder:text-outline/50 outline-none"
                      placeholder="San Francisco, CA (or Remote)"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Section: Compensation & Rich Text */}
            <section className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-on-surface uppercase tracking-wider mb-2">
                  Salary Range (Annual)
                </label>
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline">$</span>
                    <input
                      name="salaryMin"
                      value={formData.salaryMin}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container-low border-none rounded-lg p-4 pl-8 text-on-surface focus:ring-2 focus:ring-primary/20 outline-none"
                      placeholder="80,000"
                      type="number"
                    />
                  </div>
                  <span className="text-outline font-medium">to</span>
                  <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline">$</span>
                    <input
                      name="salaryMax"
                      value={formData.salaryMax}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container-low border-none rounded-lg p-4 pl-8 text-on-surface focus:ring-2 focus:ring-primary/20 outline-none"
                      placeholder="120,000"
                      type="number"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-on-surface uppercase tracking-wider mb-2">
                  Job Description
                </label>
                <div className="border-none rounded-lg bg-surface-container-low overflow-hidden">
                  <div className="flex items-center gap-2 p-2 border-b border-surface-container-highest">
                    <button className="p-2 hover:bg-white rounded text-outline hover:text-primary" type="button">
                      <span className="material-symbols-outlined">format_bold</span>
                    </button>
                    <button className="p-2 hover:bg-white rounded text-outline hover:text-primary" type="button">
                      <span className="material-symbols-outlined">format_italic</span>
                    </button>
                    <button className="p-2 hover:bg-white rounded text-outline hover:text-primary" type="button">
                      <span className="material-symbols-outlined">format_list_bulleted</span>
                    </button>
                    <button className="p-2 hover:bg-white rounded text-outline hover:text-primary" type="button">
                      <span className="material-symbols-outlined">link</span>
                    </button>
                    <div className="w-px h-6 bg-surface-container-highest mx-1"></div>
                    <button className="p-2 hover:bg-white rounded text-outline hover:text-primary" type="button">
                      <span className="material-symbols-outlined">image</span>
                    </button>
                  </div>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-none p-4 focus:ring-0 text-on-surface placeholder:text-outline/50 outline-none"
                    placeholder="Describe the role, responsibilities, and team culture..."
                    rows="8"
                  />
                </div>
              </div>
            </section>

            {/* Section: Skills (Bento Style Chips) */}
            <section className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-on-surface uppercase tracking-wider mb-2">
                  Required Skills
                </label>
                <div className="relative">
                  <input
                    name="skillInput"
                    value={formData.skillInput}
                    onChange={handleInputChange}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                    className="w-full bg-surface-container-low border-none rounded-lg p-4 text-on-surface focus:ring-2 focus:ring-primary/20 placeholder:text-outline/50 outline-none"
                    placeholder="Add a skill (e.g. React, Python, Figma)"
                    type="text"
                  />
                  <button
                    onClick={handleAddSkill}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-on-primary px-4 py-1.5 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity"
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
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                      skill.type === 'tertiary'
                        ? 'bg-tertiary/10 text-tertiary'
                        : 'bg-primary-container/10 text-primary'
                    }`}
                  >
                    {skill.name}
                    <button
                      onClick={() => handleRemoveSkill(skill.id)}
                      className="material-symbols-outlined text-sm hover:opacity-70"
                      type="button"
                    >
                      close
                    </button>
                  </span>
                ))}
              </div>
            </section>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-10 border-t border-surface-container-low">
              <button
                onClick={handleSaveDraft}
                className="px-6 py-3 font-bold text-outline hover:text-on-surface transition-colors"
                type="button"
              >
                Save as Draft
              </button>
              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className="bg-surface-container-high text-on-secondary-container px-8 py-3 rounded-lg font-bold hover:bg-surface-container-highest transition-colors"
                  type="button"
                >
                  Back
                </button>
                <button
                  onClick={handlePublish}
                  className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-10 py-3 rounded-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform flex items-center gap-2"
                  type="button"
                >
                  Publish Job
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tips / Sidebar Content */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-surface-container-low rounded-xl border-none">
              <div className="flex items-center gap-3 mb-3 text-primary">
                <span className="material-symbols-outlined">lightbulb</span>
                <h3 className="font-bold text-on-surface">Writing Tips</h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Clearly define the first 90 days. Candidates love knowing exactly what success looks like in a new role.
              </p>
            </div>
            <div className="p-6 bg-surface-container-low rounded-xl border-none">
              <div className="flex items-center gap-3 mb-3 text-tertiary">
                <span className="material-symbols-outlined">auto_awesome</span>
                <h3 className="font-bold text-on-surface">AI Optimizer</h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Your description has a high readability score! Consider adding more specific technical milestones.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateJobListing;