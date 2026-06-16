import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Compass,
  ExternalLink,
  FileText,
  Filter,
  GraduationCap,
  Globe2,
  Landmark,
  Lock,
  Mail,
  Map,
  Menu,
  Plane,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  University,
  WalletCards,
  X,
} from "lucide-react";
import Footer from "../../components/Footer";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar,
  NavbarButton,
  NavbarLogo,
  NavBody,
  NavItems,
} from "../../../../components/ui/resizable-navbar";
import { Link } from "react-router-dom";
import navItems from "../../data/headerData.json";
import useSEO from "@/seo/useSEO";
import seoMeta from "@/data/seoMeta";
import {
  buildWebPage,
  buildBreadcrumbList,
  buildHowTo,
  buildCourse,
} from "@/seo/schemas";

const resources = [
  {
    title: "Chevening Scholarship",
    category: "Scholarships",
    country: "UK",
    course: "All Courses",
    deadline: "Nov",
    url: "https://www.chevening.org/scholarships/",
    icon: Landmark,
    description:
      "I can apply for the UK government's flagship scholarship covering full tuition, living costs, and flights for a 1-year Master's.",
    get: "Open the official portal, check eligibility, and study past SOP patterns from Indian scholars.",
  },
  {
    title: "Fulbright-Nehru Master's Fellowship",
    category: "Scholarships",
    country: "USA",
    course: "All Courses",
    deadline: "Jul",
    url: "https://www.usief.org.in/Fulbright-Nehru-Master-Fellowships.aspx",
    icon: Landmark,
    description:
      "I can plan a fully funded US Master's route with tuition, living support, and health insurance through USIEF.",
    get: "Read application rules, fellow profiles, and the official Indian applicant process.",
  },
  {
    title: "DAAD Scholarship",
    category: "Scholarships",
    country: "Germany",
    course: "Engineering & Tech",
    deadline: "Oct-Dec",
    url: "https://www.daad.de/en/",
    icon: Landmark,
    description:
      "I can find German postgraduate and research funding, including monthly stipend support for public university routes.",
    get: "Use the DAAD finder, checklist, and language requirement guide.",
  },
  {
    title: "Australia Awards",
    category: "Scholarships",
    country: "Australia",
    course: "All Courses",
    deadline: "Apr",
    url: "https://www.australiaawards.gov.au/",
    icon: Landmark,
    description:
      "I can explore Australian government scholarships covering tuition, airfare, living expenses, and health cover.",
    get: "Check eligibility and country-specific application advice.",
  },
  {
    title: "National Overseas Scholarship",
    category: "Scholarships",
    country: "Global",
    course: "All Courses",
    deadline: "Mar",
    url: "https://nosmsm.gov.in/",
    icon: Landmark,
    description:
      "I can apply for Government of India overseas support for eligible SC, ST, and OBC students pursuing Master's or PhD abroad.",
    get: "Use the online portal, eligibility rules, and document checklist.",
  },
  {
    title: "MEXT Scholarship",
    category: "Scholarships",
    country: "Japan",
    course: "Sciences",
    deadline: "May-Jun",
    url: "https://www.in.emb-japan.go.jp/itpr_en/edu_mext.html",
    icon: Landmark,
    description:
      "I can apply for Japan's government scholarship with tuition, monthly allowance, and airfare through the embassy route.",
    get: "Read the official guide and application process through the Indian Embassy.",
  },
  {
    title: "Commonwealth Scholarships",
    category: "Scholarships",
    country: "UK",
    course: "Public Policy",
    deadline: "Oct",
    url: "https://cscuk.fcdo.gov.uk/",
    icon: Landmark,
    description:
      "I can pursue Commonwealth-funded postgraduate options with tuition and living support through the nomination route.",
    get: "Understand nomination, eligible universities, and AIU process.",
  },
  {
    title: "Inlaks Shivdasani Foundation",
    category: "Scholarships",
    country: "Global",
    course: "Arts & Humanities",
    deadline: "Feb",
    url: "https://www.inlaksfoundation.org/scholarships/",
    icon: Landmark,
    description:
      "I can target selective global funding up to USD 100,000 for outstanding Indian applicants.",
    get: "Review application form, past scholars, and interview expectations.",
  },
  {
    title: "JN Tata Endowment",
    category: "Finance",
    country: "Global",
    course: "All Courses",
    deadline: "Feb-Mar",
    url: "https://www.jntataendowment.org/",
    icon: WalletCards,
    description:
      "I can apply for a loan scholarship that may partially convert to a grant for postgraduate study abroad.",
    get: "Check repayment terms and past scholar lists by university.",
  },
  {
    title: "Aga Khan Foundation Scholarship",
    category: "Scholarships",
    country: "Global",
    course: "Public Policy",
    deadline: "Mar-Jun",
    url: "https://www.akdn.org/our-agencies/aga-khan-foundation/international-scholarship-programme",
    icon: Landmark,
    description:
      "I can explore need-plus-merit aid that combines grant and loan support for service-minded applicants.",
    get: "Check country contacts and application process details.",
  },
  {
    title: "GRE",
    category: "Exams",
    country: "Global",
    course: "Engineering & Tech",
    deadline: "Rolling",
    url: "https://www.ets.org/gre",
    icon: BookOpen,
    description:
      "I can register for the main graduate test used by many US MS and PhD programs and plan my score strategy.",
    get: "Use official registration, free PowerPrep tests, and score-send tools.",
  },
  {
    title: "GMAT",
    category: "Exams",
    country: "Global",
    course: "MBA & Management",
    deadline: "Rolling",
    url: "https://www.mba.com/exams/gmat-exam",
    icon: BookOpen,
    description:
      "I can prepare for MBA admissions worldwide with the official GMAT exam and score reporting system.",
    get: "Register, access a starter kit, and send scores to business schools.",
  },
  {
    title: "IELTS Academic",
    category: "Exams",
    country: "UK",
    course: "All Courses",
    deadline: "Rolling",
    url: "https://www.ielts.org/",
    icon: BookOpen,
    description:
      "I can prove English proficiency for UK, Australia, Canada, and New Zealand applications.",
    get: "Book tests, practice samples, and check university band requirements.",
  },
  {
    title: "TOEFL iBT",
    category: "Exams",
    country: "USA",
    course: "All Courses",
    deadline: "Rolling",
    url: "https://www.ets.org/toefl",
    icon: BookOpen,
    description:
      "I can use TOEFL for US and global admissions where universities prefer an ETS English score.",
    get: "Register, practice free sets, and compare TOEFL with IELTS.",
  },
  {
    title: "GATE",
    category: "Exams",
    country: "Germany",
    course: "Engineering & Tech",
    deadline: "Annual",
    url: "https://gate2025.iitr.ac.in/",
    icon: BookOpen,
    description:
      "I can use a GATE score for selected German, Indian, and Singapore-linked academic opportunities.",
    get: "Open registration, previous papers, and foreign university acceptance references.",
  },
  {
    title: "Buddy4Study",
    category: "Platforms",
    country: "Global",
    course: "All Courses",
    deadline: "Live",
    url: "https://www.buddy4study.com/",
    icon: Globe2,
    description:
      "I can match my profile with thousands of scholarships filtered by income, category, course, and state.",
    get: "Use the matcher, tracker, and deadline reminders.",
  },
  {
    title: "Scholars4Dev",
    category: "Platforms",
    country: "Global",
    course: "All Courses",
    deadline: "Live",
    url: "https://www.scholars4dev.com/",
    icon: Globe2,
    description:
      "I can find fully funded options created for students from developing countries.",
    get: "Browse weekly updated scholarships with direct application links.",
  },
  {
    title: "Vidyasaarathi",
    category: "Platforms",
    country: "India",
    course: "All Courses",
    deadline: "Live",
    url: "https://www.vidyasaarathi.co.in/",
    icon: Globe2,
    description:
      "I can discover corporate CSR scholarships from Indian companies and foundations.",
    get: "Filter CSR funding and apply through one portal.",
  },
  {
    title: "National Scholarship Portal",
    category: "Platforms",
    country: "India",
    course: "All Courses",
    deadline: "Live",
    url: "https://scholarships.gov.in/",
    icon: Globe2,
    description:
      "I can apply to central and state scholarship schemes through the official Government of India portal.",
    get: "Check eligibility, Aadhaar-linked application status, and scheme details.",
  },
  {
    title: "Fastweb",
    category: "Platforms",
    country: "USA",
    course: "All Courses",
    deadline: "Live",
    url: "https://www.fastweb.com/",
    icon: Globe2,
    description:
      "I can find US merit scholarships and build a deadline calendar while applying to American universities.",
    get: "Create profile matches and use the college search tool.",
  },
  {
    title: "UN-Habitat Youth Program",
    category: "Community",
    country: "Global",
    course: "Public Policy",
    deadline: "Live",
    url: "https://unhabitat.org/",
    icon: BriefcaseBusiness,
    description:
      "I can discover internships and fellowships in urban development and sustainable cities.",
    get: "See current openings and UN internship guidance.",
  },
  {
    title: "UNICEF India Internship",
    category: "Community",
    country: "India",
    course: "Public Policy",
    deadline: "Live",
    url: "https://www.unicef.org/india/",
    icon: BriefcaseBusiness,
    description:
      "I can add real development-sector experience to my public policy or social impact profile.",
    get: "Check vacancies, eligibility, and internship application details.",
  },
  {
    title: "World Bank YPP",
    category: "Community",
    country: "Global",
    course: "Public Policy",
    deadline: "Sep",
    url: "https://www.worldbank.org/en/about/careers/programs-and-internships/young-professionals-program",
    icon: BriefcaseBusiness,
    description:
      "I can understand the leadership pathway for young economists, social scientists, and development professionals.",
    get: "Read eligibility, application portal, and cohort profiles.",
  },
  {
    title: "Commonwealth Secretariat Fellowships",
    category: "Community",
    country: "UK",
    course: "Public Policy",
    deadline: "Varies",
    url: "https://thecommonwealth.org/",
    icon: BriefcaseBusiness,
    description:
      "I can explore fellowships across governance, climate, and professional development for Commonwealth applicants.",
    get: "Review available fellowships and eligibility by profession.",
  },
  {
    title: "Germany Student Visa Guide",
    category: "Visa",
    country: "Germany",
    course: "All Courses",
    deadline: "Before intake",
    url: "https://india.diplo.de/in-en/services/visa-einreise/student/2107006",
    icon: Plane,
    description:
      "I can prepare my Germany visa file with blocked account, document checklist, and appointment steps.",
    get: "Open official embassy rules and appointment guidance.",
  },
  {
    title: "Canada Study Permit",
    category: "Visa",
    country: "Canada",
    course: "All Courses",
    deadline: "Before intake",
    url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html",
    icon: Plane,
    description:
      "I can check study permit eligibility, proof of funds, and post-study work planning for Canada.",
    get: "Use IRCC eligibility, checklist, and processing tracker.",
  },
  {
    title: "UK Student Visa",
    category: "Visa",
    country: "UK",
    course: "All Courses",
    deadline: "Before intake",
    url: "https://www.gov.uk/student-visa",
    icon: Plane,
    description:
      "I can prepare my UK Student Visa application with CAS, maintenance funds, and Graduate Route planning.",
    get: "Use official UKVI rules and financial requirement guidance.",
  },
  {
    title: "Australia Student Visa 500",
    category: "Visa",
    country: "Australia",
    course: "All Courses",
    deadline: "Before intake",
    url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
    icon: Plane,
    description:
      "I can apply for Subclass 500 with OSHC, GTE, and work rights information in one place.",
    get: "Open the official application portal and requirement guide.",
  },
  {
    title: "QS World University Rankings",
    category: "Research",
    country: "Global",
    course: "All Courses",
    deadline: "Live",
    url: "https://www.topuniversities.com/",
    icon: University,
    description:
      "I can compare universities by subject, country, reputation, and employability before shortlisting.",
    get: "Filter institutions and compare courses side by side.",
  },
  {
    title: "Times Higher Education",
    category: "Research",
    country: "Global",
    course: "Sciences",
    deadline: "Live",
    url: "https://www.timeshighereducation.com/",
    icon: University,
    description:
      "I can find research-focused universities with strong citation impact and faculty output.",
    get: "Use subject rankings and university profiles.",
  },
  {
    title: "Grad Cafe",
    category: "Research",
    country: "USA",
    course: "All Courses",
    deadline: "Live",
    url: "https://www.thegradcafe.com/",
    icon: University,
    description:
      "I can benchmark real admits and rejects by program, university, year, score, and applicant background.",
    get: "Search admission results to judge reach, moderate, and safe schools.",
  },
  {
    title: "Yocket",
    category: "Research",
    country: "Global",
    course: "Engineering & Tech",
    deadline: "Live",
    url: "https://yocket.com/",
    icon: University,
    description:
      "I can evaluate my profile and compare with Indian students already applying abroad.",
    get: "Use profile evaluation, university match score, and SOP samples.",
  },
  {
    title: "Leverage Edu",
    category: "Research",
    country: "Global",
    course: "All Courses",
    deadline: "Live",
    url: "https://leverageedu.com/",
    icon: University,
    description:
      "I can use India-specific workflows for shortlisting, SOP assistance, and application planning.",
    get: "Try university shortlisting and checklist tools.",
  },
  {
    title: "Coursera Audit Mode",
    category: "Research",
    country: "Global",
    course: "All Courses",
    deadline: "Live",
    url: "https://www.coursera.org/",
    icon: GraduationCap,
    description:
      "I can audit university courses for free to fill skill gaps and strengthen my SOP narrative.",
    get: "Find courses from top universities and audit without paying.",
  },
  {
    title: "Grammarly",
    category: "Application",
    country: "Global",
    course: "All Courses",
    deadline: "Live",
    url: "https://www.grammarly.com/",
    icon: FileText,
    description:
      "I can polish SOP clarity, grammar, tone, and structure before submission.",
    get: "Use real-time writing feedback and tone analysis.",
  },
  {
    title: "Canva Academic CV",
    category: "Application",
    country: "Global",
    course: "All Courses",
    deadline: "Live",
    url: "https://www.canva.com/resumes/templates/",
    icon: FileText,
    description:
      "I can build a clean academic CV using simple, ATS-friendly templates.",
    get: "Search academic CV templates and export as PDF.",
  },
  {
    title: "LinkedIn",
    category: "Application",
    country: "Global",
    course: "All Courses",
    deadline: "Live",
    url: "https://www.linkedin.com/",
    icon: FileText,
    description:
      "I can contact alumni, professors, and recommenders while building a serious academic profile.",
    get: "Use alumni search and outreach for LOR and department insights.",
  },
  {
    title: "Common App",
    category: "Application",
    country: "USA",
    course: "All Courses",
    deadline: "Jan",
    url: "https://www.commonapp.org/",
    icon: FileText,
    description:
      "I can apply to many US undergraduate universities through one application system.",
    get: "Use essay prompts, submission tracking, and multi-college application tools.",
  },
  {
    title: "UCAS",
    category: "Application",
    country: "UK",
    course: "All Courses",
    deadline: "Jan",
    url: "https://www.ucas.com/",
    icon: FileText,
    description:
      "I can apply to UK undergraduate universities and monitor offers through one official portal.",
    get: "Use the personal statement guide and tracking system.",
  },
  {
    title: "ApplyBoard",
    category: "Application",
    country: "Canada",
    course: "All Courses",
    deadline: "Live",
    url: "https://www.applyboard.com/",
    icon: FileText,
    description:
      "I can manage applications across Canada, UK, and Australia with document upload support.",
    get: "Use a multi-country dashboard and institution search.",
  },
  {
    title: "Vidya Lakshmi Portal",
    category: "Finance",
    country: "India",
    course: "All Courses",
    deadline: "Live",
    url: "https://www.vidyalakshmi.co.in/",
    icon: WalletCards,
    description:
      "I can apply to multiple Indian banks for education loans through one Government of India portal.",
    get: "Compare banks and submit a single education loan form.",
  },
  {
    title: "Avanse Financial Services",
    category: "Finance",
    country: "India",
    course: "All Courses",
    deadline: "Live",
    url: "https://www.avanse.com/",
    icon: WalletCards,
    description:
      "I can explore India-based NBFC study abroad loans covering tuition, living, and travel.",
    get: "Use loan calculator, eligibility check, and document checklist.",
  },
  {
    title: "HDFC Credila",
    category: "Finance",
    country: "India",
    course: "All Courses",
    deadline: "Live",
    url: "https://www.hdfccredila.com/",
    icon: WalletCards,
    description:
      "I can evaluate education loans from a dedicated lender for overseas education.",
    get: "Check rates, pre-approved offer options, and repayment plans.",
  },
  {
    title: "Prodigy Finance",
    category: "Finance",
    country: "Global",
    course: "MBA & Management",
    deadline: "Live",
    url: "https://prodigyfinance.com/",
    icon: WalletCards,
    description:
      "I can explore international no-collateral loans based on university, course, and future earning potential.",
    get: "Get course-specific eligibility and repayment simulations.",
  },
  {
    title: "GyanDhan",
    category: "Finance",
    country: "India",
    course: "All Courses",
    deadline: "Live",
    url: "https://www.gyandhan.com/",
    icon: WalletCards,
    description:
      "I can compare multiple lenders and calculate the full study abroad cost before applying.",
    get: "Use lender comparison and total cost calculator.",
  },
  {
    title: "Yocket Community",
    category: "Community",
    country: "Global",
    course: "All Courses",
    deadline: "Live",
    url: "https://yocket.com/community",
    icon: Globe2,
    description:
      "I can read Indian student admit stories, SOP discussions, visa experiences, and university threads.",
    get: "Search community posts by university, course, and intake.",
  },
  {
    title: "Reddit r/gradadmissions",
    category: "Community",
    country: "Global",
    course: "All Courses",
    deadline: "Live",
    url: "https://www.reddit.com/r/gradadmissions/",
    icon: Globe2,
    description:
      "I can read honest admit results, SOP feedback, and professor outreach advice from global applicants.",
    get: "Search admit stories by program and university.",
  },
  {
    title: "Reddit r/Indians_StudyAbroad",
    category: "Community",
    country: "India",
    course: "All Courses",
    deadline: "Live",
    url: "https://www.reddit.com/r/Indians_StudyAbroad/",
    icon: Globe2,
    description:
      "I can ask India-specific questions about loans, visas, housing, and pre-departure reality checks.",
    get: "Get answers from Indians already studying abroad.",
  },
  {
    title: "Leap Scholar Community",
    category: "Community",
    country: "Global",
    course: "All Courses",
    deadline: "Live",
    url: "https://leapscholar.com/",
    icon: Globe2,
    description:
      "I can join webinars, mentor sessions, and country-specific peer groups for Indian students.",
    get: "Access alumni webinars, mentorship, and live Q&A sessions.",
  },
];

