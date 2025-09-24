// src/components/dashboard/HospitalsLocatorCard.jsx
import React from "react";

const HospitalsLocatorCard = ({
  title = "Locate Best Hospitals",
  bannerSrc,          // صورة المستطيل
  personSrc,          // صورة الشخص (PNG مفضّل)
  bannerHref,         // اللينك اللي تحب تروّح له عند الضغط على الصورة
  bannerTarget = "_self", // خليه "_blank" لو عايز تاب جديدة
  className = "",
}) => {
  const isBlank = bannerTarget === "_blank";

  const BannerWrapper = ({ children }) => {
    if (bannerHref) {
      return (
        <a
          href={bannerHref}
          target={bannerTarget}
          rel={isBlank ? "noopener noreferrer" : undefined}
          className="block mt-4 aspect-[16/9] rounded-xl overflow-hidden transform-gpu transition-all duration-500 hover:scale-[1.02] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer"
        >
          {children}
        </a>
      );
    }
    return (
      <div className="mt-4 aspect-[16/9] rounded-xl overflow-hidden">
        {children}
      </div>
    );
  };

  return (
    <section
      className={
        "group relative rounded-2xl border border-gray-200 bg-white p-4 md:p-5 " +
        "overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 " +
        className
      }
    >
      {/* نسيب مساحة يمين لصورة الشخص */}
      <div className="relative pr-[28%] md:pr-[30%]">
        {/* الأيقونة جنب العنوان */}
        <div className="inline-flex items-center gap-2">
          <i
            className="
              bi bi-geo-alt text-2xl text-[#2E8F49]
              transform-gpu transition-transform duration-700 will-change-transform
              hover:[transform:perspective(700px)_rotateY(360deg)_scale(1.15)]
              group-hover:[transform:perspective(700px)_rotateY(360deg)_scale(1.15)]
            "
            aria-hidden="true"
          />
          <h2
            className="text-xl md:text-2xl font-extrabold leading-none"
            style={{ color: "#14591D" }}
          >
            {title}
          </h2>
        </div>

        {/* البانر القابل للنقر */}
        {bannerSrc && (
          <BannerWrapper>
            <img
              src={bannerSrc}
              alt="Hospitals banner"
              className="w-full h-full object-cover transform-gpu transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
          </BannerWrapper>
        )}
      </div>

      {/* صورة الشخص اللاصقة يمين */}
      {personSrc && (
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[28%] md:w-[30%] flex items-end justify-end">
          <img
            src={personSrc}
            alt=""
            className="
              h-[102%] max-h-[560px] w-auto object-contain select-none
              transform-gpu transition-transform duration-500 origin-right
              group-hover:[transform:perspective(800px)_rotateY(-6deg)_translateX(8px)_scale(1.05)]
            "
            loading="lazy"
          />
        </div>
      )}
    </section>
  );
};

export default HospitalsLocatorCard;
