// src/components/main_menu.jsx
import React from "react";


import { Link } from "react-router-dom";
 
const MainMenu = () => {
  

  return (
    <nav className="mt-6 select-none">
      {/* العنوان */}
      <h2
        className="mb-4 text-2xl font-extrabold leading-none"
        style={{ color: "#14591D" }}
      >
        Main Menu
      </h2>

      {/* عنصر 1: Home */}
      <Link to={'/'}>

      <div
        className="flex items-center gap-3 py-2 px-1 rounded-md group cursor-pointer
                   transition-all duration-300 ease-out"
        onClick={() => navigate("/")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && navigate("/")}
        aria-label="Go to Home"
      >
        <i
          className="bi bi-house-door text-xl leading-none
                     text-[#2E8F49] group-hover:text-[#1F6A34]
                     transition-transform duration-300 group-hover:translate-x-0.5 group-hover:scale-110"
        />
        <span
          className="text-base font-semibold
                     text-[#2E8F49] group-hover:text-[#1F6A34]
                     transition-colors duration-300"
        >
          Home
        </span>
        
      </div>
      </Link>

      {/* عنصر 2: AI */}
      <Link to={'/dashboard/AI'}>

      <div
        className="flex items-center gap-3 py-2 px-1 rounded-md group cursor-pointer
                   transition-all duration-300 ease-out"
        onClick={() => navigate("/dashboard/ai")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && navigate("/dashboard/ai")}
        aria-label="Go to AI"
      >
        <i
          className="bi bi-cpu text-xl leading-none
                     text-[#2E8F49] group-hover:text-[#1F6A34]
                     transition-transform duration-300 group-hover:translate-x-0.5 group-hover:scale-110"
        />
        <span
          className="text-base font-semibold
                     text-[#2E8F49] group-hover:text-[#1F6A34]
                     transition-colors duration-300"
        >
          AI
        </span>
        
      </div>
      </Link>

      {/* عنصر 3: Dashboard */}
      <Link to={'/dashboard'} >
      <div
        className="flex items-center gap-3 py-2 px-1 rounded-md group cursor-pointer
                   transition-all duration-300 ease-out"

      >
        <i
          className="bi bi-plus-square text-xl leading-none
                     text-[#2E8F49] group-hover:text-[#1F6A34]
                     transition-transform duration-300 group-hover:translate-x-0.5 group-hover:scale-110"
        />
        <span
          className="text-base font-semibold
                     text-[#2E8F49] group-hover:text-[#1F6A34]
                     transition-colors duration-300"
        >
          Dashboard
        </span>

        
      </div>
      </Link>

    </nav>
  );
};

export default MainMenu;
