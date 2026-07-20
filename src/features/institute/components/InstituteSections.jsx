import { ContactBlock, FAQ, SectionTitle, Value } from "./InstituteUI";
import { humanize } from "../lib/instituteContent";

export function RevealSection({ children, className = "", id }) {
  return (
    <section
      id={id}
      className={`scroll-mt-18 px-5 py-14 sm:px-8 sm:py-20 ${className}`}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

export function DynamicSection({ name, value }) {
  const title =
    value?.title && typeof value.title === "string"
      ? value.title
      : humanize(name);
  const description =
    value?.description && typeof value.description === "string"
      ? value.description
      : null;
  let content = <Value value={value} />;
  if (name.toLowerCase().includes("faq") && Array.isArray(value))
    content = <FAQ items={value} />;
  if (name === "contact") content = <ContactBlock contact={value} />;
  const displayValue =
    value && typeof value === "object" && !Array.isArray(value)
      ? Object.fromEntries(
          Object.entries(value).filter(
            ([key]) => !["title", "description", "id"].includes(key),
          ),
        )
      : value;
  if (content.type === Value) content = <Value value={displayValue} />;
  return (
    <RevealSection id={value?.id || name} className="odd:bg-[#F7F5F2]">
      <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-14">
        <SectionTitle title={title} description={description} />
        <div className="min-w-0">{content}</div>
      </div>
    </RevealSection>
  );
}
