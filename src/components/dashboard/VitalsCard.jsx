import React from "react";

/**
 * VitalsCard
 * Props (اختيارية):
 *  - heartRate   (number)    default: 72
 *  - systolic    (number)    default: 118
 *  - diastolic   (number)    default: 76
 *  - glucose     (number)    default: 92
 *  - className   (string)
 */

const ECGWave = ({ className = "" }) => {
  // موجة ECG بعرض ثابت تُكرر أفقياً
  return (
    <svg
      viewBox="0 0 600 80"
      preserveAspectRatio="none"
      className={`w-[600px] h-full ${className}`}
    >
      <defs>
        {/* توسيع مجال الفلتر عشان الوهج ما يتقصّش */}
        <filter
          id="glow"
          x="-20"
          y="-20"
          width="640"
          height="120"
          filterUnits="userSpaceOnUse"
        >
          <feGaussianBlur stdDeviation="2.2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="
          M0,40 L60,40 
          L90,40 L100,10 L112,65 L124,40 L170,40
          L200,40 L210,18 L222,62 L234,40 L280,40
          L310,40 L320,12 L332,66 L344,40 L390,40
          L420,40 L430,16 L442,64 L454,40 L500,40
          L530,40 L540,14 L552,66 L564,40 L600,40
        "
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        filter="url(#glow)"
      />
    </svg>
  );
};

