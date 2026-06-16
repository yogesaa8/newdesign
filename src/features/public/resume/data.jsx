/* global window */

// ============================================================
// TEMPLATE METADATA - 6 formats
// ============================================================
const TEMPLATE_META = [
  {
    id: "classic",
    name: "Classic Chronological",
    description: "Clean serif, single column. Trusted by IT services, banking, government PSU & MNC recruiters.",
    jobCategories: ["IT Services", "Banking", "PSU", "MNC"],
    atsTier: "High",
    accentSelectable: false,
    bestFor: "First-time applicants to TCS, Infosys, Wipro, banks",
  },
  {
    id: "skillsFirst",
    name: "Skills-First Functional",
    description: "Skills cluster leads the page. Perfect when your projects matter more than your timeline.",
    jobCategories: ["Career Switchers", "Gap Year", "Bootcamp Grads"],
    atsTier: "Medium",
    accentSelectable: false,
    bestFor: "Freshers with internship gaps or career pivots",
  },
  {
    id: "twoColumn",
    name: "Two-Column Modern",
    description: "Sidebar with photo & contact, content on the right. Modern, scannable, recruiter-friendly.",
    jobCategories: ["Marketing", "Startups", "E-commerce", "Digital"],
    atsTier: "Medium",
    accentSelectable: true,
    bestFor: "Marketing, startups, e-commerce, digital roles",
  },
  {
    id: "techAts",
    name: "Tech ATS Optimized",
    description: "Plain, keyword-dense, zero decoration. Parses flawlessly in every applicant tracking system.",
    jobCategories: ["Software", "Data Science", "ML", "Product"],
    atsTier: "Highest",
    accentSelectable: false,
    bestFor: "Software engineering, data, ML, product roles",
  },
  {
    id: "creative",
    name: "Creative Portfolio",
    description: "Bold color block, portfolio link & visual timeline. Stand out for design & content roles.",
    jobCategories: ["UI/UX", "Graphic Design", "Content", "Social Media"],
    atsTier: "Low",
    accentSelectable: true,
    bestFor: "UI/UX, graphic design, content, social media",
  },
  {
    id: "mba",
    name: "Management / MBA",
    description: "Executive layout with horizontal rules. Highlights GPA, leadership & case competitions.",
    jobCategories: ["Consulting", "Finance", "HR", "Operations"],
    atsTier: "High",
    accentSelectable: false,
    bestFor: "MBA freshers, finance, consulting & HR roles",
  },
];

// ============================================================
// JOB CATEGORIES (for objective + skill suggestions)
// ============================================================
const JOB_CATEGORIES = [
  { id: "software", label: "Software / IT" },
  { id: "data", label: "Data / ML" },
  { id: "marketing", label: "Marketing / Digital" },
  { id: "design", label: "Design / Creative" },
  { id: "finance", label: "Finance / Banking" },
  { id: "consulting", label: "Consulting / MBA" },
  { id: "sales", label: "Sales / BD" },
  { id: "hr", label: "HR / Operations" },
];

// ============================================================
// SKILL SUGGESTIONS (per category, grouped)
// ============================================================
const SKILL_SUGGESTIONS = {
  software: {
    technical: ["JavaScript", "Python", "Java", "React", "Node.js", "SQL", "Git", "REST APIs", "MongoDB", "AWS", "Docker", "Linux"],
    tools: ["VS Code", "Postman", "Jira", "GitHub", "Figma", "Notion"],
    soft: ["Problem solving", "Communication", "Teamwork", "Adaptability"],
  },
  data: {
    technical: ["Python", "SQL", "Pandas", "NumPy", "scikit-learn", "TensorFlow", "PyTorch", "Tableau", "Power BI", "R", "Excel"],
    tools: ["Jupyter", "Colab", "Databricks", "Snowflake", "Looker"],
    soft: ["Analytical thinking", "Storytelling", "Curiosity", "Attention to detail"],
  },
  marketing: {
    technical: ["SEO", "SEM", "Google Ads", "Meta Ads", "Email marketing", "Copywriting", "Google Analytics", "Content strategy"],
    tools: ["Canva", "HubSpot", "Mailchimp", "Hootsuite", "Notion", "Buffer"],
    soft: ["Creativity", "Communication", "Data-driven", "Adaptability"],
  },
  design: {
    technical: ["UI Design", "UX Research", "Wireframing", "Prototyping", "Design Systems", "Typography", "Illustration"],
    tools: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "After Effects", "Framer"],
    soft: ["Visual eye", "Empathy", "Collaboration", "Storytelling"],
  },
  finance: {
    technical: ["Financial modelling", "Valuation", "Excel", "Accounting", "Equity research", "Bloomberg Terminal"],
    tools: ["MS Excel", "PowerPoint", "Tally", "SAP"],
    soft: ["Numerical aptitude", "Detail-oriented", "Integrity", "Pressure handling"],
  },
  consulting: {
    technical: ["Market research", "Business analysis", "Strategy frameworks", "Financial modelling", "PowerPoint"],
    tools: ["MS Excel", "PowerPoint", "Tableau", "Asana", "Slack"],
    soft: ["Structured thinking", "Communication", "Leadership", "Client management"],
  },
  sales: {
    technical: ["B2B sales", "Lead generation", "CRM", "Cold calling", "Negotiation", "Pipeline management"],
    tools: ["Salesforce", "HubSpot", "Zoho CRM", "LinkedIn Sales Nav"],
    soft: ["Persuasion", "Empathy", "Resilience", "Communication"],
  },
  hr: {
    technical: ["Recruitment", "Onboarding", "Payroll", "HRIS", "Employee engagement", "Performance reviews"],
    tools: ["Workday", "BambooHR", "Zoho People", "Excel", "Naukri RMS"],
    soft: ["People skills", "Empathy", "Confidentiality", "Organisation"],
  },
};

