// src/pages/sidebar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

import SidebarItem from "../components/sidebar_icon";
import Main_menu from "../components/main_menu";
// علشان نتجنب تعارض الاسم مع صفحة Settings، هنستورد الكومبوننت ده كـ SettingsCard
import SettingsCard from "../components/Settings";
import Your_Account from "../components/your_accout";
import MyChats from "../components/My_chats";
import icon from "../assets/icon.png";
import avatarImg from "../assets/left.png";

const Sidebar = ({ isOpen = false }) => {
  const navigate = useNavigate();

  return (
    <aside
      id="app-sidebar"
      className={
        // موبايل: ثابت وبـ translate-x — ديسكتوب: ظاهر دايمًا
        "sm:sticky fixed top-0 left-0 z-40 w-64 h-screen bg-gray-100 border-r p-3 " +
        "flex flex-col transform transition-transform duration-300 ease-in-out " +
        (isOpen ? "translate-x-0" : "-translate-x-full") +
        " md:translate-x-0"
      }
    >
      {/* لوجو/عنوان */}
      <div className="mb-2">
        <SidebarItem icon={icon} label="Craft Health" />
      </div>

      {/* القوائم */}
      <div className="flex-1 overflow-y-auto">
        <Main_menu />
        <MyChats />
      </div>

      {/* أسفل السايدبار: إعدادات مختصرة */}
      <div className="mt-3">
        <SettingsCard
          notificationsCount={7}
          onNotificationsClick={() => navigate("/dashboard/notifications")}
          onSettingsClick={() => navigate("/dashboard/settings")}
        />
      </div>

      {/* كارت الحساب */}
      <div className="mt-3">
        <Your_Account
          avatar={avatarImg}
          name="Ahmed Kareem"
          planLabel="Free Account"
          avatarOnRight={true}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
