"use client";
import {
    Search,
    Bell,
    MoreVertical,
    ChevronDown,
    LayoutGrid,
    Users,
    CheckCircle,
    FileText,
    Settings,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/admin-dashoard/avatar"
import { Button } from "@/app/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/components/ui/admin-dashoard/dropdown-menu"
import Link from "next/link"
import AdminSideNav from "@atoms/a-sidebar/admin-sidenav";
import AdminNav from "@atoms/a-sidebar/admin-nav";
import { useState } from "react"


export default function AdminUsers() {

    const [collapsed, setCollapsed] = useState(false)

    const toggleSidebar = () => {
    setCollapsed((prev) => !prev)
    }

    return (
    <div className="min-h-screen flex bg-[#f0f0f0]">
           {/* Sidebar */}
           <AdminSideNav collapsed={collapsed} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <div className="flex-1 overflow-hidden z-20">
        {/* Header */}
        <AdminNav />

        {/* Content */}
        <main className="p-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Users</h2>

                <div className="relative">
                <Button variant="outline" className="flex items-center gap-2 px-4">
                    All users
                    <ChevronDown size={16} />
                </Button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                <thead className="bg-[#f5effb] text-left">
                    <tr>
                    <th className="px-6 py-4 font-medium">Username</th>
                    <th className="px-6 py-4 font-medium">Purchased songs</th>
                    <th className="px-6 py-4 font-medium">Wallet address</th>
                    <th className="px-6 py-4 font-medium">Date Joined</th>
                    <th className="px-6 py-4 font-medium">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#e9e9e9]">
                    {Array(8)
                    .fill(0)
                    .map((_, index) => (
                        <tr key={index} className="hover:bg-[#f5effb]/30">
                        <td className="px-6 py-4">Eleanor Pena</td>
                        <td className="px-6 py-4">20</td>
                        <td className="px-6 py-4 text-ellipsis overflow-hidden">54QFA...XS11567482drf</td>
                        <td className="px-6 py-4">7/03/22</td>
                        <td className="px-6 py-4">
                            <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">More options</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>View details</DropdownMenuItem>
                                <DropdownMenuItem>Edit user</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-500">Delete user</DropdownMenuItem>
                            </DropdownMenuContent>
                            </DropdownMenu>
                        </td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        </main>
        </div>
    </div>
    )
}