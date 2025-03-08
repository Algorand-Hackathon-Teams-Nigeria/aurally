"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { Input } from "@/app/components/ui/input"; // Make sure this component exists

const AdminNav = () => {
    const [notifications, setNotifications] = useState(3); // Example: 3 unread notifications
    const [profileOpen, setProfileOpen] = useState(false);

    // Function to mark notifications as read
    const markNotificationsAsRead = () => {
        setNotifications(0); // Reset to 0 after clicking
    };

    return (
        <header className="bg-white border-b border-[#e9e9e9] h-16 flex items-center px-6">
            {/* Search Bar */}
            <div className="flex-1 flex items-center">
                <div className="relative w-full md:w-auto md:max-w-lg 2xl:w-[900px]"> {/* Responsive width classes added here */}
                    <Input className="pl-10 bg-white border-[#e9e9e9] rounded-full" placeholder="Search" />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#919191]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                                stroke="#919191"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Notification & User Profile */}
            <div className="flex items-center space-x-4">
                {/* Notification Bell */}
                <div className="relative cursor-pointer" onClick={markNotificationsAsRead}>
                    <Bell className="h-6 w-6 text-[#919191]" />
                    {notifications > 0 && (
                        <span className="absolute top-0 right-0 h-2 w-2 bg-[#ff0000] rounded-full"></span>
                    )}
                </div>

                {/* User Profile */}
                <div className="relative">
                    <div
                        className="h-10 w-10 rounded-full bg-[#8a2be2] flex items-center justify-center cursor-pointer"
                        onClick={() => setProfileOpen(!profileOpen)}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    {/* Dropdown Menu */}
                    {profileOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-[#e9e9e9] rounded-lg shadow-lg py-2">
                            <button className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default AdminNav;