const VitalsCard = ({
  heartRate = 72,
  systolic = 118,
  diastolic = 76,
  glucose = 92,
  className = "",
}) => {
  // تقدير الحالة (للتلوين فقط)
  const hrOk = heartRate >= 60 && heartRate <= 100;
  const bpOk = systolic < 130 && diastolic < 85;
  const gluOk = glucose >= 70 && glucose <= 140;

  // نسب المؤشرات
  const hrPct = Math.max(0, Math.min(100, ((heartRate - 40) / (160 - 40)) * 100));
  const bpPct = Math.max(0, Math.min(100, ((systolic - 90) / (160 - 90)) * 100));
  const gluPct = Math.max(0, Math.min(100, ((glucose - 60) / (200 - 60)) * 100));

  return (
    <section
      className={[
        "relative overflow-hidden rounded-2xl p-5 sm:p-7",
        "bg-white/90 backdrop-blur-sm",
        "border border-emerald-200/70 ring-1 ring-emerald-300/30",
        "shadow-xl shadow-emerald-200/40",
        "transition-all duration-300 hover:shadow-emerald-300/60 hover:-translate-y-0.5",
        className,
      ].join(" ")}
      style={{
        background:
          "linear-gradient(135deg, rgba(20,89,29,0.14), rgba(46,143,73,0.14)), #fff",
      }}
    >
      {/* أنماط أنيميشن محلية للكومبوننت */}
      <style>{`
        @keyframes heartbeat {
          0% { transform: scale(1); }
          15% { transform: scale(1.12); }
          30% { transform: scale(1); }
          45% { transform: scale(1.12); }
          60%, 100% { transform: scale(1); }
        }
        @keyframes pulseGlow {
          0% { opacity: .55; transform: scale(1); }
          70% { opacity: 0; transform: scale(1.85); }
          100% { opacity: 0; transform: scale(2); }
        }
        @keyframes ecgScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .reduce-motion { animation: none !important; }
        }
      `}</style>

      {/* العنوان + live */}
      <div className="flex items-center justify-between gap-3">
        <h3
          className="text-xl sm:text-2xl font-extrabold"
          style={{ color: "var(--brand-900)" }}
        >
          Vitals — Live
        </h3>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800">
          <span className="relative inline-flex h-2.5 w-2.5">
            <span
              className="absolute inset-0 rounded-full bg-emerald-500"
              style={{ animation: "pulseGlow 1.8s ease-out infinite" }}
            />
            <span className="relative inline-block h-2.5 w-2.5 rounded-full bg-emerald-600" />
          </span>
          Live
        </span>
      </div>

      {/* سطر القلب والنبض */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="relative inline-flex h-12 w-12 items-center justify-center">
            {/* وهج */}
            <span
              className="absolute inset-0 rounded-full bg-rose-400/30"
              style={{ animation: "pulseGlow 1.35s ease-out infinite" }}
              aria-hidden="true"
            />
            {/* أيقونة القلب */}
            <i
              className="bi bi-heart-fill text-rose-600 text-2xl"
              style={{ animation: "heartbeat 1.1s ease-in-out infinite" }}
              aria-hidden="true"
            />
          </span>
          <div>
            <div className="flex items-end gap-2">
              <span className="text-3xl sm:text-4xl font-black text-gray-900 leading-none">
                {heartRate}
              </span>
              <span className="text-sm font-semibold text-gray-600 mb-1">bpm</span>
            </div>
            <p
              className={`text-xs font-semibold ${
                hrOk ? "text-emerald-700" : "text-amber-700"
              }`}
            >
              {hrOk ? "Normal range" : "Out of range"}
            </p>
          </div>
        </div>

        {/* شريط نسبة النبض */}
        <div className="h-2 w-full sm:max-w-xs rounded-full bg-emerald-100 overflow-hidden">
          <span
            className={`block h-full ${hrOk ? "bg-emerald-500" : "bg-amber-500"}`}
            style={{ width: `${hrPct}%`, transition: "width .6s ease" }}
          />
        </div>
      </div>

      {/* ECG Wave — كامل بدون قصّ */}
      <div className="mt-5 relative h-24 sm:h-28 overflow-hidden rounded-lg border border-emerald-200 bg-white">
        {/* خط إرشادي أفقي خفيف */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_49%,rgba(16,185,129,.15)_50%,transparent_51%)]" />
        {/* الموجة المتحركة (بدون translateY، متوسّطة عبر flex) */}
        <div className="absolute inset-y-0 left-0 flex items-center text-emerald-600">
          <div
            className="flex w-[1200px]"
            style={{ animation: "ecgScroll 2.4s linear infinite" }}
          >
            <ECGWave className="h-full" />
            <ECGWave className="h-full" />
          </div>
        </div>
      </div>

      {/* المقاييس السفلية */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* ضغط */}
        <div className="group rounded-xl border border-emerald-200 bg-white/90 p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className="bi bi-activity text-emerald-700 text-lg" />
              <span className="text-sm font-semibold text-gray-700">
                Blood Pressure
              </span>
            </div>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                bpOk ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
              }`}
            >
              {bpOk ? "OK" : "Check"}
            </span>
          </div>
          <div className="mt-2 flex items-end gap-2">
            <span className="text-2xl font-extrabold text-gray-900 leading-none">
              {systolic}/{diastolic}
            </span>
            <span className="text-xs text-gray-500 mb-1">mmHg</span>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-emerald-100 overflow-hidden">
            <span
              className={`block h-full ${bpOk ? "bg-emerald-500" : "bg-amber-500"}`}
              style={{ width: `${bpPct}%`, transition: "width .6s ease" }}
            />
          </div>
        </div>

        {/* سكر */}
        <div className="group rounded-xl border border-emerald-200 bg-white/90 p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className="bi bi-droplet-half text-emerald-700 text-lg" />
              <span className="text-sm font-semibold text-gray-700">
                Blood Glucose
              </span>
            </div>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                gluOk ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
              }`}
            >
              {gluOk ? "OK" : "Check"}
            </span>
          </div>
          <div className="mt-2 flex items-end gap-2">
            <span className="text-2xl font-extrabold text-gray-900 leading-none">
              {glucose}
            </span>
            <span className="text-xs text-gray-500 mb-1">mg/dL</span>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-emerald-100 overflow-hidden">
            <span
              className={`block h-full ${gluOk ? "bg-emerald-500" : "bg-amber-500"}`}
              style={{ width: `${gluPct}%`, transition: "width .6s ease" }}
            />
          </div>
        </div>

        {/* تنفس (Placeholder قابل للتبديل بـ SpO2 لو حابب) */}
        <div className="group rounded-xl border border-emerald-200 bg-white/90 p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <i className="bi bi-lungs text-emerald-700 text-lg" />
            <span>Respiration</span>
            <span className="ml-auto text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
              Stable
            </span>
          </div>
          <div className="mt-2 flex items-end gap-2">
            <span className="text-2xl font-extrabold text-gray-900 leading-none">
              18
            </span>
            <span className="text-xs text-gray-500 mb-1">breaths/min</span>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-emerald-100 overflow-hidden">
            <span className="block h-full bg-emerald-500" style={{ width: "45%" }} />
          </div>
        </div>
      </div>

      {/* زخارف خلفية خفيفة */}
      <span className="pointer-events-none absolute -right-24 -bottom-24 w-64 h-64 rounded-full bg-emerald-200/35 blur-3xl" />
      <span className="pointer-events-none absolute -left-24 -top-24 w-48 h-48 rounded-full bg-emerald-100/50 blur-2xl" />
    </section>
  );
};

export default VitalsCard;