const milestones = [
  {
    title: "Research & Discovery",
    desc: "Find countries, courses, and universities that match your profile, marks, budget, and family situation.",
    tools: ["QS Rankings", "THE Rankings", "Yocket"],
    urls: [
      "https://www.topuniversities.com/",
      "https://www.timeshighereducation.com/",
      "https://yocket.com/",
    ],
    icon: Map,
  },
  {
    title: "Entrance Exams",
    desc: "Know which exam you need, when to take it, and what score makes your application competitive.",
    tools: ["GRE", "GMAT", "IELTS"],
    urls: [
      "https://www.ets.org/gre",
      "https://www.mba.com/exams/gmat-exam",
      "https://www.ielts.org/",
    ],
    icon: BookOpen,
  },
  {
    title: "Shortlisting Universities",
    desc: "Compare tuition, living cost, admissions history, placement outcomes, and your realistic chances.",
    tools: ["Grad Cafe", "Yocket", "LinkedIn"],
    urls: [
      "https://www.thegradcafe.com/",
      "https://yocket.com/",
      "https://www.linkedin.com/school/",
    ],
    icon: University,
  },
  {
    title: "Scholarship Hunting",
    desc: "Match yourself to government-funded, merit-based, CSR-funded, and university-specific scholarships.",
    tools: ["Chevening", "DAAD", "MEXT"],
    urls: [
      "https://www.chevening.org/scholarships/",
      "https://www.daad.de/en/",
      "https://www.in.emb-japan.go.jp/itpr_en/edu_mext.html",
    ],
    icon: ShieldCheck,
  },
  {
    title: "Application & Documents",
    desc: "Prepare SOP, LORs, CV, transcripts, financial documents, and portals without missing deadlines.",
    tools: ["Grammarly", "Canva", "UCAS"],
    urls: [
      "https://www.grammarly.com/",
      "https://www.canva.com/resumes/templates/",
      "https://www.ucas.com/",
    ],
    icon: FileText,
  },
  {
    title: "Education Loan & Finance",
    desc: "Calculate full cost, compare lenders, apply for loans, and plan a practical repayment path.",
    tools: ["Vidya Lakshmi", "Credila", "GyanDhan"],
    urls: [
      "https://www.vidyalakshmi.co.in/",
      "https://www.hdfccredila.com/",
      "https://www.gyandhan.com/",
    ],
    icon: WalletCards,
  },
  {
    title: "Visa Application",
    desc: "Follow country-specific visa checklists, financial proof, blocked account rules, and timelines.",
    tools: ["Germany Visa", "Canada Visa", "UK Visa"],
    urls: [
      "https://india.diplo.de/in-en/services/visa-einreise/student/2107006",
      "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html",
      "https://www.gov.uk/student-visa",
    ],
    icon: Plane,
  },
  {
    title: "Admission & Arrival",
    desc: "Accept offer, pay deposit, arrange housing, insurance, forex, documents, and pre-departure essentials.",
    tools: ["Niyo", "Wise", "VFS Global"],
    urls: [
      "https://niyo.com/",
      "https://wise.com/",
      "https://www.vfsglobal.com/en/individuals/index.html",
    ],
    icon: GraduationCap,
  },
];

