import React, { useRef } from "react";
import * as LucideIcons from "lucide-react";

const iconMap = {
  award: LucideIcons.Award,
  arrowLeft: LucideIcons.ArrowLeft,
  arrowRight: LucideIcons.ArrowRight,
  briefcase: LucideIcons.Briefcase,
  check: LucideIcons.Check,
  chevronRight: LucideIcons.ChevronRight,
  code: LucideIcons.Code,
  download: LucideIcons.Download,
  edit: LucideIcons.Edit3,
  eye: LucideIcons.Eye,
  fileText: LucideIcons.FileText,
  github: LucideIcons.GitFork,
  globe: LucideIcons.Globe,
  info: LucideIcons.Info,
  layers: LucideIcons.Layers,
  lightbulb: LucideIcons.Lightbulb,
  linkedin: LucideIcons.Link,
  mail: LucideIcons.Mail,
  minus: LucideIcons.Minus,
  palette: LucideIcons.Palette,
  phone: LucideIcons.Phone,
  pin: LucideIcons.MapPin,
  plus: LucideIcons.Plus,
  rocket: LucideIcons.Rocket,
  save: LucideIcons.Save,
  school: LucideIcons.School,
  sparkles: LucideIcons.Sparkles,
  target: LucideIcons.Target,
  trash: LucideIcons.Trash2,
  user: LucideIcons.User,
};

const Icon = ({ name, size = 16, stroke = 2, ...props }) => {
  const LucideIcon = iconMap[name] || LucideIcons.Circle;
  return <LucideIcon size={size} strokeWidth={stroke} {...props} />;
};

const Field = ({ label, required, icon, help, children }) => (
  <label className="field">
    <span className="field-label">
      {icon && <Icon name={icon} size={12} />}
      {label}
      {required && <span className="req">*</span>}
    </span>
    {children}
    {help && <span className="field-help">{help}</span>}
  </label>
);

const Tip = ({ children }) => (
  <div className="tip">
    <span className="tip-icon">
      <Icon name="lightbulb" size={14} />
    </span>
    <span>{children}</span>
  </div>
);

const TagInput = ({ value = [], onChange, placeholder, suggestions = [] }) => {
  const [draft, setDraft] = React.useState("");
  const add = (tag) => {
    const next = tag.trim();
    if (!next || value.includes(next)) return;
    onChange([...value, next]);
    setDraft("");
  };

  return (
    <div className="tag-input-wrap">
      <div className="tag-list">
        {value.map((tag) => (
          <button
            className="tag"
            key={tag}
            onClick={() => onChange(value.filter((item) => item !== tag))}
            type="button"
            title="Remove"
          >
            {tag} <Icon name="plus" size={10} style={{ transform: "rotate(45deg)" }} />
          </button>
        ))}
      </div>
      <input
        className="input"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            add(draft);
          }
        }}
        placeholder={placeholder}
      />
      {suggestions.length > 0 && (
        <div className="tag-suggestions">
          {suggestions
            .filter((item) => !value.includes(item))
            .slice(0, 16)
            .map((item) => (
              <button className="tag-sugg" key={item} onClick={() => add(item)} type="button">
                <Icon name="plus" size={10} /> {item}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

const BulletEditor = ({ value = [""], onChange, placeholder }) => {
  const update = (index, text) => {
    const next = [...value];
    next[index] = text;
    onChange(next);
  };

  return (
    <div className="bullet-editor">
      {value.map((line, index) => (
        <div className="bullet-row" key={index}>
          <textarea
            className="textarea"
            value={line}
            onChange={(event) => update(index, event.target.value)}
            placeholder={placeholder}
            rows={2}
          />
          <button
            className="btn-icon"
            onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))}
            disabled={value.length === 1}
            type="button"
            aria-label="Remove bullet"
          >
            <Icon name="trash" size={13} />
          </button>
        </div>
      ))}
      <button className="add-btn" onClick={() => onChange([...value, ""])} type="button">
        <Icon name="plus" size={14} /> Add bullet
      </button>
    </div>
  );
};

const PhotoUpload = ({ value, onChange }) => {
  const inputRef = useRef(null);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div
        className="photo-upload"
        onClick={() => inputRef.current?.click()}
        title="Upload photo"
      >
        {value
          ? <img src={value} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <Icon name="user" size={28} />}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button className="btn btn-ghost btn-sm" onClick={() => inputRef.current?.click()} type="button">
            <Icon name="plus" size={12} /> Upload photo
          </button>
          {value && (
            <button className="btn btn-ghost btn-sm" onClick={() => onChange("")} type="button">
              Remove
            </button>
          )}
        </div>
        <span style={{ fontSize: 11, color: "var(--ink-3)" }}>JPG or PNG · max 2 MB</span>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => onChange(reader.result);
          reader.readAsDataURL(file);
        }}
      />
    </div>
  );
};

const CharCounter = ({ value = "", max = 500 }) => (
  <div className="char-counter">
    {value.length}/{max}
  </div>
);

Object.assign(window, {
  Icon,
  Field,
  Tip,
  TagInput,
  BulletEditor,
  PhotoUpload,
  CharCounter,
});
