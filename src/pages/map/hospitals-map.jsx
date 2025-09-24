// src/pages/hospitals-map.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const LS_KEY = "hospitals";

const defaultHospitals = [
  {
    id: "h1",
    status: "public",
    name: "Al Salam International Hospital",
    governorate: "Cairo",
    street: "90th St, New Cairo",
    rating: 4.5,
    landline: "02-12345678",
    imageUrl:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "h2",
    status: "private",
    name: "Alexandria Medical Center",
    governorate: "Alexandria",
    street: "Corniche Rd, Sidi Gaber",
    rating: 4.2,
    landline: "03-87654321",
    imageUrl:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1200&auto=format&fit=crop",
  },
];

function loadHospitals() {
  try {
    const saved = localStorage.getItem(LS_KEY);
    if (!saved) return defaultHospitals;
    const arr = JSON.parse(saved);
    return Array.isArray(arr) && arr.length ? arr : defaultHospitals;
  } catch {
    return defaultHospitals;
  }
}

const StarRating = ({ value = 0 }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const diff = value - i;
    if (diff >= 0) stars.push("fill");
    else if (diff > -1) stars.push("half");
    else stars.push("empty");
  }
  return (
    <div className="flex items-center gap-0.5">
      {stars.map((t, idx) => (
        <i
          key={idx}
          className={
            t === "fill"
              ? "bi bi-star-fill"
              : t === "half"
              ? "bi bi-star-half"
              : "bi bi-star"
          }
          style={{ color: "#059669" }}
        />
      ))}
    </div>
  );
};

const StatusPill = ({ status }) => {
  const isPublic = status === "public";
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full",
        "text-xs font-bold border shadow-sm backdrop-blur bg-white/85",
        isPublic
          ? "border-emerald-300 text-emerald-800"
          : "border-amber-300 text-amber-800",
      ].join(" ")}
      title={isPublic ? "Public" : "Private"}
    >
      <span
        className={[
          "h-2 w-2 rounded-full",
          isPublic ? "bg-emerald-500" : "bg-amber-500",
        ].join(" ")}
      />
      {isPublic ? "Public" : "Private"}
    </span>
  );
};

const HospitalCard = ({ h, onClick }) => (
  <div
    className="group overflow-hidden rounded-2xl border border-emerald-200/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
    onClick={onClick}
    role="button"
    tabIndex={0}
  >
    <div className="relative">
      <img
        src={h.imageUrl}
        alt={h.name}
        className="h-40 w-full object-cover"
        loading="lazy"
      />
      <div className="absolute top-3 left-3">
        <StatusPill status={h.status} />
      </div>
    </div>

    <div className="p-4">
      <h4 className="text-base sm:text-lg font-extrabold text-gray-900">
        {h.name}
      </h4>
      <p className="mt-0.5 text-sm font-semibold text-emerald-700">
        {h.governorate}
      </p>

      <div className="mt-2 flex items-center justify-between gap-3">
        <StarRating value={h.rating} />
        <span className="ml-auto inline-flex items-center rounded-lg border border-emerald-200 px-2 py-1 text-sm font-semibold text-gray-800 bg-white">
          {h.landline}
        </span>
      </div>

      <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
        <i className="bi bi-geo-alt" style={{ color: "#059669" }} />
        <span>{h.street}</span>
      </div>
    </div>
  </div>
);

