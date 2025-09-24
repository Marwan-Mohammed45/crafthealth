// src/pages/notifications.jsx
import React, { useState } from "react";

// بيانات تجريبية
const ALL_ROWS = [
  { id: 1, type: "stethoscope", title: "Upcoming checkup", desc: "Your annual clinic checkup is scheduled for next week.", time: "2h ago" },
  { id: 2, type: "heart",       title: "High heart rate spike", desc: "We detected an unusual heart rate spike earlier today.", time: "Yesterday" },
  { id: 3, type: "newspaper",   title: "WHO bulletin", desc: "New guidance released regarding seasonal respiratory illnesses.", time: "Aug 12, 2025" },
];

// أيقونة داخل مربع (استخدام أيقونات مضمونة التوفّر)
const IconBox = ({ type = "bell" }) => {
  const map = {
    stethoscope: "bi bi-journal-medical", // بديل مضمون لـ bi-stethoscope
    heart: "bi bi-heart",                  // بديل مضمون لـ heart-pulse
    newspaper: "bi bi-newspaper",
    bell: "bi bi-bell",
  };
  const icon = map[type] || map.bell;

  return (
    <span
      className="
        inline-flex h-10 w-10 items-center justify-center rounded-md
        bg-emerald-50 border border-emerald-200 text-emerald-600
        transform-gpu transition-transform duration-300
        group-hover:scale-110 group-hover:rotate-3
      "
      aria-hidden="true"
    >
      <i className={`${icon} text-lg`} />
    </span>
  );
};

const NotificationsPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(ALL_ROWS);

  const handleSearch = () => {
    const q = query.trim().toLowerCase();
    if (!q) return setResults(ALL_ROWS);
    setResults(
      ALL_ROWS.filter((r) =>
        `${r.title} ${r.desc} ${r.time} ${r.type}`.toLowerCase().includes(q)
      )
    );
  };

  const handleKeyDown = (e) => e.key === "Enter" && handleSearch();

  return (
    <div
      className="
        relative p-4 sm:p-6 pb-8
        min-h-[100svh] overflow-hidden animate-fade-in
      "
      style={{
        paddingTop: "env(safe-area-inset-top)",
        background: "linear-gradient(135deg, #f0fdf4, #e6f7ef, #f8fdfb)",
      }}
    >
      <div className="space-y-5 sm:space-y-6">
        {/* ===== Header ===== */}
        <section
          className="
            mt-4 sm:mt-6
            relative overflow-hidden rounded-xl sm:rounded-2xl p-5 sm:p-8
            bg-white/90 backdrop-blur-sm
            border border-emerald-200/70 ring-1 ring-emerald-300/30
            shadow-xl shadow-emerald-200/40
            transition-all duration-300 hover:shadow-emerald-300/60 hover:-translate-y-0.5
          "
          style={{
            background:
              "linear-gradient(135deg, rgba(20,89,29,0.16), rgba(46,143,73,0.16)), #fff",
          }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* يسار: العنوان + الوصف */}
            <div className="min-w-0">
              <h1
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight truncate"
                style={{ color: "var(--brand-900)" }}
                title="Notifications"
              >
                Notifications
              </h1>
              <p className="mt-1 text-gray-700 text-base md:text-lg">
                Review the latest alerts and updates in one place.
              </p>
            </div>

            {/* يمين: زر Mark all as read */}
            <button
              type="button"
              className="
                group inline-flex items-center gap-2 px-4 py-2 rounded-full
                border bg-white/90 backdrop-blur border-emerald-200 text-emerald-800
                font-semibold text-sm
                transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-95
              "
              onClick={() => console.log("Mark all as read")}
              aria-label="Mark all as read"
            >
              <span className="relative inline-flex h-5 w-5 items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-emerald-100" />
                <i className="bi bi-check2-circle relative text-emerald-700 text-base" />
              </span>
              <span>Mark all as read</span>
            </button>
          </div>

          {/* زخارف داخل الهيدر (ما تسببش Scroll لأن القسم overflow-hidden) */}
          <span className="pointer-events-none absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-emerald-200/35 blur-3xl" />
          <span className="pointer-events-none absolute -left-24 -top-24 w-48 h-48 rounded-full bg-emerald-100/50 blur-2xl" />
        </section>

        {/* ===== Search ===== */}
        <div className="flex items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search notifications..."
              className="
                w-full rounded-xl border border-emerald-200 bg-white/90
                pl-10 pr-24 sm:pr-28 py-2.5
                placeholder:text-gray-400 text-gray-800
                focus:outline-none focus:ring-2 focus:ring-emerald-400
                transition-all duration-300
              "
            />
            <button
              type="button"
              onClick={handleSearch}
              className="
                absolute right-1.5 top-1/2 -translate-y-1/2 z-10
                inline-flex items-center gap-2 px-3 py-1.5 rounded-lg
                bg-gradient-to-r from-emerald-500 to-emerald-600 text-white
                text-sm font-semibold shadow-sm
                transition-all duration-300 hover:shadow-md hover:translate-x-0.5 active:scale-95
                focus:outline-none focus:ring-2 focus:ring-emerald-400
              "
              aria-label="Search"
              title="Search"
            >
              <i className="bi bi-search" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </div>

        {/* ===== Mobile List (xs–sm) ===== */}
        <div className="md:hidden space-y-3">
          {results.length === 0 ? (
            <div className="rounded-xl border border-emerald-200 bg-white p-4 text-center text-gray-500">
              No matching notifications.
            </div>
          ) : (
            results.map((row) => (
              <div
                key={row.id}
                className="group rounded-xl border border-emerald-200 bg-white p-3 shadow-sm
                           transition-all duration-300 hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <IconBox type={row.type} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-gray-900 truncate">{row.title}</p>
                      <span className="text-xs text-gray-500 shrink-0">{row.time}</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{row.desc}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ===== Desktop Table (md+) ===== */}
        <section
          className="
            hidden md:block
            overflow-hidden rounded-2xl border border-emerald-200 bg-white
            ring-1 ring-emerald-100 shadow-md
            transition-all duration-300
          "
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead>
                <tr className="bg-emerald-50/60">
                  <th className="text-left text-sm font-semibold text-emerald-900 px-4 py-3">
                    Notification
                  </th>
                  <th className="text-left text-sm font-semibold text-emerald-900 px-4 py-3 w-48">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100">
                {results.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="px-4 py-10 text-center text-gray-500">
                      No matching notifications.
                    </td>
                  </tr>
                ) : (
                  results.map((row) => (
                    <tr key={row.id} className="group hover:bg-gray-50/70 transition-colors duration-200">
                      <td className="px-4 py-4 align-top">
                        <div className="flex items-start gap-3">
                          <IconBox type={row.type} />
                          <div>
                            <p className="text-sm md:text-base font-semibold text-gray-900">
                              {row.title}
                            </p>
                            <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                              {row.desc}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 align-top whitespace-nowrap">
                        <span className="text-sm text-gray-500">{row.time}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NotificationsPage;
