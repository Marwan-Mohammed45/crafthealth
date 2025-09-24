// src/pages/settings.jsx
import React, { useRef, useState } from "react";

// عنصر صغير لإعادة استخدام صف الإعداد
const SettingRow = ({
  label,
  value,
  buttonText,
  iconClass = "bi bi-pencil-square",
  onClick,
}) => {
  return (
    <div
      className="
        group flex items-start sm:items-center gap-3 sm:gap-4
        rounded-xl border border-emerald-200 bg-white/90 p-4
        transition-all duration-300 hover:shadow-md hover:-translate-y-0.5
      "
    >
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-emerald-700">{label}</p>
        <p className="mt-1 text-sm sm:text-base font-semibold text-gray-900 truncate">
          {value}
        </p>
      </div>

      <button
        type="button"
        onClick={onClick}
        className="
          ml-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-lg
          border border-emerald-200 bg-white text-emerald-800
          text-sm font-semibold shadow-sm
          transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:scale-95
          focus:outline-none focus:ring-2 focus:ring-emerald-400
        "
        title={buttonText}
        aria-label={buttonText}
      >
        <i className={`${iconClass}`} />
        <span className="hidden sm:inline">{buttonText}</span>
        <span className="sm:hidden">Change</span>
      </button>
    </div>
  );
};

