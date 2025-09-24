import React from "react";

const MyChats = ({ items = [], onAddClick = () => {} }) => {
  // بيانات تجريبية لو مفيش props جاية من الباك إند
  const conversations = items.length ? items : ["Conversation 1", "Conversation 2", "Conversation 3"];

  return (
    <nav className="mt-8 select-none">
      {/* الهيدر: أيقونة + عنوان + زر Add */}
      <div className="mb-4 flex items-center justify-between gap-3 px-3 md:px-4">
        {/* أيقونة + عنوان */}
        <div className="flex items-center gap-3 group">
          <span className="relative inline-flex items-center justify-center">
            <span className="absolute inset-0 rounded-full blur-md opacity-0 scale-75 transition-all duration-500 bg-emerald-200/50 group-hover:opacity-100 group-hover:scale-100" />
            <i
              className="bi bi-chat-left-text inline-flex items-center justify-center
                         text-[22px] sm:text-2xl leading-none text-[#2E8F49]
                         relative top-[1px] shrink-0
                         transition-transform duration-300
                         group-hover:rotate-6 group-hover:scale-110"
              aria-hidden="true"
            />
          </span>
          <h2
            className="text-2xl font-extrabold leading-tight"
            style={{ color: "#14591D" }}
          >
            My Chats
          </h2>
        </div>

        {/* زر الإضافة */}
        <button
          type="button"
          onClick={onAddClick}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium
                     bg-emerald-50 text-[#14591D] border border-emerald-200
                     hover:bg-emerald-100 hover:shadow-sm
                     transition-all duration-300"
          aria-label="Add conversation"
        >
          <i className="bi bi-plus-lg text-base" />
          <span className="hidden sm:inline">Add conversation</span>
        </button>
      </div>

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
                className="flex-1 text-start text-base font-medium text-gray-700
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
