import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ImageIcon, Save, Upload, X } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { useAuthStore } from "../../../store";
import {
  completeProfile,
  getProfile,
  updateProfile,
} from "../api/instituteApi";

const initialProfile = {
  institute_name: "",
  institute_logo_url: "",
  website: "",
  email: "",
  phone: "",
  contact_person_name: "",
  contact_person_email: "",
  contact_person_phone: "",
  city: "",
  state: "",
  country: "India",
  address: "",
};

const requiredFields = [
  "institute_name",
  "email",
  "phone",
  "contact_person_name",
  "contact_person_phone",
  "city",
  "state",
];

const editableProfileFields = [
  "institute_name",
  "institute_logo_url",
  "website",
  "email",
  "phone",
  "contact_person_name",
  "contact_person_email",
  "contact_person_phone",
  "city",
  "state",
  "country",
  "address",
];

const optionalProfileFields = [
  "institute_logo_url",
  "website",
  "contact_person_email",
  "country",
  "address",
];

const validateProfileForm = (form) => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  if (String(form.institute_name || "").trim().length < 2) {
    errors.institute_name = "Institute name must be at least 2 characters.";
  }
  if (!emailRegex.test(String(form.email || "").trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!phoneRegex.test(String(form.phone || "").trim())) {
    errors.phone = "Enter a 10 digit phone number.";
  }
  if (String(form.contact_person_name || "").trim().length < 2) {
    errors.contact_person_name = "Contact person name must be at least 2 characters.";
  }
  if (!phoneRegex.test(String(form.contact_person_phone || "").trim())) {
    errors.contact_person_phone = "Enter a 10 digit contact phone number.";
  }
  if (String(form.city || "").trim().length < 2) {
    errors.city = "City must be at least 2 characters.";
  }
  if (String(form.state || "").trim().length < 2) {
    errors.state = "State must be at least 2 characters.";
  }
  if (form.contact_person_email?.trim() && !emailRegex.test(form.contact_person_email.trim())) {
    errors.contact_person_email = "Enter a valid contact email address.";
  }

  return errors;
};

const cleanPayload = (form, isCompleted) => {
  const payload = {};

  editableProfileFields.forEach((key) => {
    const value = typeof form[key] === "string" ? form[key].trim() : form[key];

    if (optionalProfileFields.includes(key)) {
      if (value === "") {
        if (isCompleted) payload[key] = null;
        return;
      }
      payload[key] = value;
      return;
    }

    payload[key] = value;
  });

  if (!payload.country) {
    payload.country = "India";
  }

  return payload;
};

