import { useState } from "react";
import toast from "@/lib/toast";

const initialForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const INPUT_CLASS =
  "w-full rounded-lg border border-n-200 bg-n-50 px-4 py-3 text-sm text-n-900 outline-none transition focus:border-sk-primary focus:ring-2 focus:ring-sk-primary/10 focus:bg-white";
const LABEL_CLASS = "mb-1.5 block text-sm font-medium text-n-700";

const AdminPasswordTab = ({ embedded = false }) => {
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      toast.error("Please fill all password fields.");
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }
    setFormData(initialForm);
    toast.success("Password updated successfully.");
  };

  return (
    <div className={embedded ? "" : "max-w-2xl rounded-xl border border-n-200 bg-white p-6 shadow-sm"}>
      <div className="mb-6">
        <h3 className={embedded ? "text-lg font-bold text-n-900" : "text-2xl font-bold text-n-900"}>Change Password</h3>
        <p className="mt-2 text-sm text-n-500">
          Update the password used to access the admin dashboard.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block">
          <span className={LABEL_CLASS}>Current Password</span>
          <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} className={INPUT_CLASS} />
        </label>

        <label className="block">
          <span className={LABEL_CLASS}>New Password</span>
          <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} className={INPUT_CLASS} />
        </label>

        <label className="block">
          <span className={LABEL_CLASS}>Confirm New Password</span>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className={INPUT_CLASS} />
        </label>

        <button
          type="submit"
          className="w-full rounded-lg bg-sk-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-sk-hover sm:w-auto"
        >
          Save Password
        </button>
      </form>
    </div>
  );
};

export default AdminPasswordTab;
