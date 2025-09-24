import React from "react";

const MyChats = ({ items = [] }) => {
  // بيانات تجريبية لو مفيش props جاية من الباك إند
  const conversations = items.length ? items : ["Conversation 1", "Conversation 2", "Conversation 3"];

  return (
    <nav className="mt-8 select-none">
      {/* العنوان */}
      <h2
        className="mb-4 text-2xl font-extrabold leading-none"
        style={{ color: "#14591D" }}
      >
        My Chats
      </h2>

      {/* قائمة المحادثات — فواصل بين كل عنصر والتاني */}
      <ul className="divide-y divide-gray-200 rounded-md">
        {conversations.map((conv, idx) => (
          <li key={idx} className="first:rounded-t-md last:rounded-b-md">
            <button
              type="button"
              className="w-full flex items-center gap-3 py-2.5 px-2 group cursor-pointer
                         transition-all duration-300 ease-out hover:bg-gray-50"
            >
              {/* أيقونة المحادثة */}
              <i
                className="bi bi-chat-dots text-xl leading-none
                           text-[#2E8F49]
                           transition-transform duration-300
                           group-hover:translate-x-0.5 group-hover:scale-110"
              />

              {/* عنوان المحادثة */}
              <span
                className="flex-1 text-base font-medium text-gray-700
                           transition-colors duration-300
                           group-hover:text-[#1F6A34]"
              >
                {conv}
              </span>

              {/* سهم يظهر مع الهوفر كإشارة تفاعل */}
              <i
                className="bi bi-chevron-right text-sm
                           text-[#2E8F49]
                           opacity-0 translate-x-0
                           transition-all duration-300
                           group-hover:opacity-100 group-hover:translate-x-0.5"
              />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MyChats;
