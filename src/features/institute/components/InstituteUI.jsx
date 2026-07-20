import {
  ArrowRight,
  Check,
  ChevronDown,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { createElement } from "react";
import { Link } from "react-router-dom";
import { humanize, isButton, isImage, isPresent } from "../lib/instituteContent";

export function SmartImage({ image, className = "", eager = false, hideContainerOnError = false }) {
  if (!isImage(image)) return null;
  return (
    <img
      src={image.src}
      alt={image.alt || ""}
      className={className}
      loading={eager ? "eager" : "lazy"}
      onError={(event) => {
        if (hideContainerOnError && event.currentTarget.parentElement) {
          event.currentTarget.parentElement.style.display = "none";
        } else {
          event.currentTarget.style.display = "none";
        }
      }}
    />
  );
}

export function Action({ button, className = "", children }) {
  if (!isButton(button)) return null;
  const content = (
    <>
      {children || button.label}
      <ArrowRight className="shrink-0" size={17} />
    </>
  );
  const classes = `inline-flex max-w-full items-center justify-center gap-2 rounded-full bg-[#FF6B35] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#FF9566] focus:outline-none focus:ring-2 focus:ring-[#C6AFFF] focus:ring-offset-2 ${className}`;
  if (button.url.startsWith("/") || button.url.startsWith("#"))
    return (
      <Link to={button.url} className={classes}>
        {content}
      </Link>
    );
  return (
    <a
      href={button.url}
      className={classes}
      target={button.openInNewTab ? "_blank" : undefined}
      rel={button.openInNewTab ? "noreferrer" : undefined}
    >
      {content}
      {button.openInNewTab && <ExternalLink size={14} />}
    </a>
  );
}

export function SectionTitle({ eyebrow, title, description, light = false }) {
  return (
    <div className="max-w-2xl">
      {eyebrow && (
        <p
          className={`mb-3 text-xs font-bold uppercase tracking-[0.2em] ${light ? "text-[#C6AFFF]" : "text-[#8500FA]"}`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-serif text-3xl leading-tight sm:text-4xl ${light ? "text-white" : "text-[#0A0A0A]"}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 leading-7 ${light ? "text-white/70" : "text-[#6F6F76]"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export function Pills({ items, light = false }) {
  if (!Array.isArray(items) || !items.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <span
          key={typeof item === "string" ? item : index}
          className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${light ? "border-white/20 bg-white/10 text-white" : "border-[#EADFD9] bg-white text-[#8500FA]"}`}
        >
          {typeof item === "string"
            ? item
            : item.label || item.title || item.name}
        </span>
      ))}
    </div>
  );
}

function ItemCard({ item }) {
  if (typeof item === "string" || typeof item === "number") {
    return (
      <li className="flex min-w-0 gap-3 break-words leading-7 text-[#6F6F76]">
        <Check className="mt-1 shrink-0 text-[#8500FA]" size={18} />
        {item}
      </li>
    );
  }
  if (!item || typeof item !== "object") return null;
  return (
    <article className="min-w-0 overflow-hidden rounded-2xl border border-[#EADFD9] bg-white p-5">
      {(item.title ||
        item.name ||
        item.label ||
        item.question ||
        item.module) && (
        <p className="break-words font-semibold text-[#0A0A0A]">
          {item.title ||
            item.name ||
            item.label ||
            item.question ||
            (item.module && `Module ${item.module}`)}
        </p>
      )}
      {item.value && (
        <p className="mt-2 text-2xl font-semibold text-[#8500FA]">
          {item.value}
        </p>
      )}
      {item.description && (
        <p className="mt-2 text-sm leading-6 text-[#6F6F76]">
          {item.description}
        </p>
      )}
      {item.answer && (
        <p className="mt-2 text-sm leading-6 text-[#6F6F76]">{item.answer}</p>
      )}
      {item.topics && (
        <ul className="mt-3 space-y-2 text-sm text-[#6F6F76]">
          {item.topics.map((topic) => (
            <li key={topic} className="break-words">• {topic}</li>
          ))}
        </ul>
      )}
      {Object.entries(item)
        .filter(
          ([key, value]) =>
            ![
              "title",
              "name",
              "label",
              "value",
              "description",
              "answer",
              "topics",
              "module",
              "question",
            ].includes(key) && isPresent(value),
        )
        .map(([key, value]) => (
          <div key={key} className="mt-3 min-w-0 text-sm">
            <span className="break-words font-semibold text-[#0A0A0A]">
              {humanize(key)}:{" "}
            </span>
            {typeof value === "object" ? (
              <div className="mt-2">
                <Value value={value} depth={1} />
              </div>
            ) : (
              <span className="text-[#6F6F76]">{String(value)}</span>
            )}
          </div>
        ))}
    </article>
  );
}

export function FAQ({ items }) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <details
          key={item.question || index}
          className="group rounded-2xl border border-[#EADFD9] bg-white p-5"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#0A0A0A]">
            {item.question || item.title || item.name}
            <ChevronDown
              className="shrink-0 transition group-open:rotate-180"
              size={20}
            />
          </summary>
          <div className="mt-4 leading-7 text-[#6F6F76]">
            {item.answer || item.description || <Value value={item} />}
          </div>
        </details>
      ))}
    </div>
  );
}

export function Value({ value, depth = 0 }) {
  if (!isPresent(value)) return null;
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  )
    return <p className="leading-7 text-[#6F6F76]">{String(value)}</p>;
  if (isImage(value))
    return (
      <SmartImage
        image={value}
        className="max-h-96 w-full rounded-2xl object-cover"
      />
    );
  if (isButton(value)) return <Action button={value} />;
  if (Array.isArray(value)) {
    if (value.every((item) => typeof item !== "object"))
      return (
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,15rem),1fr))] gap-3">
          {value.map((item, index) => (
            <ItemCard key={index} item={item} />
          ))}
        </ul>
      );
    return (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,15rem),1fr))] gap-4">
        {value.map((item, index) => (
          <ItemCard
            key={item?.id || item?.title || item?.name || index}
            item={item}
          />
        ))}
      </div>
    );
  }
  return (
    <div className={`grid min-w-0 gap-4 ${depth === 0 ? "grid-cols-[repeat(auto-fit,minmax(min(100%,18rem),1fr))]" : "grid-cols-1"}`}>
      {Object.entries(value)
        .filter(([, item]) => isPresent(item))
        .map(([key, item]) => (
          <div
            key={key}
            className={`min-w-0 ${Array.isArray(item) && item.some((entry) => entry && typeof entry === "object") ? "col-span-full" : ""}`}
          >
            <p className="mb-2 break-words text-xs font-bold uppercase tracking-[0.12em] text-[#8500FA]">
              {humanize(key)}
            </p>
            <Value value={item} depth={depth + 1} />
          </div>
        ))}
    </div>
  );
}

export function ContactBlock({ contact }) {
  const rows = [
    ["phone", Phone],
    ["email", Mail],
    ["address", MapPin],
    ["website", ExternalLink],
  ].filter(([key]) => contact?.[key]);
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {rows.map(([key, Icon]) => {
        const value = contact[key];
        const href =
          key === "phone"
            ? `tel:${value}`
            : key === "email"
              ? `mailto:${value}`
              : key === "website"
                ? value
                : null;
        return (
          <div key={key} className="flex gap-3 rounded-2xl bg-white p-5">
            {createElement(Icon, {
              className: "mt-0.5 text-[#8500FA]",
              size: 20,
            })}
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-[#6F6F76]">
                {humanize(key)}
              </p>
              {href ? (
                <a
                  href={href}
                  className="mt-1 block break-all text-[#8500FA] hover:underline"
                >
                  {value}
                </a>
              ) : (
                <p className="mt-1 text-[#6F6F76]">{value}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
