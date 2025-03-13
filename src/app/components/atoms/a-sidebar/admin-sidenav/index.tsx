"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { LayoutGrid, Users, BarChart3, Settings, FileText, ChevronDown, FileTextIcon } from "lucide-react"; // Make sure FileTextIcon is imported, or use FileText if you prefer icon to be same
import { BigLogo } from "@atoms/a-big-logo";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AdminSideNavProps {
    collapsed: boolean;
    toggleSidebar: () => void;
}

const AdminSideNav: React.FC<AdminSideNavProps> = ({ collapsed, toggleSidebar }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [approvalsOpen, setApprovalsOpen] = useState(false);

    const isActive = (path: string) => {
        return pathname === path;
    };

    const isApprovalsActive = () => {
        return pathname.startsWith("/admin/approvals");
    };


    return (
        <div className="flex h-screen bg-[#f5f5f5]">
            {/* Sidebar */}
            <div className={`bg-white border-r border-[#e9e9e9] flex flex-col transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
                {/* Logo */}
                <div className="p-4 flex justify-center">
                    <BigLogo
                        to="/admin"
                        className={`transition-all duration-300 ${collapsed ? "w-12 h-12" : "w-40 h-16"}`}
                        color="#8a2be2"
                    />
                </div>

                {/* Navigation */}
                <nav className="px-2 py-2 2xl:translate-y-[50px]">
                    <div className="space-y-1">
                        <Button
                            variant="ghost"
                            className={`w-full justify-start flex items-center ${isActive("/admin/dashboard") ? "text-[#8a2be2] bg-[#eff1fb]" : "text-[#919191]"} font-medium`}
                            onClick={toggleSidebar} // Button only toggles sidebar
                        >
                            <LayoutGrid className="mr-2 h-5 w-5 flex-shrink-0" />
                            <span
                                onClick={() => router.push("/admin/dashboard")} // Text navigates
                                className={`${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"} transition-all duration-300 cursor-pointer`}
                            >
                                Dashboard
                            </span>
                        </Button>

                        {/* Divider */}
                        <div className="h-[0.5px] w-full max-w-[90%] sm:max-w-screen-lg bg-[#8A8AA0] bg-opacity-40 mb-5 mx-auto"></div>

                        {/* Users */}
                        <Button
                            variant="ghost"
                            className={`w-full justify-start flex items-center ${isActive("/admin/users") ? "text-[#8a2be2] bg-[#eff1fb]" : "text-[#919191]"} font-medium`}
                            onClick={() => router.push("/admin/users")}
                        >
                            <Users className="mr-2 h-5 w-5 flex-shrink-0" />
                            <span className={`${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"} transition-all duration-300`}>Users</span>
                        </Button>

                        {/* Divider */}
                        <div className="h-[0.5px] w-full max-w-[90%] sm:max-w-screen-lg bg-[#8A8AA0] bg-opacity-40 mb-5 mx-auto"></div>

                        {/* Approvals Dropdown */}


                            <div>
                                <Button
                                    variant="ghost"
                                    className={`w-full justify-between flex items-center ${isApprovalsActive() ? "text-[#8a2be2] bg-[#eff1fb]" : "text-[#919191]"} font-medium`}
                                    onClick={() => setApprovalsOpen((prev) => !prev)}
                                >
                                    <span className="flex items-center">
                                        <FileText className="mr-2 h-5 w-5 flex-shrink-0" />
                                        <span className={`${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}`}>Approvals</span>
                                    </span>
                                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${approvalsOpen ? "rotate-180" : ""}`} />
                                </Button>

                                {/* Dropdown Items */}
                                <AnimatePresence>
                                    {approvalsOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className={`ml-9 mt-1 space-y-1`}
                                        >
                                            <Button
                                                variant="ghost"
                                                className={`w-full justify-start flex items-center text-[#919191] text-sm py-1 h-8 ${isActive("/admin/approvals/music") ? "text-[#8a2be2] bg-[#eff1fb]" : "text-[#919191]"}`}
                                                onClick={() => router.push("/admin/approvals/music")}
                                            >
                                                <FileTextIcon className="mr-2 h-4 w-4 flex-shrink-0" /> {/* Or FileText if you prefer same icon */}
                                                <span className={`${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}`}>Music Approvals</span>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                className={`w-full justify-start flex items-center text-[#919191] text-sm py-1 h-8 ${isActive("/admin/approvals/album") ? "text-[#8a2be2] bg-[#eff1fb]" : "text-[#919191]"}`}
                                                onClick={() => router.push("/admin/approvals/album")}
                                            >
                                                <FileTextIcon className="mr-2 h-4 w-4 flex-shrink-0" />{/* Or FileText if you prefer same icon */}
                                                <span className={`${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}`}>Album Approvals</span>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                className={`w-full justify-start flex items-center text-[#919191] text-sm py-1 h-8 ${isActive("/admin/approvals/video") ? "text-[#8a2be2] bg-[#eff1fb]" : "text-[#919191]"}`}
                                                onClick={() => router.push("/admin/approvals/video")}
                                            >
                                                <FileTextIcon className="mr-2 h-4 w-4 flex-shrink-0" />{/* Or FileText if you prefer same icon */}
                                                <span className={`${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}`}>Video Approvals</span>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                className={`w-full justify-start flex items-center text-[#919191] text-sm py-1 h-8 ${isActive("/admin/approvals/art") ? "text-[#8a2be2] bg-[#eff1fb]" : "text-[#919191]"}`}
                                                onClick={() => router.push("/admin/approvals/art")}
                                            >
                                                <FileTextIcon className="mr-2 h-4 w-4 flex-shrink-0" />{/* Or FileText if you prefer same icon */}
                                                <span className={`${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}`}>Art Approvals</span>
                                            </Button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                            </div>


                        <div className="h-[0.5px] w-full max-w-[90%] sm:max-w-screen-lg bg-[#8A8AA0] bg-opacity-40 mb-5 mx-auto"></div>

                        {/* Transactions */}
                        <Button
                            variant="ghost"
                            className={`w-full justify-start flex items-center ${isActive("/admin/transactions") ? "text-[#8a2be2] bg-[#eff1fb]" : "text-[#919191]"} font-medium`}
                            onClick={() => router.push("/admin/transactions")}
                        >
                            <BarChart3 className="mr-2 h-5 w-5 flex-shrink-0" />
                            <span className={`${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"} transition-all duration-300`}>Transactions</span>
                        </Button>

                        {/* Divider */}
                        <div className="h-[0.5px] w-full max-w-[90%] sm:max-w-screen-lg bg-[#8A8AA0] bg-opacity-40 mb-5 mx-auto"></div>

                        {/* Settings */}
                        <Button
                            variant="ghost"
                            className={`w-full justify-start flex items-center ${isActive("/admin/settings") ? "text-[#8a2be2] bg-[#eff1fb]" : "text-[#919191]"} font-medium`}
                            onClick={() => router.push("/admin/settings")}
                        >
                            <Settings className="mr-2 h-5 w-5 flex-shrink-0" />
                            <span className={`${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"} transition-all duration-300`}>Settings</span>
                        </Button>
                    </div>
                </nav>

            </div>
        </div>
    );
};

export default AdminSideNav;