import seoConfig from "./seoConfig";

const absoluteUrl = (path = "/") => {
  if (!path) return seoConfig.SITE_URL;
  if (path.startsWith("http")) return path;
  return `${seoConfig.SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

const ORG_ID = `${seoConfig.SITE_URL}/#organization`;
const WEBSITE_ID = `${seoConfig.SITE_URL}/#website`;

export const idForPage = (path) => `${absoluteUrl(path)}#webpage`;
export const idForBreadcrumb = (path) => `${absoluteUrl(path)}#breadcrumb`;

export const buildOrganization = () => ({
  "@type": "Organization",
  "@id": ORG_ID,
  name: seoConfig.SITE_NAME,
  legalName: seoConfig.BRAND_LEGAL_NAME,
  url: seoConfig.SITE_URL,
  logo: absoluteUrl(seoConfig.DEFAULT_OG_IMAGE),
  description: seoConfig.DEFAULT_DESCRIPTION,
  sameAs: [...seoConfig.SOCIAL_LINKS],
});

export const buildWebSite = () => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: seoConfig.SITE_URL,
  name: seoConfig.SITE_NAME,
  publisher: { "@id": ORG_ID },
  inLanguage: seoConfig.LOCALE.replace("_", "-"),
  potentialAction: {
    "@type": "SearchAction",
    target: `${seoConfig.SITE_URL}/jobs?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});

export const buildWebPage = ({ path, title, description, breadcrumbPath }) => {
  const node = {
    "@type": "WebPage",
    "@id": idForPage(path),
    url: absoluteUrl(path),
    name: title,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    inLanguage: seoConfig.LOCALE.replace("_", "-"),
    publisher: { "@id": ORG_ID },
  };
  if (breadcrumbPath) {
    node.breadcrumb = { "@id": idForBreadcrumb(breadcrumbPath) };
  }
  return node;
};

export const buildBreadcrumbList = (crumbs, path) => ({
  "@type": "BreadcrumbList",
  "@id": idForBreadcrumb(path),
  itemListElement: crumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: absoluteUrl(crumb.path),
  })),
});

export const buildFAQPage = (faqs) => ({
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

export const buildHowTo = ({ name, description, steps, totalTime }) => {
  const node = {
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
  if (totalTime) node.totalTime = totalTime;
  return node;
};

const parseSalaryRange = (salary) => {
  if (!salary || typeof salary !== "string") return null;
  const cleaned = salary.replace(/[^0-9\-]/g, "");
  const parts = cleaned.split("-").filter(Boolean).map(Number);
  if (parts.length === 0) return null;
  let currency = "INR";
  if (salary.includes("$")) currency = "USD";
  else if (salary.includes("£")) currency = "GBP";
  else if (salary.includes("€")) currency = "EUR";
  const value =
    parts.length === 1
      ? { "@type": "QuantitativeValue", value: parts[0], unitText: "YEAR" }
      : {
          "@type": "QuantitativeValue",
          minValue: parts[0],
          maxValue: parts[1],
          unitText: "YEAR",
        };
  return { "@type": "MonetaryAmount", currency, value };
};

const parseLocation = (location) => {
  if (!location || typeof location !== "string") {
    return { addressCountry: "IN" };
  }
  const segments = location.split(",").map((s) => s.trim()).filter(Boolean);
  const country = segments[segments.length - 1] || "IN";
  const city = segments[0] || undefined;
  const region = segments.length > 2 ? segments[1] : undefined;
  const address = { "@type": "PostalAddress", addressCountry: country };
  if (city) address.addressLocality = city;
  if (region) address.addressRegion = region;
  return address;
};

export const buildJobPosting = (job, path) => {
  const salaryNode = parseSalaryRange(job.salary);
  const address = parseLocation(job.location);
  const node = {
    "@type": "JobPosting",
    "@id": `${absoluteUrl(path)}#jobposting`,
    title: job.title,
    description: job.description || `${job.title} role at ${job.company}.`,
    datePosted: job.updatedAt || job.datePosted || new Date().toISOString().slice(0, 10),
    employmentType: (job.type || "FULL_TIME").toUpperCase().replace(/\s+/g, "_"),
    hiringOrganization: {
      "@type": "Organization",
      name: job.company,
    },
    jobLocation: {
      "@type": "Place",
      address,
    },
    url: absoluteUrl(path),
  };
  if (job.experience) node.experienceRequirements = job.experience;
  if (job.degree) node.educationRequirements = job.degree;
  if (job.skills && Array.isArray(job.skills)) node.skills = job.skills.join(", ");
  if (job.responsibilities && Array.isArray(job.responsibilities)) {
    node.responsibilities = job.responsibilities.join(". ");
  }
  if (salaryNode) node.baseSalary = salaryNode;
  if (job.validThrough) node.validThrough = job.validThrough;
  return node;
};

export const buildItemListOfJobs = (jobs, basePath = "/jobs") =>
  ({
    "@type": "ItemList",
    itemListElement: jobs.map((job, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`${basePath}/${job.id}`),
      name: `${job.title} at ${job.company}`,
    })),
  });

export const buildContactPage = ({ path, title, description, email }) => {
  const node = {
    "@type": "ContactPage",
    "@id": `${absoluteUrl(path)}#contactpage`,
    url: absoluteUrl(path),
    name: title,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORG_ID },
  };
  if (email) {
    node.mainEntity = {
      "@type": "ContactPoint",
      contactType: "customer support",
      email,
    };
  }
  return node;
};

export const buildBook = ({ name, description, path, author, inLanguage, isbn }) => {
  const node = {
    "@type": "Book",
    name,
    description,
    url: absoluteUrl(path),
    publisher: { "@id": ORG_ID },
  };
  if (author) node.author = { "@type": "Person", name: author };
  if (inLanguage) node.inLanguage = inLanguage;
  if (isbn) node.isbn = isbn;
  return node;
};

export const buildCourse = ({ name, description, path, provider }) => ({
  "@type": "Course",
  name,
  description,
  url: absoluteUrl(path),
  provider: provider
    ? { "@type": "Organization", name: provider }
    : { "@id": ORG_ID },
});

export const buildAboutPage = ({ path, title, description }) => ({
  "@type": "AboutPage",
  "@id": `${absoluteUrl(path)}#aboutpage`,
  url: absoluteUrl(path),
  name: title,
  description,
  isPartOf: { "@id": WEBSITE_ID },
  publisher: { "@id": ORG_ID },
});

export { absoluteUrl, ORG_ID, WEBSITE_ID };
