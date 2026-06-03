import React from "react";

/* global window */
// AI layer - powered by Claude (window.claude.complete)

const { useState, useRef } = React;

// ---------------------------------------------------------------------------
// Core helper: call Claude, robustly extract JSON
// ---------------------------------------------------------------------------
const AI_AVAILABLE = typeof window !== "undefined" && window.claude && typeof window.claude.complete === "function";

async function aiText(prompt) {
  if (!AI_AVAILABLE) throw new Error("AI is not available in this environment.");
  const messages = typeof prompt === "string" ? { messages: [{ role: "user", content: prompt }] } : prompt;
  const res = await window.claude.complete(messages);
  return (res || "").trim();
}

function extractJSON(text) {
  if (!text) return null;
  // Strip code fences
  let t = text.replace(/```json/gi, "```").replace(/```/g, "").trim();
  // Find outermost object or array
  const firstObj = t.indexOf("{");
  const firstArr = t.indexOf("[");
  let start = -1, openCh = "{", closeCh = "}";
  if (firstObj === -1 && firstArr === -1) return null;
  if (firstArr !== -1 && (firstArr < firstObj || firstObj === -1)) { start = firstArr; openCh = "["; closeCh = "]"; }
  else { start = firstObj; }
  const end = t.lastIndexOf(closeCh);
  if (start === -1 || end === -1 || end < start) return null;
  const slice = t.slice(start, end + 1);
  try { return JSON.parse(slice); } catch {
    try { return JSON.parse(slice.replace(/,\s*([}\]])/g, "$1")); } catch { return null; }
  }
}

async function aiJSON(prompt) {
  const text = await aiText(prompt);
  const parsed = extractJSON(text);
  if (!parsed) throw new Error("Could not understand the AI response. Please try again.");
  return parsed;
}

// Build a compact text snapshot of the resume for prompts
function resumeSnapshot(data) {
  const p = data.personal || {};
  const cat = (window.RB_DATA.JOB_CATEGORIES.find(c => c.id === data.jobCategory) || {}).label || data.jobCategory;
  const lines = [];
  lines.push(`Candidate: ${p.name || "(unnamed)"} - targeting ${cat} roles in India (fresher / entry-level).`);
  if (data.objective) lines.push(`Current objective: ${data.objective}`);
  if (data.education?.length) {
    lines.push("Education: " + data.education.map(e => `${e.degree} @ ${e.college} (${e.scoreType === "cgpa" ? e.score + " CGPA" : e.score + "%"}, ${e.yearEnd})`).join("; "));
  }
  const skills = [...(data.skills?.technical || []), ...(data.skills?.tools || []), ...(data.skills?.soft || [])];
  if (skills.length) lines.push("Skills: " + skills.join(", "));
  if (data.projects?.length) {
    lines.push("Projects:");
    data.projects.forEach(pr => {
      lines.push(`- ${pr.title} (${pr.stack || "n/a"}): ${(pr.bullets || []).filter(Boolean).join(" | ")}`);
    });
  }
  if (data.experience?.length) {
    lines.push("Internships:");
    data.experience.forEach(x => {
      lines.push(`- ${x.role} @ ${x.company}: ${(x.bullets || []).filter(Boolean).join(" | ")}`);
    });
  }
  if (data.achievements?.length) lines.push("Achievements: " + data.achievements.join("; "));
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// useAi hook - loading / error state wrapper
// ---------------------------------------------------------------------------
function useAi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const run = async (fn) => {
    setLoading(true); setError(null);
    try { return await fn(); }
    catch (e) { setError(e.message || "Something went wrong. Try again."); return null; }
    finally { setLoading(false); }
  };
  return { loading, error, run, available: AI_AVAILABLE };
}

// ---------------------------------------------------------------------------
// Shared AI button
// ---------------------------------------------------------------------------
const AiButton = ({ loading, children, onClick, variant = "soft", size = "sm", disabled, style, title }) => {
  const { Icon } = window;
  return (
    <button
      type="button"
      className={`btn btn-${variant} ${size === "sm" ? "btn-sm" : ""} ai-btn`}
      onClick={onClick}
      disabled={loading || disabled}
      style={style}
      title={title}
    >
      {loading
        ? <span className="ai-spinner" />
        : <Icon name="sparkles" size={size === "sm" ? 12 : 14} />}
      {children}
    </button>
  );
};

const AiError = ({ error }) =>
  error ? (
    <div className="ai-error">
      <window.Icon name="info" size={12} /> {error}
    </div>
  ) : null;

const AiLabel = () => (
  <span className="ai-tag"><window.Icon name="sparkles" size={9} /> AI</span>
);

