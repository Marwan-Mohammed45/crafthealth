// src/pages/dashboard-d.jsx
import React from "react";
import MyChatsCard from "../components/dashboard/MyChatsCard";
import HospitalsLocatorCard from "../components/dashboard/HospitalsLocatorCard";
import LatestNewsCard from "../components/dashboard/Covid";
import newsBanner from "../assets/dashboard/covid.png"; // صورة الكارت الأخبار
// صور الكروت
import bannerImg from "../assets/dashboard/map-dash.png";
import personImg from "../assets/right.png";
// import MedicalHistoryCard from "../components/dashboard/MedicalHistoryCard"; // محذوف في نسخة الدكتور
import bgImage from "../assets/dashboard/dash.png"; // خلفية الصفحة
import VitalsCard from "../components/dashboard/VitalsCard";

// ملاحظة: نسخة الطبيب تُضيف "Dr." قبل الاسم وتُزيل كارت التاريخ الطبي
// يمكنك لاحقًا استبدال PlaceholderCard بالمكون الذي ستذكره لاحقًا

const PlaceholderCard = ({
  title = "Your component here",
  description = "استبدل هذا البليس هولدر بالمكون المطلوب لاحقًا.",
}) => (
  <div
    className="rounded-xl sm:rounded-2xl p-5 bg-white/90 backdrop-blur border border-gray-200 ring-1 ring-gray-200/60 shadow-md"
  >
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    <p className="mt-1 text-gray-600 text-sm">{description}</p>
  </div>
);

const Dashboard_D = ({ userName = "Ahmed Kareem" }) => {
  return (
    <div
      className="relative p-6 sm:p-6 h-full w-full overflow-hidden animate-fade-in"
      style={{ paddingTop: "env(safe-area-inset-top)" }} // دعم نوتش الموبايل
    >
      {/* خلفية Responsive: contain على الموبايل / cover على الشاشات الأكبر */}
      <div className="absolute inset-0 w-full -z-10 overflow-hidden">
        {/* ديسكتوب وأجهزة أكبر */}
        <img
          src={bgImage}
          alt=""
          className="hidden sm:block w-full h-full object-cover"
          loading="eager"
        />
        {/* موبايل: بدون قصّ */}
        <img
          src={bgImage}
          alt=""
          className="sm:hidden w-full h-full object-contain"
          loading="eager"
        />
      </div>

      {/* Overlay يوحّد التباين ويغطي أي فراغ بسيط حول الصورة على الموبايل */}
      <div className="absolute inset-0 -z-10 bg-white/80 sm:bg-white/70" />

      <div className="space-y-5 sm:space-y-6">
        {/* ===== Header ===== */}
        <section
          className="mt-4 sm:mt-6 relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-8 bg-white/70 backdrop-blur-sm transition-all duration-300 hover:shadow-md"
          style={{
            background:
              "linear-gradient(135deg, rgba(20,89,29,0.08), rgba(46,143,73,0.08)), #fff",
          }}
        >
          <section
            className="
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
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
              <div className="min-w-0">
                <h1
                  className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight truncate"
                  style={{ color: "var(--brand-900)" }}
                  title={`Hello Dr. ${userName}`}
                >
                  {/* اختلاف نسخة الدكتور: إضافة Dr. قبل الاسم */}
                  Hello Dr. {userName}
                </h1>
                <p className="mt-1 text-gray-600 text-base md:text-lg">
                  Welcome back, here’s your overview.
                </p>
              </div>

              {/* زر Ask AI */}
              <button
                type="button"
                className="group w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 md:px-3 md:py-2 rounded-full border
                           bg-white/90 backdrop-blur border-gray-200
                           text-sm font-semibold text-gray-800
                           transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
                aria-label="Ask AI"
                onClick={() => console.log("Ask AI")}
              >
                <i className="bi bi-stars text-base text-[var(--brand-600)] transition-transform duration-300 group-hover:rotate-12" />
                <span>Ask AI</span>
              </button>
            </div>

            {/* زخارف */}
            <span className="pointer-events-none absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-emerald-200/35 blur-3xl" />
            <span className="pointer-events-none absolute -left-24 -top-24 w-48 h-48 rounded-full bg-emerald-100/50 blur-2xl" />
          </section>

          {/* زخارف إضافية */}
          <div className="pointer-events-none absolute -right-16 -bottom-16 w-40 h-40 sm:w-56 sm:h-56 rounded-full bg-emerald-100/40 animate-float-slow" />
          <div className="pointer-events-none absolute -left-16 -top-16 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-emerald-50/60 animate-float-slower" />
        </section>

        {/* ===== Cards Grid 1 ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* كارت الشات */}
          <div className="card rounded-xl sm:rounded-2xl transition-all duration-300">
            <MyChatsCard
              items={[
                "Conversation 1",
                "Conversation 2",
                "Conversation 3",
                "Conversation 4",
              ]}
              onItemClick={(idx, label) => console.log("Open:", idx, label)}
              onAddNewConversation={() => console.log("Add new conversation")}
            />
          </div>

          {/* كارت المستشفيات */}
          <div className="card rounded-xl sm:rounded-2xl transition-all duration-300">
            <HospitalsLocatorCard
              bannerSrc={bannerImg}
              personSrc={personImg}
              bannerHref="/hospitals"
            />
          </div>
        </div>

        {/* ===== Cards Grid 2 ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <LatestNewsCard
            className="md:w-full"
            imageSrc={newsBanner}
            href="https://example.com/news"
            target="_blank"
            description="WHO chief declares end to COVID-19 as a "
            tagText="global health emergency"
            buttonText="Know now"
          />

          {/* تمت إزالة MedicalHistoryCard في نسخة الدكتور — ضع المكون الذي ستذكره لاحقًا هنا */}
          <PlaceholderCard title="Doctor Widget Area" description="ضع هنا المكون المخصص للطبيب (سأستبدله فور ما تبعته)." />
        </div>

        {/* ===== Vitals (Heart + ECG + BP + Glucose) ===== */}
        <VitalsCard
          className="md:w-full"
          heartRate={74}
          systolic={118}
          diastolic={76}
          glucose={92}
        />
      </div>
    </div>
  );
};

export default Dashboard_D;
