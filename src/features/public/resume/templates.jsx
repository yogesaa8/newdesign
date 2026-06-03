import React from "react";

/* global window */
// 6 resume templates rendered to the live preview

const { useMemo } = React;

const fmtPhone = (p) => (p && !p.startsWith("+") ? "+91 " + p : p);
const score = (s) => (s.scoreType === "cgpa" ? `${s.score} CGPA` : `${s.score}%`);

// ============================================================
// 1. CLASSIC CHRONOLOGICAL
// ============================================================
const ClassicTemplate = ({ data }) => {
  const p = data.personal;
  return (
    <div className="resume" style={{ fontFamily: '"Source Serif 4", Georgia, serif' }}>
      <div style={{ textAlign: "center", borderBottom: "1.5px solid #111", paddingBottom: 8 }}>
        <h1 style={{ fontSize: 22, fontFamily: '"Source Serif 4", Georgia, serif', letterSpacing: 0 }}>{p.name || "Your Name"}</h1>
        <div style={{ fontSize: 8.5, color: "#444", marginTop: 4, display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>•</span>}{p.phone && <span>{fmtPhone(p.phone)}</span>}
          {p.city && <span>•</span>}{p.city && <span>{p.city}</span>}
          {p.linkedin && <span>•</span>}{p.linkedin && <span>{p.linkedin}</span>}
        </div>
      </div>

      {data.objective && (
        <section style={{ marginTop: 12 }}>
          <h2 style={{ fontFamily: '"Source Serif 4", Georgia, serif', borderBottom: "0.5px solid #333", paddingBottom: 3, marginBottom: 6 }}>Career Objective</h2>
          <p style={{ margin: 0 }}>{data.objective}</p>
        </section>
      )}

      {data.education?.length > 0 && (
        <section style={{ marginTop: 12 }}>
          <h2 style={{ fontFamily: '"Source Serif 4", Georgia, serif', borderBottom: "0.5px solid #333", paddingBottom: 3, marginBottom: 6 }}>Education</h2>
          {data.education.map((e) => (
            <div key={e.id} style={{ marginBottom: 6, display: "flex", justifyContent: "space-between", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: 'inherit', fontWeight: 700 }}>{e.degree}</h3>
                <div className="muted" style={{ fontSize: 8.5 }}>{e.college}{e.board ? ` · ${e.board}` : ""}</div>
              </div>
              <div style={{ textAlign: "right", fontSize: 8.5, color: "#444", whiteSpace: "nowrap" }}>
                <div>{e.yearStart ? `${e.yearStart} – ` : ""}{e.yearEnd}</div>
                {e.score && <div style={{ fontWeight: 600, color: "#111" }}>{score(e)}</div>}
              </div>
            </div>
          ))}
        </section>
      )}

      {data.projects?.length > 0 && (
        <section style={{ marginTop: 12 }}>
          <h2 style={{ fontFamily: '"Source Serif 4", Georgia, serif', borderBottom: "0.5px solid #333", paddingBottom: 3, marginBottom: 6 }}>Projects</h2>
          {data.projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3 style={{ fontWeight: 700 }}>{proj.title}</h3>
                <span className="muted" style={{ fontSize: 8.5 }}>{proj.year}</span>
              </div>
              {proj.stack && <div style={{ fontSize: 8.5, color: "#555", fontStyle: "italic" }}>{proj.stack}</div>}
              <ul>{proj.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
            </div>
          ))}
        </section>
      )}

      {data.experience?.length > 0 && (
        <section style={{ marginTop: 12 }}>
          <h2 style={{ fontFamily: '"Source Serif 4", Georgia, serif', borderBottom: "0.5px solid #333", paddingBottom: 3, marginBottom: 6 }}>Internships</h2>
          {data.experience.map((x) => (
            <div key={x.id} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3 style={{ fontWeight: 700 }}>{x.role} · <span style={{ fontWeight: 500 }}>{x.company}</span></h3>
                <span className="muted" style={{ fontSize: 8.5 }}>{x.yearStart} – {x.yearEnd}</span>
              </div>
              <ul>{x.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
            </div>
          ))}
        </section>
      )}

      {(data.skills?.technical?.length || data.skills?.tools?.length || data.skills?.soft?.length) > 0 && (
        <section style={{ marginTop: 12 }}>
          <h2 style={{ fontFamily: '"Source Serif 4", Georgia, serif', borderBottom: "0.5px solid #333", paddingBottom: 3, marginBottom: 6 }}>Skills</h2>
          {data.skills.technical?.length > 0 && <div><strong>Technical:</strong> {data.skills.technical.join(", ")}</div>}
          {data.skills.tools?.length > 0 && <div><strong>Tools:</strong> {data.skills.tools.join(", ")}</div>}
          {data.skills.soft?.length > 0 && <div><strong>Soft Skills:</strong> {data.skills.soft.join(", ")}</div>}
          {data.skills.languages?.length > 0 && <div><strong>Languages:</strong> {data.skills.languages.join(", ")}</div>}
        </section>
      )}

      {data.achievements?.length > 0 && (
        <section style={{ marginTop: 12 }}>
          <h2 style={{ fontFamily: '"Source Serif 4", Georgia, serif', borderBottom: "0.5px solid #333", paddingBottom: 3, marginBottom: 6 }}>Achievements & Activities</h2>
          <ul>{data.achievements.map((a, i) => <li key={i}>{a}</li>)}</ul>
        </section>
      )}

      {data.declaration && (
        <section style={{ marginTop: 14, fontSize: 8, color: "#666", fontStyle: "italic" }}>
          <strong style={{ color: "#222" }}>Declaration:</strong> I hereby declare that the information furnished above is true to the best of my knowledge.
          <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between" }}>
            <span>Date: ___________</span>
            <span>Signature: <strong style={{ color: "#222" }}>{p.name}</strong></span>
          </div>
        </section>
      )}
    </div>
  );
};

// ============================================================
// 2. SKILLS-FIRST FUNCTIONAL
// ============================================================
const SkillsFirstTemplate = ({ data }) => {
  const p = data.personal;
  return (
    <div className="resume">
      <div style={{ borderLeft: "3px solid #111", paddingLeft: 12 }}>
        <h1 style={{ fontWeight: 800, letterSpacing: "-0.02em" }}>{p.name || "Your Name"}</h1>
        <div style={{ fontSize: 8.5, color: "#444", marginTop: 2 }}>
          {p.email}{p.phone && ` · ${fmtPhone(p.phone)}`}{p.city && ` · ${p.city}`}{p.linkedin && ` · ${p.linkedin}`}
        </div>
      </div>

      {data.objective && (
        <p style={{ marginTop: 10, fontSize: 9, lineHeight: 1.5 }}>{data.objective}</p>
      )}

      {/* SKILLS CLUSTER - primary section */}
      <section style={{ marginTop: 12, background: "#f5f5f5", padding: "10px 12px", borderRadius: 4 }}>
        <h2 style={{ marginBottom: 8 }}>Core Skills</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px" }}>
          {data.skills.technical?.length > 0 && (
            <div>
              <div className="section-mini-label" style={{ color: "#666", fontSize: 8, marginBottom: 4 }}>TECHNICAL</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {data.skills.technical.map((s, i) => <span key={i} style={{ background: "#fff", border: "0.5px solid #ddd", padding: "1.5px 6px", borderRadius: 3, fontSize: 8.5 }}>{s}</span>)}
              </div>
            </div>
          )}
          {data.skills.tools?.length > 0 && (
            <div>
              <div className="section-mini-label" style={{ color: "#666", fontSize: 8, marginBottom: 4 }}>TOOLS</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {data.skills.tools.map((s, i) => <span key={i} style={{ background: "#fff", border: "0.5px solid #ddd", padding: "1.5px 6px", borderRadius: 3, fontSize: 8.5 }}>{s}</span>)}
              </div>
            </div>
          )}
          {data.skills.soft?.length > 0 && (
            <div>
              <div className="section-mini-label" style={{ color: "#666", fontSize: 8, marginBottom: 4 }}>SOFT SKILLS</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {data.skills.soft.map((s, i) => <span key={i} style={{ background: "#fff", border: "0.5px solid #ddd", padding: "1.5px 6px", borderRadius: 3, fontSize: 8.5 }}>{s}</span>)}
              </div>
            </div>
          )}
          {data.skills.languages?.length > 0 && (
            <div>
              <div className="section-mini-label" style={{ color: "#666", fontSize: 8, marginBottom: 4 }}>LANGUAGES</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {data.skills.languages.map((s, i) => <span key={i} style={{ background: "#fff", border: "0.5px solid #ddd", padding: "1.5px 6px", borderRadius: 3, fontSize: 8.5 }}>{s}</span>)}
              </div>
            </div>
          )}
        </div>
      </section>

      {data.achievements?.length > 0 && (
        <section style={{ marginTop: 12 }}>
          <h2>Key Achievements</h2>
          <ul>{data.achievements.map((a, i) => <li key={i}>{a}</li>)}</ul>
        </section>
      )}

      {data.projects?.length > 0 && (
        <section style={{ marginTop: 12 }}>
          <h2>Projects</h2>
          {data.projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>{proj.title}</h3>
                <span className="muted" style={{ fontSize: 8.5 }}>{proj.year}</span>
              </div>
              {proj.stack && <div style={{ fontSize: 8.5, color: "#555" }}>{proj.stack}</div>}
              <ul>{proj.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
            </div>
          ))}
        </section>
      )}

      {data.education?.length > 0 && (
        <section style={{ marginTop: 12 }}>
          <h2>Education</h2>
          {data.education.map((e) => (
            <div key={e.id} style={{ marginBottom: 4, display: "flex", justifyContent: "space-between" }}>
              <div>
                <h3>{e.degree}</h3>
                <span style={{ fontSize: 8.5, color: "#555" }}>{e.college}{e.board ? ` · ${e.board}` : ""}</span>
              </div>
              <div style={{ textAlign: "right", fontSize: 8.5 }}>
                <div>{e.yearEnd}</div>
                {e.score && <div style={{ fontWeight: 600 }}>{score(e)}</div>}
              </div>
            </div>
          ))}
        </section>
      )}

      {data.experience?.length > 0 && (
        <section style={{ marginTop: 12 }}>
          <h2>Work Experience</h2>
          {data.experience.map((x) => (
            <div key={x.id} style={{ marginBottom: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>{x.role}, {x.company}</h3>
                <span style={{ fontSize: 8.5, color: "#555" }}>{x.yearStart} – {x.yearEnd}</span>
              </div>
              <ul>{x.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

// ============================================================
// 3. TWO-COLUMN MODERN
// ============================================================
const TwoColumnTemplate = ({ data, accent }) => {
  const p = data.personal;
  return (
    <div className="resume" style={{ padding: 0, display: "grid", gridTemplateColumns: "32% 68%" }}>
      {/* SIDEBAR */}
      <aside style={{ background: accent.color, color: "#fff", padding: "24px 16px" }}>
        {p.photo && (
          <div style={{ width: 84, height: 84, borderRadius: "50%", overflow: "hidden", margin: "0 auto 12px", border: "2px solid rgba(255,255,255,0.4)" }}>
            <img src={p.photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}
        <h1 style={{ fontSize: 16, color: "#fff", textAlign: "center", letterSpacing: "-0.01em", marginBottom: 14 }}>{p.name || "Your Name"}</h1>

        <h2 style={{ color: "rgba(255,255,255,0.7)", fontSize: 9, marginTop: 12, marginBottom: 5 }}>CONTACT</h2>
        <div style={{ fontSize: 8, lineHeight: 1.7, color: "rgba(255,255,255,0.92)" }}>
          {p.phone && <div>{fmtPhone(p.phone)}</div>}
          {p.email && <div style={{ wordBreak: "break-all" }}>{p.email}</div>}
          {p.city && <div>{p.city}</div>}
          {p.linkedin && <div style={{ wordBreak: "break-all" }}>{p.linkedin}</div>}
          {p.github && <div style={{ wordBreak: "break-all" }}>{p.github}</div>}
        </div>

        {data.skills.technical?.length > 0 && (
          <>
            <h2 style={{ color: "rgba(255,255,255,0.7)", fontSize: 9, marginTop: 14, marginBottom: 5 }}>SKILLS</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
              {[...(data.skills.technical || []), ...(data.skills.tools || [])].map((s, i) => (
                <span key={i} style={{ background: "rgba(255,255,255,0.16)", padding: "2px 6px", borderRadius: 3, fontSize: 7.5 }}>{s}</span>
              ))}
            </div>
          </>
        )}

        {data.skills.languages?.length > 0 && (
          <>
            <h2 style={{ color: "rgba(255,255,255,0.7)", fontSize: 9, marginTop: 14, marginBottom: 5 }}>LANGUAGES</h2>
            <div style={{ fontSize: 8, lineHeight: 1.7 }}>{data.skills.languages.join(" · ")}</div>
          </>
        )}

        {data.certifications?.length > 0 && (
          <>
            <h2 style={{ color: "rgba(255,255,255,0.7)", fontSize: 9, marginTop: 14, marginBottom: 5 }}>CERTIFICATIONS</h2>
            <div style={{ fontSize: 8 }}>
              {data.certifications.map((c) => (
                <div key={c.id} style={{ marginBottom: 4 }}>
                  <div style={{ fontWeight: 600 }}>{c.name}</div>
                  <div style={{ opacity: 0.75 }}>{c.issuer} · {c.year}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </aside>

      {/* MAIN */}
      <main style={{ padding: "24px 20px", color: "#222" }}>
        {data.objective && (
          <section style={{ marginBottom: 12 }}>
            <h2 style={{ color: accent.color, borderBottom: `1px solid ${accent.color}`, paddingBottom: 3 }}>PROFILE</h2>
            <p style={{ marginTop: 6 }}>{data.objective}</p>
          </section>
        )}

        {data.experience?.length > 0 && (
          <section style={{ marginBottom: 12 }}>
            <h2 style={{ color: accent.color, borderBottom: `1px solid ${accent.color}`, paddingBottom: 3 }}>EXPERIENCE</h2>
            {data.experience.map((x) => (
              <div key={x.id} style={{ marginTop: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3 style={{ fontWeight: 700 }}>{x.role}</h3>
                  <span style={{ fontSize: 8.5, color: "#555" }}>{x.yearStart} – {x.yearEnd}</span>
                </div>
                <div style={{ fontSize: 8.5, color: accent.color, fontWeight: 600 }}>{x.company}</div>
                <ul>{x.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
              </div>
            ))}
          </section>
        )}

        {data.projects?.length > 0 && (
          <section style={{ marginBottom: 12 }}>
            <h2 style={{ color: accent.color, borderBottom: `1px solid ${accent.color}`, paddingBottom: 3 }}>PROJECTS</h2>
            {data.projects.map((proj) => (
              <div key={proj.id} style={{ marginTop: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3 style={{ fontWeight: 700 }}>{proj.title}</h3>
                  <span style={{ fontSize: 8.5, color: "#555" }}>{proj.year}</span>
                </div>
                {proj.stack && <div style={{ fontSize: 8.5, color: "#555", fontStyle: "italic" }}>{proj.stack}</div>}
                <ul>{proj.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
              </div>
            ))}
          </section>
        )}

        {data.education?.length > 0 && (
          <section>
            <h2 style={{ color: accent.color, borderBottom: `1px solid ${accent.color}`, paddingBottom: 3 }}>EDUCATION</h2>
            {data.education.map((e) => (
              <div key={e.id} style={{ marginTop: 6, display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ fontWeight: 700 }}>{e.degree}</h3>
                  <span style={{ fontSize: 8.5, color: "#555" }}>{e.college}{e.board ? ` · ${e.board}` : ""}</span>
                </div>
                <div style={{ textAlign: "right", fontSize: 8.5 }}>
                  <div>{e.yearEnd}</div>
                  {e.score && <div style={{ fontWeight: 600, color: accent.color }}>{score(e)}</div>}
                </div>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

// ============================================================
// 4. TECH ATS OPTIMIZED - plain, single-column, keyword-dense
// ============================================================
const TechAtsTemplate = ({ data }) => {
  const p = data.personal;
  return (
    <div className="resume" style={{ fontFamily: "Arial, sans-serif" }}>
      <div style={{ textAlign: "left", paddingBottom: 8, borderBottom: "1.5px solid #000" }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, fontFamily: "Arial, sans-serif" }}>{(p.name || "Your Name").toUpperCase()}</h1>
        <div style={{ fontSize: 9, color: "#222", marginTop: 3 }}>
          {p.email && <span>{p.email}</span>}
          {p.phone && <span> | {fmtPhone(p.phone)}</span>}
          {p.city && <span> | {p.city}</span>}
        </div>
        <div style={{ fontSize: 9, color: "#222" }}>
          {p.linkedin && <span>{p.linkedin}</span>}
          {p.github && <span> | {p.github}</span>}
          {p.portfolio && <span> | {p.portfolio}</span>}
        </div>
      </div>

      {data.objective && (
        <section style={{ marginTop: 10 }}>
          <h2 style={{ fontFamily: "Arial, sans-serif", borderBottom: "1px solid #000" }}>SUMMARY</h2>
          <p style={{ marginTop: 4 }}>{data.objective}</p>
        </section>
      )}

      <section style={{ marginTop: 10 }}>
        <h2 style={{ fontFamily: "Arial, sans-serif", borderBottom: "1px solid #000" }}>TECHNICAL SKILLS</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 4, fontSize: 9 }}>
          <tbody>
            {data.skills.technical?.length > 0 && (
              <tr><td style={{ fontWeight: 700, padding: "2px 0", width: 90, verticalAlign: "top" }}>Languages/Frameworks:</td><td>{data.skills.technical.join(", ")}</td></tr>
            )}
            {data.skills.tools?.length > 0 && (
              <tr><td style={{ fontWeight: 700, padding: "2px 0", verticalAlign: "top" }}>Tools/Platforms:</td><td>{data.skills.tools.join(", ")}</td></tr>
            )}
            {data.skills.soft?.length > 0 && (
              <tr><td style={{ fontWeight: 700, padding: "2px 0", verticalAlign: "top" }}>Soft Skills:</td><td>{data.skills.soft.join(", ")}</td></tr>
            )}
          </tbody>
        </table>
      </section>

      {data.experience?.length > 0 && (
        <section style={{ marginTop: 10 }}>
          <h2 style={{ fontFamily: "Arial, sans-serif", borderBottom: "1px solid #000" }}>EXPERIENCE</h2>
          {data.experience.map((x) => (
            <div key={x.id} style={{ marginTop: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{x.role}, {x.company}</strong>
                <span>{x.yearStart} – {x.yearEnd}</span>
              </div>
              <ul>{x.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
            </div>
          ))}
        </section>
      )}

      {data.projects?.length > 0 && (
        <section style={{ marginTop: 10 }}>
          <h2 style={{ fontFamily: "Arial, sans-serif", borderBottom: "1px solid #000" }}>PROJECTS</h2>
          {data.projects.map((proj) => (
            <div key={proj.id} style={{ marginTop: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{proj.title}{proj.link ? ` (${proj.link})` : ""}</strong>
                <span>{proj.year}</span>
              </div>
              {proj.stack && <div style={{ fontSize: 9 }}>Tech: {proj.stack}</div>}
              <ul>{proj.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
            </div>
          ))}
        </section>
      )}

      {data.education?.length > 0 && (
        <section style={{ marginTop: 10 }}>
          <h2 style={{ fontFamily: "Arial, sans-serif", borderBottom: "1px solid #000" }}>EDUCATION</h2>
          {data.education.map((e) => (
            <div key={e.id} style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <div>
                <strong>{e.degree}</strong>, {e.college}{e.board ? ` (${e.board})` : ""}
              </div>
              <div>{e.score && score(e)} | {e.yearEnd}</div>
            </div>
          ))}
        </section>
      )}

      {data.certifications?.length > 0 && (
        <section style={{ marginTop: 10 }}>
          <h2 style={{ fontFamily: "Arial, sans-serif", borderBottom: "1px solid #000" }}>CERTIFICATIONS</h2>
          <ul>{data.certifications.map((c) => <li key={c.id}><strong>{c.name}</strong> - {c.issuer} ({c.year})</li>)}</ul>
        </section>
      )}

      {data.achievements?.length > 0 && (
        <section style={{ marginTop: 10 }}>
          <h2 style={{ fontFamily: "Arial, sans-serif", borderBottom: "1px solid #000" }}>ACHIEVEMENTS</h2>
          <ul>{data.achievements.map((a, i) => <li key={i}>{a}</li>)}</ul>
        </section>
      )}
    </div>
  );
};

// ============================================================
// 5. CREATIVE PORTFOLIO
// ============================================================
const CreativeTemplate = ({ data, accent }) => {
  const p = data.personal;
  return (
    <div className="resume" style={{ padding: 0 }}>
      {/* HERO HEADER */}
      <header style={{ background: accent.color, color: "#fff", padding: "22px 28px", display: "flex", alignItems: "center", gap: 16 }}>
        {p.photo && (
          <div style={{ width: 70, height: 70, borderRadius: 12, overflow: "hidden", flexShrink: 0, border: "2px solid rgba(255,255,255,0.3)" }}>
            <img src={p.photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 9, opacity: 0.8, letterSpacing: "0.15em", marginBottom: 3 }}>PORTFOLIO · {data.jobCategory?.toUpperCase() || "CREATIVE"}</div>
          <h1 style={{ color: "#fff", fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em" }}>{p.name || "Your Name"}</h1>
          <div style={{ fontSize: 8.5, marginTop: 4, opacity: 0.9 }}>
            {p.email}{p.phone && ` · ${fmtPhone(p.phone)}`}{p.city && ` · ${p.city}`}
          </div>
        </div>
        {/* QR placeholder */}
        <div style={{ width: 54, height: 54, background: "rgba(255,255,255,0.95)", borderRadius: 6, display: "grid", placeItems: "center", padding: 4, flexShrink: 0 }}>
          <svg viewBox="0 0 80 80" width="46" height="46" style={{ display: "block" }}>
            <rect x="0" y="0" width="20" height="20" fill={accent.color}/><rect x="4" y="4" width="12" height="12" fill="#fff"/><rect x="7" y="7" width="6" height="6" fill={accent.color}/>
            <rect x="60" y="0" width="20" height="20" fill={accent.color}/><rect x="64" y="4" width="12" height="12" fill="#fff"/><rect x="67" y="7" width="6" height="6" fill={accent.color}/>
            <rect x="0" y="60" width="20" height="20" fill={accent.color}/><rect x="4" y="64" width="12" height="12" fill="#fff"/><rect x="7" y="67" width="6" height="6" fill={accent.color}/>
            <rect x="28" y="0" width="4" height="4" fill={accent.color}/><rect x="36" y="0" width="4" height="4" fill={accent.color}/><rect x="44" y="4" width="4" height="4" fill={accent.color}/><rect x="52" y="0" width="4" height="4" fill={accent.color}/>
            <rect x="24" y="12" width="4" height="4" fill={accent.color}/><rect x="32" y="16" width="4" height="4" fill={accent.color}/><rect x="40" y="12" width="4" height="4" fill={accent.color}/><rect x="48" y="16" width="4" height="4" fill={accent.color}/><rect x="56" y="24" width="4" height="4" fill={accent.color}/>
            <rect x="0" y="32" width="4" height="4" fill={accent.color}/><rect x="8" y="36" width="4" height="4" fill={accent.color}/><rect x="16" y="32" width="4" height="4" fill={accent.color}/><rect x="24" y="40" width="4" height="4" fill={accent.color}/><rect x="32" y="32" width="4" height="4" fill={accent.color}/><rect x="40" y="36" width="4" height="4" fill={accent.color}/><rect x="48" y="40" width="4" height="4" fill={accent.color}/><rect x="56" y="36" width="4" height="4" fill={accent.color}/><rect x="64" y="40" width="4" height="4" fill={accent.color}/><rect x="72" y="36" width="4" height="4" fill={accent.color}/>
            <rect x="28" y="48" width="4" height="4" fill={accent.color}/><rect x="36" y="52" width="4" height="4" fill={accent.color}/><rect x="44" y="48" width="4" height="4" fill={accent.color}/><rect x="52" y="56" width="4" height="4" fill={accent.color}/>
            <rect x="40" y="64" width="4" height="4" fill={accent.color}/><rect x="48" y="68" width="4" height="4" fill={accent.color}/><rect x="60" y="72" width="4" height="4" fill={accent.color}/><rect x="72" y="64" width="4" height="4" fill={accent.color}/>
          </svg>
        </div>
      </header>

      <div style={{ padding: "16px 28px" }}>
        {data.objective && (
          <p style={{ fontSize: 9.5, lineHeight: 1.55, fontStyle: "italic", color: "#333", marginBottom: 12 }}>"{data.objective}"</p>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "62% 1fr", gap: 18 }}>
          <div>
            {data.projects?.length > 0 && (
              <section style={{ marginBottom: 12 }}>
                <h2 style={{ color: accent.color, fontSize: 11, marginBottom: 8 }}>SELECTED WORK</h2>
                {data.projects.map((proj, idx) => (
                  <div key={proj.id} style={{ position: "relative", paddingLeft: 16, borderLeft: `2px solid ${accent.color}`, marginBottom: 12 }}>
                    <div style={{ position: "absolute", left: -5, top: 4, width: 8, height: 8, borderRadius: "50%", background: accent.color }} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <h3 style={{ fontWeight: 700 }}>{proj.title}</h3>
                      <span style={{ fontSize: 8, color: "#666" }}>{proj.year}</span>
                    </div>
                    {proj.role && <div style={{ fontSize: 8.5, color: accent.color, fontWeight: 600, marginBottom: 3 }}>{proj.role}{proj.stack && ` · ${proj.stack}`}</div>}
                    <ul style={{ marginTop: 3 }}>{proj.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
                  </div>
                ))}
              </section>
            )}

            {data.experience?.length > 0 && (
              <section>
                <h2 style={{ color: accent.color, fontSize: 11, marginBottom: 6 }}>EXPERIENCE</h2>
                {data.experience.map((x) => (
                  <div key={x.id} style={{ marginBottom: 6 }}>
                    <h3>{x.role} · <span style={{ fontWeight: 500 }}>{x.company}</span></h3>
                    <div style={{ fontSize: 8.5, color: "#666" }}>{x.yearStart} – {x.yearEnd}</div>
                    <ul>{x.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
                  </div>
                ))}
              </section>
            )}
          </div>

          <aside>
            <section style={{ background: accent.soft, padding: 10, borderRadius: 6, marginBottom: 10 }}>
              <h2 style={{ color: accent.color, fontSize: 10, marginBottom: 5 }}>CONTACT</h2>
              <div style={{ fontSize: 8.5, lineHeight: 1.6, color: "#222" }}>
                {p.linkedin && <div style={{ wordBreak: "break-all" }}>{p.linkedin}</div>}
                {p.portfolio && <div style={{ wordBreak: "break-all" }}>{p.portfolio}</div>}
                {p.github && <div style={{ wordBreak: "break-all" }}>{p.github}</div>}
              </div>
            </section>

            {data.skills.technical?.length > 0 && (
              <section style={{ marginBottom: 10 }}>
                <h2 style={{ color: accent.color, fontSize: 10, marginBottom: 5 }}>SKILLS</h2>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                  {[...data.skills.technical, ...(data.skills.tools || [])].map((s, i) => (
                    <span key={i} style={{ background: accent.soft, color: accent.color, padding: "2px 7px", borderRadius: 999, fontSize: 8, fontWeight: 600 }}>{s}</span>
                  ))}
                </div>
              </section>
            )}

            {data.education?.length > 0 && (
              <section style={{ marginBottom: 10 }}>
                <h2 style={{ color: accent.color, fontSize: 10, marginBottom: 5 }}>EDUCATION</h2>
                {data.education.map((e) => (
                  <div key={e.id} style={{ marginBottom: 4, fontSize: 8.5 }}>
                    <div style={{ fontWeight: 600 }}>{e.degree}</div>
                    <div style={{ color: "#666" }}>{e.college}</div>
                    <div style={{ color: accent.color, fontWeight: 600 }}>{score(e)} · {e.yearEnd}</div>
                  </div>
                ))}
              </section>
            )}

            {data.skills.languages?.length > 0 && (
              <section>
                <h2 style={{ color: accent.color, fontSize: 10, marginBottom: 5 }}>LANGUAGES</h2>
                <div style={{ fontSize: 8.5, color: "#222" }}>{data.skills.languages.join(", ")}</div>
              </section>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// 6. MANAGEMENT / MBA
// ============================================================
const MBATemplate = ({ data }) => {
  const p = data.personal;
  return (
    <div className="resume" style={{ fontFamily: "Georgia, serif" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontFamily: "Georgia, serif", letterSpacing: "0.04em", fontSize: 24, fontWeight: 400, textTransform: "uppercase" }}>{p.name || "Your Name"}</h1>
        <div style={{ fontSize: 8.5, color: "#333", marginTop: 4 }}>
          {p.phone && fmtPhone(p.phone)}{p.email && ` | ${p.email}`}{p.city && ` | ${p.city}`}
          {p.linkedin && <> | {p.linkedin}</>}
        </div>
      </div>
      <hr style={{ borderTop: "2px solid #111", marginTop: 8 }} />
      <hr style={{ borderTop: "0.5px solid #111", marginTop: -4 }} />

      {data.objective && (
        <section style={{ marginTop: 12 }}>
          <h2 style={{ fontFamily: "Georgia, serif", textAlign: "center", fontVariant: "small-caps", letterSpacing: "0.1em", fontWeight: 400, fontSize: 11 }}>Profile</h2>
          <p style={{ marginTop: 4, textAlign: "justify" }}>{data.objective}</p>
        </section>
      )}

      <hr />
      {data.education?.length > 0 && (
        <section>
          <h2 style={{ fontFamily: "Georgia, serif", textAlign: "center", fontVariant: "small-caps", letterSpacing: "0.1em", fontWeight: 400, fontSize: 11 }}>Education</h2>
          {data.education.map((e) => (
            <div key={e.id} style={{ marginTop: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3 style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>{e.degree}</h3>
                <span style={{ fontSize: 8.5 }}>{e.yearEnd}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 8.5 }}>
                <span>{e.college}{e.board ? `, ${e.board}` : ""}</span>
                {e.score && <strong>{score(e)}</strong>}
              </div>
            </div>
          ))}
        </section>
      )}

      <hr />
      {data.experience?.length > 0 && (
        <section>
          <h2 style={{ fontFamily: "Georgia, serif", textAlign: "center", fontVariant: "small-caps", letterSpacing: "0.1em", fontWeight: 400, fontSize: 11 }}>Internships & Experience</h2>
          {data.experience.map((x) => (
            <div key={x.id} style={{ marginTop: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3 style={{ fontFamily: "Georgia, serif" }}>{x.company}</h3>
                <span style={{ fontSize: 8.5 }}>{x.yearStart} – {x.yearEnd}</span>
              </div>
              <div style={{ fontStyle: "italic", fontSize: 9 }}>{x.role}</div>
              <ul>{x.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
            </div>
          ))}
        </section>
      )}

      {data.projects?.length > 0 && (
        <>
          <hr />
          <section>
            <h2 style={{ fontFamily: "Georgia, serif", textAlign: "center", fontVariant: "small-caps", letterSpacing: "0.1em", fontWeight: 400, fontSize: 11 }}>Live Projects & Case Competitions</h2>
            {data.projects.map((proj) => (
              <div key={proj.id} style={{ marginTop: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3 style={{ fontFamily: "Georgia, serif" }}>{proj.title}</h3>
                  <span style={{ fontSize: 8.5 }}>{proj.year}</span>
                </div>
                <ul>{proj.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
              </div>
            ))}
          </section>
        </>
      )}

      {data.achievements?.length > 0 && (
        <>
          <hr />
          <section>
            <h2 style={{ fontFamily: "Georgia, serif", textAlign: "center", fontVariant: "small-caps", letterSpacing: "0.1em", fontWeight: 400, fontSize: 11 }}>Leadership & Achievements</h2>
            <ul>{data.achievements.map((a, i) => <li key={i}>{a}</li>)}</ul>
          </section>
        </>
      )}

      <hr />
      <section>
        <h2 style={{ fontFamily: "Georgia, serif", textAlign: "center", fontVariant: "small-caps", letterSpacing: "0.1em", fontWeight: 400, fontSize: 11 }}>Skills & Interests</h2>
        <div style={{ marginTop: 4 }}>
          {data.skills.technical?.length > 0 && <div><em>Technical:</em> {data.skills.technical.join(", ")}</div>}
          {data.skills.tools?.length > 0 && <div><em>Tools:</em> {data.skills.tools.join(", ")}</div>}
          {data.skills.soft?.length > 0 && <div><em>Soft Skills:</em> {data.skills.soft.join(", ")}</div>}
          {data.skills.languages?.length > 0 && <div><em>Languages:</em> {data.skills.languages.join(", ")}</div>}
        </div>
      </section>
    </div>
  );
};

// ============================================================
// MAIN RESUME PREVIEW DISPATCHER
// ============================================================
const ResumePreview = ({ data }) => {
  const accent = useMemo(() => {
    return window.RB_DATA.ACCENT_PALETTES.find((a) => a.id === data.accent) || window.RB_DATA.ACCENT_PALETTES[0];
  }, [data.accent]);

  switch (data.selectedTemplate) {
    case "classic": return <ClassicTemplate data={data} />;
    case "skillsFirst": return <SkillsFirstTemplate data={data} />;
    case "twoColumn": return <TwoColumnTemplate data={data} accent={accent} />;
    case "techAts": return <TechAtsTemplate data={data} />;
    case "creative": return <CreativeTemplate data={data} accent={accent} />;
    case "mba": return <MBATemplate data={data} />;
    default: return <ClassicTemplate data={data} />;
  }
};

// Thumbnails for template selector (mini-versions)
const TemplateThumbnail = ({ template, accent }) => {
  const a = accent || window.RB_DATA.ACCENT_PALETTES[0];

  const lines = (n, w = 100) => Array.from({ length: n }).map((_, i) => (
    <div key={i} style={{ height: 3, background: "#d4d4d8", borderRadius: 1, width: `${w - i * 8}%`, marginBottom: 3 }} />
  ));

  if (template === "classic") {
    return (
      <div style={{ padding: 18, height: "100%", background: "#fff", color: "#222" }}>
        <div style={{ textAlign: "center", borderBottom: "1.5px solid #222", paddingBottom: 6, marginBottom: 8 }}>
          <div style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 13 }}>Ananya Verma</div>
          <div style={{ fontSize: 6, color: "#777" }}>ananya@email.com · +91 98765 43210</div>
        </div>
        <div style={{ fontSize: 7, fontWeight: 700, marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "0.5px solid #aaa", paddingBottom: 1 }}>Education</div>
        {lines(2)}
        <div style={{ fontSize: 7, fontWeight: 700, marginTop: 6, marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "0.5px solid #aaa", paddingBottom: 1 }}>Projects</div>
        {lines(3)}
        <div style={{ fontSize: 7, fontWeight: 700, marginTop: 6, marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "0.5px solid #aaa", paddingBottom: 1 }}>Skills</div>
        {lines(2)}
      </div>
    );
  }
  if (template === "skillsFirst") {
    return (
      <div style={{ padding: 18, height: "100%", background: "#fff", color: "#222" }}>
        <div style={{ borderLeft: "3px solid #111", paddingLeft: 8 }}>
          <div style={{ fontWeight: 800, fontSize: 13 }}>Ananya Verma</div>
          <div style={{ fontSize: 6, color: "#777" }}>Frontend Developer</div>
        </div>
        <div style={{ background: "#f0f0f0", padding: 8, borderRadius: 3, marginTop: 8 }}>
          <div style={{ fontSize: 7, fontWeight: 700, marginBottom: 4 }}>CORE SKILLS</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
            {["React", "Node", "SQL", "Python", "AWS", "Figma"].map((s, i) => (
              <span key={i} style={{ background: "#fff", border: "0.5px solid #ccc", padding: "1px 4px", borderRadius: 2, fontSize: 6 }}>{s}</span>
            ))}
          </div>
        </div>
        <div style={{ fontSize: 7, fontWeight: 700, marginTop: 6, marginBottom: 3 }}>PROJECTS</div>
        {lines(3)}
      </div>
    );
  }
  if (template === "twoColumn") {
    return (
      <div style={{ height: "100%", background: "#fff", color: "#222", display: "grid", gridTemplateColumns: "32% 68%" }}>
        <div style={{ background: a.color, padding: 12, color: "#fff" }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.3)", margin: "0 auto 8px" }} />
          <div style={{ fontWeight: 700, fontSize: 10, textAlign: "center" }}>Ananya V.</div>
          <div style={{ fontSize: 6, marginTop: 8, opacity: 0.8 }}>CONTACT</div>
          <div style={{ height: 2, background: "rgba(255,255,255,0.3)", marginTop: 3, marginBottom: 2 }} />
          <div style={{ height: 2, background: "rgba(255,255,255,0.3)", marginBottom: 2 }} />
          <div style={{ height: 2, background: "rgba(255,255,255,0.3)", marginBottom: 6 }} />
          <div style={{ fontSize: 6, opacity: 0.8 }}>SKILLS</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 2, marginTop: 3 }}>
            {[1,2,3,4].map(i => <span key={i} style={{ height: 4, width: 14, background: "rgba(255,255,255,0.25)", borderRadius: 2 }} />)}
          </div>
        </div>
        <div style={{ padding: 12 }}>
          <div style={{ fontSize: 7, fontWeight: 700, color: a.color, borderBottom: `1px solid ${a.color}`, paddingBottom: 1, marginBottom: 4 }}>PROFILE</div>
          {lines(2, 95)}
          <div style={{ fontSize: 7, fontWeight: 700, color: a.color, borderBottom: `1px solid ${a.color}`, paddingBottom: 1, marginBottom: 4, marginTop: 6 }}>EXPERIENCE</div>
          {lines(3, 95)}
        </div>
      </div>
    );
  }
  if (template === "techAts") {
    return (
      <div style={{ padding: 14, height: "100%", background: "#fff", color: "#222", fontFamily: "Arial, sans-serif" }}>
        <div style={{ borderBottom: "1.5px solid #000", paddingBottom: 4 }}>
          <div style={{ fontWeight: 700, fontSize: 12 }}>ANANYA VERMA</div>
          <div style={{ fontSize: 6, color: "#222" }}>ananya@email.com | +91 98765 43210</div>
        </div>
        <div style={{ fontSize: 7, fontWeight: 700, marginTop: 6, borderBottom: "1px solid #000" }}>TECHNICAL SKILLS</div>
        <div style={{ fontSize: 6, marginTop: 2 }}>Languages: Python, JavaScript, Java, C++</div>
        <div style={{ fontSize: 6 }}>Tools: Git, Docker, AWS, Kubernetes</div>
        <div style={{ fontSize: 7, fontWeight: 700, marginTop: 6, borderBottom: "1px solid #000" }}>EXPERIENCE</div>
        {lines(3, 95)}
        <div style={{ fontSize: 7, fontWeight: 700, marginTop: 6, borderBottom: "1px solid #000" }}>PROJECTS</div>
        {lines(2, 95)}
      </div>
    );
  }
  if (template === "creative") {
    return (
      <div style={{ height: "100%", background: "#fff", color: "#222" }}>
        <div style={{ background: a.color, color: "#fff", padding: 12, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: "rgba(255,255,255,0.3)" }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 5, opacity: 0.8, letterSpacing: "0.1em" }}>PORTFOLIO</div>
            <div style={{ fontSize: 12, fontWeight: 800 }}>Ananya Verma</div>
          </div>
          <div style={{ width: 18, height: 18, background: "#fff" }} />
        </div>
        <div style={{ padding: 12 }}>
          <div style={{ fontSize: 7, color: a.color, fontWeight: 700 }}>SELECTED WORK</div>
          <div style={{ borderLeft: `2px solid ${a.color}`, paddingLeft: 6, marginTop: 4 }}>
            {lines(2, 90)}
          </div>
          <div style={{ borderLeft: `2px solid ${a.color}`, paddingLeft: 6, marginTop: 4 }}>
            {lines(2, 90)}
          </div>
        </div>
      </div>
    );
  }
  if (template === "mba") {
    return (
      <div style={{ padding: 14, height: "100%", background: "#fff", color: "#222", fontFamily: "Georgia, serif" }}>
        <div style={{ textAlign: "center", letterSpacing: "0.06em", fontSize: 12, textTransform: "uppercase" }}>Ananya Verma</div>
        <div style={{ fontSize: 6, color: "#555", textAlign: "center", marginTop: 2 }}>MBA · IIM Indore Candidate</div>
        <div style={{ borderTop: "1.5px solid #111", marginTop: 4 }} />
        <div style={{ borderTop: "0.5px solid #111", marginTop: 1 }} />
        <div style={{ fontSize: 7, textAlign: "center", marginTop: 6, fontVariant: "small-caps", letterSpacing: "0.1em" }}>Profile</div>
        {lines(2, 95)}
        <hr style={{ borderTop: "0.5px solid #ddd", margin: "6px 0" }} />
        <div style={{ fontSize: 7, textAlign: "center", fontVariant: "small-caps", letterSpacing: "0.1em" }}>Education</div>
        {lines(2, 95)}
        <hr style={{ borderTop: "0.5px solid #ddd", margin: "6px 0" }} />
        <div style={{ fontSize: 7, textAlign: "center", fontVariant: "small-caps", letterSpacing: "0.1em" }}>Internships</div>
        {lines(2, 95)}
      </div>
    );
  }
  return null;
};

Object.assign(window, { ResumePreview, TemplateThumbnail });
