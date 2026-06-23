import React from "react";
import toast from "@/lib/toast";

/* global window */
// Resume Builder - main app shell

const { useState, useEffect, useRef } = React;

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
const getSampleResume = () => window.RB_DATA.SAMPLE_RESUME;
const normalizeResume = (resume) => {
  const sample = getSampleResume();
  return {
    ...sample,
    ...(resume && typeof resume === "object" ? resume : {}),
    personal: {
      ...sample.personal,
      ...(resume?.personal && typeof resume.personal === "object" ? resume.personal : {}),
    },
    skills: {
      ...sample.skills,
      ...(resume?.skills && typeof resume.skills === "object" ? resume.skills : {}),
    },
  };
};
const loadSavedResume = () => {
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) return normalizeResume(JSON.parse(cached));
  } catch {}
  return normalizeResume();
};
const loadHtml2Pdf = async () => {
  const mod = await import("../../../../node_modules/html2pdf.js/dist/html2pdf.bundle.js");
  return mod.default || mod;
};

function App() {
  const [stepIdx, setStepIdx] = useState(0);
  const [data, setData] = useState(loadSavedResume);

  const [previewZoom, setPreviewZoom] = useState(1);

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
      const html2pdf = await loadHtml2Pdf();
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
      toast.error("Sorry, the PDF could not be generated. Please try again.");
    } finally {
      frame.style.transform = prevTransform;
      setDownloading(false);
    }
  };

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
          <a className="brand" href="/resume">
            <img src="/images/logos/fji_orange.png" alt="FirstJobIndia" style={{ width: 28, height: 28, objectFit: "contain", display: "block" }} />
            FirstJobIndia
            <span className="brand-sub">Resume Builder</span>
          </a>
          <div className="topbar-actions">
            <span className="topbar-tag"><span className="dot" />Auto-saved</span>
            <button className="btn btn-ghost btn-sm" onClick={() => {
              if (confirm("Reset all data and start over?")) {
                localStorage.removeItem(STORAGE_KEY);
                setData(loadSavedResume());
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

export default App;
