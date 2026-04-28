import React, { useState } from 'react';
import Breadcrumb from '../components/ui/Breadcrumb';
import { messages } from '../data/mockData';
import { FiSearch, FiSend, FiPaperclip, FiMoreVertical, FiPhone, FiVideo, FiInfo } from 'react-icons/fi';

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(messages[0]);

  return (
    <>
      <Breadcrumb pageName="Messages" />

      <div className="h-[calc(100vh-220px)] overflow-hidden rounded-2xl border border-stroke bg-white shadow-sm dark:border-strokedark dark:bg-boxdark xl:flex">
        {/* <!-- Chat Sidebar --> */}
        <div className="flex h-full flex-col border-r border-stroke dark:border-strokedark xl:w-1/3">
          <div className="sticky top-0 z-20 bg-white p-6 dark:bg-boxdark">
            <div className="relative">
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full rounded-full border border-stroke bg-transparent py-2.5 pl-10 pr-4 outline-none focus:border-primary dark:border-strokedark"
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-bodydark2" size={18} />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar">
            {messages.map((chat) => (
              <div 
                key={chat.id} 
                className={`flex cursor-pointer items-center gap-4.5 px-6 py-4.5 hover:bg-bg-soft dark:hover:bg-primary/10 transition-colors ${selectedChat?.id === chat.id ? 'bg-bg-soft dark:bg-primary/10 border-r-2 border-primary' : ''}`}
                onClick={() => setSelectedChat(chat)}
              >
                <div className="relative h-12.5 w-12.5 rounded-full">
                  <img src={chat.avatar} alt="User" className="rounded-full h-full w-full object-cover" />
                  <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-boxdark ${chat.unread ? 'bg-success' : 'bg-bodydark2'}`}></span>
                </div>

                <div className="flex flex-1 flex-col overflow-hidden">
                   <div className="flex items-center justify-between">
                      <h5 className={`font-medium ${chat.unread ? 'text-black dark:text-white' : 'text-bodydark2'}`}>
                         {chat.sender}
                      </h5>
                      <span className="text-xs">{chat.time}</span>
                   </div>
                   <p className="truncate text-sm">{chat.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* <!-- Chat Window --> */}
        <div className="flex h-full flex-col xl:w-2/3">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-stroke px-6 py-4.5 dark:border-strokedark">
            <div className="flex items-center gap-4">
              <div className="h-11 w-11 rounded-full">
                <img src={selectedChat?.avatar} alt="User" className="rounded-full h-full w-full object-cover" />
              </div>
              <div>
                <h5 className="font-medium text-black dark:text-white">{selectedChat?.sender}</h5>
                <p className="text-sm font-medium text-success">Online</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
               <button className="text-body hover:text-primary"><FiPhone size={20} /></button>
               <button className="text-body hover:text-primary"><FiVideo size={20} /></button>
               <button className="text-body hover:text-primary"><FiInfo size={20} /></button>
               <button className="text-body hover:text-primary"><FiMoreVertical size={20} /></button>
            </div>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-2 dark:bg-meta-4 no-scrollbar">
             <div className="flex flex-col items-end">
                <div className="mb-2.5 rounded-2xl rounded-tr-none bg-primary py-3 px-5 text-white">
                   <p>Hello! I'm interested in the Senior React Developer position.</p>
                </div>
                <p className="text-xs">10:45 AM</p>
             </div>

             <div className="flex flex-col items-start">
                <div className="mb-2.5 rounded-2xl rounded-tl-none bg-white py-3 px-5 text-black dark:bg-boxdark dark:text-white shadow-sm">
                   <p>Hi Musharof! Thanks for reaching out. Your profile looks impressive.</p>
                </div>
                <div className="mb-2.5 rounded-2xl rounded-tl-none bg-white py-3 px-5 text-black dark:bg-boxdark dark:text-white shadow-sm">
                   <p>Are you available for a quick chat tomorrow morning?</p>
                </div>
                <p className="text-xs">11:02 AM</p>
             </div>
             
             <div className="flex flex-col items-end">
                <div className="mb-2.5 rounded-2xl rounded-tr-none bg-primary py-3 px-5 text-white">
                   <p>Sure, I'm free between 10 AM and 12 PM EST. Does that work?</p>
                </div>
                <p className="text-xs">11:05 AM</p>
             </div>
          </div>

          {/* Input Area */}
          <div className="sticky bottom-0 border-t border-stroke bg-white p-6 dark:border-strokedark dark:bg-boxdark">
             <form className="flex items-center gap-4">
                <button type="button" className="text-body hover:text-primary"><FiPaperclip size={22} /></button>
                <div className="relative flex-1">
                   <input
                     type="text"
                     placeholder="Type your message..."
                     className="w-full rounded-full border border-stroke bg-transparent py-2.5 pl-4 pr-4 outline-none focus:border-primary dark:border-strokedark"
                   />
                </div>
                <button type="submit" className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90">
                   <FiSend size={20} />
                </button>
             </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
