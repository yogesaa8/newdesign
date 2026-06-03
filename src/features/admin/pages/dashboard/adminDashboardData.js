export const adminTabs = [
  { id: "overview", label: "Dashboard", icon: "dashboard" },
  { id: "approvals", label: "Approvals", icon: "check_circle" },
  { id: "jobs", label: "Jobs", icon: "work" },
  { id: "users", label: "Users", icon: "people" },
  { id: "reports", label: "Reports", icon: "flag" },
  { id: "profile", label: "Profile", icon: "account_circle" },
  { id: "password", label: "Password", icon: "lock" },
];

export const adminProfile = {
  name: "Admin User",
  email: "admin@firstjobindia.com",
  role: "Super Admin",
  phone: "+91 98765 43210",
  location: "India",
  lastLogin: "Today, 10:24 AM",
};

export const statsData = [
  { title: "Total Job Seekers", value: "12,450", icon: "groups" },
  { title: "Total Companies", value: "340", icon: "apartment" },
  { title: "Active Jobs", value: "1,250", icon: "work" },
  { title: "Pending Approvals", value: "14", icon: "schedule" },
];

export const pendingCompanies = [
  {
    id: 1,
    name: "TechCorp Solutions",
    hr: "Rahul Sharma",
    date: "2023-10-25",
    industry: "IT Services",
  },
  {
    id: 2,
    name: "BuildRight Constructions",
    hr: "Priya Patel",
    date: "2023-10-24",
    industry: "Construction",
  },
  {
    id: 3,
    name: "MediCare Hospitals",
    hr: "Dr. Aman",
    date: "2023-10-24",
    industry: "Healthcare",
  },
];

export const recentApplications = [
  {
    id: 101,
    seeker: "Amit Kumar",
    job: "Senior React Developer",
    company: "TechCorp",
    status: "New",
  },
  {
    id: 102,
    seeker: "Sneha Reddy",
    job: "Marketing Manager",
    company: "AdGlobal",
    status: "Shortlisted",
  },
  {
    id: 103,
    seeker: "Vikram Singh",
    job: "Data Analyst",
    company: "DataMiners",
    status: "Rejected",
  },
];

export const statusColors = {
  New: "bg-blue-50 text-blue-600",
  Shortlisted: "bg-green-50 text-green-600",
  Rejected: "bg-red-50 text-red-500",
};
