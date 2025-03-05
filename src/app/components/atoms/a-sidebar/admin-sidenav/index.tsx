"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { LayoutGrid, Users, BarChart3, Settings, FileText, ChevronDown } from "lucide-react";
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
                        {/* Dashboard */}
                        <Button
                            variant="ghost"
                            className={`w-full justify-start flex items-center ${pathname === "/" ? "text-[#8a2be2] bg-[#eff1fb]" : "text-[#919191]"} font-medium`}
                            onClick={toggleSidebar}
                        >
                            <LayoutGrid className="mr-2 h-5 w-5 flex-shrink-0" />
                            <span className={`${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"} transition-all duration-300`}>Dashboard</span>
                        </Button>

                        {/* Divider */}
                        <div className="h-[0.5px] w-[200px] max-w-[90%] sm:max-w-screen-lg bg-[#8A8AA0] bg-opacity-40 mb-5 mx-auto"></div>

                        {/* Users */}
                        <Button
                            variant="ghost"
                            className={`w-full justify-start flex items-center ${pathname === "/users" ? "text-[#8a2be2] bg-[#eff1fb]" : "text-[#919191]"} font-medium`}
                            onClick={() => router.push("/users")}
                        >
                            <Users className="mr-2 h-5 w-5 flex-shrink-0" />
                            <span className={`${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"} transition-all duration-300`}>Users</span>
                        </Button>

                        {/* Divider */}
                        <div className="h-[0.5px] w-[200px] max-w-[90%] sm:max-w-screen-lg bg-[#8A8AA0] bg-opacity-40 mb-5 mx-auto"></div>

                        {/* Approvals Dropdown */}
                        {!collapsed && (
                            <div>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-between text-[#919191] font-medium"
                                    onClick={() => setApprovalsOpen((prev) => !prev)}
                                >
                                    <span className="flex items-center">
                                        <FileText className="mr-2 h-5 w-5 flex-shrink-0" />
                                        Approvals
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
                                            className="ml-9 mt-1 space-y-1"
                                        >
                                            {["Music", "Album", "Video", "Art"].map((type) => (
                                                <Button
                                                    key={type}
                                                    variant="ghost"
                                                    className="w-full justify-start text-[#919191] text-sm py-1 h-8"
                                                    onClick={() => router.push(`/approvals/${type.toLowerCase()}`)}
                                                >
                                                    {type} Approvals
                                                </Button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}

                        <div className="h-[0.5px] w-[200px] max-w-[90%] sm:max-w-screen-lg bg-[#8A8AA0] bg-opacity-40 mb-5 mx-auto"></div>

                        {/* Transactions */}
                        <Button
                            variant="ghost"
                            className={`w-full justify-start flex items-center ${pathname === "/transactions" ? "text-[#8a2be2] bg-[#eff1fb]" : "text-[#919191]"} font-medium`}
                            onClick={() => router.push("/transactions")}
                        >
                            <BarChart3 className="mr-2 h-5 w-5 flex-shrink-0" />
                            <span className={`${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"} transition-all duration-300`}>Transactions</span>
                        </Button>

                        {/* Divider */}
                        <div className="h-[0.5px] w-[200px] max-w-[90%] sm:max-w-screen-lg bg-[#8A8AA0] bg-opacity-40 mb-5 mx-auto"></div>

                        {/* Settings */}
                        <Button
                            variant="ghost"
                            className={`w-full justify-start flex items-center ${pathname === "/settings" ? "text-[#8a2be2] bg-[#eff1fb]" : "text-[#919191]"} font-medium`}
                            onClick={() => router.push("/settings")}
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
