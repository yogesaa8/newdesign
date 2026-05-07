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
      <div className="mb-4 inline-flex rounded border border-orange-500/40 bg-orange-500/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.28em] text-orange-600">
        {label}
      </div>
      <h2 className="font-serif text-4xl font-semibold tracking-tight text-neutral-950 md:text-6xl">
        {title}
      </h2>
      {sub && (
        <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
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

//   const navItems = [
//     {
//       name: "Jobs",
//       link: "/jobs",
//     },
//     {
//       name: "Resume",
//       link: "/resume",
//     },
//     {
//       name: "Services",
//       children: [
//         { name: "Company", link: "/company" },
//         { name: "College", link: "/college" },
//         { name: "Career Coach", link: "/coach" },
//       ],
//     },
//     {
//       name: "Review",
//       link: "/reviews",
//     },
//   ];

  return (
    <div className="min-h-screen scroll-smooth bg-[#f7f1e8] font-sans text-neutral-950 selection:bg-orange-500 selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,900;1,400;1,600&display=swap');
        html { scroll-behavior: smooth; }
        .font-serif { font-family: 'Playfair Display', Georgia, serif; }
        .font-sans { font-family: 'DM Sans', system-ui, sans-serif; }
        .font-mono { font-family: 'DM Mono', monospace; }
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
        className="fixed left-0 top-0 z-[70] h-1 bg-orange-500 transition-all"
        style={{ width: `${progress}%` }}
      />

      {/* <nav
        className={`fixed inset-x-0 top-0 z-50 border-b border-neutral-950/10 bg-[#f7f1e8]/82 backdrop-blur-xl transition-all duration-300 ${navSmall ? "h-[60px] shadow-lg shadow-neutral-950/5" : "h-[72px]"}`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-8">
          <a href="#home" className="group flex items-center gap-3">
            <span className="relative grid h-11 w-11 place-items-center rounded-full border border-orange-500/50 bg-orange-500/10">
              <span className="absolute inset-1 rounded-full border border-dashed border-orange-500/50 logo-orbit" />
              <Compass className="h-5 w-5 text-orange-600 transition group-hover:rotate-45" />
            </span>
            <span className="leading-none">
              <span className="block font-serif text-2xl font-black tracking-tight">
                Career<span className="text-orange-500">GPS</span>
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-slate-500">
                by First Job India
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((n) => (
              <a
                key={n}
                href={`#${n.toLowerCase()}`}
                className="font-mono text-xs uppercase tracking-[0.2em] text-slate-600 transition hover:text-orange-600"
              >
                {n}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => setModalOpen(true)}
              className="rounded-full border border-neutral-950/20 px-5 py-2 text-sm font-semibold transition hover:border-orange-500 hover:text-orange-600"
            >
              Login
            </button>
            <a
              href="#pricing"
              className="rounded-full bg-neutral-950 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-neutral-950/20 transition hover:bg-orange-500"
            >
              Get Started
            </a>
          </div>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-neutral-950/15 md:hidden"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-neutral-950/10 bg-[#f7f1e8] px-5 py-5 shadow-xl md:hidden">
            <div className="grid gap-3">
              {navLinks.map((n) => (
                <a
                  onClick={() => setMenuOpen(false)}
                  key={n}
                  href={`#${n.toLowerCase()}`}
                  className="rounded-2xl px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] hover:bg-orange-500/10"
                >
                  {n}
                </a>
              ))}
              <button
                onClick={() => setModalOpen(true)}
                className="rounded-2xl border border-neutral-950/15 px-4 py-3 text-left font-semibold"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </nav> */}
      <Navbar className="bg-[#FFF7F3] dark:bg-[#121212]">
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton as={Link} to="/job-seeker/login" variant="secondary">
              Login
            </NavbarButton>
            <NavbarButton as={Link} to="/job-seeker/signup" variant="primary">
              Get Started
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
                href="/job-seeker/login"
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>

              <NavbarButton
                href="/job-seeker/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Get Started
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
          <div className="absolute right-[-18rem] top-[-18rem] h-[44rem] w-[44rem] rounded-full bg-orange-500/20 blur-3xl" />
          <div className="absolute left-8 top-36 hidden h-2 w-2 rounded-full bg-orange-500 md:block marquee-dot" />
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_.98fr]">
            <div className="reveal relative z-10">
              <div className="mb-7 inline-flex items-center gap-2 rounded border border-orange-500/40 bg-orange-500/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.22em] text-orange-700">
                <Sparkles className="h-4 w-4" /> India's First Study Abroad
                Command Centre
              </div>
              <h1 className="font-serif text-5xl font-black leading-[0.95] tracking-tight text-neutral-950 md:text-7xl lg:text-8xl">
                Your passport to the world begins{" "}
                <span className="block italic text-orange-500">
                  with the right guidance.
                </span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-700 md:text-xl">
                We have mapped scholarships, exams, visa rules, documents,
                loans, and every confusing step so a first-generation student
                from a small city does not have to spend months decoding what
                nobody taught them.
              </p>
              <div className="mt-9 grid max-w-2xl grid-cols-3 overflow-hidden rounded border border-neutral-950/10 bg-white/45 shadow-xl shadow-neutral-950/5 backdrop-blur">
                {[
                  ["500+", "Scholarships Mapped"],
                  ["40+", "Countries Covered"],
                  ["12,000+", "Students Guided"],
                ].map((s, i) => (
                  <div
                    key={s[0]}
                    className={`p-5 ${i ? "border-l border-neutral-950/10" : ""}`}
                  >
                    <div className="font-serif text-3xl font-black text-neutral-950">
                      {s[0]}
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-widest text-slate-500">
                      {s[1]}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="#dashboard"
                  className="group inline-flex items-center gap-2 rounded bg-neutral-950 px-7 py-4 text-sm font-bold text-white shadow-2xl shadow-neutral-950/20 transition hover:bg-orange-500"
                >
                  Explore Dashboard{" "}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
                <a
                  href="#guidance"
                  className="inline-flex items-center gap-2 rounded border border-neutral-950/20 px-7 py-4 text-sm font-bold transition hover:border-orange-500 hover:text-orange-600"
                >
                  See How It Works <Play className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="reveal relative z-10">
              <div className="float-soft rounded border border-neutral-950/10 bg-[#fffaf2] p-3 shadow-2xl shadow-neutral-950/15">
                <div className="relative overflow-hidden rounded bg-neutral-950">
                  <iframe
                    className="aspect-video w-full"
                    src="https://www.youtube.com/embed/VcInnnxqAP8?start=183"
                    title="CareerGPS video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
                </div>
                <p className="px-2 pb-2 pt-4 text-center font-serif text-lg italic text-slate-500">
                  Watch how CareerGPS guides you from confusion to admission in
                  under 5 minutes.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="reveal bg-neutral-950 px-4 py-20 text-[#f7f1e8] md:px-8">
          <blockquote className="mx-auto max-w-5xl text-center font-serif text-3xl italic leading-tight md:text-5xl">
            "The world does not ask where you are from. It asks what you are
            capable of. We exist to make sure your answer is heard."
          </blockquote>
          <p className="mt-8 text-center font-mono text-xs uppercase tracking-[0.3em] text-orange-500">
            — CareerGPS, First Job India
          </p>
        </section>

        <section id="journey" className="px-4 py-24 md:px-8">
          <SectionHeader
            label="What We Do"
            title="A Single Platform for Your Entire Study Abroad Journey"
            sub="From the first Google search to visa approval, every milestone is mapped, every resource is linked, every step is explained."
          />
          <div className="relative mx-auto max-w-6xl">
            <div className="absolute left-6 top-0 h-full border-l border-dashed border-orange-500/60 md:left-1/2" />
            <div className="grid gap-10">
              {milestones.map((m, i) => {
                const Icon = m.icon;
                return (
                  <div
                    key={m.title}
                    className={`reveal relative grid items-center gap-6 md:grid-cols-2 ${i % 2 ? "md:[&>div:first-child]:col-start-2" : ""}`}
                  >
                    <div
                      className={`relative ml-16 rounded border border-neutral-950/10 bg-[#fffaf2]/80 p-7 shadow-xl shadow-neutral-950/5 transition hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-2xl md:ml-0 ${i % 2 ? "md:ml-10" : "md:mr-10"}`}
                    >
                      <div className="absolute -left-[3.15rem] top-8 grid h-9 w-9 place-items-center rounded-full border-4 border-[#f7f1e8] bg-orange-500 text-white shadow-lg md:left-auto md:right-[-3.45rem] md:[.md\:col-start-2_&]:left-[-3.45rem]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="absolute right-7 top-4 font-serif text-7xl font-black text-orange-500/10">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3 className="relative font-serif text-3xl font-semibold">
                        {m.title}
                      </h3>
                      <p className="relative mt-3 leading-7 text-slate-600">
                        {m.desc}
                      </p>
                      <div className="relative mt-6 flex flex-wrap gap-2">
                        {m.tools.map((t, idx) => (
                          <A
                            key={t}
                            href={m.urls[idx]}
                            className="rounded-full border border-orange-500/35 px-3 py-2 font-mono text-xs uppercase tracking-wider text-orange-700 transition hover:bg-orange-500 hover:text-white"
                          >
                            {t}
                          </A>
                        ))}
                        <A
                          href={yt(`${m.title} for Indian students`)}
                          className="rounded-full border border-neutral-950/15 px-3 py-2 font-mono text-xs uppercase tracking-wider transition hover:border-orange-500 hover:text-orange-600"
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

        <section id="dashboard" className="bg-[#fffaf2] px-4 py-24 md:px-8">
          <SectionHeader
            label="Resource Dashboard"
            title="Every Resource You Need. Filtered, Ranked, Ready."
          />
          <div className="reveal mx-auto max-w-7xl rounded-[2rem] border border-neutral-950/10 bg-white/60 p-4 shadow-2xl shadow-neutral-950/5 md:p-6">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-600">
              <Filter className="h-4 w-4 text-orange-500" /> Filter by resource,
              country, course, and keyword
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
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search scholarships, exams, portals, visa guides..."
                className="w-full rounded border border-neutral-950/10 bg-[#f7f1e8] py-4 pl-12 pr-4 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
              />
            </div>
          </div>

          <div className="mx-auto mt-10 grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((r) => {
              const Icon = r.icon;
              return (
                <article
                  key={`${r.title}-${r.category}`}
                  className="reveal group relative rounded bg-white p-6 shadow-lg shadow-neutral-950/5 transition-shadow duration-500 hover:shadow-2xl hover:shadow-orange-500/10"
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
                    <span className="inline-flex items-center gap-2 rounded bg-neutral-100 px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-slate-700">
                      <Icon className="h-3.5 w-3.5" /> {r.category}
                    </span>
                    <span className="rounded bg-neutral-100 px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-slate-500">
                      {r.country}
                    </span>
                  </div>

                  <h3 className="mt-5 font-serif text-2xl font-semibold leading-tight text-neutral-950">
                    {r.title}
                  </h3>

                  <p className="mt-3 min-h-[84px] leading-7 text-slate-600">
                    {r.description}
                  </p>

                  <p className="mt-4 font-serif italic text-orange-600">
                    What you'll get: {r.get}
                  </p>

                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-neutral-950/10 pt-5">
                    <span className="rounded bg-neutral-950 px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-white">
                      {r.deadline}
                    </span>
                    <A
                      href={r.url}
                      className="inline-flex items-center gap-2 text-sm font-bold text-neutral-950 transition-colors duration-300 group-hover:text-orange-600"
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
            <p className="mt-12 text-center text-slate-500">
              No resources match this filter. Try a broader country, category,
              or search term.
            </p>
          )}
        </section>

        <section id="guidance" className="px-4 py-24 md:px-8">
          <SectionHeader
            label="Application Guidance"
            title="From Research to Admission — Every Step Explained"
            sub="Click any step to expand the full process with sub-steps, required documents, official links, and YouTube resources."
          />
          <div className="mx-auto max-w-5xl space-y-4">
            {guidance.map((step, i) => (
              <div
                key={step.title}
                className="reveal overflow-hidden rounded border border-neutral-950/10 bg-[#fffaf2] shadow-lg shadow-neutral-950/5"
              >
                <button
                  onClick={() => setOpenStep(openStep === i ? -1 : i)}
                  className="flex w-full items-center justify-between gap-5 p-6 text-left"
                >
                  <span className="flex items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-orange-500 font-serif text-xl font-black text-white">
                      {i + 1}
                    </span>
                    <span className="font-serif text-2xl font-semibold">
                      {step.title}
                    </span>
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 transition ${openStep === i ? "rotate-180 text-orange-500" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-500 ${openStep === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-neutral-950/10 p-6 pt-4">
                      <ol className="space-y-4">
                        {step.items.map((item, idx) => (
                          <li key={idx} className="rounded bg-white/70 p-4">
                            <div className="flex gap-3">
                              <Check className="mt-1 h-5 w-5 shrink-0 text-orange-500" />
                              <div>
                                <p className="font-semibold text-neutral-950">
                                  {item[0]}
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {item[1] && (
                                    <A
                                      href={item[1][1]}
                                      className="rounded-full border border-orange-500/30 px-3 py-2 text-xs font-bold text-orange-700 hover:bg-orange-500 hover:text-white"
                                    >
                                      {item[1][0]}
                                    </A>
                                  )}
                                  {item[2] && (
                                    <A
                                      href={item[2][1]}
                                      className="rounded-full border border-orange-500/30 px-3 py-2 text-xs font-bold text-orange-700 hover:bg-orange-500 hover:text-white"
                                    >
                                      {item[2][0]}
                                    </A>
                                  )}
                                  {item[3] && (
                                    <A
                                      href={yt(item[3])}
                                      className="rounded-full border border-neutral-950/15 px-3 py-2 text-xs font-bold hover:border-orange-500 hover:text-orange-600"
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
          className="bg-neutral-950 px-4 py-24 text-white md:px-8"
        >
          <SectionHeader
            label="Plans"
            title="Access Every Resource. At a Price That Makes Sense."
            sub="No hidden fees. No consultancy charges. One payment, lifetime access to all resources for your category."
          />
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            <PricingCard
              title="Fully Funded Scholarships"
              price="₹10,000"
              subtitle="For students seeking 100% free education abroad"
              cta="Get Access — ₹10,000"
              variant="gold"
              items={[
                "Complete database of 100+ fully funded scholarships",
                "Eligibility checker by profile",
                "SOP and application guidance",
                "Deadline calendar with reminders",
                "Country-wise visa guide",
                "Peer and alumni community access",
              ]}
              note="Covers Chevening, DAAD, MEXT, Fulbright, NOS, Australia Awards, and 90+ more."
            />
            <PricingCard
              title="All Scholarships"
              price="₹20,000"
              subtitle="For students who want every possible funding option"
              cta="Get Access — ₹20,000"
              recommended
              items={[
                "Everything in the Fully Funded plan",
                "500+ scholarships including CSR and partial funding",
                "Education loan comparison tool",
                "Guidance for every course and country",
                "SOP, CV, and LOR templates",
                "Priority access to new resources",
              ]}
              note="Best for students applying to USA, Canada, UK, or Germany in 2025-26 intake."
            />
          </div>
          <p className="mt-10 text-center font-serif text-lg italic text-white/60">
            Both plans include lifetime access. No subscriptions. No renewal. No
            consultancy upsells.
          </p>
          <div className="reveal mx-auto mt-12 max-w-md rounded border border-white/10 bg-white/5 p-8 text-center">
            <p className="font-serif text-2xl">Already have access?</p>
            <button
              onClick={() => setModalOpen(true)}
              className="mt-5 rounded border border-orange-500/50 px-7 py-4 font-bold text-orange-400 transition hover:bg-orange-500 hover:text-white"
            >
              Login to CareerGPS
            </button>
          </div>
        </section>

        <section className="reveal border-y border-orange-500/40 px-4 py-20 md:px-8">
          <blockquote className="mx-auto max-w-5xl text-center font-serif text-3xl italic leading-tight text-neutral-950 md:text-5xl">
            "Distance is not measured in kilometres. It is measured in the
            courage it takes to begin."
          </blockquote>
          <p className="mt-8 text-center font-mono text-xs uppercase tracking-[0.25em] text-orange-600">
            — For every student who dared to dream beyond their postcode.
          </p>
        </section>
      </main>

      <Footer />

      {!adClosed && (
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-orange-500/40 bg-neutral-950 text-white shadow-2xl"
        >
          <div className="mx-auto flex h-[60px] max-w-7xl items-center justify-between gap-3 px-3 md:px-6">
            <button
              onClick={() =>
                setAdIndex(
                  (adIndex - 1 + opportunities.length) % opportunities.length,
                )
              }
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 hover:border-orange-500"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="min-w-0 flex-1 text-center md:flex md:items-center md:justify-center md:gap-5">
              <p className="truncate font-serif text-lg font-semibold text-orange-400">
                {opportunities[adIndex][0]}
              </p>
              <p className="truncate text-xs text-white/70 md:text-sm">
                {opportunities[adIndex][1]}
              </p>
              <A
                href={opportunities[adIndex][3]}
                className="hidden rounded-full bg-orange-500 px-4 py-2 text-xs font-bold text-white md:inline-flex"
              >
                {opportunities[adIndex][2]}
              </A>
            </div>
            <button
              onClick={() => setAdIndex((adIndex + 1) % opportunities.length)}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 hover:border-orange-500"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => setAdClosed(true)}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 hover:border-orange-500"
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
          className="fixed inset-0 z-[80] grid place-items-center bg-neutral-950/60 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-md rounded-[2rem] bg-[#fffaf2] p-7 shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-neutral-950/10"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="grid h-14 w-14 place-items-center rounded-full bg-orange-500/10 text-orange-600">
              <Lock className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-serif text-4xl font-semibold">
              Login to CareerGPS
            </h3>
            <p className="mt-2 text-slate-600">
              Access your dashboard, saved resources, and guidance modules.
            </p>
            <form
              className="mt-6 grid gap-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Email
                <input
                  type="email"
                  className="rounded-2xl border border-neutral-950/10 bg-white px-4 py-3 outline-none focus:border-orange-500"
                  placeholder="student@example.com"
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Password
                <input
                  type="password"
                  className="rounded-2xl border border-neutral-950/10 bg-white px-4 py-3 outline-none focus:border-orange-500"
                  placeholder="••••••••"
                />
              </label>
              <button className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-neutral-950 px-6 py-4 font-bold text-white transition hover:bg-orange-500">
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
          className={`shrink-0 rounded border px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition ${active === item ? "border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/25" : "border-neutral-950/10 bg-[#f7f1e8] text-slate-600 hover:border-orange-500 hover:text-orange-600"}`}
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
      className={`reveal relative rounded border p-7 shadow-2xl ${recommended ? "border-orange-500 bg-[#fffaf2] text-neutral-950 shadow-orange-500/10" : "border-white/10 bg-white/5 text-white shadow-black/20"}`}
    >
      {recommended && (
        <div className="absolute right-6 top-6 rounded-full bg-orange-500 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-white">
          Recommended
        </div>
      )}
      <h3 className="pr-28 font-serif text-3xl font-semibold">{title}</h3>
      <div className="mt-6 font-serif text-5xl font-black text-orange-500">
        {price}
      </div>
      <p className={`mt-2 ${recommended ? "text-slate-600" : "text-white/65"}`}>
        one-time · {subtitle}
      </p>
      <ul className="mt-7 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <Check className="mt-1 h-5 w-5 shrink-0 text-orange-500" />
            <span className={recommended ? "text-slate-700" : "text-white/75"}>
              {item}
            </span>
          </li>
        ))}
      </ul>
      <a
        href="#home"
        className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-4 font-bold transition ${variant === "gold" ? "bg-orange-500 text-white hover:bg-white hover:text-neutral-950" : "bg-neutral-950 text-white hover:bg-orange-500"}`}
      >
        {cta}
      </a>
      <p
        className={`mt-5 font-serif text-sm italic leading-6 ${recommended ? "text-slate-500" : "text-white/50"}`}
      >
        {note}
      </p>
    </div>
  );
}