const LANGUAGE_SUGGESTIONS = ["English", "Hindi", "Tamil", "Telugu", "Marathi", "Bengali", "Kannada", "Malayalam", "Gujarati", "Punjabi", "Odia", "Assamese"];

// ============================================================
// OBJECTIVE TEMPLATES (3 per category)
// ============================================================
const OBJECTIVE_TEMPLATES = {
  software: [
    {
      tag: "Confident builder",
      text: "Recent Computer Science graduate with hands-on experience building full-stack web applications using React and Node.js. Eager to join a fast-paced engineering team where I can ship production code, learn from senior engineers, and contribute to scalable products.",
    },
    {
      tag: "Problem solver",
      text: "Detail-oriented developer comfortable with JavaScript, Python and SQL, solving 300+ DSA problems on LeetCode. Looking for a software engineering role where I can apply strong fundamentals to real-world systems and grow into a high-impact contributor.",
    },
    {
      tag: "Quick learner",
      text: "Self-taught programmer with three deployed side projects and an internship at a local startup. Seeking an entry-level software role that values curiosity, clean code, and a willingness to own problems end-to-end.",
    },
  ],
  data: [
    {
      tag: "Analytical mindset",
      text: "Data enthusiast with a strong foundation in Python, SQL and statistics, plus two Kaggle competition submissions. Looking for a Data Analyst role where I can turn raw data into actionable insights and grow into a Data Scientist over the next two years.",
    },
    {
      tag: "Business-driven",
      text: "Engineering graduate passionate about using data to drive business decisions. Comfortable with SQL, Tableau and Excel, with a capstone project that reduced churn predictions for a fintech case study. Seeking entry-level analytics roles.",
    },
    {
      tag: "ML enthusiast",
      text: "ML-curious developer who has built two end-to-end models (sentiment analyser, image classifier) using PyTorch. Looking for a Junior Data Scientist or ML Engineer role where I can contribute to model pipelines under strong technical mentorship.",
    },
  ],
  marketing: [
    {
      tag: "Creative storyteller",
      text: "Marketing graduate with internship experience running social media for two Tier-2 e-commerce brands, helping grow Instagram following by 18,000 in 4 months. Looking for a Digital Marketing Executive role where creativity meets measurable outcomes.",
    },
    {
      tag: "Performance-led",
      text: "Performance marketer with hands-on Google Ads and Meta Ads campaigns from college bootcamp. Comfortable with ROAS optimisation and A/B testing. Seeking a role at a high-growth D2C brand where I can own paid acquisition.",
    },
    {
      tag: "Content-first",
      text: "Aspiring content marketer who has published 40+ long-form articles and grown a personal newsletter to 1,200 subscribers. Looking for a content strategy role at a SaaS or media company.",
    },
  ],
  design: [
    {
      tag: "User-obsessed",
      text: "Design graduate with a portfolio of 5 case studies spanning fintech, ed-tech and social apps. Strong in Figma, design systems and user research. Seeking a UI/UX role at a product-led company where craft and clarity matter.",
    },
    {
      tag: "Versatile creative",
      text: "Visual designer comfortable across UI, illustration and branding. Have shipped marketing creatives for three D2C brands during my internship. Looking for a junior designer role at a brand or agency that values cross-discipline thinking.",
    },
    {
      tag: "Systems thinker",
      text: "Detail-oriented designer who built a design system for my college fest app used by 4,000 students. Looking for a Junior Product Designer role focused on consumer apps and design systems.",
    },
  ],
  finance: [
    {
      tag: "Markets-focused",
      text: "Commerce graduate with cleared CFA Level 1 and live equity research on three Indian mid-caps. Seeking an entry-level role in equity research, investment banking or financial analysis at a reputed firm.",
    },
    {
      tag: "Analytical",
      text: "Finance-major fresher with strong Excel and financial-modelling skills, building DCF and LBO models for college case competitions. Looking for an analyst role in IB, PE or corporate finance.",
    },
    {
      tag: "Banking-ready",
      text: "B.Com graduate passionate about retail and corporate banking. Cleared IBPS PO mains and have working knowledge of Tally and SAP. Looking for a probationary officer or relationship manager role.",
    },
  ],
  consulting: [
    {
      tag: "Structured thinker",
      text: "MBA finalist with consulting case-prep training and a campus placement project for a leading FMCG. Seeking a Business Analyst role at a strategy or management consulting firm.",
    },
    {
      tag: "Leadership-proven",
      text: "MBA graduate with cross-functional leadership across two college clubs and a live consulting project for an early-stage startup. Looking for a generalist consultant role with exposure to strategy and operations.",
    },
    {
      tag: "Operations-savvy",
      text: "Operations and supply-chain specialist with internships at a manufacturing major and a Q-commerce startup. Seeking a Management Trainee role at a consumer-facing company.",
    },
  ],
  sales: [
    {
      tag: "People-first",
      text: "Outgoing graduate with college-level event sponsorship experience worth ₹4 Lakh. Comfortable speaking with founders and corporates. Looking for a Business Development Associate role at a SaaS or ed-tech startup.",
    },
    {
      tag: "Target-driven",
      text: "Sales-curious graduate who topped a 200-team campus simulation. Strong communication in English and Hindi. Seeking an inside sales or relationship management role.",
    },
    {
      tag: "Growth-mindset",
      text: "Self-starter with two months of inside-sales internship experience at a B2B SaaS company, hitting 110% of dial targets. Looking for a Sales Development Representative role.",
    },
  ],
  hr: [
    {
      tag: "People champion",
      text: "MBA-HR graduate with internship at a 200-person tech company covering recruitment and onboarding. Looking for an HR Generalist or Talent Acquisition role with exposure to the full employee lifecycle.",
    },
    {
      tag: "Operations-ready",
      text: "Organised, empathetic fresher with strong Excel and Workday exposure from internship. Seeking an HR Operations role at a growing company.",
    },
    {
      tag: "L&D leaning",
      text: "Psychology graduate with two L&D project experiences for a college incubator. Looking for a Learning & Development role at a people-first organisation.",
    },
  ],
};

