// In AdminNav.tsx
"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { useSignOutMutation } from "@services/graphl_generated"; 
import { useApolloClient, ApolloError } from "@apollo/client";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie'; 

const AdminNav = () => {
    const [notifications, setNotifications] = useState(3);
    const [profileOpen, setProfileOpen] = useState(false);
    const router = useRouter();
    const apolloClient = useApolloClient();
    const [signOut, { loading: signOutLoading, error: signOutError }] = useSignOutMutation();

    const markNotificationsAsRead = () => setNotifications(0);

    const handleLogout = async () => {
        console.log("LOGOUT_PROCESS: Start");
        setProfileOpen(false);

        try {
            const result = await signOut();
            console.log("LOGOUT_PROCESS: SignOut Mutation Result:", JSON.stringify(result, null, 2));

            if (result?.data?.signOut === true) {
                console.log("LOGOUT_PROCESS: Backend confirmed sign out.");

                // clearing client side auth cookie
                console.log("LOGOUT_PROCESS: Removing 'token' cookie. Current value:", Cookies.get('token'));
                Cookies.remove('token', { path: '/admin' }); // <--- REMOVE THE COOKIE
                Cookies.remove('token');
                console.log("LOGOUT_PROCESS: 'token' cookie after removal:", Cookies.get('token'));
                console.log("LOGOUT_PROCESS: Attempting to reset Apollo store...");
                await apolloClient.resetStore();
                console.log("LOGOUT_PROCESS: Apollo Client store reset.");

                // Redirecting to login page
                console.log("LOGOUT_PROCESS: Attempting to redirect to /admin/login via router.push...");
                router.push("/admin/login");
                console.log("LOGOUT_PROCESS: router.push('/admin/login') CALLED (or window.location.replace).");

            } else {
                console.error("LOGOUT_PROCESS: Logout failed on server or did not return true:", result?.errors || result?.data);
                alert("Logout failed. Server response: " + JSON.stringify(result?.errors || result?.data));
            }
        } catch (error) {
            console.error("LOGOUT_PROCESS: An error occurred:", error);
            if (error instanceof ApolloError) {
                console.error("LOGOUT_PROCESS: ApolloError Details:", JSON.stringify(error, null, 2));
            }
            alert("An error occurred during logout: " + (error as Error).message);
        }
    };

    return (
        <header className="bg-white border-b border-[#e9e9e9] h-16 flex items-center px-6">
            {/* Search Bar */}
            <div className="flex-1 flex items-center">
                <div className="relative w-full md:w-auto md:max-w-lg 2xl:w-[900px]">
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
                <div className="relative cursor-pointer" onClick={markNotificationsAsRead}>
                    <Bell className="h-6 w-6 text-[#919191]" />
                    {notifications > 0 && (
                        <span className="absolute top-0 right-0 h-2 w-2 bg-[#ff0000] rounded-full"></span>
                    )}
                </div>
                <div className="relative">
                    <div
                        className="h-10 w-10 rounded-full bg-[#8a2be2] flex items-center justify-center cursor-pointer"
                        onClick={() => setProfileOpen(!profileOpen)}
                    >
                        {/* SVG User Icon */}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    {profileOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-[#e9e9e9] rounded-lg shadow-lg py-2 z-50">
                            <button
                                className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 disabled:opacity-50"
                                onClick={handleLogout}
                                disabled={signOutLoading}
                            >
                                {signOutLoading ? "Logging out..." : "Logout"}
                            </button>
                            {signOutError && (
                                <p className="px-4 py-1 text-xs text-red-700">
                                    Logout failed: {signOutError.message}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default AdminNav;