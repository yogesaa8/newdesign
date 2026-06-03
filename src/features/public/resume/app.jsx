import React from "react";
import html2pdf from "html2pdf.js";

/* global window */
// Resume Builder - main app shell

const { useState, useEffect, useMemo, useRef } = React;

const STEPS = [
  { id: "template", label: "Format", icon: "layers" },
  { id: "personal", label: "Personal", icon: "user" },
  { id: "education", label: "Education", icon: "school" },
  { id: "skills", label: "Skills", icon: "sparkles" },
  { id: "projects", label: "Projects", icon: "code" },
  { id: "objective", label: "Objective", icon: "target" },
  { id: "download", label: "Download", icon: "download" },
];

const STORAGE_KEY = "fji_resume_v1";

function App() {
  const [stepIdx, setStepIdx] = useState(0);
  const [data, setData] = useState(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) return JSON.parse(cached);
    } catch {}
    return window.RB_DATA.SAMPLE_RESUME;
  });

  const [previewZoom, setPreviewZoom] = useState(1);
  const [showHero, setShowHero] = useState(() => !localStorage.getItem(STORAGE_KEY));

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
  }, [data]);

  const update = (patch) => setData((d) => ({ ...d, ...patch }));
  const goToStep = (i) => {
    setStepIdx(Math.max(0, Math.min(STEPS.length - 1, i)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const progress = ((stepIdx + 1) / STEPS.length) * 100;
  const { Icon } = window;
  const previewRef = useRef(null);

  // PDF download — renders the preview straight to an A4 PDF (no print dialog).
  const [downloading, setDownloading] = useState(false);
  const handleDownload = async () => {
    const frame = previewRef.current?.querySelector(".preview-frame");
    if (!frame || downloading) return;

    // Capture at natural size, ignoring the live-preview zoom.
    const prevTransform = frame.style.transform;
    frame.style.transform = "none";
    setDownloading(true);

    const filename = `${(data.personal.name || "Resume").trim() || "Resume"} Resume.pdf`;
    try {
      await html2pdf()
        .set({
          margin: 0,
          filename,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, backgroundColor: "#ffffff", useCORS: true },
          jsPDF: {
            unit: "mm",
            format: data.paperSize === "letter" ? "letter" : "a4",
            orientation: "portrait",
          },
          pagebreak: { mode: ["avoid-all"] },
        })
        .from(frame)
        .save();
    } catch (err) {
      console.error("PDF download failed", err);
      alert("Sorry, the PDF could not be generated. Please try again.");
    } finally {
      frame.style.transform = prevTransform;
      setDownloading(false);
    }
  };

  // Hero / landing
  if (showHero) {
    return <Landing onStart={() => setShowHero(false)} onReset={() => {
      localStorage.removeItem(STORAGE_KEY);
      setData(window.RB_DATA.SAMPLE_RESUME);
      setShowHero(false);
    }} hasSavedData={!!localStorage.getItem(STORAGE_KEY)} />;
  }

  const StepComponent = [
    window.StepTemplate,
    window.StepPersonal,
    window.StepEducation,
    window.StepSkills,
    window.StepProjects,
    window.StepObjective,
    window.StepDownload,
  ][stepIdx];

  return (
    <div className="app-shell">
      {/* TOPBAR */}
      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="#" onClick={(e) => { e.preventDefault(); setShowHero(true); }}>
            <img src="/images/logos/fji_orange.png" alt="FirstJobIndia" style={{ width: 28, height: 28, objectFit: "contain", display: "block" }} />
            FirstJobIndia
            <span className="brand-sub">Resume Builder</span>
          </a>
          <div className="topbar-actions">
            <span className="topbar-tag"><span className="dot" />Auto-saved</span>
            <button className="btn btn-ghost btn-sm" onClick={() => {
              if (confirm("Reset all data and start over?")) {
                localStorage.removeItem(STORAGE_KEY);
                setData(window.RB_DATA.SAMPLE_RESUME);
                setStepIdx(0);
              }
            }}>
              <Icon name="trash" size={12} /><span className="btn-label">Reset</span>
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleDownload} disabled={downloading}>
              <Icon name="download" size={12} /><span className="btn-label">{downloading ? "Generating…" : "Download PDF"}</span>
            </button>
          </div>
        </div>
        <div className="progress-bar"><div className="progress-fill" style={{ width: progress + "%" }} /></div>
      </header>

      {/* STEP RAIL */}
      <nav className="step-rail">
        {STEPS.map((s, i) => (
          <React.Fragment key={s.id}>
            <button
              className={`step-pill ${i === stepIdx ? "active" : ""} ${i < stepIdx ? "done" : ""}`}
              onClick={() => goToStep(i)}
              type="button"
            >
              <span className="num">{i < stepIdx ? <Icon name="check" size={11} stroke={2.5} /> : i + 1}</span>
              {s.label}
            </button>
            {i < STEPS.length - 1 && <span className="step-pill-divider"><Icon name="chevronRight" size={11} /></span>}
          </React.Fragment>
        ))}
      </nav>

      {/* MAIN GRID */}
      <div className="builder-grid">
        {/* FORM PANE */}
        <main className="form-pane">
          <StepComponent
            data={data}
            update={update}
            onDownload={handleDownload}
            goToStep={goToStep}
          />

          <div className="wizard-footer">
            <button className="btn btn-ghost" onClick={() => goToStep(stepIdx - 1)} disabled={stepIdx === 0}>
              <Icon name="arrowLeft" size={13} /> Back
            </button>
            <div className="text-xs muted">Step {stepIdx + 1} of {STEPS.length}</div>
            {stepIdx < STEPS.length - 1 ? (
              <button className="btn btn-primary" onClick={() => goToStep(stepIdx + 1)}>
                Next: {STEPS[stepIdx + 1].label} <Icon name="arrowRight" size={13} />
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleDownload}>
                <Icon name="download" size={13} /> Download PDF
              </button>
            )}
          </div>
        </main>

        {/* PREVIEW PANE */}
        <aside className="preview-pane" ref={previewRef}>
          <div className="preview-header">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Icon name="eye" size={13} />
              <span style={{ fontSize: 12, fontWeight: 600 }}>Live preview</span>
              <span className="chip" style={{ fontSize: 9 }}>
                {window.RB_DATA.TEMPLATE_META.find((t) => t.id === data.selectedTemplate)?.name}
              </span>
            </div>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <button className="btn-icon" onClick={() => setPreviewZoom(z => Math.max(0.5, z - 0.1))} title="Zoom out" style={{ padding: 6 }}>
                <Icon name="minus" size={12} />
              </button>
              <span className="text-xs muted-2" style={{ minWidth: 36, textAlign: "center" }}>{Math.round(previewZoom * 100)}%</span>
              <button className="btn-icon" onClick={() => setPreviewZoom(z => Math.min(1.6, z + 0.1))} title="Zoom in" style={{ padding: 6 }}>
                <Icon name="plus" size={12} />
              </button>
            </div>
          </div>

          <div className="preview-canvas">
            <div className="preview-frame" style={{ transform: `scale(${previewZoom})` }}>
              <window.ResumePreview data={data} />
            </div>
          </div>

          <div className="toolbar-row">
            <Icon name="info" size={11} />
            <span>Changes appear instantly. <span className="kbd">Auto-saved</span> in your browser.</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

// =============================================================================
// LANDING / HERO
// =============================================================================
function Landing({ onStart, onReset, hasSavedData }) {
  const { Icon } = window;
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="#">
            <img src="/images/logos/fji_orange.png" alt="FirstJobIndia" style={{ width: 28, height: 28, objectFit: "contain", display: "block" }} />
            FirstJobIndia
            <span className="brand-sub">Resume Builder</span>
          </a>
          <div className="topbar-actions">
            <a className="btn btn-ghost btn-sm" href="#">Jobs</a>
            <a className="btn btn-ghost btn-sm" href="#">Courses</a>
            <a className="btn btn-ghost btn-sm" href="#">Login</a>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 60, alignItems: "center" }} className="landing-hero">
          {/* LEFT */}
          <div className="fade-up">
            <div className="topbar-tag" style={{ marginBottom: 20, padding: "6px 12px", fontSize: 12 }}>
              <span className="ai-tag"><Icon name="sparkles" size={9} /> AI</span> Now with a Claude-powered writing assistant
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 56, lineHeight: 1.05, letterSpacing: "-0.025em", margin: "0 0 20px", fontWeight: 700 }}>
              Build a resume that gets you <span style={{ color: "var(--accent)" }}>your first job</span>.
            </h1>
            <p style={{ color: "var(--ink-2)", fontSize: 17, lineHeight: 1.55, margin: "0 0 32px", maxWidth: 540 }}>
              Six professional formats, India-specific fields, and an AI assistant that writes your objective, sharpens your bullet points, and reviews your resume like a real recruiter. No signup. No watermark.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="btn btn-primary" onClick={onStart} style={{ fontSize: 15, padding: "14px 22px" }}>
                {hasSavedData ? <>Continue building <Icon name="arrowRight" size={14} /></> : <><Icon name="rocket" size={14} /> Start building - free</>}
              </button>
              {hasSavedData && (
                <button className="btn btn-ghost" onClick={onReset} style={{ fontSize: 14, padding: "14px 18px" }}>
                  Start over
                </button>
              )}
            </div>

            <div style={{ display: "flex", gap: 28, marginTop: 40, flexWrap: "wrap" }}>
              {[
                { num: "6", label: "Resume formats" },
                { num: "Free", label: "No signup, no watermark" },
                { num: "ATS", label: "Recruiter-ready output" },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "var(--ink-0)" }}>{s.num}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT - preview stack */}
          <div className="fade-up" style={{ position: "relative", height: 540 }}>
            {/* Background mock 1 */}
            <div style={{
              position: "absolute", left: -20, top: 60, width: 260, height: 360,
              background: "#fff", borderRadius: 8,
              boxShadow: "0 30px 60px -20px rgba(0,0,0,0.7)",
              transform: "rotate(-6deg)",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <window.TemplateThumbnail template="twoColumn" accent={window.RB_DATA.ACCENT_PALETTES.find(a => a.id === "indigo")} />
            </div>
            {/* Background mock 2 */}
            <div style={{
              position: "absolute", right: -10, top: 30, width: 240, height: 340,
              background: "#fff", borderRadius: 8,
              boxShadow: "0 30px 60px -20px rgba(0,0,0,0.7)",
              transform: "rotate(8deg)",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <window.TemplateThumbnail template="creative" accent={window.RB_DATA.ACCENT_PALETTES.find(a => a.id === "burgundy")} />
            </div>
            {/* Foreground featured */}
            <div style={{
              position: "absolute", left: "50%", top: "50%",
              transform: "translate(-50%, -50%)",
              width: 300, height: 420,
              background: "#fff", borderRadius: 10,
              boxShadow: "0 40px 80px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,107,53,0.2)",
              overflow: "hidden",
            }}>
              <window.TemplateThumbnail template="classic" />
            </div>

            {/* Live preview badge */}
            <div style={{
              position: "absolute", right: -10, bottom: 60,
              background: "var(--bg-2)", border: "1px solid var(--accent-line)",
              padding: "10px 14px", borderRadius: 12,
              display: "flex", alignItems: "center", gap: 10,
              boxShadow: "var(--shadow-2)",
            }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--accent-soft)", color: "var(--accent)", display: "grid", placeItems: "center" }}>
                <Icon name="sparkles" size={14} />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600 }}>Live preview</div>
                <div style={{ fontSize: 10, color: "var(--ink-3)" }}>Updates as you type</div>
              </div>
            </div>
          </div>
        </div>

        {/* Templates strip */}
        <section style={{ marginTop: 100 }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div className="section-mini-label" style={{ justifyContent: "center", marginBottom: 8 }}>
              <Icon name="layers" size={11} /> 6 RESUME FORMATS
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 36, letterSpacing: "-0.02em", margin: "0 0 10px" }}>
              One format for every kind of job
            </h2>
            <p className="muted">From IT services to startups, PSUs to consulting - pick what fits.</p>
          </div>
          <div className="template-grid stagger">
            {window.RB_DATA.TEMPLATE_META.map((t) => (
              <div key={t.id} className="template-card" style={{ cursor: "pointer" }} onClick={onStart}>
                <div className="template-card-preview">
                  <window.TemplateThumbnail template={t.id} />
                </div>
                <div className="template-card-body">
                  <h4>{t.name}</h4>
                  <p>{t.description}</p>
                  <div className="template-card-meta">
                    <span className="chip chip-ats">ATS · {t.atsTier}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section style={{ marginTop: 100 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="section-mini-label" style={{ justifyContent: "center", marginBottom: 8 }}>
              <span className="ai-tag"><Icon name="sparkles" size={9} /> AI</span> POWERED BY CLAUDE
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 36, letterSpacing: "-0.02em", margin: "0 0 10px" }}>
              An AI assistant in every step
            </h2>
            <p className="muted">Stuck on what to write? Let AI do the heavy lifting - you stay in control.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="how-grid">
            {[
              { icon: "target", title: "Drafts your objective", text: "Reads your skills & projects, writes 3 tailored options to pick from." },
              { icon: "edit", title: "Sharpens your bullets", text: "Rewrites project points with strong verbs and a focus on impact." },
              { icon: "sparkles", title: "Suggests skills", text: "Recommends in-demand skills for your target role and projects." },
              { icon: "award", title: "Reviews like a recruiter", text: "Grades your resume and gives specific, honest fixes before you apply." },
            ].map((s, i) => (
              <div key={i} className="card card-pad" style={{ position: "relative", overflow: "hidden" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, var(--accent), var(--accent-2))", color: "#1b0a02", display: "grid", placeItems: "center", marginBottom: 12 }}>
                  <Icon name={s.icon} size={16} />
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 15, margin: "0 0 6px" }}>{s.title}</h3>
                <p style={{ fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.5, margin: 0 }}>{s.text}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <span className="text-xs muted-2">Plus: paste any job description and AI tells you exactly how to tailor your resume to it.</span>
          </div>
        </section>

        {/* How it works */}
        <section style={{ marginTop: 100 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 36, letterSpacing: "-0.02em", margin: "0 0 10px" }}>
              7 minutes, start to finish
            </h2>
            <p className="muted">A guided wizard that doesn't waste your time.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="how-grid">
            {[
              { icon: "layers", title: "Pick a format", text: "Six formats engineered for different job types." },
              { icon: "edit", title: "Fill in your story", text: "Smart fields with India-specific options." },
              { icon: "eye", title: "Watch it come alive", text: "Live preview updates as you type." },
              { icon: "download", title: "Download & apply", text: "PDF in seconds. No watermarks. Yours forever." },
            ].map((s, i) => (
              <div key={i} className="card card-pad">
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--accent-soft)", color: "var(--accent)", display: "grid", placeItems: "center", marginBottom: 12 }}>
                  <Icon name={s.icon} size={16} />
                </div>
                <div style={{ fontSize: 11, color: "var(--ink-3)", marginBottom: 4 }}>Step {i + 1}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, margin: "0 0 6px" }}>{s.title}</h3>
                <p style={{ fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.5, margin: 0 }}>{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tips section */}
        <section style={{ marginTop: 100 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center" }}>
            <div>
              <div className="section-mini-label mb-3"><Icon name="award" size={11} /> RECRUITER-APPROVED</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, letterSpacing: "-0.02em", margin: "0 0 16px" }}>
                Built around what Indian recruiters want
              </h2>
              <p className="muted" style={{ lineHeight: 1.6, marginBottom: 20 }}>
                Every format follows what Indian recruiters actually look for in a fresher resume - clear structure, the right fields, and nothing that breaks an applicant tracking system.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "Single page, A4 size - never multi-page for freshers",
                  "10th, 12th & degree scores in standard Indian format",
                  "Project-led layouts (since you don't have job experience yet)",
                  "ATS-friendly fonts, no fancy graphics that break parsing",
                  "Optional declaration line for government & PSU applications",
                ].map((t, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ color: "var(--accent)", marginTop: 2 }}><Icon name="check" size={14} stroke={2.5} /></span>
                    <span style={{ fontSize: 14, color: "var(--ink-1)" }}>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card card-pad" style={{ background: "linear-gradient(135deg, rgba(255,107,53,0.06), transparent)" }}>
              <div className="section-mini-label mb-3" style={{ color: "var(--accent)" }}><Icon name="sparkles" size={11} /> PRO TIP</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, margin: "0 0 12px", lineHeight: 1.3 }}>
                "Numbers beat adjectives, every single time."
              </h3>
              <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.55 }}>
                Don't say <em>"worked on a college project"</em>. Say <em>"built a notes-sharing app used by 800+ students across 4 colleges in Pune."</em>
              </p>
              <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.55, marginBottom: 0 }}>
                Our wizard reminds you to add metrics, suggests strong action verbs, and rates your resume strength before download.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ marginTop: 100, textAlign: "center", padding: "60px 20px", background: "linear-gradient(180deg, rgba(255,107,53,0.06), transparent)", borderRadius: 20, border: "1px solid var(--line)" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 40, letterSpacing: "-0.02em", margin: "0 0 12px" }}>
            Your first job is one resume away.
          </h2>
          <p className="muted" style={{ marginBottom: 28, fontSize: 15 }}>Start now - your work auto-saves in your browser.</p>
          <button className="btn btn-primary" onClick={onStart} style={{ fontSize: 15, padding: "14px 28px" }}>
            <Icon name="rocket" size={14} /> {hasSavedData ? "Continue building" : "Start building - free"}
          </button>
        </section>

        <footer style={{ marginTop: 80, paddingTop: 32, borderTop: "1px solid var(--line)", textAlign: "center", color: "var(--ink-3)", fontSize: 12 }}>
          © 2024 FirstJobIndia · Resume Builder is free forever · No data leaves your browser
        </footer>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .landing-hero { grid-template-columns: 1fr !important; }
          .landing-hero > div:last-child { height: 400px !important; }
          .how-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}

export default App;
