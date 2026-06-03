import { useState } from "react";

const initialForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const AdminPasswordTab = () => {
  const [formData, setFormData] = useState(initialForm);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      setMessage("Please fill all password fields.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("New password and confirm password do not match.");
      return;
    }

    setFormData(initialForm);
    setMessage("Password updated successfully.");
  };

  return (
    <div className="max-w-2xl rounded border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-800">Change Password</h3>
        <p className="mt-2 text-sm text-slate-500">
          Update the password used to access the admin dashboard.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">
            Current Password
          </span>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="w-full rounded border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">
            New Password
          </span>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full rounded border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">
            Confirm New Password
          </span>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full rounded border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
        </label>

        {message && (
          <p
            className={`rounded px-4 py-3 text-sm font-medium ${
              message.includes("success")
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          className="rounded bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-700"
        >
          Save Password
        </button>
      </form>
    </div>
  );
};

export default AdminPasswordTab;
