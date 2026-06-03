import React from "react";

/* global window */
// Wizard step components

const { useState } = React;
const { Icon, Field, Tip, TagInput, BulletEditor, PhotoUpload, CharCounter } = window;

// ====================================================================
// STEP 1: Choose Template
// ====================================================================
const StepTemplate = ({ data, update }) => {
  const { TEMPLATE_META, ACCENT_PALETTES } = window.RB_DATA;
  return (
    <div className="fade-up">
      <h2 className="section-title">Pick a resume format</h2>
      <p className="section-sub">Six formats, each engineered for a different kind of job. You can swap any time - your data stays.</p>

      <div className="template-grid stagger">
        {TEMPLATE_META.map((t) => {
          const isSel = data.selectedTemplate === t.id;
          return (
            <button
              key={t.id}
              className={`template-card ${isSel ? "selected" : ""}`}
              onClick={() => update({ selectedTemplate: t.id })}
              type="button"
            >
              <div className="template-card-check"><Icon name="check" size={14} stroke={2.5} /></div>
              <div className="template-card-preview">
                <window.TemplateThumbnail template={t.id} accent={ACCENT_PALETTES.find(a => a.id === data.accent)} />
              </div>
              <div className="template-card-body">
                <h4>{t.name}</h4>
                <p>{t.description}</p>
                <div className="template-card-meta">
                  <span className={`chip chip-ats`}>ATS · {t.atsTier}</span>
                  {t.jobCategories.slice(0, 2).map((c) => (
                    <span key={c} className="chip">{c}</span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {(() => {
        const t = TEMPLATE_META.find((x) => x.id === data.selectedTemplate);
        return t?.accentSelectable ? (
          <div style={{ marginTop: 28 }}>
            <div className="section-mini-label mb-2"><Icon name="palette" size={11} /> ACCENT COLOR</div>
            <div className="swatch-row">
              {ACCENT_PALETTES.map((a) => (
                <div
                  key={a.id}
                  className={`swatch ${data.accent === a.id ? "selected" : ""}`}
                  style={{ background: a.color }}
                  onClick={() => update({ accent: a.id })}
                  title={a.name}
                />
              ))}
            </div>
          </div>
        ) : null;
      })()}
    </div>
  );
};

// ====================================================================
// STEP 2: Personal Info
// ====================================================================
const StepPersonal = ({ data, update }) => {
  const p = data.personal;
  const setP = (patch) => update({ personal: { ...p, ...patch } });
  const showPhoto = ["twoColumn", "creative"].includes(data.selectedTemplate);

  return (
    <div className="fade-up">
      <h2 className="section-title">Tell us about yourself</h2>
      <p className="section-sub">Basic contact info that recruiters need at a glance.</p>

      <Tip>{window.RB_DATA.SECTION_TIPS.personal}</Tip>

      <div className="card card-pad mt-4 stagger" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {showPhoto && <PhotoUpload value={p.photo} onChange={(v) => setP({ photo: v })} />}

        <Field label="Full name" required icon="user">
          <input className="input" value={p.name} onChange={(e) => setP({ name: e.target.value })} placeholder="Your name as it appears on Aadhaar" />
        </Field>

        <div className="field-row">
          <Field label="Email" required icon="mail">
            <input type="email" className="input" value={p.email} onChange={(e) => setP({ email: e.target.value })} placeholder="you@email.com" />
          </Field>
          <Field label="Phone" required icon="phone">
            <div className="input-prefix">
              <span>+91</span>
              <input className="input" value={p.phone} onChange={(e) => setP({ phone: e.target.value })} placeholder="98765 43210" maxLength={11} />
            </div>
          </Field>
        </div>

        <Field label="City, State" icon="pin">
          <input className="input" value={p.city} onChange={(e) => setP({ city: e.target.value })} placeholder="Pune, Maharashtra" />
        </Field>

        <div className="field-row">
          <Field label="LinkedIn URL" icon="linkedin">
            <input className="input" value={p.linkedin} onChange={(e) => setP({ linkedin: e.target.value })} placeholder="linkedin.com/in/yourhandle" />
          </Field>
          <Field label="GitHub URL" icon="github" help="Recommended for tech roles">
            <input className="input" value={p.github} onChange={(e) => setP({ github: e.target.value })} placeholder="github.com/yourhandle" />
          </Field>
        </div>

        <Field label="Portfolio URL" icon="globe" help="Optional - for designers, writers & creators">
          <input className="input" value={p.portfolio} onChange={(e) => setP({ portfolio: e.target.value })} placeholder="yourname.com" />
        </Field>

        <Field label="Father's name" help="Optional - some traditional Indian employers ask for this">
          <input className="input" value={p.fathersName} onChange={(e) => setP({ fathersName: e.target.value })} placeholder="Optional" />
        </Field>
      </div>
    </div>
  );
};

// ====================================================================
// STEP 3: Education
// ====================================================================
const StepEducation = ({ data, update }) => {
  const setEdu = (next) => update({ education: next });
  const addEdu = () => setEdu([...(data.education || []), { id: "e" + Date.now(), degree: "", college: "", board: "", yearStart: "", yearEnd: "", score: "", scoreType: "cgpa" }]);
  const updateEdu = (id, patch) => setEdu(data.education.map(e => e.id === id ? { ...e, ...patch } : e));
  const removeEdu = (id) => setEdu(data.education.filter(e => e.id !== id));

  return (
    <div className="fade-up">
      <h2 className="section-title">Education</h2>
      <p className="section-sub">Add your degree, plus 10th and 12th - Indian employers usually ask for all three.</p>
      <Tip>{window.RB_DATA.SECTION_TIPS.education}</Tip>

      <div className="mt-4 stagger">
        {(data.education || []).map((e, idx) => (
          <div key={e.id} className="repeater-item">
            <div className="repeater-item-head">
              <div className="repeater-item-title">
                <span className="num-chip">{idx + 1}</span>
                {e.degree || `Education #${idx + 1}`}
              </div>
              {data.education.length > 1 && (
                <button className="btn-icon" onClick={() => removeEdu(e.id)} aria-label="Remove">
                  <Icon name="trash" size={13} />
                </button>
              )}
            </div>

            <div className="flex-col" style={{ gap: 12 }}>
              <Field label="Degree / Qualification" required>
                <input className="input" value={e.degree} onChange={(ev) => updateEdu(e.id, { degree: ev.target.value })} placeholder="B.Tech in Computer Science / Class 12 / Class 10" />
              </Field>

              <div className="field-row">
                <Field label="College / School" required>
                  <input className="input" value={e.college} onChange={(ev) => updateEdu(e.id, { college: ev.target.value })} placeholder="VIT, Pune" />
                </Field>
                <Field label="Board / University" help="CBSE, ICSE, State Board, etc.">
                  <input className="input" value={e.board} onChange={(ev) => updateEdu(e.id, { board: ev.target.value })} placeholder="e.g. CBSE" />
                </Field>
              </div>

              <div className="field-row-3">
                <Field label="Year of joining">
                  <input className="input" value={e.yearStart} onChange={(ev) => updateEdu(e.id, { yearStart: ev.target.value })} placeholder="2021" maxLength={4} />
                </Field>
                <Field label="Year of passing" required>
                  <input className="input" value={e.yearEnd} onChange={(ev) => updateEdu(e.id, { yearEnd: ev.target.value })} placeholder="2025" maxLength={4} />
                </Field>
                <Field label={e.scoreType === "cgpa" ? "CGPA" : "Percentage"}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <input className="input" value={e.score} onChange={(ev) => updateEdu(e.id, { score: ev.target.value })} placeholder={e.scoreType === "cgpa" ? "8.6" : "89"} />
                    <select className="select" value={e.scoreType} onChange={(ev) => updateEdu(e.id, { scoreType: ev.target.value })} style={{ width: 90 }}>
                      <option value="cgpa">CGPA</option>
                      <option value="percent">%</option>
                    </select>
                  </div>
                </Field>
              </div>
            </div>
          </div>
        ))}
        <button className="add-btn" onClick={addEdu}>
          <Icon name="plus" size={14} /> Add another education
        </button>
      </div>
    </div>
  );
};

// ====================================================================
// STEP 4: Skills
// ====================================================================
const StepSkills = ({ data, update }) => {
  const [activeGroup, setActiveGroup] = useState("technical");
  const { SKILL_SUGGESTIONS, LANGUAGE_SUGGESTIONS, JOB_CATEGORIES } = window.RB_DATA;

  const groups = [
    { id: "technical", label: "Technical" },
    { id: "tools", label: "Tools" },
    { id: "soft", label: "Soft Skills" },
    { id: "languages", label: "Languages" },
  ];

  const setSkills = (group, value) => update({ skills: { ...data.skills, [group]: value } });
  const cat = data.jobCategory || "software";
  const suggestions = activeGroup === "languages"
    ? LANGUAGE_SUGGESTIONS
    : SKILL_SUGGESTIONS[cat]?.[activeGroup] || [];

  return (
    <div className="fade-up">
      <h2 className="section-title">Skills</h2>
      <p className="section-sub">List 6–12 skills total. Quality beats quantity - only add what you can defend in an interview.</p>

      <Field label="Target job category" help="We'll suggest relevant skills based on this" icon="target">
        <select className="select" value={data.jobCategory} onChange={(e) => update({ jobCategory: e.target.value })}>
          {JOB_CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
      </Field>

      <div className="mt-4">
        <div className="skill-group-tabs">
          {groups.map((g) => (
            <button
              key={g.id}
              className={`skill-group-tab ${activeGroup === g.id ? "active" : ""}`}
              onClick={() => setActiveGroup(g.id)}
              type="button"
            >
              {g.label}
              <span className="count">{data.skills[g.id]?.length || 0}</span>
            </button>
          ))}
        </div>

        <TagInput
          value={data.skills[activeGroup] || []}
          onChange={(v) => setSkills(activeGroup, v)}
          placeholder={`Add a ${groups.find(g => g.id === activeGroup).label.toLowerCase()} skill and press Enter`}
          suggestions={suggestions}
        />
      </div>

      <div className="tip mt-4">
        <span className="tip-icon"><Icon name="sparkles" size={14} /></span>
        <span>{window.RB_DATA.SECTION_TIPS.skills}</span>
      </div>

      <window.AiSkillSuggest
        data={data}
        onAdd={(group, skill) => {
          const current = data.skills[group] || [];
          if (!current.includes(skill)) {
            update({ skills: { ...data.skills, [group]: [...current, skill] } });
          }
        }}
      />
    </div>
  );
};

// ====================================================================
// STEP 5: Projects & Experience
// ====================================================================
const StepProjects = ({ data, update }) => {
  const [tab, setTab] = useState("projects");

  const updateProj = (id, patch) => update({ projects: data.projects.map(p => p.id === id ? { ...p, ...patch } : p) });
  const removeProj = (id) => update({ projects: data.projects.filter(p => p.id !== id) });
  const addProj = () => update({ projects: [...data.projects, { id: "p" + Date.now(), title: "", stack: "", role: "", year: "", bullets: [""], link: "" }] });

  const updateExp = (id, patch) => update({ experience: data.experience.map(x => x.id === id ? { ...x, ...patch } : x) });
  const removeExp = (id) => update({ experience: data.experience.filter(x => x.id !== id) });
  const addExp = () => update({ experience: [...(data.experience || []), { id: "x" + Date.now(), role: "", company: "", yearStart: "", yearEnd: "", bullets: [""] }] });

  return (
    <div className="fade-up">
      <h2 className="section-title">Projects & internships</h2>
      <p className="section-sub">As a fresher, projects matter more than work history. Lead with what you've built.</p>
      <Tip>{window.RB_DATA.SECTION_TIPS.projects}</Tip>

      <div className="skill-group-tabs mt-4" style={{ maxWidth: 420 }}>
        <button className={`skill-group-tab ${tab === "projects" ? "active" : ""}`} onClick={() => setTab("projects")} type="button">
          Projects <span className="count">{data.projects?.length || 0}</span>
        </button>
        <button className={`skill-group-tab ${tab === "experience" ? "active" : ""}`} onClick={() => setTab("experience")} type="button">
          Internships <span className="count">{data.experience?.length || 0}</span>
        </button>
      </div>

      {tab === "projects" && (
        <div className="mt-4 stagger">
          {(data.projects || []).map((proj, idx) => (
            <div key={proj.id} className="repeater-item">
              <div className="repeater-item-head">
                <div className="repeater-item-title">
                  <span className="num-chip">{idx + 1}</span>
                  {proj.title || `Project #${idx + 1}`}
                </div>
                <button className="btn-icon" onClick={() => removeProj(proj.id)}><Icon name="trash" size={13} /></button>
              </div>
              <div className="flex-col" style={{ gap: 12 }}>
                <Field label="Project title" required>
                  <input className="input" value={proj.title} onChange={(e) => updateProj(proj.id, { title: e.target.value })} placeholder="e.g. Krishi-Connect - Farmer Marketplace" />
                </Field>
                <div className="field-row">
                  <Field label="Your role">
                    <input className="input" value={proj.role} onChange={(e) => updateProj(proj.id, { role: e.target.value })} placeholder="Solo developer / Frontend lead" />
                  </Field>
                  <Field label="Year">
                    <input className="input" value={proj.year} onChange={(e) => updateProj(proj.id, { year: e.target.value })} placeholder="2024" />
                  </Field>
                </div>
                <Field label="Tech stack / tools" help="Comma-separated">
                  <input className="input" value={proj.stack} onChange={(e) => updateProj(proj.id, { stack: e.target.value })} placeholder="React, Node.js, MongoDB" />
                </Field>
                <Field label="Project link" help="GitHub, demo URL or app store link">
                  <input className="input" value={proj.link} onChange={(e) => updateProj(proj.id, { link: e.target.value })} placeholder="github.com/you/project" />
                </Field>
                <Field label="What you built / achieved" help="Start each line with a strong verb. Numbers > adjectives.">
                  <BulletEditor value={proj.bullets} onChange={(v) => updateProj(proj.id, { bullets: v })} placeholder="Built X used by Y to achieve Z..." />
                </Field>
                <window.AiBulletPolish
                  kind="project"
                  title={proj.title}
                  stack={proj.stack}
                  role={proj.role}
                  bullets={proj.bullets}
                  onApply={(b) => updateProj(proj.id, { bullets: b })}
                />
              </div>
            </div>
          ))}
          <button className="add-btn" onClick={addProj}>
            <Icon name="plus" size={14} /> Add another project
          </button>
        </div>
      )}

      {tab === "experience" && (
        <div className="mt-4 stagger">
          {(data.experience || []).map((x, idx) => (
            <div key={x.id} className="repeater-item">
              <div className="repeater-item-head">
                <div className="repeater-item-title"><span className="num-chip">{idx + 1}</span>{x.role || `Internship #${idx + 1}`}</div>
                <button className="btn-icon" onClick={() => removeExp(x.id)}><Icon name="trash" size={13} /></button>
              </div>
              <div className="flex-col" style={{ gap: 12 }}>
                <div className="field-row">
                  <Field label="Role / Title" required>
                    <input className="input" value={x.role} onChange={(e) => updateExp(x.id, { role: e.target.value })} placeholder="Software Engineering Intern" />
                  </Field>
                  <Field label="Company" required>
                    <input className="input" value={x.company} onChange={(e) => updateExp(x.id, { company: e.target.value })} placeholder="InfoTech Solutions, Pune" />
                  </Field>
                </div>
                <div className="field-row">
                  <Field label="Start">
                    <input className="input" value={x.yearStart} onChange={(e) => updateExp(x.id, { yearStart: e.target.value })} placeholder="May 2024" />
                  </Field>
                  <Field label="End">
                    <input className="input" value={x.yearEnd} onChange={(e) => updateExp(x.id, { yearEnd: e.target.value })} placeholder="Jul 2024" />
                  </Field>
                </div>
                <Field label="Key accomplishments">
                  <BulletEditor value={x.bullets} onChange={(v) => updateExp(x.id, { bullets: v })} placeholder="Shipped X feature used by Y users..." />
                </Field>
                <window.AiBulletPolish
                  kind="role"
                  title={x.role}
                  role={x.company}
                  bullets={x.bullets}
                  onApply={(b) => updateExp(x.id, { bullets: b })}
                />
              </div>
            </div>
          ))}
          {(!data.experience || data.experience.length === 0) && (
            <div className="surface" style={{ padding: 24, textAlign: "center", color: "var(--ink-2)", fontSize: 13 }}>
              No internships yet? <strong style={{ color: "var(--ink-0)" }}>That's completely okay</strong> as a fresher. Add one if you have it, otherwise skip.
            </div>
          )}
          <button className="add-btn mt-3" onClick={addExp}>
            <Icon name="plus" size={14} /> Add internship
          </button>
        </div>
      )}

      <div className="mt-6">
        <div className="section-mini-label mb-2"><Icon name="award" size={11} /> ACHIEVEMENTS & ACTIVITIES</div>
        <p className="text-xs muted mb-3">Hackathon wins, leadership roles, scholarships, volunteer work - one per line</p>
        <BulletEditor
          value={data.achievements || []}
          onChange={(v) => update({ achievements: v })}
          placeholder="e.g. Finalist, Smart India Hackathon 2024 - top 5 of 380 teams"
        />
      </div>

      <div className="mt-6">
        <div className="section-mini-label mb-2"><Icon name="fileText" size={11} /> CERTIFICATIONS</div>
        <div className="stagger">
          {(data.certifications || []).map((c, idx) => (
            <div key={c.id} className="repeater-item">
              <div className="repeater-item-head">
                <div className="repeater-item-title"><span className="num-chip">{idx + 1}</span>{c.name || "New certification"}</div>
                <button className="btn-icon" onClick={() => update({ certifications: data.certifications.filter(x => x.id !== c.id) })}>
                  <Icon name="trash" size={13} />
                </button>
              </div>
              <div className="field-row-3">
                <Field label="Name">
                  <input className="input" value={c.name} onChange={(e) => update({ certifications: data.certifications.map(x => x.id === c.id ? { ...x, name: e.target.value } : x) })} placeholder="AWS Cloud Practitioner" />
                </Field>
                <Field label="Issuer">
                  <input className="input" value={c.issuer} onChange={(e) => update({ certifications: data.certifications.map(x => x.id === c.id ? { ...x, issuer: e.target.value } : x) })} placeholder="Amazon Web Services" />
                </Field>
                <Field label="Year">
                  <input className="input" value={c.year} onChange={(e) => update({ certifications: data.certifications.map(x => x.id === c.id ? { ...x, year: e.target.value } : x) })} placeholder="2024" />
                </Field>
              </div>
            </div>
          ))}
          <button className="add-btn" onClick={() => update({ certifications: [...(data.certifications || []), { id: "c" + Date.now(), name: "", issuer: "", year: "" }] })}>
            <Icon name="plus" size={14} /> Add certification
          </button>
        </div>
      </div>
    </div>
  );
};

// ====================================================================
// STEP 6: Objective / Summary
// ====================================================================
const StepObjective = ({ data, update }) => {
  const { OBJECTIVE_TEMPLATES } = window.RB_DATA;
  const cat = data.jobCategory || "software";
  const templates = OBJECTIVE_TEMPLATES[cat] || [];

  return (
    <div className="fade-up">
      <h2 className="section-title">Career objective</h2>
      <p className="section-sub">A 3–4 line elevator pitch at the top of your resume. Recruiters read this first.</p>
      <Tip>{window.RB_DATA.SECTION_TIPS.objective}</Tip>

      <window.AiObjectiveGenerator data={data} onPick={(o) => update({ objective: o })} />

      <div className="mt-4">
        <div className="section-mini-label mb-2"><Icon name="sparkles" size={11} /> START FROM A TEMPLATE</div>
        <p className="text-xs muted mb-3">Pick one for your job category and customise it</p>
        <div style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr 1fr" }} className="stagger">
          {templates.map((t, i) => (
            <button
              key={i}
              className={`objective-template ${data.objective === t.text ? "selected" : ""}`}
              onClick={() => update({ objective: t.text })}
              type="button"
            >
              <div className="objective-template-tag">{t.tag}</div>
              {t.text.slice(0, 130)}…
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <Field label="Your objective" help="Optimal: 150–300 characters. Aim for clarity, not buzzwords.">
          <textarea
            className="textarea"
            value={data.objective}
            onChange={(e) => update({ objective: e.target.value })}
            placeholder="Recent Computer Science graduate with hands-on experience..."
            style={{ minHeight: 120 }}
            maxLength={500}
          />
          <CharCounter value={data.objective || ""} />
        </Field>
      </div>
    </div>
  );
};

// ====================================================================
// STEP 7: Preview & Download
// ====================================================================
const StepDownload = ({ data, update, onDownload, goToStep }) => {
  const { ACCENT_PALETTES, TEMPLATE_META } = window.RB_DATA;
  const t = TEMPLATE_META.find((x) => x.id === data.selectedTemplate);
  const [atsScore] = useState(() => computeAtsScore(data));

  return (
    <div className="fade-up">
      <h2 className="section-title">Looking great - download time 🎉</h2>
      <p className="section-sub">Your resume is ready. Review, then download as PDF.</p>

      {/* ATS-style score card */}
      <div className="card card-pad mb-4" style={{ display: "flex", gap: 18, alignItems: "center" }}>
        <div style={{ position: "relative", width: 78, height: 78, flexShrink: 0 }}>
          <svg viewBox="0 0 36 36" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--bg-3)" strokeWidth="2.6" />
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--accent)" strokeWidth="2.6"
              strokeDasharray={`${atsScore}, 100`} strokeLinecap="round" />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }}>{atsScore}</div>
        </div>
        <div style={{ flex: 1 }}>
          <div className="section-mini-label mb-2"><Icon name="sparkles" size={11} /> RESUME SCORE</div>
          <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 16 }}>
            {atsScore >= 80 ? "Strong - ready to apply" : atsScore >= 60 ? "Good - small tweaks would help" : "Needs more detail"}
          </h3>
          <p className="text-xs muted mt-2" style={{ margin: 0 }}>
            Based on completeness, action verbs in your bullets, contact info, and skills coverage.
          </p>
        </div>
      </div>

      <window.AiResumeReview data={data} />

      <window.AiJobTailor
        data={data}
        onAddSkills={(skill) => {
          const current = data.skills.technical || [];
          if (!current.includes(skill)) update({ skills: { ...data.skills, technical: [...current, skill] } });
        }}
        onUseObjective={(o) => { update({ objective: o }); goToStep(5); }}
      />

      <div className="card card-pad stagger" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
          <div>
            <div className="section-mini-label mb-2">CURRENT FORMAT</div>
            <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 16 }}>{t.name}</h3>
            <p className="text-xs muted mt-2" style={{ margin: 0 }}>{t.bestFor}</p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => goToStep(0)}>
            <Icon name="edit" size={12} /> Change template
          </button>
        </div>

        <div className="divider-line" style={{ margin: 0 }} />

        <Field label="Paper size">
          <div className="skill-group-tabs" style={{ maxWidth: 320 }}>
            <button className={`skill-group-tab ${data.paperSize !== "letter" ? "active" : ""}`} onClick={() => update({ paperSize: "a4" })} type="button">A4 (India standard)</button>
            <button className={`skill-group-tab ${data.paperSize === "letter" ? "active" : ""}`} onClick={() => update({ paperSize: "letter" })} type="button">US Letter</button>
          </div>
        </Field>

        {t.accentSelectable && (
          <Field label="Accent color" icon="palette">
            <div className="swatch-row">
              {ACCENT_PALETTES.map((a) => (
                <div key={a.id} className={`swatch ${data.accent === a.id ? "selected" : ""}`}
                  style={{ background: a.color }} onClick={() => update({ accent: a.id })} title={a.name} />
              ))}
            </div>
          </Field>
        )}

        <Field label="Include declaration line" help='"I hereby declare that the above information is true…" - common for government & PSU jobs'>
          <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
            <input type="checkbox" checked={!!data.declaration} onChange={(e) => update({ declaration: e.target.checked })} style={{ accentColor: "var(--accent)", width: 16, height: 16 }} />
            <span className="text-sm">Add declaration & signature line at the bottom</span>
          </label>
        </Field>

        <div className="divider-line" style={{ margin: 0 }} />

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="btn btn-primary" onClick={onDownload} style={{ flex: 1, minWidth: 160 }}>
            <Icon name="download" size={14} /> Download as PDF
          </button>
          <button className="btn btn-ghost" onClick={() => window.print()}>
            <Icon name="fileText" size={14} /> Print
          </button>
          <button className="btn btn-ghost" onClick={() => {
            const json = JSON.stringify(data, null, 2);
            const blob = new Blob([json], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url; a.download = "resume-data.json"; a.click();
            URL.revokeObjectURL(url);
          }}>
            <Icon name="save" size={14} /> Save data
          </button>
        </div>

        <div className="surface" style={{ padding: 14, fontSize: 12, color: "var(--ink-2)", display: "flex", gap: 10 }}>
          <Icon name="info" size={14} stroke={2} />
          <span>Your data stays in your browser - we don't save it anywhere. Bookmark this page and your work persists across sessions.</span>
        </div>
      </div>

      <div className="mt-6">
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 15, margin: "0 0 12px" }}>What's next?</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { icon: "briefcase", title: "Browse jobs", text: "Find 1,200+ fresher openings across India" },
            { icon: "rocket", title: "Apply directly", text: "One-click apply on FirstJobIndia with this resume" },
            { icon: "award", title: "Practice interviews", text: "Free mock interview questions for your role" },
            { icon: "lightbulb", title: "Resume tips", text: "Read our guide on writing job-winning resumes" },
          ].map((item, i) => (
            <a key={i} href="#" className="surface" style={{ padding: 14, display: "flex", gap: 10, alignItems: "flex-start", color: "var(--ink-1)", textDecoration: "none" }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--accent-soft)", color: "var(--accent)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                <Icon name={item.icon} size={15} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 12.5, color: "var(--ink-0)" }}>{item.title}</div>
                <div className="text-xs muted">{item.text}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

// Simple completeness + verb-density score
function computeAtsScore(data) {
  let score = 0;
  const p = data.personal || {};
  if (p.name) score += 6; if (p.email) score += 6; if (p.phone) score += 6;
  if (p.city) score += 3; if (p.linkedin) score += 4;
  if (data.objective && data.objective.length > 100) score += 12;
  if (data.education?.length >= 2) score += 10;
  const skillsCount = (data.skills?.technical?.length || 0) + (data.skills?.tools?.length || 0) + (data.skills?.soft?.length || 0);
  if (skillsCount >= 6) score += 12; else score += skillsCount * 2;
  if (data.projects?.length > 0) score += 10;
  if (data.projects?.length >= 2) score += 5;
  const allBullets = [
    ...(data.projects || []).flatMap(p => p.bullets || []),
    ...(data.experience || []).flatMap(x => x.bullets || []),
  ].filter(Boolean);
  const verbs = window.RB_DATA.ACTION_VERBS.map(v => v.toLowerCase());
  const verbHits = allBullets.filter(b => verbs.includes(b.trim().split(/\s+/)[0]?.toLowerCase())).length;
  score += Math.min(15, verbHits * 2);
  if (data.achievements?.length > 0) score += 5;
  if (data.certifications?.length > 0) score += 4;
  return Math.min(98, Math.max(35, Math.round(score)));
}

Object.assign(window, {
  StepTemplate, StepPersonal, StepEducation, StepSkills, StepProjects, StepObjective, StepDownload, computeAtsScore,
});
