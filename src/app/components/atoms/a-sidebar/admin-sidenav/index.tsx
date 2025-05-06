"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import {
    LayoutGrid,
    Users,
    BarChart3,
    Settings,
    FileText,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    FileTextIcon,
    Pin,
    PinOff,
} from "lucide-react";
import { BigLogo } from "@atoms/a-big-logo";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";


interface AdminSideNavProps {
    collapsed: boolean;
    toggleSidebar: () => void;
}

const AdminSideNav: React.FC<AdminSideNavProps> = ({ collapsed, toggleSidebar }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [approvalsOpen, setApprovalsOpen] = useState(false);
    const [isPinned, setIsPinned] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const isActive = (path: string) => pathname === path;
    const isApprovalsActive = () => pathname.startsWith("/admin/approvals");

    const isSidebarExpanded = isMobile ? !collapsed : isPinned || isHovered;

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, [])

    return (
        <div className="flex h-screen bg-[#f5f5f5]">
            {isMobile && isSidebarExpanded && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={toggleSidebar}
                />
            )}

            <div
                className={`
                    ${isMobile ? "fixed z-40 h-full top-0 left-0" : ""}
                    bg-white border-r border-[#e9e9e9] flex flex-col transition-all duration-300 ${
                    isSidebarExpanded ? "w-64" : "w-16"
                } relative`}
                onMouseEnter={() => !isPinned && !isMobile && setIsHovered(true)}
                onMouseLeave={() => !isPinned && !isMobile && setIsHovered(false)}
            >
                <div className="p-4 flex justify-between items-center">
                    <BigLogo
                        to="/admin"
                        className={`transition-all duration-300 ${
                            isSidebarExpanded ? "w-40 h-16" : "w-12 h-12"
                        }`}
                        color="#8a2be2"
                    />
                    <div className="flex space-x-1">
                        <button
                            onClick={toggleSidebar}
                            className="bg-white border border-gray-300 rounded-full shadow w-8 h-8 flex items-center justify-center"
                            title={isSidebarExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
                        >
                            {isSidebarExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                        </button>
                        <button
                            onClick={() => setIsPinned(!isPinned)}
                            className="bg-white border border-gray-300 rounded-full shadow w-8 h-8 flex items-center justify-center"
                            title={isPinned ? "Unpin Sidebar" : "Pin Sidebar"}
                        >
                            {isPinned ? <PinOff size={16} /> : <Pin size={16} />}
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="px-2 py-2">
                    <div className="space-y-1">
                        {/* Dashboard */}
                        <Button
                            variant="ghost"
                            className={`w-full justify-start flex items-center ${
                                isActive("/admin/dashboard") ? "text-[#8a2be2] bg-[#eff1fb]" : "text-[#919191]"
                            } font-medium`}
                            onClick={() => router.push("/admin/dashboard")}
                        >
                            <LayoutGrid className="mr-2 h-5 w-5 flex-shrink-0" />
                            {isSidebarExpanded && <span className="transition-all duration-300">Dashboard</span>}
                        </Button>

                        <div className="divider" />

                        {/* Users */}
                        <Button
                            variant="ghost"
                            className={`w-full justify-start flex items-center ${
                                isActive("/admin/users") ? "text-[#8a2be2] bg-[#eff1fb]" : "text-[#919191]"
                            } font-medium`}
                            onClick={() => router.push("/admin/users")}
                        >
                            <Users className="mr-2 h-5 w-5 flex-shrink-0" />
                            {isSidebarExpanded && <span className="transition-all duration-300">Users</span>}
                        </Button>

                        <div className="divider" />

                        {/* Approvals */}
                        <div>
                            <Button
                                variant="ghost"
                                className={`w-full justify-between flex items-center ${
                                    isApprovalsActive() ? "text-[#8a2be2] bg-[#eff1fb]" : "text-[#919191]"
                                } font-medium`}
                                onClick={() => setApprovalsOpen((prev) => !prev)}
                            >
                                <span className="flex items-center">
                                    <FileText className="mr-2 h-5 w-5 flex-shrink-0" />
                                    {isSidebarExpanded && (
                                        <span className="transition-all duration-300">Approvals</span>
                                    )}
                                </span>
                                {isSidebarExpanded && (
                                    <ChevronDown
                                        className={`h-4 w-4 transition-transform duration-300 ${
                                            approvalsOpen ? "rotate-180" : ""
                                        }`}
                                    />
                                )}
                            </Button>

                            <AnimatePresence>
                                {approvalsOpen && isSidebarExpanded && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="ml-9 mt-1 space-y-1"
                                    >
                                        {["music", "album", "video", "art"].map((type) => (
                                            <Button
                                                key={type}
                                                variant="ghost"
                                                className={`w-full justify-start flex items-center text-[#919191] text-sm py-1 h-8 ${
                                                    isActive(`/admin/approvals/${type}`)
                                                        ? "text-[#8a2be2] bg-[#eff1fb]"
                                                        : ""
                                                }`}
                                                onClick={() => router.push(`/admin/approvals/${type}`)}
                                            >
                                                <FileTextIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                                                <span className="transition-all duration-300">
                                                    {type.charAt(0).toUpperCase() + type.slice(1)} Approvals
                                                </span>
                                            </Button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="divider" />

                        {/* Transactions */}
                        <Button
                            variant="ghost"
                            className={`w-full justify-start flex items-center ${
                                isActive("/admin/transactions") ? "text-[#8a2be2] bg-[#eff1fb]" : "text-[#919191]"
                            } font-medium`}
                            onClick={() => router.push("/admin/transactions")}
                        >
                            <BarChart3 className="mr-2 h-5 w-5 flex-shrink-0" />
                            {isSidebarExpanded && <span className="transition-all duration-300">Transactions</span>}
                        </Button>

                        <div className="divider" />

                        {/* Settings */}
                        <Button
                            variant="ghost"
                            className={`w-full justify-start flex items-center ${
                                isActive("/admin/settings") ? "text-[#8a2be2] bg-[#eff1fb]" : "text-[#919191]"
                            } font-medium`}
                            onClick={() => router.push("/admin/settings")}
                        >
                            <Settings className="mr-2 h-5 w-5 flex-shrink-0" />
                            {isSidebarExpanded && <span className="transition-all duration-300">Settings</span>}
                        </Button>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default AdminSideNav;