// ============================================================
// ACTION VERBS - for bullet auto-format
// ============================================================
const ACTION_VERBS = [
  "Built", "Designed", "Developed", "Launched", "Shipped", "Engineered", "Implemented", "Architected",
  "Led", "Spearheaded", "Coordinated", "Organised", "Mentored", "Trained", "Managed", "Directed",
  "Analysed", "Researched", "Modelled", "Forecasted", "Investigated", "Audited", "Benchmarked",
  "Improved", "Optimised", "Reduced", "Increased", "Accelerated", "Streamlined", "Doubled",
  "Created", "Authored", "Produced", "Composed", "Crafted", "Designed", "Illustrated",
  "Pitched", "Negotiated", "Closed", "Won", "Sold", "Acquired", "Retained",
  "Automated", "Migrated", "Refactored", "Deployed", "Tested", "Validated", "Debugged",
  "Collaborated", "Partnered", "Supported", "Facilitated", "Resolved", "Owned", "Drove",
];

// ============================================================
// SECTION TIPS
// ============================================================
const SECTION_TIPS = {
  personal: "Use the name as it appears on your Aadhaar / 10th marksheet - that's what HR will verify.",
  education: "Most Indian employers want all three: 10th, 12th and your Degree. Add CGPA OR percentage - whichever is higher.",
  skills: "List 6–12 skills. Recruiters scan in 7 seconds - keep only what you can defend in an interview.",
  projects: "Describe what you built, not just what you did. Numbers > adjectives.",
  objective: "Keep it to 3–4 lines. Mention the role you want and what you bring. 150–300 characters is ideal.",
};

// ============================================================
// ACCENT PALETTES (for TwoColumn + Creative templates)
// ============================================================
const ACCENT_PALETTES = [
  { id: "purple", name: "AI Purple", color: "#8500FA", soft: "#F2E8FF" },
  { id: "orange", name: "Action Orange", color: "#FF6B35", soft: "#FFF7F3" },
  { id: "graphite", name: "Graphite Black", color: "#1D1D1E", soft: "#F7F5F2" },
];

