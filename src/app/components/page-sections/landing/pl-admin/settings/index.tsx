"use client";
import { Bell, ChevronDown, LayoutGrid, MoreVertical, Search, Settings as LucideSettings, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/components/ui/admin-dashoard/dropdown-menu"
import { Input } from "@/app/components/ui/input"
import AdminSideNav from "@atoms/a-sidebar/admin-sidenav";
import AdminNav from "@atoms/a-sidebar/admin-nav";
import { useState } from "react"



export default function Settings() {

    const [collapsed, setCollapsed] = useState(false)

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev)
  }
  return (
    <div className="min-h-screen flex bg-[#f0f0f0]">
      
       {/* Sidebar */}
            <AdminSideNav collapsed={collapsed} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
               <AdminNav />

        {/* Content */}
        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-[#e9e9e9]">
              <h1 className="text-xl font-semibold text-[#483D3D]">Admins</h1>
              <Button className="bg-[#8a2be2] hover:bg-[#7928c9] text-white rounded-md">Add new user</Button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto text-[#483D3D]">
              <table className="w-full">
                <thead className="bg-[#f8f4fc] text-[#483D3D]">
                  <tr className="text-[#483D3D]">
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Fullname</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Phone Number</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Email Address</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e9e9e9]">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Eleanor Pena</td>
                    <td className="px-6 py-4 whitespace-nowrap">08178230133</td>
                    <td className="px-6 py-4 whitespace-nowrap">eleanorpena@gmail.com</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="h-2 w-2 bg-[#007600] rounded-full mr-2"></span>
                        <span className="text-[#007600]">Active</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <span className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-2 h-4 w-4 text-[#007600]"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                              </svg>
                              Enable user
                            </span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <span className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-2 h-4 w-4 text-[#d90429]"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <circle cx="12" cy="12" r="10" />
                                <line x1="15" y1="9" x2="9" y2="15" />
                                <line x1="9" y1="9" x2="15" y2="15" />
                              </svg>
                              Disable user
                            </span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">BillsOnMe</td>
                    <td className="px-6 py-4 whitespace-nowrap">08178230133</td>
                    <td className="px-6 py-4 whitespace-nowrap">eleanorpena@gmail.com</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="h-2 w-2 bg-[#d90429] rounded-full mr-2"></span>
                        <span className="text-[#d90429]">Disabled</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Ade ayah</td>
                    <td className="px-6 py-4 whitespace-nowrap">08178230133</td>
                    <td className="px-6 py-4 whitespace-nowrap">eleanorpena@gmail.com</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="h-2 w-2 bg-[#007600] rounded-full mr-2"></span>
                        <span className="text-[#007600]">Active</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Roya Aledei</td>
                    <td className="px-6 py-4 whitespace-nowrap">08178230133</td>
                    <td className="px-6 py-4 whitespace-nowrap">eleanorpena@gmail.com</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="h-2 w-2 bg-[#007600] rounded-full mr-2"></span>
                        <span className="text-[#007600]">Active</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}