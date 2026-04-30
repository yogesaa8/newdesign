import React, { useState } from 'react';

// --- STATIC DUMMY DATA ---
const statsData = [
  { title: 'Total Job Seekers', value: '12,450', icon: '👤', color: 'bg-blue-50 text-blue-600' },
  { title: 'Total Companies', value: '340', icon: '🏢', color: 'bg-green-50 text-green-600' },
  { title: 'Active Jobs', value: '1,250', icon: '💼', color: 'bg-purple-50 text-purple-600' },
  { title: 'Pending Approvals', value: '14', icon: '⏳', color: 'bg-orange-50 text-orange-600' },
];

const pendingCompanies = [
  { id: 1, name: 'TechCorp Solutions', hr: 'Rahul Sharma', date: '2023-10-25', industry: 'IT Services' },
  { id: 2, name: 'BuildRight Constructions', hr: 'Priya Patel', date: '2023-10-24', industry: 'Construction' },
  { id: 3, name: 'MediCare Hospitals', hr: 'Dr. Aman', date: '2023-10-24', industry: 'Healthcare' },
];

const recentApplications = [
  { id: 101, seeker: 'Amit Kumar', job: 'Senior React Developer', company: 'TechCorp', status: 'New' },
  { id: 102, seeker: 'Sneha Reddy', job: 'Marketing Manager', company: 'AdGlobal', status: 'Shortlisted' },
  { id: 103, seeker: 'Vikram Singh', job: 'Data Analyst', company: 'DataMiners', status: 'Rejected' },
];

const statusColors = {
  'New': 'bg-blue-100 text-blue-700',
  'Shortlisted': 'bg-green-100 text-green-700',
  'Rejected': 'bg-red-100 text-red-700',
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">JobPortal<span className="text-blue-600">.admin</span></h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'overview', label: 'Dashboard', icon: '📊' },
            { id: 'approvals', label: 'Approvals', icon: '✅' },
            { id: 'jobs', label: 'Job Moderation', icon: '💼' },
            { id: 'users', label: 'Users', icon: '👥' },
            { id: 'reports', label: 'Reports/Flags', icon: '🚩' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">A</div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Admin User</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 overflow-y-auto p-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {activeTab === 'overview' ? 'Dashboard Overview' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>
            <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-2 text-sm text-gray-600 w-64">
            <span>🔍</span>
            <input type="text" placeholder="Search anything..." className="bg-transparent outline-none w-full" />
          </div>
        </div>

        {/* --- OVERVIEW TAB --- */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsData.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</h3>
                  </div>
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Pending Companies Table */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-bold text-gray-800">Pending Company Approvals</h3>
                  <button onClick={() => setActiveTab('approvals')} className="text-sm text-blue-600 hover:underline">View All</button>
                </div>
                <div className="divide-y divide-gray-100">
                  {pendingCompanies.map((company) => (
                    <div key={company.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div>
                        <p className="font-semibold text-gray-800">{company.name}</p>
                        <p className="text-sm text-gray-500">{company.industry} • {company.hr}</p>
                      </div>
                      <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-100">
                        Review
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Applications Table */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="font-bold text-gray-800">Recent Applications</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {recentApplications.map((app) => (
                    <div key={app.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div>
                        <p className="font-semibold text-gray-800">{app.seeker}</p>
                        <p className="text-sm text-gray-500">applied for {app.job} at {app.company}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[app.status]}`}>
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* --- APPROVALS TAB (Detailed View) --- */}
        {activeTab === 'approvals' && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 text-sm font-semibold text-gray-600">Company Name</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">HR Contact</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">Industry</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">Applied On</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pendingCompanies.map((company) => (
                  <tr key={company.id} className="hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-800">{company.name}</td>
                    <td className="p-4 text-gray-600">{company.hr}</td>
                    <td className="p-4 text-gray-600">{company.industry}</td>
                    <td className="p-4 text-gray-500">{company.date}</td>
                    <td className="p-4 text-right space-x-2">
                      <button className="px-4 py-1.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                        Approve
                      </button>
                      <button className="px-4 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* --- PLACEHOLDER FOR OTHER TABS --- */}
        {activeTab !== 'overview' && activeTab !== 'approvals' && (
          <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400">
            <span className="text-5xl mb-4">🚧</span>
            <h3 className="text-xl font-semibold">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Module</h3>
            <p className="mt-2">UI design for this section is under progress.</p>
          </div>
        )}

      </main>
    </div>
  );
}