// ============================================================
// SAMPLE / DEFAULT RESUME DATA
// ============================================================
const SAMPLE_RESUME = {
  selectedTemplate: "classic",
  accent: "purple",
  jobCategory: "software",
  personal: {
    name: "Ananya Verma",
    fathersName: "",
    email: "ananya.verma@email.com",
    phone: "98765 43210",
    city: "Pune, Maharashtra",
    linkedin: "linkedin.com/in/ananyaverma",
    github: "github.com/ananyaverma",
    portfolio: "",
    photo: "",
  },
  education: [
    {
      id: "e1",
      degree: "B.Tech, Computer Science & Engineering",
      college: "Vishwakarma Institute of Technology, Pune",
      board: "",
      yearStart: "2021",
      yearEnd: "2025",
      score: "8.6",
      scoreType: "cgpa",
    },
    {
      id: "e2",
      degree: "Class 12 (Science)",
      college: "Symbiosis College of Arts & Commerce",
      board: "CBSE",
      yearStart: "",
      yearEnd: "2021",
      score: "89.4",
      scoreType: "percent",
    },
    {
      id: "e3",
      degree: "Class 10",
      college: "Loyola School, Pune",
      board: "CBSE",
      yearStart: "",
      yearEnd: "2019",
      score: "94.2",
      scoreType: "percent",
    },
  ],
  skills: {
    technical: ["JavaScript", "Python", "React", "Node.js", "SQL", "Git", "AWS"],
    tools: ["VS Code", "Figma", "Postman", "GitHub"],
    soft: ["Problem solving", "Teamwork", "Communication"],
    languages: ["English", "Hindi", "Marathi"],
  },
  projects: [
    {
      id: "p1",
      title: "Krishi-Connect - Farmer Marketplace",
      stack: "React, Node.js, MongoDB, Razorpay",
      bullets: [
        "Built a two-sided marketplace connecting 120+ farmers directly to retailers, removing middlemen",
        "Integrated Razorpay UPI for payments processing ₹2.4 Lakh in first 3 months of pilot",
        "Designed Hindi-first mobile UI used by farmers aged 35–60 with 4.6/5 usability rating",
      ],
      role: "Solo Developer",
      year: "2024",
      link: "github.com/ananyaverma/krishi-connect",
    },
    {
      id: "p2",
      title: "StudyBuddy - College Notes Sharing",
      stack: "Next.js, Supabase, Tailwind CSS",
      bullets: [
        "Built and shipped a notes-sharing platform with 800+ active users across 4 colleges in Pune",
        "Implemented full-text search across 2,300 uploaded PDFs using Supabase pgvector",
        "Featured in the college tech fest 2024 - won 2nd place out of 47 teams",
      ],
      role: "Co-founder, Tech Lead",
      year: "2023–2024",
      link: "studybuddy.in",
    },
  ],
  experience: [
    {
      id: "x1",
      role: "Software Engineering Intern",
      company: "InfoTech Solutions, Pune",
      yearStart: "May 2024",
      yearEnd: "Jul 2024",
      bullets: [
        "Shipped a customer dashboard feature used by 3,400 daily active users in the company's flagship SaaS product",
        "Reduced average API response time from 480ms to 120ms by introducing Redis caching on hot endpoints",
        "Wrote 60+ unit tests, raising test coverage of the billing service from 41% to 78%",
      ],
    },
  ],
  certifications: [
    { id: "c1", name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", year: "2024" },
    { id: "c2", name: "Meta Front-End Developer", issuer: "Coursera", year: "2023" },
  ],
  achievements: [
    "Finalist, Smart India Hackathon 2024 - top 5 of 380 teams",
    "Google Developer Student Club Lead, Vishwakarma Institute (2023–24)",
    "Volunteer Coding Instructor at Code for Pune - taught Python to 40+ school students",
  ],
  objective:
    "Recent Computer Science graduate with hands-on experience shipping full-stack web applications using React and Node.js to 800+ real users. Eager to join a fast-paced engineering team where I can ship production code, learn from senior engineers, and grow into a high-impact contributor.",
  declaration: true,
};

// Expose to window so other Babel scripts can read
window.RB_DATA = {
  TEMPLATE_META,
  JOB_CATEGORIES,
  SKILL_SUGGESTIONS,
  LANGUAGE_SUGGESTIONS,
  OBJECTIVE_TEMPLATES,
  ACTION_VERBS,
  SECTION_TIPS,
  ACCENT_PALETTES,
  SAMPLE_RESUME,
};
