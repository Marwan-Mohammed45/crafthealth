import React from "react";

const AccountsSection = ({
  notificationsCount = 0,
  onNotificationsClick,
  onSettingsClick,
}) => {
  const itemBase =
    "w-full flex items-center gap-3 py-2.5 px-2 group cursor-pointer " +
    "transition-all duration-300 ease-out hover:bg-gray-50";

  const iconBase =
    "text-xl leading-none text-[#2E8F49] " +
    "transition-transform duration-300 group-hover:translate-x-0.5 group-hover:scale-110";

  const labelBase =
    "flex-1 text-base font-medium text-gray-700 " +
    "transition-colors duration-300 group-hover:text-[#1F6A34]";

  const chevronBase =
    "bi bi-chevron-right text-sm text-[#2E8F49] " +
    "opacity-0 translate-x-0 transition-all duration-300 " +
    "group-hover:opacity-100 group-hover:translate-x-0.5";

  return (
    <nav className="mt-8 select-none">
      {/* العنوان */}
      <h2
        className="mb-4 text-2xl font-extrabold leading-none"
        style={{ color: "#14591D" }}
      >
        Accounts
      </h2>

      {/* القائمة مع فواصل بين العناصر */}
      <ul className="divide-y divide-gray-200 rounded-md">
        {/* Notifications */}
        <li>
          <button type="button" onClick={onNotificationsClick} className={itemBase}>
            {/* أيقونة + بادچ للعدد */}
           <span className="relative inline-flex">
  <i className={`bi bi-bell ${iconBase}`} />
  {notificationsCount > 0 && (
    <span
      className="absolute -top-1 -right-2
                 min-w-[1.1rem] h-4 px-1 
                 rounded-full text-[10px] font-bold
                 flex items-center justify-center
                 bg-[#2E8F49] text-white shadow"
      aria-label={`${notificationsCount} new notifications`}
    >
      {notificationsCount}
    </span>
  )}
</span>


            <span className={labelBase}>Notifications</span>
            <i className={chevronBase} />
          </button>
        </li>

        {/* Settings */}
        <li>
          <button type="button" onClick={onSettingsClick} className={itemBase}>
            <i className={`bi bi-gear ${iconBase}`} />
            <span className={labelBase}>Settings</span>
            <i className={chevronBase} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default AccountsSection;
