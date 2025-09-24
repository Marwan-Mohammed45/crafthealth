import React from "react";

const SidebarItem = ({ icon, label }) => {
  return (
    <div
      className="flex items-center gap-3 p-2 rounded cursor-default select-none
                 transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-3"
    >
      <img
        src={icon}
        alt={label}
        className="w-8 h-8 transition-transform duration-300 ease-in-out"
      />
      <span className="text-lg font-bold" style={{ color: "#7EDF5E" }}>{label}</span>

    </div>
  );
};

export default SidebarItem;