const guidance = [
  {
    title: "Research & Discovery",
    items: [
      [
        "Identify target countries by budget, language, and career goals",
        ["QS Rankings", "https://www.topuniversities.com/"],
        ["Numbeo", "https://www.numbeo.com/cost-of-living/"],
        "study abroad country comparison for Indian students",
      ],
      [
        "Shortlist 3 to 5 courses matching your undergraduate degree",
        ["THE Subject Rankings", "https://www.timeshighereducation.com/"],
        null,
        "how to choose MS course abroad Indian student",
      ],
      [
        "Check English proficiency requirements per country",
        [
          "IELTS Requirements",
          "https://www.ielts.org/usa/ielts-for-organisations/who-accepts-ielts-scores",
        ],
        null,
        null,
      ],
    ],
  },
  {
    title: "Entrance Exam Preparation",
    items: [
      [
        "Determine which exam your programs require",
        ["ETS GRE", "https://www.ets.org/gre"],
        ["GMAT", "https://www.mba.com/exams/gmat-exam"],
        null,
      ],
      [
        "Create a 3 to 6 month study plan",
        null,
        null,
        "GRE 3 month study plan Indian student",
      ],
      [
        "Register and book your test date",
        [
          "GRE Registration",
          "https://www.ets.org/gre/test-takers/general/register.html",
        ],
        ["IELTS India Booking", "https://www.ielts.org/en-in/book-a-test"],
        null,
      ],
      [
        "Send scores directly to universities",
        [
          "ETS Score Send",
          "https://www.ets.org/gre/test-takers/general/scores/send.html",
        ],
        null,
        null,
      ],
    ],
  },
  {
    title: "University Shortlisting",
    items: [
      [
        "Create a balanced list: reach, moderate, and safe schools",
        ["Grad Cafe", "https://www.thegradcafe.com/"],
        ["Yocket", "https://yocket.com/"],
        "how to shortlist universities for MS abroad",
      ],
      [
        "Check deadlines for Fall and Spring intake",
        null,
        null,
        "university application deadlines abroad Indian students",
      ],
      [
        "Research curriculum, faculty, and placements",
        ["LinkedIn Alumni Tool", "https://www.linkedin.com/school/"],
        null,
        null,
      ],
    ],
  },
  {
    title: "Scholarship Applications",
    items: [
      [
        "Run eligibility checks on at least 10 scholarships",
        null,
        null,
        "scholarship eligibility for Indian students abroad",
      ],
      [
        "Apply for government scholarships first",
        ["Chevening", "https://www.chevening.org/scholarships/"],
        ["DAAD", "https://www.daad.de/en/"],
        "Chevening scholarship SOP tips Indian applicants",
      ],
      [
        "Apply to India-based scholarships",
        ["JN Tata", "https://www.jntataendowment.org/"],
        ["NOS", "https://nosmsm.gov.in/"],
        null,
      ],
      [
        "Apply to university-specific financial aid",
        null,
        null,
        "how to apply for university scholarships abroad",
      ],
    ],
  },
  {
    title: "Document Preparation",
    items: [
      [
        "Write your Statement of Purpose",
        ["Grammarly", "https://www.grammarly.com/"],
        null,
        "how to write SOP for MS abroad Indian student",
      ],
      [
        "Request Letters of Recommendation early",
        ["LinkedIn", "https://www.linkedin.com/"],
        null,
        "how to ask professor for LOR",
      ],
      [
        "Build your CV or resume",
        ["Canva Templates", "https://www.canva.com/resumes/templates/"],
        null,
        "academic CV for graduate school application",
      ],
      [
        "Get transcripts attested and translated",
        ["MEA Apostille", "https://www.mea.gov.in/apostille.htm"],
        null,
        null,
      ],
      [
        "Prepare financial affidavit or sponsor letter",
        null,
        null,
        "financial affidavit for student visa Indian students",
      ],
    ],
  },
  {
    title: "University Applications",
    items: [
      [
        "Apply through official university portals",
        ["Common App", "https://www.commonapp.org/"],
        ["UCAS", "https://www.ucas.com/"],
        "how to fill university application form abroad",
      ],
      [
        "Pay application fees and maintain a tracker",
        null,
        null,
        "study abroad application tracker spreadsheet",
      ],
      [
        "Submit all documents before deadline",
        null,
        null,
        "graduate application document checklist",
      ],
      [
        "Email department or professors for research programs",
        null,
        null,
        "how to email professor for PhD admission",
      ],
    ],
  },
  {
    title: "Education Loan & Financial Planning",
    items: [
      [
        "Calculate total cost: tuition, living, travel, insurance",
        ["GyanDhan Calculator", "https://www.gyandhan.com/"],
        null,
        null,
      ],
      [
        "Apply for education loan",
        ["Vidya Lakshmi", "https://www.vidyalakshmi.co.in/"],
        ["Prodigy Finance", "https://prodigyfinance.com/"],
        "education loan for study abroad India",
      ],
      [
        "Open a blocked account if required",
        ["Fintiba", "https://www.fintiba.com/"],
        null,
        null,
      ],
      [
        "Prepare foreign exchange and multi-currency accounts",
        ["Niyo Global", "https://niyo.com/"],
        ["Wise", "https://wise.com/"],
        null,
      ],
    ],
  },
  {
    title: "Visa Application",
    items: [
      [
        "Identify visa type by country",
        [
          "Germany",
          "https://india.diplo.de/in-en/services/visa-einreise/student/2107006",
        ],
        [
          "Canada",
          "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html",
        ],
        null,
      ],
      [
        "Prepare document checklist",
        null,
        null,
        "Germany student visa from India documents",
      ],
      [
        "Book visa appointment and pay fee",
        ["VFS Global", "https://www.vfsglobal.com/en/individuals/index.html"],
        null,
        null,
      ],
      [
        "Attend biometrics and visa interview if required",
        null,
        null,
        "student visa interview preparation Indian students",
      ],
      [
        "Begin pre-departure preparation after visa",
        null,
        null,
        "pre departure checklist Indian students abroad",
      ],
    ],
  },
];