const SettingsPage = () => {
  // بيانات مبدئية للعرض — اربطها بباك إندك لاحقًا
  const [user, setUser] = useState({
    username: "AhmedKareem",
    email: "ahmed.k@example.com",
    avatarUrl: "", // لو فاضي هيظهر حرف أول من الاسم
  });

  const fileInputRef = useRef(null);

  const handlePickPhoto = () => fileInputRef.current?.click();

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // مثال تحقق الحجم < 2MB
    if (file.size > 2 * 1024 * 1024) {
      alert("Max file size is 2MB.");
      e.target.value = "";
      return;
    }

    // عرض معاينة محلية (اختياري)
    const url = URL.createObjectURL(file);
    setUser((u) => ({ ...u, avatarUrl: url }));
  };

  const handleDeletePhoto = () =>
    setUser((u) => ({ ...u, avatarUrl: "" }));

  // أحداث Placeholder — اربطها بمودالات/رواتر
  const changeUsername = () => console.log("Change user name");
  const changeEmail = () => console.log("Change email");
  const changePassword = () => console.log("Change password");
  const logoutAll = () => console.log("Log out of all devices");
  const deleteAccount = () => console.log("Delete my account");

  return (
    <div
      className="
        relative p-4 sm:p-6 pb-10
        min-h-[100svh] overflow-hidden animate-fade-in
      "
      style={{
        paddingTop: "env(safe-area-inset-top)",
        background: "linear-gradient(135deg, #f0fdf4, #e6f7ef, #f8fdfb)",
      }}
    >
      <style>{`
        @keyframes floaty {
          0% { transform: translateY(0) }
          50% { transform: translateY(-4px) }
          100% { transform: translateY(0) }
        }
      `}</style>

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
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight"
            style={{ color: "var(--brand-900)" }}
          >
            Settings
          </h1>
          <p className="mt-1 text-gray-700 text-base md:text-lg">
            Manage your profile, security, and active sessions.
          </p>

          {/* زخرفة خفيفة */}
          <span className="pointer-events-none absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-emerald-200/35 blur-3xl" />
          <span className="pointer-events-none absolute -left-24 -top-24 w-48 h-48 rounded-full bg-emerald-100/50 blur-2xl" />
        </section>

        {/* ===== Main Settings Card ===== */}
        <section
          className="
            relative overflow-hidden rounded-2xl p-5 sm:p-7
            bg-white/90 backdrop-blur-sm
            border border-emerald-200/70 ring-1 ring-emerald-300/30
            shadow-xl shadow-emerald-200/40
            transition-all duration-300 hover:shadow-emerald-300/60
          "
          style={{
            background:
              "linear-gradient(135deg, rgba(20,89,29,0.14), rgba(46,143,73,0.14)), #fff",
          }}
        >
          {/* صورة المستخدم + الأزرار */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            {/* أفاتار */}
            <div
              className="
                relative inline-flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center
                rounded-full bg-emerald-50 border border-emerald-200
                shadow-md overflow-hidden
              "
              style={{ animation: "floaty 6s ease-in-out infinite" }}
            >
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-3xl font-black text-emerald-700">
                  {user.username?.[0]?.toUpperCase() || "U"}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handlePickPhoto}
                  className="
                    inline-flex items-center gap-2 px-3 py-2 rounded-lg
                    border border-emerald-200 bg-white text-emerald-800
                    text-sm font-semibold shadow-sm
                    transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:scale-95
                    focus:outline-none focus:ring-2 focus:ring-emerald-400
                  "
                  title="Change picture"
                >
                  <i className="bi bi-plus-lg" />
                  <span>Change picture</span>
                </button>

                <button
                  type="button"
                  onClick={handleDeletePhoto}
                  className="
                    inline-flex items-center gap-2 px-3 py-2 rounded-lg
                    border border-rose-200 bg-white text-rose-700
                    text-sm font-semibold shadow-sm
                    transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:scale-95
                    focus:outline-none focus:ring-2 focus:ring-rose-400
                  "
                  title="Delete photo"
                >
                  <i className="bi bi-trash3" />
                  <span>Delete photo</span>
                </button>

                {/* input مخفي لرفع الصورة */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg"
                  className="hidden"
                  onChange={handleUpload}
                />
              </div>

              <p className="text-xs text-gray-500">
                We support PNGs, JPEGs under 2MB
              </p>
            </div>
          </div>

          {/* ===== Account Security ===== */}
          <h3
            className="mt-8 text-lg sm:text-xl font-extrabold"
            style={{ color: "var(--brand-900)" }}
          >
            Account Security
          </h3>
          <div className="mt-2 h-px w-full bg-emerald-200" />

          <div className="mt-4 grid grid-cols-1 gap-3">
            <SettingRow
              label="Username"
              value={user.username}
              buttonText="Change user name"
              iconClass="bi bi-person-lines-fill"
              onClick={changeUsername}
            />
            <SettingRow
              label="Email"
              value={user.email}
              buttonText="Change email"
              iconClass="bi bi-envelope-paper"
              onClick={changeEmail}
            />
            <SettingRow
              label="Password"
              value="••••••••••"
              buttonText="Change password"
              iconClass="bi bi-key"
              onClick={changePassword}
            />
          </div>

          {/* ===== Other devices ===== */}
          <h3
            className="mt-8 text-lg sm:text-xl font-extrabold"
            style={{ color: "var(--brand-900)" }}
          >
            Other devices
          </h3>
          <div className="mt-2 h-px w-full bg-emerald-200" />

          {/* Log out of all devices */}
          <div
            className="
              mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4
              rounded-xl border border-emerald-200 bg-white/90 p-4
              transition-all duration-300 hover:shadow-md hover:-translate-y-0.5
            "
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm sm:text-base font-semibold text-gray-900">
                Log out of all devices
              </p>
              <p className="mt-1 text-xs sm:text-sm text-gray-600">
                Log out of all other active sessions on other devices beside this one.
              </p>
            </div>

            <button
              type="button"
              onClick={logoutAll}
              className="
                ml-auto inline-flex items-center gap-2 px-3 py-2 rounded-lg
                border border-amber-200 bg-white text-amber-800
                text-sm font-semibold shadow-sm
                transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:scale-95
                focus:outline-none focus:ring-2 focus:ring-amber-400
              "
              title="Log out of all devices"
            >
              <i className="bi bi-box-arrow-right" />
              <span>Log out</span>
            </button>
          </div>

          {/* Delete my account */}
          <div
            className="
              mt-3 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4
              rounded-xl border border-rose-200 bg-white/90 p-4
              transition-all duration-300 hover:shadow-md hover:-translate-y-0.5
            "
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm sm:text-base font-semibold text-gray-900">
                Delete my account
              </p>
              <p className="mt-1 text-xs sm:text-sm text-gray-600">
                Permanently delete your account and remove access from all other active devices.
              </p>
            </div>

            <button
              type="button"
              onClick={deleteAccount}
              className="
                ml-auto inline-flex items-center gap-2 px-3 py-2 rounded-lg
                bg-gradient-to-r from-rose-500 to-rose-600 text-white
                text-sm font-semibold shadow-sm
                transition-all duration-300 hover:shadow-md hover:translate-x-0.5 active:scale-95
                focus:outline-none focus:ring-2 focus:ring-rose-400
              "
              title="Delete my account"
            >
              <i className="bi bi-trash" />
              <span>Delete my account</span>
            </button>
          </div>

          {/* زخارف خلفية خفيفة */}
          <span className="pointer-events-none absolute -right-24 -bottom-24 w-64 h-64 rounded-full bg-emerald-200/35 blur-3xl" />
          <span className="pointer-events-none absolute -left-24 -top-24 w-48 h-48 rounded-full bg-emerald-100/50 blur-2xl" />
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
