import React from "react";
import { Helmet } from "react-helmet-async";
import seoConfig from "./seoConfig";
import {
  buildOrganization,
  buildWebSite,
  absoluteUrl,
} from "./schemas";

const useSEO = ({
  title,
  description,
  path = "/",
  ogImage,
  noindex = false,
  graph = [],
} = {}) => {
  const resolvedTitle = title || seoConfig.SITE_NAME;
  const resolvedDescription = description || seoConfig.DEFAULT_DESCRIPTION;
  const canonical = absoluteUrl(path);
  const image = absoluteUrl(ogImage || seoConfig.DEFAULT_OG_IMAGE);
  const language = seoConfig.LOCALE.replace("_", "-");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [buildOrganization(), buildWebSite(), ...graph].filter(Boolean),
  };

  return React.createElement(
    Helmet,
    null,
    React.createElement("title", null, resolvedTitle),
    React.createElement("meta", { name: "description", content: resolvedDescription }),
    React.createElement("link", { rel: "canonical", href: canonical }),
    noindex
      ? React.createElement("meta", { name: "robots", content: "noindex, nofollow" })
      : React.createElement("meta", { name: "robots", content: "index, follow" }),
    React.createElement("meta", { property: "og:type", content: "website" }),
    React.createElement("meta", { property: "og:site_name", content: seoConfig.SITE_NAME }),
    React.createElement("meta", { property: "og:title", content: resolvedTitle }),
    React.createElement("meta", { property: "og:description", content: resolvedDescription }),
    React.createElement("meta", { property: "og:url", content: canonical }),
    React.createElement("meta", { property: "og:image", content: image }),
    React.createElement("meta", { property: "og:locale", content: seoConfig.LOCALE }),
    React.createElement("meta", { name: "twitter:card", content: "summary_large_image" }),
    seoConfig.TWITTER_HANDLE
      ? React.createElement("meta", { name: "twitter:site", content: seoConfig.TWITTER_HANDLE })
      : null,
    React.createElement("meta", { name: "twitter:title", content: resolvedTitle }),
    React.createElement("meta", { name: "twitter:description", content: resolvedDescription }),
    React.createElement("meta", { name: "twitter:image", content: image }),
    React.createElement("link", { rel: "alternate", hrefLang: language, href: canonical }),
    React.createElement("link", { rel: "alternate", hrefLang: "x-default", href: canonical }),
    React.createElement(
      "script",
      { type: "application/ld+json" },
      JSON.stringify(jsonLd),
    ),
  );
};

export default useSEO;
