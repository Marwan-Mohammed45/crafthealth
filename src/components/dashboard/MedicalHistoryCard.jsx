// src/components/dashboard/MedicalHistoryCard.jsx
import React from "react";

const MedicalHistoryCard = ({ title = "medical history", className = "" }) => {
  return (
    <section
      className={
        "w-full md:w-1/2 " + // جنب الكارت التاني على الشاشات المتوسطة+
        "group relative rounded-2xl border border-gray-200 bg-white p-4 md:p-5 " +
        "overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 " +
        className
      }
    >
      {/* الهيدر: أيقونة + عنوان */}
      <div className="flex items-center gap-2">
        <i
          className="bi bi-journal-medical text-2xl text-[#2E8F49]
                     transform-gpu transition-transform duration-700 will-change-transform
                     group-hover:[transform:perspective(700px)_rotateY(360deg)_scale(1.1)]"
          aria-hidden="true"
        />
        <h2
          className="text-xl md:text-2xl font-extrabold leading-none"
          style={{ color: "#14591D" }}
        >
          {title}
        </h2>
      </div>

      {/* مساحة فارغة هنملاها لاحقًا */}
      <div className="mt-4 h-40 rounded-xl border border-dashed border-emerald-200 bg-emerald-50/20" />

      {/* زينة خفيفة */}
      <div className="pointer-events-none absolute -top-8 -right-10 h-24 w-24 rounded-full bg-emerald-50 blur-2xl group-hover:scale-110 transition-transform duration-500" />
      <div className="pointer-events-none absolute -bottom-10 -left-8 h-20 w-20 rounded-full bg-emerald-50 blur-2xl group-hover:translate-x-1 transition-transform duration-500" />
    </section>
  );
};

export default MedicalHistoryCard;
