import React, { useState } from "react";
import {
  FiSearch,
  FiSend,
  FiPaperclip,
  FiMoreVertical,
  FiPhone,
  FiVideo,
  FiInfo,
} from "react-icons/fi";
import Breadcrumb from "../../../../components/ui/Breadcrumb";
import { messages } from "../../data/mockData";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(messages[0]);

  return (
    <>
      <Breadcrumb pageName="Messages" />

      <div className="h-[calc(100vh-220px)] overflow-hidden rounded border border-slate-200 bg-white shadow-sm xl:flex">
        {/* Sidebar */}
        <div className="flex h-full flex-col border-r border-slate-200 xl:w-1/3">
          {/* Search */}
          <div className="sticky top-0 z-20 border-b border-slate-100 bg-white p-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full rounded-full border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-orange-400"
              />
              <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="no-scrollbar flex-1 overflow-y-auto">
            {messages.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`flex cursor-pointer items-center gap-4 px-6 py-4 transition-all ${
                  selectedChat?.id === chat.id
                    ? "border-r-2 border-orange-500 bg-orange-50"
                    : "hover:bg-slate-50"
                }`}
              >
                <div className="relative h-12 w-12 rounded-full">
                  <img
                    src={chat.avatar}
                    alt="User"
                    className="h-full w-full rounded-full object-cover"
                  />

                  <span
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                      chat.unread ? "bg-green-500" : "bg-slate-300"
                    }`}
                  />
                </div>

                <div className="flex flex-1 flex-col overflow-hidden">
                  <div className="flex items-center justify-between">
                    <h5
                      className={`font-medium ${
                        chat.unread ? "text-slate-800" : "text-slate-600"
                      }`}
                    >
                      {chat.sender}
                    </h5>

                    <span className="text-xs text-slate-400">{chat.time}</span>
                  </div>

                  <p className="truncate text-sm text-slate-500">
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex h-full flex-col xl:w-2/3">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="h-11 w-11 rounded-full">
                <img
                  src={selectedChat?.avatar}
                  alt="User"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>

              <div>
                <h5 className="font-semibold text-slate-800">
                  {selectedChat?.sender}
                </h5>
                <p className="text-sm text-green-600">Online</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {[
                <FiPhone size={18} />,
                <FiVideo size={18} />,
                <FiInfo size={18} />,
                <FiMoreVertical size={18} />,
              ].map((icon, index) => (
                <button
                  key={index}
                  className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-orange-600"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="no-scrollbar flex-1 space-y-6 overflow-y-auto bg-slate-50 p-6">
            {/* Sent */}
            <div className="flex flex-col items-end">
              <div className="mb-2 rounded-2xl rounded-tr-none bg-orange-600 px-5 py-3 text-white shadow-sm">
                <p>
                  Hello! I'm interested in the Senior React Developer position.
                </p>
              </div>
              <p className="text-xs text-slate-400">10:45 AM</p>
            </div>

            {/* Received */}
            <div className="flex flex-col items-start">
              <div className="mb-2 rounded-2xl rounded-tl-none bg-white px-5 py-3 text-slate-700 shadow-sm">
                <p>
                  Hi Musharof! Thanks for reaching out. Your profile looks
                  impressive.
                </p>
              </div>

              <div className="mb-2 rounded-2xl rounded-tl-none bg-white px-5 py-3 text-slate-700 shadow-sm">
                <p>Are you available for a quick chat tomorrow morning?</p>
              </div>

              <p className="text-xs text-slate-400">11:02 AM</p>
            </div>

            {/* Sent */}
            <div className="flex flex-col items-end">
              <div className="mb-2 rounded-2xl rounded-tr-none bg-orange-600 px-5 py-3 text-white shadow-sm">
                <p>
                  Sure, I'm free between 10 AM and 12 PM EST. Does that work?
                </p>
              </div>
              <p className="text-xs text-slate-400">11:05 AM</p>
            </div>
          </div>

          {/* Input */}
          <div className="sticky bottom-0 border-t border-slate-200 bg-white p-6">
            <form className="flex items-center gap-4">
              <button
                type="button"
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-orange-600"
              >
                <FiPaperclip size={20} />
              </button>

              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full rounded-full border border-slate-300 bg-slate-50 py-2.5 px-4 text-sm outline-none focus:border-orange-400"
                />
              </div>

              <button
                type="submit"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-600 text-white transition hover:bg-orange-700"
              >
                <FiSend size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