const HospitalsMapPage = () => {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");
  const [hospitals, setHospitals] = useState(() => loadHospitals());
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const onStorage = () => setHospitals(loadHospitals());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const filtered = useMemo(() => {
    const base =
      filter === "all"
        ? hospitals
        : hospitals.filter((h) => h.status === filter);
    const k = q.trim().toLowerCase();
    if (!k) return base;
    return base.filter((h) =>
      `${h.name} ${h.governorate} ${h.street} ${h.landline} ${h.status}`
        .toLowerCase()
        .includes(k)
    );
  }, [hospitals, q, filter]);

  const handleSelect = (h) => setSelected(h.id);

  return (
    <div
      className="p-4 sm:p-6"
      style={{
        background: "linear-gradient(135deg, #f0fdf4, #e6f7ef, #f8fdfb)",
      }}
    >
      {/* ===== Top bar: Back + Title ===== */}
      <div className="mb-4 sm:mb-6 flex items-center justify-between">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-white px-3 py-1.5 text-sm font-semibold text-emerald-800 shadow hover:-translate-y-0.5 hover:shadow-md transition"
          aria-label="Back"
          title="Back"
        >
          <i className="bi bi-arrow-left" />
          <span>Back</span>
        </Link>

        <div className="text-right">
          <h1
            className="text-2xl sm:text-3xl font-extrabold"
            style={{ color: "var(--brand-900)" }}
          >
            Hospitals Map
          </h1>
          <p className="text-gray-700 text-sm sm:text-base">
            Explore hospitals and clinics near you.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-4 sm:gap-6">
        {/* الخريطة (شمال) */}
        <section className="md:col-span-7">
          <div className="md:sticky md:top-4 h-64 md:h-[calc(100svh-2rem)]">
            <div
              className="
                relative h-full w-full overflow-hidden rounded-2xl
                border border-emerald-200 ring-1 ring-emerald-100 shadow-md
              "
            >
              <div className="absolute inset-0">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(60% 60% at 20% 30%, #d1fae5 0%, #a7f3d0 35%, #6ee7b7 60%, #34d399 85%, #10b981 100%)",
                    opacity: 0.9,
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(0,0,0,.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,.15) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                    mixBlendMode: "multiply",
                    opacity: 0.25,
                  }}
                />
                <div className="absolute inset-0 bg-emerald-900/10" />
              </div>

              {/* شريط علوي فوق الخريطة */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-xl bg-white/90 px-3 py-1.5 text-sm font-semibold text-emerald-800 border border-emerald-200 shadow">
                  <i className="bi bi-map" />
                  Live Map
                </span>

                <Link
                  to="/hospitals/create"
                  className="inline-flex items-center gap-2 rounded-lg bg-white/90 px-3 py-1.5 text-sm font-semibold border border-emerald-200 text-emerald-800 shadow hover:-translate-y-0.5 hover:shadow-md transition"
                  title="Create"
                >
                  <i className="bi bi-plus-lg" />
                  <span>Create</span>
                </Link>
              </div>

              {/* مؤشر اختيار */}
              {selected && (
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="rounded-xl bg-white/90 border border-emerald-200 p-3 text-sm text-gray-700 shadow">
                    Selected:{" "}
                    <span className="font-bold text-emerald-700">
                      {hospitals.find((x) => x.id === selected)?.name}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* الكروت (يمين) */}
        <section className="md:col-span-5">
          {/* أدوات */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600" />
              <input
                type="text"
                className="w-full rounded-xl border border-emerald-200 bg-white/90 pl-10 pr-3 py-2.5 text-sm placeholder:text-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                placeholder="Search hospitals..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition ${
                  filter === "all"
                    ? "border-emerald-300 text-emerald-800 bg-white"
                    : "border-emerald-200 text-gray-700 bg-white/80"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setFilter("public")}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition ${
                  filter === "public"
                    ? "border-emerald-300 text-emerald-800 bg-white"
                    : "border-emerald-200 text-gray-700 bg-white/80"
                }`}
              >
                Public
              </button>
              <button
                type="button"
                onClick={() => setFilter("private")}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition ${
                  filter === "private"
                    ? "border-emerald-300 text-emerald-800 bg-white"
                    : "border-emerald-200 text-gray-700 bg-white/80"
                }`}
              >
                Private
              </button>
            </div>
          </div>

          {/* قائمة الكروت */}
          <div className="mt-3 space-y-3 md:max-h-[calc(100svh-2rem)] md:overflow-auto pr-1">
            {filtered.length === 0 ? (
              <div className="rounded-xl border border-emerald-200 bg-white p-4 text-center text-gray-500">
                No hospitals found.
              </div>
            ) : (
              filtered.map((h) => (
                <HospitalCard key={h.id} h={h} onClick={() => setSelected(h.id)} />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HospitalsMapPage;