const InstituteProfile = () => {
  const token = useAuthStore((state) => state.accessToken);
  const fileInputRef = useRef(null);
  const [form, setForm] = useState(initialProfile);
  const [logoPreview, setLogoPreview] = useState("");
  const [profileStatus, setProfileStatus] = useState("pending");
  const [permissions, setPermissions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const isCompleted = profileStatus === "completed";

  const missingRequired = useMemo(
    () => requiredFields.some((field) => !String(form[field] || "").trim()),
    [form]
  );

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        const payload = await getProfile(token);
        const data = payload?.data || {};
        const profile = data.profile || {};
        setProfileStatus(data.profile_status || "pending");
        setPermissions(profile);
        setForm({
          ...initialProfile,
          email: data.account?.email || "",
          phone: data.account?.phone_no || "",
          ...profile,
        });
        setLogoPreview(profile.institute_logo_url || "");
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      loadProfile();
    }
  }, [token]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Logo image must be 5 MB or smaller.");
      event.target.value = "";
      return;
    }

    const localPreview = URL.createObjectURL(file);
    setLogoPreview(localPreview);
    setLogoUploading(false);
    toast("Logo selected. Upload API will save it after integration.");
    event.target.value = "";
  };

  const handleRemoveLogo = () => {
    setForm((prev) => ({ ...prev, institute_logo_url: "" }));
    setLogoPreview("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateProfileForm(form);
    setFormErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.error("Please fix the highlighted required fields.");
      return;
    }

    setSaving(true);
    try {
      const payload = cleanPayload(form, isCompleted);
      const response = isCompleted
        ? await updateProfile(token, payload)
        : await completeProfile(token, payload);
      const data = response?.data || {};
      setProfileStatus(data.profile_status || "completed");
      setPermissions(data.profile || permissions);
      setForm((prev) => ({ ...prev, ...(data.profile || {}) }));
      toast.success(isCompleted ? "Profile updated." : "Profile completed.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-sm font-semibold text-n-500">Loading institute profile...</div>;
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-6 md:px-8">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-co-primary">
            Institute Profile
          </p>
          <h1 className="mt-1 text-2xl font-extrabold text-n-900">
            {isCompleted ? "Manage profile" : "Complete your profile"}
          </h1>
          <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-n-500">
            Course creation is available after the institute profile is completed and active.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-lg bg-white px-3 py-2 text-xs font-bold text-n-600 ring-1 ring-n-200">
            Status: {profileStatus}
          </span>
          {permissions && (
            <span className="rounded-lg bg-white px-3 py-2 text-xs font-bold text-n-600 ring-1 ring-n-200">
              Courses: {permissions.can_post_courses ? "allowed" : "blocked"}
            </span>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-lg border border-n-200 bg-white p-5 shadow-sm">
        <div className="mb-6 rounded-lg border border-n-200 bg-n-50 p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-n-200 bg-white">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt={form.institute_name || "Institute logo"}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <ImageIcon className="h-8 w-8 text-n-300" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-extrabold text-n-900">Institute logo</p>
                <p className="mt-1 text-xs font-medium leading-5 text-n-500">
                  Upload a square PNG, JPG, or WebP image up to 5 MB.
                </p>
                {form.institute_logo_url && (
                  <p className="mt-1 truncate text-xs font-semibold text-n-400">
                    {form.institute_logo_url}
                  </p>
                )}
              </div>
            </div>

            <div className="flex shrink-0 flex-wrap gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                className="hidden"
                onChange={handleLogoUpload}
              />
              <Button
                type="button"
                variant="outline-company"
                loading={logoUploading}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-4 w-4" />
                Upload logo
              </Button>
              {form.institute_logo_url && (
                <Button type="button" variant="ghost" onClick={handleRemoveLogo}>
                  <X className="h-4 w-4" />
                  Remove
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Input audience="company" label="Institute name *" name="institute_name" value={form.institute_name || ""} onChange={handleChange} error={formErrors.institute_name} required />
          <Input audience="company" label="Official email *" type="email" name="email" value={form.email || ""} onChange={handleChange} error={formErrors.email} required />
          <Input audience="company" label="Phone *" name="phone" value={form.phone || ""} onChange={handleChange} error={formErrors.phone} required />
          <Input audience="company" label="Website" type="url" name="website" value={form.website || ""} onChange={handleChange} placeholder="https://example.com" />
          <Input audience="company" label="Contact person *" name="contact_person_name" value={form.contact_person_name || ""} onChange={handleChange} error={formErrors.contact_person_name} required />
          <Input audience="company" label="Contact email" type="email" name="contact_person_email" value={form.contact_person_email || ""} onChange={handleChange} error={formErrors.contact_person_email} />
          <Input audience="company" label="Contact phone *" name="contact_person_phone" value={form.contact_person_phone || ""} onChange={handleChange} error={formErrors.contact_person_phone} required />
          <Input audience="company" label="City *" name="city" value={form.city || ""} onChange={handleChange} error={formErrors.city} required />
          <Input audience="company" label="State *" name="state" value={form.state || ""} onChange={handleChange} error={formErrors.state} required />
          <Input audience="company" label="Country" name="country" value={form.country || ""} onChange={handleChange} />
          <Input audience="company" label="Address" name="address" value={form.address || ""} onChange={handleChange} multiline rows={3} className="md:min-h-[116px]" />
        </div>
        <div className="mt-5 flex justify-end">
          <Button type="submit" variant="primary-company" loading={saving} disabled={missingRequired}>
            <Save className="h-4 w-4" />
            {isCompleted ? "Save changes" : "Complete profile"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default InstituteProfile;
