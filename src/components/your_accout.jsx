import React from "react";

const SidebarProfileCard = ({
  avatar,
  name = "User Name",
  planLabel = "Free Account",
  onClick,
  avatarOnRight = false, // لو true هيبقى ترتيب عكسي والصورة يمين
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "w-full mt-8 p-3 rounded-xl border border-gray-200 " +
        "flex items-center gap-3 group transition-all duration-300 " +
        "hover:bg-white hover:shadow-md hover:-translate-y-0.5 " +
        (avatarOnRight ? "flex-row-reverse" : "")
      }
    >
      {/* الصورة */}
      <img
        src={avatar}
        alt={name}
        className="w-10 h-10 rounded-full object-cover
                   transition-transform duration-300 group-hover:scale-105"
      />

      {/* الاسم والخطة */}
      <div className={`flex-1 ${avatarOnRight ? "text-right" : "text-left"}`}>
        <div className="text-sm font-semibold text-gray-800">{name}</div>
        <div className="text-xs text-gray-500">{planLabel}</div>
      </div>

      {/* السهم */}
      <i
        className={
          `bi ${avatarOnRight ? "bi-chevron-left" : "bi-chevron-right"} ` +
          "text-base text-[#2E8F49] transition-transform duration-300 " +
          "group-hover:translate-x-1"
        }
      />
    </button>
  );
};

export default SidebarProfileCard;