// ===========================================================================
// 1. OBJECTIVE GENERATOR
// ===========================================================================
const AiObjectiveGenerator = ({ data, onPick }) => {
  const { loading, error, run, available } = useAi();
  const [options, setOptions] = useState([]);
  const { Icon } = window;

  if (!available) return null;

  const generate = () => run(async () => {
    const cat = (window.RB_DATA.JOB_CATEGORIES.find(c => c.id === data.jobCategory) || {}).label || "the role";
    const prompt = `You are an expert Indian career coach helping a fresher (entry-level, recent graduate) write a resume career objective.

${resumeSnapshot(data)}

Write 3 distinct career objective options for a ${cat} role. Rules:
- Each 2-3 sentences, 150-280 characters.
- Confident but not arrogant; specific to THIS candidate's real skills/projects above.
- Mention the target role and what they bring. No clichés like "hardworking team player".
- Indian-English, professional. Do NOT invent fake metrics or jobs.

Return ONLY JSON: {"objectives": ["...", "...", "..."]}`;
    const json = await aiJSON(prompt);
    setOptions(Array.isArray(json.objectives) ? json.objectives.slice(0, 3) : []);
  });

  return (
    <div className="ai-panel">
      <div className="ai-panel-head">
        <div className="ai-panel-title"><Icon name="sparkles" size={13} /> Write it for me <AiLabel /></div>
        <AiButton loading={loading} onClick={generate}>
          {options.length ? "Regenerate" : "Generate 3 options"}
        </AiButton>
      </div>
      <p className="ai-panel-sub">Claude reads your skills, projects & target role, then drafts tailored objectives.</p>
      <AiError error={error} />
      {loading && <AiSkeleton lines={2} count={3} />}
      {!loading && options.length > 0 && (
        <div style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr 1fr", marginTop: 12 }} className="ai-options">
          {options.map((o, i) => (
            <button key={i} type="button" className={`objective-template ${data.objective === o ? "selected" : ""}`} onClick={() => onPick(o)}>
              <div className="objective-template-tag" style={{ display: "flex", alignItems: "center", gap: 5 }}><Icon name="sparkles" size={9} /> AI Draft {i + 1}</div>
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ===========================================================================
// 2. BULLET POLISH (projects / experience)
// ===========================================================================
const AiBulletPolish = ({ title, stack, role, bullets, onApply, kind = "project" }) => {
  const { loading, error, run, available } = useAi();
  const [result, setResult] = useState(null);
  const { Icon } = window;
  const hasContent = (bullets || []).some(b => b && b.trim());

  if (!available) return null;

  const polish = () => run(async () => {
    const prompt = `You are an expert resume editor for Indian freshers. Rewrite these ${kind} bullet points to be stronger.

${kind === "project" ? "Project" : "Role"}: ${title || "(untitled)"}${stack ? ` | Tech: ${stack}` : ""}${role ? ` | Role: ${role}` : ""}
Current bullets:
${(bullets || []).filter(Boolean).map((b, i) => `${i + 1}. ${b}`).join("\n") || "(none yet - write 3 strong starter bullets based on the title)"}

Rules:
- Start each bullet with a strong past-tense action verb (Built, Led, Reduced, Designed...).
- Lead with impact/outcome. Keep real facts; do NOT invent fake numbers or companies.
- Where the candidate clearly had a measurable result but didn't quantify it, keep it qualitative - never fabricate.
- Each bullet under 200 characters, crisp, no fluff.
- Return the SAME number of bullets (or 3 if none existed).

Return ONLY JSON: {"bullets": ["...", "..."]}`;
    const json = await aiJSON(prompt);
    if (Array.isArray(json.bullets)) setResult(json.bullets);
  });

  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <AiButton loading={loading} onClick={polish} disabled={!title && !hasContent}>
          {hasContent ? "Polish bullets with AI" : "Draft bullets with AI"}
        </AiButton>
        {!title && !hasContent && <span className="text-xs muted-2">Add a title first</span>}
      </div>
      <AiError error={error} />
      {result && (
        <div className="ai-diff">
          <div className="ai-diff-head">
            <span><Icon name="sparkles" size={11} /> AI suggestions</span>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="btn btn-primary btn-sm" onClick={() => { onApply(result); setResult(null); }}>
                <Icon name="check" size={11} /> Use these
              </button>
              <button className="btn btn-ghost btn-sm" onClick={() => setResult(null)}>Dismiss</button>
            </div>
          </div>
          <ul className="ai-diff-list">
            {result.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
};

// ===========================================================================
// 3. SKILL SUGGESTIONS
// ===========================================================================
const AiSkillSuggest = ({ data, onAdd }) => {
  const { loading, error, run, available } = useAi();
  const [sugg, setSugg] = useState(null);
  const { Icon } = window;

  if (!available) return null;

  const suggest = () => run(async () => {
    const cat = (window.RB_DATA.JOB_CATEGORIES.find(c => c.id === data.jobCategory) || {}).label || "the role";
    const existing = [...(data.skills?.technical || []), ...(data.skills?.tools || []), ...(data.skills?.soft || [])];
    const projText = (data.projects || []).map(p => `${p.title} (${p.stack})`).join("; ");
    const prompt = `You are a technical recruiter in India hiring freshers for ${cat} roles.

Candidate's projects: ${projText || "none yet"}
Skills they already listed: ${existing.join(", ") || "none"}

Suggest additional relevant, in-demand skills they should consider adding (only realistic ones a fresher might genuinely have, given their projects). Do NOT repeat skills they already listed.

Return ONLY JSON: {"technical": ["..."], "tools": ["..."], "soft": ["..."]} with 3-6 items each.`;
    const json = await aiJSON(prompt);
    setSugg(json);
  });

  const groupLabels = { technical: "Technical", tools: "Tools", soft: "Soft Skills" };

  return (
    <div className="ai-panel" style={{ marginTop: 16 }}>
      <div className="ai-panel-head">
        <div className="ai-panel-title"><Icon name="sparkles" size={13} /> Suggest skills for me <AiLabel /></div>
        <AiButton loading={loading} onClick={suggest}>{sugg ? "Refresh" : "Suggest skills"}</AiButton>
      </div>
      <p className="ai-panel-sub">Based on your target role and projects. Tap any chip to add it.</p>
      <AiError error={error} />
      {sugg && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
          {["technical", "tools", "soft"].map(g => (
            (sugg[g] && sugg[g].length) ? (
              <div key={g}>
                <div className="section-mini-label mb-2">{groupLabels[g]}</div>
                <div className="tag-suggestions" style={{ marginTop: 0 }}>
                  {sugg[g].map((s, i) => (
                    <button key={i} type="button" className="tag-sugg" onClick={() => onAdd(g, s)}>
                      <Icon name="plus" size={10} /> {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : null
          ))}
        </div>
      )}
    </div>
  );
};

// ===========================================================================
// 4. RESUME REVIEW
// ===========================================================================
const AiResumeReview = ({ data }) => {
  const { loading, error, run, available } = useAi();
  const [review, setReview] = useState(null);
  const { Icon } = window;

  if (!available) return null;

  const reviewNow = () => run(async () => {
    const prompt = `You are a senior HR manager at a top Indian company reviewing a fresher's resume. Be honest, specific and encouraging.

${resumeSnapshot(data)}

Evaluate the resume. Return ONLY JSON:
{
  "score": <0-100 integer>,
  "verdict": "<one short sentence>",
  "strengths": ["<2-4 specific strengths>"],
  "improvements": ["<3-5 specific, actionable fixes - reference the actual content>"]
}`;
    const json = await aiJSON(prompt);
    setReview(json);
  });

  return (
    <div className="ai-panel" style={{ borderColor: "var(--accent-line)" }}>
      <div className="ai-panel-head">
        <div className="ai-panel-title"><Icon name="award" size={13} /> Get an AI recruiter review <AiLabel /></div>
        <AiButton loading={loading} onClick={reviewNow} variant="primary">{review ? "Re-run review" : "Review my resume"}</AiButton>
      </div>
      <p className="ai-panel-sub">Claude role-plays an Indian HR manager and grades your resume with specific fixes.</p>
      <AiError error={error} />
      {loading && <AiSkeleton lines={3} count={2} />}
      {review && !loading && (
        <div className="ai-review">
          <div className="ai-review-top">
            <div className="ai-review-score">
              <div className="ai-review-score-num">{review.score}</div>
              <div className="ai-review-score-lbl">/ 100</div>
            </div>
            <div className="ai-review-verdict">{review.verdict}</div>
          </div>
          <div className="ai-review-cols">
            <div>
              <div className="section-mini-label mb-2" style={{ color: "var(--ok)" }}><Icon name="check" size={11} /> STRENGTHS</div>
              <ul className="ai-review-list ok">
                {(review.strengths || []).map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div>
              <div className="section-mini-label mb-2" style={{ color: "var(--accent)" }}><Icon name="lightbulb" size={11} /> IMPROVE</div>
              <ul className="ai-review-list warn">
                {(review.improvements || []).map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ===========================================================================
// 5. JOB DESCRIPTION TAILORING
// ===========================================================================
const AiJobTailor = ({ data, onAddSkills, onUseObjective }) => {
  const { loading, error, run, available } = useAi();
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);
  const { Icon } = window;

  if (!available) return null;

  const tailor = () => run(async () => {
    const prompt = `You are a resume optimisation expert. A fresher wants to tailor their resume to a specific job posting.

THEIR RESUME:
${resumeSnapshot(data)}

JOB DESCRIPTION:
${jd}

Analyse the match. Return ONLY JSON:
{
  "matchScore": <0-100 integer>,
  "matchSummary": "<one sentence>",
  "missingKeywords": ["<keywords/skills in the JD missing from the resume that the candidate could plausibly add>"],
  "suggestions": ["<2-4 concrete tailoring tips>"],
  "tailoredObjective": "<a rewritten 2-3 sentence career objective tuned to this JD, 150-280 chars>"
}`;
    const json = await aiJSON(prompt);
    setResult(json);
  });

  return (
    <div className="ai-panel">
      <div className="ai-panel-head">
        <div className="ai-panel-title"><Icon name="target" size={13} /> Tailor to a job posting <AiLabel /></div>
      </div>
      <p className="ai-panel-sub">Paste a job description - Claude scores your match and tells you exactly what to add.</p>
      <textarea
        className="textarea"
        value={jd}
        onChange={(e) => setJd(e.target.value)}
        placeholder="Paste the full job description here (responsibilities, requirements, skills)…"
        style={{ minHeight: 100, marginTop: 8 }}
      />
      <div style={{ marginTop: 10 }}>
        <AiButton loading={loading} onClick={tailor} variant="primary" size="md" disabled={jd.trim().length < 40}>
          {jd.trim().length < 40 ? "Paste a job description first" : "Analyse match"}
        </AiButton>
      </div>
      <AiError error={error} />
      {result && !loading && (
        <div className="ai-tailor-result">
          <div className="ai-tailor-match">
            <div style={{ position: "relative", width: 64, height: 64 }}>
              <svg viewBox="0 0 36 36" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--bg-3)" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--accent)" strokeWidth="3" strokeDasharray={`${result.matchScore}, 100`} strokeLinecap="round" />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15 }}>{result.matchScore}%</div>
            </div>
            <div style={{ flex: 1 }}>
              <div className="section-mini-label mb-2">JOB MATCH</div>
              <div style={{ fontSize: 13, color: "var(--ink-1)" }}>{result.matchSummary}</div>
            </div>
          </div>

          {result.missingKeywords?.length > 0 && (
            <div style={{ marginTop: 14 }}>
              <div className="section-mini-label mb-2"><Icon name="plus" size={11} /> MISSING KEYWORDS - tap to add to skills</div>
              <div className="tag-suggestions" style={{ marginTop: 0 }}>
                {result.missingKeywords.map((k, i) => (
                  <button key={i} className="tag-sugg" onClick={() => onAddSkills(k)}>
                    <Icon name="plus" size={10} /> {k}
                  </button>
                ))}
              </div>
            </div>
          )}

          {result.suggestions?.length > 0 && (
            <div style={{ marginTop: 14 }}>
              <div className="section-mini-label mb-2"><Icon name="lightbulb" size={11} /> HOW TO TAILOR</div>
              <ul className="ai-review-list warn">
                {result.suggestions.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}

          {result.tailoredObjective && (
            <div style={{ marginTop: 14 }}>
              <div className="section-mini-label mb-2"><Icon name="target" size={11} /> TAILORED OBJECTIVE</div>
              <div className="surface" style={{ padding: 12, fontSize: 12.5, lineHeight: 1.55, color: "var(--ink-1)" }}>
                {result.tailoredObjective}
                <div style={{ marginTop: 10 }}>
                  <button className="btn btn-soft btn-sm" onClick={() => onUseObjective(result.tailoredObjective)}>
                    <Icon name="check" size={11} /> Use as my objective
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Skeleton loader
// ---------------------------------------------------------------------------
const AiSkeleton = ({ lines = 2, count = 1 }) => (
  <div style={{ display: "grid", gap: 10, gridTemplateColumns: count > 1 ? `repeat(${count}, 1fr)` : "1fr", marginTop: 12 }}>
    {Array.from({ length: count }).map((_, c) => (
      <div key={c} className="ai-skeleton-card">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="ai-skeleton-line" style={{ width: `${90 - i * 12}%` }} />
        ))}
      </div>
    ))}
  </div>
);

Object.assign(window, {
  AI_AVAILABLE, aiText, aiJSON, useAi, AiButton, AiError, AiLabel, AiSkeleton,
  AiObjectiveGenerator, AiBulletPolish, AiSkillSuggest, AiResumeReview, AiJobTailor,
  resumeSnapshot,
});