const categories = [
  "All",
  "Scholarships",
  "Exams",
  "Platforms",
  "Research",
  "Application",
  "Finance",
  "Community",
  "Visa",
];

const countries = [
  "All Countries",
  "USA",
  "UK",
  "Germany",
  "Canada",
  "Australia",
  "Japan",
  "France",
  "New Zealand",
  "Global",
  "India",
];

const courses = [
  "All Courses",
  "Engineering & Tech",
  "MBA & Management",
  "Medicine & Health",
  "Arts & Humanities",
  "Law",
  "Sciences",
  "Design",
  "Public Policy",
];

const opportunities = [
  [
    "Chevening 2025-26 Open",
    "Apply by November 5",
    "Apply Now",
    "https://www.chevening.org/scholarships/",
  ],
  [
    "DAAD Scholarship India",
    "Monthly Stipend: €934",
    "Check Eligibility",
    "https://www.daad.de/en/",
  ],
  [
    "Fulbright-Nehru Fellowship",
    "Deadline: July 15",
    "Start Application",
    "https://www.usief.org.in/Fulbright-Nehru-Master-Fellowships.aspx",
  ],
  [
    "MEXT Japan Scholarship",
    "No IELTS Required",
    "Learn More",
    "https://www.in.emb-japan.go.jp/itpr_en/edu_mext.html",
  ],
  [
    "NOS GOI Scholarship",
    "For SC/ST students",
    "Apply on NSP",
    "https://nosmsm.gov.in/",
  ],
];

