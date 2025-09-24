// src/components/dashboard/LatestNewsCard.jsx
import React from "react";

const LatestNewsCard = ({
  title = "Latest news about diseases",
  imageSrc,
  href,                 // لم يعد يُستخدم افتراضيًا (العرض فقط)
  target = "_self",
  description = "Stay up to date with the most important disease updates, outbreaks, and official health advisories.",
  tagText = "Trusted sources · Updated daily",
  buttonText = "Know now",
  className = "",
  // خيارات مرنة:
  clickable = false,     // خليها false للعرض فقط
  bannerAspect = "aspect-[21/9]", // لتقليل الارتفاع مقارنة بـ 16/9
}) => {
  const isBlank = target === "_blank";

  const BannerWrapper = ({ children }) => {
    const common =
      // مفيش hover يوحي بالنقر ولا cursor-pointer
      "block mt-4 rounded-xl overflow-hidden transform-gpu transition-all duration-500 mx-2 md:mx-3 " +
      bannerAspect;

    if (clickable && href) {
      return (
        <a
          href={href}
          target={target}
          rel={isBlank ? "noopener noreferrer" : undefined}
          className={common}
        >
          {children}
        </a>
      );
    }
    return <div className={common}>{children}</div>;
  };

  return (
    <section
      className={
        "w-full md:w-1/2 " + // نصف العرض على الشاشات المتوسطة+
        "group relative rounded-2xl border border-gray-200 bg-white p-4 md:p-5 " +
        "overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 " +
        className
      }
    >
      {/* Header: icon + title */}
      <div className="inline-flex items-center gap-2">
        <i
          className={
            "bi bi-newspaper text-2xl text-[#2E8F49] transform-gpu transition-transform duration-700 will-change-transform " +
            "hover:[transform:perspective(700px)_rotateY(360deg)_scale(1.15)] " +
            "group-hover:[transform:perspective(700px)_rotateY(360deg)_scale(1.15)]"
          }
          aria-hidden="true"
        />
        <h2
          className="text-xl md:text-2xl font-extrabold leading-none"
          style={{ color: "#14591D" }}
        >
          {title}
        </h2>
      </div>

      {/* Banner image with smaller height + display-only */}
      {imageSrc && (
        <BannerWrapper>
          <img
            src={imageSrc}
            alt="Latest disease news banner"
            className={
              // مفيش hover مباشر على الصورة؛ الانيميشن عند hover على الكارد (group-hover)
              "w-full h-full object-cover transform-gpu transition-transform duration-500 " +
              "group-hover:scale-[1.02]"
            }
            loading="lazy"
          />
        </BannerWrapper>
      )}

      {/* Description (center) */}
      <p className="mt-3 text-sm md:text-base text-gray-700 leading-relaxed text-center">
        {description}
      </p>

      {/* Slanted tag (parallelogram) centered */}
      <div className="mt-3 flex justify-center">
        <div className="px-4 py-1 rounded-md shadow-sm select-none transform-gpu [transform:skewX(-15deg)] bg-gradient-to-r from-emerald-100 via-emerald-200 to-emerald-100 border border-emerald-300">
          <span className="block text-xs md:text-sm font-medium text-emerald-800 [transform:skewX(15deg)] text-center">
            {tagText}
          </span>
        </div>
      </div>

      {/* Action button centered with arrow hover animation */}
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          className={
            "group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold " +
            "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-sm " +
            "transition-all duration-300 transform-gpu " +
            "hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          }
        >
          {buttonText}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            <i className="bi bi-arrow-right-short text-2xl leading-none" />
          </span>
          {/* subtle animated highlight */}
          <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 [background:radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.25),transparent)]" />
        </button>
      </div>

      {/* decorative floating shapes */}
      <div className="pointer-events-none absolute -top-8 -right-10 h-24 w-24 rounded-full bg-emerald-50 blur-2xl group-hover:scale-110 transition-transform duration-500" />
      <div className="pointer-events-none absolute -bottom-10 -left-8 h-20 w-20 rounded-full bg-emerald-50 blur-2xl group-hover:translate-x-1 transition-transform duration-500" />
    </section>
  );
};

export default LatestNewsCard;
