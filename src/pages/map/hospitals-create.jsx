// src/pages/hospitals-create.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LS_KEY = "hospitals";

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

function load() {
  try {
    const v = localStorage.getItem(LS_KEY);
    const arr = v ? JSON.parse(v) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function save(arr) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(arr));
  } catch {}
}

const CreateHospitalPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    imageUrl: "",
    status: "public",
    name: "",
    governorate: "",
    street: "",
    rating: 4,
    landline: "",
  });
  const [preview, setPreview] = useState("");

  const onChange = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onPickImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      alert("Max file size is 3MB");
      return;
    }
    const dataUrl = await fileToDataUrl(file);
    setPreview(dataUrl);
    setForm((f) => ({ ...f, imageUrl: dataUrl }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // تحقق بسيط
    if (!form.name || !form.governorate || !form.street) {
      alert("Please fill name, governorate and street.");
      return;
    }
    const id = crypto.randomUUID ? crypto.randomUUID() : `h_${Date.now()}`;
    const arr = load();
    arr.unshift({ id, ...form, rating: parseFloat(form.rating) });
    save(arr);
    navigate("/dashboard/hospitals");
  };

  return (
    <div
      className="p-4 sm:p-6"
      style={{
        background: "linear-gradient(135deg, #f0fdf4, #e6f7ef, #f8fdfb)",
      }}
    >
      <section
        className="
          mx-auto max-w-3xl
          relative overflow-hidden rounded-2xl p-5 sm:p-7
          bg-white/90 backdrop-blur-sm
          border border-emerald-200/70 ring-1 ring-emerald-300/30
          shadow-xl shadow-emerald-200/40
          transition-all duration-300 hover:shadow-emerald-300/60
        "
        style={{
          background:
            "linear-gradient(135deg, rgba(20,89,29,0.12), rgba(46,143,73,0.12)), #fff",
        }}
      >
        <div className="flex items-center justify-between">
          <h1
            className="text-xl sm:text-2xl font-extrabold"
            style={{ color: "var(--brand-900)" }}
          >
            Create Hospital
          </h1>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-white px-3 py-1.5 text-sm font-semibold text-emerald-800 shadow hover:-translate-y-0.5 hover:shadow-md transition"
          >
            <i className="bi bi-arrow-left" />
            Back
          </button>
        </div>

        <form className="mt-5 grid grid-cols-1 gap-4" onSubmit={onSubmit}>
          {/* صورة المستشفى */}
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-4 items-center">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 h-24 w-24 overflow-hidden mx-auto sm:mx-0">
              {preview ? (
                <img src={preview} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-emerald-600">
                  <i className="bi bi-image text-3xl" />
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <label className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm font-semibold text-emerald-800 shadow hover:-translate-y-0.5 hover:shadow-md transition cursor-pointer">
                <i className="bi bi-plus-lg" />
                <span>Upload image</span>
                <input type="file" accept="image/*" className="hidden" onChange={onPickImage} />
              </label>
              {preview && (
                <button
                  type="button"
                  onClick={() => {
                    setPreview("");
                    setForm((f) => ({ ...f, imageUrl: "" }));
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-rose-200 bg-white px-3 py-2 text-sm font-semibold text-rose-700 shadow hover:-translate-y-0.5 hover:shadow-md transition"
                >
                  <i className="bi bi-trash3" />
                  Remove
                </button>
              )}
            </div>
          </div>

          {/* Private / Public */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700">Visibility</label>
              <select
                className="mt-1 w-full rounded-xl border border-emerald-200 bg-white/90 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                value={form.status}
                onChange={onChange("status")}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Landline</label>
              <input
                type="text"
                className="mt-1 w-full rounded-xl border border-emerald-200 bg-white/90 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="02-xxxxxxx"
                value={form.landline}
                onChange={onChange("landline")}
              />
            </div>
          </div>

          {/* الاسم والمحافظة والشارع */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Hospital name</label>
            <input
              type="text"
              className="mt-1 w-full rounded-xl border border-emerald-200 bg-white/90 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="Enter hospital name"
              value={form.name}
              onChange={onChange("name")}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700">Governorate</label>
              <input
                type="text"
                className="mt-1 w-full rounded-xl border border-emerald-200 bg-white/90 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="Cairo, Giza, Alex..."
                value={form.governorate}
                onChange={onChange("governorate")}
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">Street</label>
              <input
                type="text"
                className="mt-1 w-full rounded-xl border border-emerald-200 bg-white/90 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="Street name / details"
                value={form.street}
                onChange={onChange("street")}
                required
              />
            </div>
          </div>

          {/* التقييم */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Rating: <span className="text-emerald-700 font-bold">{form.rating}</span>
            </label>
            <input
              type="range"
              min={0}
              max={5}
              step={0.5}
              value={form.rating}
              onChange={onChange("rating")}
              className="mt-2 w-full accent-emerald-600"
            />
          </div>

          <div className="mt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/dashboard/hospitals")}
              className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow hover:-translate-y-0.5 hover:shadow-md transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:shadow-md hover:translate-x-0.5 active:scale-[.98] transition"
            >
              <i className="bi bi-check2-circle" />
              Save
            </button>
          </div>

        </form>

        {/* زخارف */}
        <span className="pointer-events-none absolute -right-24 -bottom-24 w-64 h-64 rounded-full bg-emerald-200/35 blur-3xl" />
        <span className="pointer-events-none absolute -left-24 -top-24 w-48 h-48 rounded-full bg-emerald-100/50 blur-2xl" />
      </section>
    </div>
  );
};

export default CreateHospitalPage;