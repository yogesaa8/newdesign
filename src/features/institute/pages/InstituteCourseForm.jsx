import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { useAuthStore } from "../../../store";
import { createCourse, getCourse, getProfile, updateCourse } from "../api/instituteApi";

const initialCourse = {
  title: "",
  short_description: "",
  description: "",
  category: "",
  course_type: "course",
  mode: "online",
  duration: "",
  fees: "",
  currency: "INR",
  eligibility: "",
  skills_covered: "",
  outcomes: "",
  syllabus_url: "",
  brochure_url: "",
  city: "",
  state: "",
  country: "India",
  start_date: "",
  end_date: "",
  application_deadline: "",
  max_applications: "",
};

const nullableFields = [
  "short_description",
  "category",
  "duration",
  "fees",
  "eligibility",
  "skills_covered",
  "outcomes",
  "syllabus_url",
  "brochure_url",
  "city",
  "state",
  "start_date",
  "end_date",
  "application_deadline",
  "max_applications",
];

const editableCourseFields = [
  "title",
  "short_description",
  "description",
  "category",
  "course_type",
  "mode",
  "duration",
  "fees",
  "currency",
  "eligibility",
  "skills_covered",
  "outcomes",
  "syllabus_url",
  "brochure_url",
  "city",
  "state",
  "country",
  "start_date",
  "end_date",
  "application_deadline",
  "max_applications",
];

const toDateInputValue = (value) => {
  if (!value) return "";
  return String(value).slice(0, 10);
};

const buildPayload = (form) => {
  const payload = {};

  editableCourseFields.forEach((key) => {
    const value = form[key];
    const trimmed = typeof value === "string" ? value.trim() : value;
    if (nullableFields.includes(key) && trimmed === "") {
      payload[key] = null;
    } else if (key === "fees" && trimmed !== "") {
      payload[key] = Number(trimmed);
    } else if (key === "max_applications" && trimmed !== "") {
      payload[key] = Number(trimmed);
    } else {
      payload[key] = trimmed;
    }
  });
  return payload;
};

const InstituteCourseForm = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.accessToken);
  const [form, setForm] = useState(initialCourse);
  const [loading, setLoading] = useState(Boolean(courseId));
  const [saving, setSaving] = useState(false);
  const isEdit = Boolean(courseId);

  useEffect(() => {
    const loadCourse = async () => {
      setLoading(true);
      try {
        const profileResponse = await getProfile(token);
        const profileData = profileResponse?.data || {};
        const profile = profileData.profile || {};

        if (
          profileData.profile_status !== "completed" ||
          profile.status !== "active" ||
          profile.can_post_courses === false
        ) {
          toast.error("Please complete an active institute profile before managing courses.");
          navigate("/institute/profile", { replace: true });
          return;
        }

        if (!courseId) {
          setLoading(false);
          return;
        }

        const response = await getCourse(token, courseId);
        const course = response?.data?.course || {};
        setForm({
          ...initialCourse,
          ...course,
          start_date: toDateInputValue(course.start_date),
          end_date: toDateInputValue(course.end_date),
          application_deadline: toDateInputValue(course.application_deadline),
        });
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token && courseId) {
      loadCourse();
    } else if (token) {
      loadCourse();
    }
  }, [token, courseId, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const payload = buildPayload(form);
      const response = isEdit
        ? await updateCourse(token, courseId, payload)
        : await createCourse(token, payload);
      const nextCourse = response?.data?.course;
      toast.success(isEdit ? "Course updated." : "Course created as draft.");
      navigate(`/institute/courses/${nextCourse?.id || courseId}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-sm font-semibold text-n-500">Loading course...</div>;
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.1em] text-co-primary">Course</p>
        <h1 className="mt-1 text-2xl font-extrabold text-n-900">{isEdit ? "Edit course" : "Create course"}</h1>
      </div>

      <form onSubmit={handleSubmit} className="rounded-lg border border-n-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <Input audience="company" label="Title" name="title" value={form.title || ""} onChange={handleChange} required />
          <Input audience="company" label="Category" name="category" value={form.category || ""} onChange={handleChange} />
          <label className="text-sm font-medium text-n-700">
            Course type
            <select name="course_type" value={form.course_type || "course"} onChange={handleChange} className="mt-1.5 w-full rounded-lg border border-n-200 bg-white px-3 py-3 text-sm font-semibold outline-none focus:border-co-primary">
              <option value="course">Course</option>
              <option value="certification">Certification</option>
              <option value="training">Training</option>
              <option value="workshop">Workshop</option>
              <option value="bootcamp">Bootcamp</option>
            </select>
          </label>
          <label className="text-sm font-medium text-n-700">
            Mode
            <select name="mode" value={form.mode || "online"} onChange={handleChange} className="mt-1.5 w-full rounded-lg border border-n-200 bg-white px-3 py-3 text-sm font-semibold outline-none focus:border-co-primary" required>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </label>
          <Input audience="company" label="Short description" name="short_description" value={form.short_description || ""} onChange={handleChange} className="md:col-span-2" />
          <Input audience="company" label="Description" name="description" value={form.description || ""} onChange={handleChange} multiline rows={5} className="md:col-span-2" required />
          <Input audience="company" label="Duration" name="duration" value={form.duration || ""} onChange={handleChange} />
          <Input audience="company" label="Fees" type="number" min="0" name="fees" value={form.fees || ""} onChange={handleChange} />
          <Input audience="company" label="Currency" name="currency" value={form.currency || "INR"} onChange={handleChange} />
          <Input audience="company" label="Max applications" type="number" min="1" name="max_applications" value={form.max_applications || ""} onChange={handleChange} />
          <Input audience="company" label="Eligibility" name="eligibility" value={form.eligibility || ""} onChange={handleChange} multiline rows={3} />
          <Input audience="company" label="Skills covered" name="skills_covered" value={form.skills_covered || ""} onChange={handleChange} multiline rows={3} />
          <Input audience="company" label="Outcomes" name="outcomes" value={form.outcomes || ""} onChange={handleChange} multiline rows={3} className="md:col-span-2" />
          <Input audience="company" label="Syllabus URL" type="url" name="syllabus_url" value={form.syllabus_url || ""} onChange={handleChange} />
          <Input audience="company" label="Brochure URL" type="url" name="brochure_url" value={form.brochure_url || ""} onChange={handleChange} />
          <Input audience="company" label="City" name="city" value={form.city || ""} onChange={handleChange} />
          <Input audience="company" label="State" name="state" value={form.state || ""} onChange={handleChange} />
          <Input audience="company" label="Country" name="country" value={form.country || "India"} onChange={handleChange} />
          <Input audience="company" label="Start date" type="date" name="start_date" value={form.start_date || ""} onChange={handleChange} />
          <Input audience="company" label="End date" type="date" name="end_date" value={form.end_date || ""} onChange={handleChange} />
          <Input audience="company" label="Application deadline" type="date" name="application_deadline" value={form.application_deadline || ""} onChange={handleChange} />
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={() => navigate(-1)}>Cancel</Button>
          <Button type="submit" variant="primary-company" loading={saving}>{isEdit ? "Save course" : "Create draft"}</Button>
        </div>
      </form>
    </section>
  );
};

export default InstituteCourseForm;