function yt(query) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query).replaceAll("%20", "+")}`;
}

function A({ href, children, className = "" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

function SectionHeader({ label, title, sub }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <div className="mb-4 inline-flex rounded border border-[#8500FA]/40 bg-[#8500FA]/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-[#6D00D2]">
        {label}
      </div>
      <h2 className="font-display text-4xl font-semibold tracking-tight text-[#0A0A0A] md:text-6xl">
        {title}
      </h2>
      {sub && (
        <p className="mt-5 text-base leading-8 text-[#6F6F76] md:text-lg">
          {sub}
        </p>
      )}
    </div>
  );
}

export default function CareerGPSReactComponent() {
  const [progress, setProgress] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeCountry, setActiveCountry] = useState("All Countries");
  const [activeCourse, setActiveCourse] = useState("All Courses");
  const [query, setQuery] = useState("");
  const [openStep, setOpenStep] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [adClosed, setAdClosed] = useState(false);
  const [adIndex, setAdIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("show"),
        ),
      { threshold: 0.12 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || adClosed) return;
    const id = setInterval(
      () => setAdIndex((i) => (i + 1) % opportunities.length),
      4000,
    );
    return () => clearInterval(id);
  }, [paused, adClosed]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources.filter((r) => {
      const cat = activeCategory === "All" || r.category === activeCategory;
      const country =
        activeCountry === "All Countries" ||
        r.country === activeCountry ||
        r.country.includes(activeCountry);
      const course =
        activeCourse === "All Courses" ||
        r.course === activeCourse ||
        r.course === "All Courses";
      const text =
        `${r.title} ${r.description} ${r.category} ${r.country} ${r.course} ${r.deadline}`.toLowerCase();
      return cat && country && course && (!q || text.includes(q));
    });
  }, [activeCategory, activeCountry, activeCourse, query]);

  const meta = seoMeta["/career-gps"];
  const seoElement = useSEO({
    title: meta.title,
    description: meta.description,
    path: meta.path,
    graph: [
      buildWebPage({
        path: meta.path,
        title: meta.title,
        description: meta.description,
        breadcrumbPath: meta.path,
      }),
      buildBreadcrumbList(
        [
          { name: "Home", path: "/" },
          { name: "Career GPS", path: meta.path },
        ],
        meta.path,
      ),
      buildHowTo({
        name: "How to score and improve your career readiness with CareerGPS",
        description:
          "A four-step playbook for Indian freshers to score and close gaps in resume, skills, interview prep, and study-abroad readiness.",
        steps: [
          {
            name: "Score your current readiness",
            text: "CareerGPS scores resume, skills, exam prep, interview practice, and study-abroad signals on one dashboard.",
          },
          {
            name: "Pick a track that fits your goal",
            text: "Choose a first-job-in-India track or a study-abroad track based on your readiness profile.",
          },
          {
            name: "Close the highest-impact gap first",
            text: "Follow the action playbook one step at a time, with prep guides, official portals, and curated walkthroughs.",
          },
          {
            name: "Re-score and apply with confidence",
            text: "Re-run your readiness score before every application so you know exactly when you are ready to apply.",
          },
        ],
      }),
      buildCourse({
        name: "Career GPS: Readiness Analytics for Indian Freshers",
        description:
          "FirstJobIndia's readiness analytics platform that scores and improves a fresher's chances of landing their first job in India or abroad.",
        path: meta.path,
      }),
    ],
  });

  return (
    <div className="min-h-screen scroll-smooth bg-[#F7F5F2] font-body text-[#0A0A0A] selection:bg-[#8500FA] selection:text-white">
      {seoElement}
      <style>{`
        html { scroll-behavior: smooth; }
        .reveal { opacity: 0; transform: translateY(28px); transition: opacity .8s ease, transform .8s ease; }
        .reveal.show { opacity: 1; transform: translateY(0); }
        .logo-orbit { animation: orbit 6s linear infinite; transform-origin: center; }
        .float-soft { animation: floatSoft 4s ease-in-out infinite; }
        .pulse-ring { animation: pulseRing 2.4s ease-out infinite; }
        .marquee-dot { animation: marqueeDot 7s linear infinite; }
        @keyframes orbit { to { transform: rotate(360deg); } }
        @keyframes floatSoft { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes pulseRing { 0% { transform: scale(.8); opacity: .7; } 80%,100% { transform: scale(1.6); opacity: 0; } }
        @keyframes marqueeDot { from { transform: translateX(-20%); } to { transform: translateX(120vw); } }
      `}</style>

      <div
        className="fixed left-0 top-0 z-[70] h-1 bg-[#8500FA] transition-all"
        style={{ width: `${progress}%` }}
      />
      <Navbar className="bg-[#FFF7F3] dark:bg-[#121212]">
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton as={Link} to="/seeker/login" variant="secondary">
              Sign in
            </NavbarButton>
            <NavbarButton as={Link} to="/seeker/signup" variant="primary">
              Start free
            </NavbarButton>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <div key={`mobile-link-${idx}`} className="w-full">
                {item.link && (
                  <a
                    href={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 text-[#5C534D] dark:text-[#9CA3AF]"
                  >
                    {item.name}
                  </a>
                )}

                {item.children && (
                  <div className="flex flex-col gap-2">
                    <span className="py-2 font-medium text-[#2D2926] dark:text-white">
                      {item.name}
                    </span>

                    <div className="ml-4 flex flex-col gap-2">
                      {item.children.map((child, i) => (
                        <a
                          key={i}
                          href={child.link}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-sm text-[#8A827C] dark:text-[#9CA3AF]"
                        >
                          {child.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                href="/seeker/login"
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Sign in
              </NavbarButton>

              <NavbarButton
                href="/seeker/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Start free
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      <main>
        <section
          id="home"
          className="relative overflow-hidden px-4 pb-20 pt-32 md:px-8 md:pb-28 md:pt-40"
        >
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_.98fr]">
            <div className="reveal relative z-10">
              <div className="mb-7 inline-flex items-center gap-2 rounded border border-[#8500FA]/40 bg-[#8500FA]/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-[#6D00D2]">
                <Sparkles className="h-4 w-4" /> Career-readiness analytics for
                Indian freshers
              </div>
              <h1 className="font-display text-5xl font-black leading-[0.95] tracking-tight text-[#0A0A0A] md:text-7xl lg:text-8xl">
                Your readiness, scored.{" "}
                <span className="block italic text-[#8500FA]">
                  Your career, mapped.
                </span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-[#4F4D55] md:text-xl">
                CareerGPS scores how ready you are for your first job in India
                or abroad, then shows the exact next step. Resume, skills,
                exams, interviews, visas, every readiness signal in one
                dashboard.
              </p>
              <div className="mt-9 grid max-w-2xl grid-cols-3 overflow-hidden rounded border border-[#EADFD9] bg-white/45 shadow-xl shadow-[#111114]/5 backdrop-blur">
                {[
                  ["Resume", "readiness score"],
                  ["Skills", "gap analysis"],
                  ["Interview", "prep playbook"],
                ].map((s, i) => (
                  <div
                    key={s[0]}
                    className={`p-5 ${i ? "border-l border-[#EADFD9]" : ""}`}
                  >
                    <div className="font-display text-3xl font-black text-[#0A0A0A]">
                      {s[0]}
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-widest text-[#8A8690]">
                      {s[1]}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="#dashboard"
                  className="group inline-flex items-center gap-2 rounded bg-[#111114] px-7 py-4 text-sm font-bold text-white shadow-2xl shadow-[#111114]/15 transition hover:bg-[#8500FA]"
                >
                  View readiness dashboard{" "}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
                <a
                  href="#guidance"
                  className="inline-flex items-center gap-2 rounded border border-[#EADFD9] px-7 py-4 text-sm font-bold transition hover:border-[#8500FA] hover:text-[#6D00D2]"
                >
                  How scoring works <Play className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="reveal relative z-10">
              <div className="float-soft rounded border border-[#EADFD9] bg-[#FFF7F3] p-3 shadow-2xl shadow-[#111114]/12">
                <div className="relative overflow-hidden rounded bg-[#111114]">
                  <iframe
                    className="aspect-video w-full"
                    src="https://www.youtube.com/embed/VcInnnxqAP8?start=183"
                    title="CareerGPS video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
                </div>
                <p className="px-2 pb-2 pt-4 text-center font-display text-lg italic text-[#8A8690]">
                  See how CareerGPS scores your readiness and tells you the
                  exact next move, in under 5 minutes.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="reveal bg-[#111114] px-4 py-20 text-[#FFF7F3] md:px-8">
          <blockquote className="mx-auto max-w-5xl text-center font-display text-3xl italic leading-tight md:text-5xl">
            "Recruiters do not ask where you are from. They ask what you are
            ready to do. CareerGPS makes sure your answer is sharp."
          </blockquote>
          <p className="mt-8 text-center text-xs uppercase tracking-[0.3em] text-[#8500FA]">
            CareerGPS, by FirstJobIndia
          </p>
        </section>

        <section id="journey" className="px-4 py-24 md:px-8">
          <SectionHeader
            label="Readiness Signals"
            title="Every signal that decides your first offer, tracked in one place."
            sub="Resume, skills, exams, interview practice, and (if you choose) study-abroad readiness, all scored against what Indian and international recruiters actually look for."
          />
          <div className="relative mx-auto max-w-6xl">
            <div className="absolute left-6 top-0 h-full border-l border-dashed border-[#8500FA]/40 md:left-1/2" />
            <div className="grid gap-10">
              {milestones.map((m, i) => {
                const Icon = m.icon;
                return (
                  <div
                    key={m.title}
                    className={`reveal relative grid items-center gap-6 md:grid-cols-2 ${i % 2 ? "md:[&>div:first-child]:col-start-2" : ""}`}
                  >
                    <div
                      className={`relative ml-16 rounded border border-[#EADFD9] bg-[#FFF7F3]/80 p-7 shadow-xl shadow-[#111114]/5 transition hover:-translate-y-1 hover:border-[#8500FA]/40 hover:shadow-2xl md:ml-0 ${i % 2 ? "md:ml-10" : "md:mr-10"}`}
                    >
                      <div className="absolute -left-[3.15rem] top-8 grid h-9 w-9 place-items-center rounded-[8px] border-4 border-[#FFF7F3] bg-[#8500FA] text-white shadow-lg md:left-auto md:right-[-3.45rem] md:[.md\:col-start-2_&]:left-[-3.45rem]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="absolute right-7 top-4 font-display text-7xl font-black text-[#8500FA]/10">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3 className="relative font-display text-3xl font-semibold">
                        {m.title}
                      </h3>
                      <p className="relative mt-3 leading-7 text-[#6F6F76]">
                        {m.desc}
                      </p>
                      <div className="relative mt-6 flex flex-wrap gap-2">
                        {m.tools.map((t, idx) => (
                          <A
                            key={t}
                            href={m.urls[idx]}
                            className="rounded-[8px] border border-[#8500FA]/35 px-3 py-2 text-xs uppercase tracking-wider text-[#6D00D2] transition hover:bg-[#8500FA] hover:text-white"
                          >
                            {t}
                          </A>
                        ))}
                        <A
                          href={yt(`${m.title} for Indian students`)}
                          className="rounded-[8px] border border-[#EADFD9] px-3 py-2 text-xs uppercase tracking-wider transition hover:border-[#8500FA] hover:text-[#6D00D2]"
                        >
                          Watch on YouTube
                        </A>
                      </div>
                    </div>
                    <div className="hidden md:block" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="dashboard" className="bg-[#FFF7F3] px-4 py-24 md:px-8">
          <SectionHeader
            label="Readiness Dashboard"
            title="Every readiness resource you need. Filtered, ranked, ready."
          />
          <div className="reveal mx-auto max-w-7xl rounded-[8px] border border-[#EADFD9] bg-white/60 p-4 shadow-2xl shadow-[#111114]/5 md:p-6">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#6F6F76]">
              <Filter className="h-4 w-4 text-[#8500FA]" /> Filter by
              readiness area, country, course, and keyword
            </div>
            <ChipRow
              items={categories}
              active={activeCategory}
              setActive={setActiveCategory}
            />
            <ChipRow
              items={countries}
              active={activeCountry}
              setActive={setActiveCountry}
            />
            <ChipRow
              items={courses}
              active={activeCourse}
              setActive={setActiveCourse}
            />
            <div className="relative mt-4">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9F9FA9]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search readiness resources, exams, portals, prep guides..."
                className="w-full rounded border border-[#EADFD9] bg-[#F7F5F2] py-4 pl-12 pr-4 outline-none transition focus:border-[#8500FA] focus:ring-4 focus:ring-[#8500FA]/15"
              />
            </div>
          </div>

          <div className="mx-auto mt-10 grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((r) => {
              const Icon = r.icon;
              return (
                <article
                  key={`${r.title}-${r.category}`}
                  className="reveal group relative rounded bg-white p-6 shadow-lg shadow-[#111114]/5 transition-shadow duration-500 hover:shadow-2xl hover:shadow-[#8500FA]/10"
                >
                  {/* Animated Border Effect on Hover */}
                  <span
                    className="pointer-events-none absolute inset-0 rounded opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      padding: "2px", // Border thickness
                      background:
                        "linear-gradient(var(--angle, 0deg), #ea580c, #f97316, #fb923c, #ea580c)",
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                      animation: "none",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.animation =
                        "spin-border 3s linear infinite")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.animation = "none")
                    }
                  ></span>

                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex items-center gap-2 rounded bg-[#F7F5F2] px-3 py-2 text-[11px] uppercase tracking-widest text-[#4F4D55]">
                      <Icon className="h-3.5 w-3.5" /> {r.category}
                    </span>
                    <span className="rounded bg-[#F7F5F2] px-3 py-2 text-[11px] uppercase tracking-widest text-[#8A8690]">
                      {r.country}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-2xl font-semibold leading-tight text-[#0A0A0A]">
                    {r.title}
                  </h3>

                  <p className="mt-3 min-h-[84px] leading-7 text-[#6F6F76]">
                    {r.description}
                  </p>

                  <p className="mt-4 font-display italic text-[#6D00D2]">
                    What you'll get: {r.get}
                  </p>

                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#EADFD9] pt-5">
                    <span className="rounded bg-[#111114] px-3 py-2 text-[11px] uppercase tracking-widest text-white">
                      {r.deadline}
                    </span>
                    <A
                      href={r.url}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#0A0A0A] transition-colors duration-300 group-hover:text-[#6D00D2]"
                    >
                      Visit Resource <ExternalLink className="h-4 w-4" />
                    </A>
                  </div>
                </article>
              );
            })}
          </div>

          {/* CSS for Border Animation (Add this in your global CSS or <style> tag) */}
          <style>{`
            @property --angle {
              syntax: "<angle>";
              initial-value: 0deg;
              inherits: false;
            }

            @keyframes spin-border {
              to {
                --angle: 360deg;
              }
            }
          `}</style>
          {!filtered.length && (
            <p className="mt-12 text-center text-[#8A8690]">
              No readiness resources match this filter. Try a broader country,
              area, or search term.
            </p>
          )}
        </section>

        <section id="guidance" className="px-4 py-24 md:px-8">
          <SectionHeader
            label="Action Playbook"
            title="From readiness gap to first offer, every step explained."
            sub="Click any step to expand the full action plan: sub-steps, documents to prepare, official links, and curated video walkthroughs."
          />
          <div className="mx-auto max-w-5xl space-y-4">
            {guidance.map((step, i) => (
              <div
                key={step.title}
                className="reveal overflow-hidden rounded border border-[#EADFD9] bg-[#FFF7F3] shadow-lg shadow-[#111114]/5"
              >
                <button
                  onClick={() => setOpenStep(openStep === i ? -1 : i)}
                  className="flex w-full items-center justify-between gap-5 p-6 text-left"
                >
                  <span className="flex items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[8px] bg-[#8500FA] font-display text-xl font-black text-white">
                      {i + 1}
                    </span>
                    <span className="font-display text-2xl font-semibold">
                      {step.title}
                    </span>
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 transition ${openStep === i ? "rotate-180 text-[#8500FA]" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-500 ${openStep === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-[#EADFD9] p-6 pt-4">
                      <ol className="space-y-4">
                        {step.items.map((item, idx) => (
                          <li key={idx} className="rounded bg-white/70 p-4">
                            <div className="flex gap-3">
                              <Check className="mt-1 h-5 w-5 shrink-0 text-[#8500FA]" />
                              <div>
                                <p className="font-semibold text-[#0A0A0A]">
                                  {item[0]}
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {item[1] && (
                                    <A
                                      href={item[1][1]}
                                      className="rounded-[8px] border border-[#8500FA]/30 px-3 py-2 text-xs font-bold text-[#6D00D2] hover:bg-[#8500FA] hover:text-white"
                                    >
                                      {item[1][0]}
                                    </A>
                                  )}
                                  {item[2] && (
                                    <A
                                      href={item[2][1]}
                                      className="rounded-[8px] border border-[#8500FA]/30 px-3 py-2 text-xs font-bold text-[#6D00D2] hover:bg-[#8500FA] hover:text-white"
                                    >
                                      {item[2][0]}
                                    </A>
                                  )}
                                  {item[3] && (
                                    <A
                                      href={yt(item[3])}
                                      className="rounded-[8px] border border-[#EADFD9] px-3 py-2 text-xs font-bold hover:border-[#8500FA] hover:text-[#6D00D2]"
                                    >
                                      Watch on YouTube
                                    </A>
                                  )}
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="pricing"
          className="bg-[#111114] px-4 py-24 text-white md:px-8"
        >
          <SectionHeader
            label="Access Plans"
            title="One payment. Lifetime access to your readiness toolkit."
            sub="No hidden fees. No consultancy charges. Pay once, keep every resource for your chosen track for life."
          />
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            <PricingCard
              title="Fully Funded Study-Abroad Track"
              price="₹10,000"
              subtitle="For freshers targeting 100% funded education abroad as their first move"
              cta="Get access for ₹10,000"
              variant="gold"
              items={[
                "Readiness score for 100+ fully funded scholarships",
                "Eligibility checker by profile",
                "SOP and application guidance",
                "Deadline calendar with reminders",
                "Country-wise visa readiness guide",
                "Peer and alumni community access",
              ]}
              note="Covers Chevening, DAAD, MEXT, Fulbright, NOS, Australia Awards, and 90 more."
            />
            <PricingCard
              title="Full Readiness Track"
              price="₹20,000"
              subtitle="For freshers who want every funding, prep, and recruiter signal in one place"
              cta="Get access for ₹20,000"
              recommended
              items={[
                "Everything in the Fully Funded Study-Abroad track",
                "500+ scholarships including CSR and partial funding",
                "Education loan comparison tool",
                "Readiness guides for every course and country",
                "SOP, CV, and LOR templates",
                "Priority access to new readiness resources",
              ]}
              note="Best for freshers applying to USA, Canada, UK, or Germany in 2025-26 intake."
            />
          </div>
          <p className="mt-10 text-center font-display text-lg italic text-white/60">
            Both plans include lifetime access. No subscriptions. No renewal. No
            consultancy upsells.
          </p>
          <div className="reveal mx-auto mt-12 max-w-md rounded border border-white/10 bg-white/5 p-8 text-center">
            <p className="font-display text-2xl">Already have access?</p>
            <button
              onClick={() => setModalOpen(true)}
              className="mt-5 rounded border border-[#8500FA]/40 px-7 py-4 font-bold text-[#8500FA] transition hover:bg-[#8500FA] hover:text-white"
            >
              Sign in to CareerGPS
            </button>
          </div>
        </section>

        <section className="reveal border-y border-[#8500FA]/40 px-4 py-20 md:px-8">
          <blockquote className="mx-auto max-w-5xl text-center font-display text-3xl italic leading-tight text-[#0A0A0A] md:text-5xl">
            "Readiness is not measured in degrees. It is measured in the
            courage it takes to start preparing."
          </blockquote>
          <p className="mt-8 text-center text-xs uppercase tracking-[0.25em] text-[#6D00D2]">
            For every fresher who dared to plan beyond their postcode.
          </p>
        </section>
      </main>

      <Footer />

      {!adClosed && (
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#8500FA]/40 bg-[#111114] text-white shadow-2xl"
        >
          <div className="mx-auto flex h-[60px] max-w-7xl items-center justify-between gap-3 px-3 md:px-6">
            <button
              onClick={() =>
                setAdIndex(
                  (adIndex - 1 + opportunities.length) % opportunities.length,
                )
              }
              className="grid h-8 w-8 shrink-0 place-items-center rounded-[8px] border border-white/15 hover:border-[#8500FA]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="min-w-0 flex-1 text-center md:flex md:items-center md:justify-center md:gap-5">
              <p className="truncate font-display text-lg font-semibold text-[#8500FA]">
                {opportunities[adIndex][0]}
              </p>
              <p className="truncate text-xs text-white/70 md:text-sm">
                {opportunities[adIndex][1]}
              </p>
              <A
                href={opportunities[adIndex][3]}
                className="hidden rounded-[8px] bg-[#8500FA] px-4 py-2 text-xs font-bold text-white md:inline-flex"
              >
                {opportunities[adIndex][2]}
              </A>
            </div>
            <button
              onClick={() => setAdIndex((adIndex + 1) % opportunities.length)}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-[8px] border border-white/15 hover:border-[#8500FA]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => setAdClosed(true)}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-[8px] border border-white/15 hover:border-[#8500FA]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {modalOpen && (
        <div
          onMouseDown={(e) =>
            e.target === e.currentTarget && setModalOpen(false)
          }
          className="fixed inset-0 z-[80] grid place-items-center bg-[#111114]/60 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-md rounded-[8px] bg-[#FFF7F3] p-7 shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-[8px] border border-[#EADFD9]"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="grid h-14 w-14 place-items-center rounded-[8px] bg-[#8500FA]/10 text-[#6D00D2]">
              <Lock className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-display text-4xl font-semibold">
              Login to CareerGPS
            </h3>
            <p className="mt-2 text-[#6F6F76]">
              Access your dashboard, saved resources, and guidance modules.
            </p>
            <form
              className="mt-6 grid gap-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <label className="grid gap-2 text-sm font-semibold text-[#4F4D55]">
                Email
                <input
                  type="email"
                  className="rounded-[8px] border border-[#EADFD9] bg-white px-4 py-3 outline-none focus:border-[#8500FA]"
                  placeholder="student@example.com"
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-[#4F4D55]">
                Password
                <input
                  type="password"
                  className="rounded-[8px] border border-[#EADFD9] bg-white px-4 py-3 outline-none focus:border-[#8500FA]"
                  placeholder="••••••••"
                />
              </label>
              <button className="mt-2 inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#111114] px-6 py-4 font-bold text-white transition hover:bg-[#8500FA]">
                Submit <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ChipRow({ items, active, setActive }) {
  return (
    <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => setActive(item)}
          className={`shrink-0 rounded border px-4 py-2 text-[11px] uppercase tracking-wider transition ${active === item ? "border-[#8500FA] bg-[#8500FA] text-white shadow-lg shadow-[#8500FA]/20" : "border-[#EADFD9] bg-[#F7F5F2] text-[#6F6F76] hover:border-[#8500FA] hover:text-[#6D00D2]"}`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

function PricingCard({
  title,
  price,
  subtitle,
  items,
  note,
  cta,
  recommended,
  variant,
}) {
  return (
    <div
      className={`reveal relative rounded border p-7 shadow-2xl ${recommended ? "border-[#8500FA] bg-[#FFF7F3] text-[#0A0A0A] shadow-[#8500FA]/10" : "border-white/10 bg-white/5 text-white shadow-black/20"}`}
    >
      {recommended && (
        <div className="absolute right-6 top-6 rounded-[8px] bg-[#8500FA] px-4 py-2 text-[11px] uppercase tracking-widest text-white">
          Recommended
        </div>
      )}
      <h3 className="pr-28 font-display text-3xl font-semibold">{title}</h3>
      <div className="mt-6 font-display text-5xl font-black text-[#8500FA]">
        {price}
      </div>
      <p className={`mt-2 ${recommended ? "text-[#6F6F76]" : "text-white/65"}`}>
        one-time · {subtitle}
      </p>
      <ul className="mt-7 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <Check className="mt-1 h-5 w-5 shrink-0 text-[#8500FA]" />
            <span className={recommended ? "text-[#4F4D55]" : "text-white/75"}>
              {item}
            </span>
          </li>
        ))}
      </ul>
      <a
        href="#home"
        className={`mt-8 inline-flex w-full items-center justify-center rounded-[8px] px-6 py-4 font-bold transition ${variant === "gold" ? "bg-[#8500FA] text-white hover:bg-white hover:text-[#0A0A0A]" : "bg-[#111114] text-white hover:bg-[#8500FA]"}`}
      >
        {cta}
      </a>
      <p
        className={`mt-5 font-display text-sm italic leading-6 ${recommended ? "text-[#8A8690]" : "text-white/50"}`}
      >
        {note}
      </p>
    </div>
  );
}
