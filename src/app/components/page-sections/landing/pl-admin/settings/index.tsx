"use client";
import { Bell, ChevronDown, LayoutGrid, MoreVertical, Search, Settings as LucideSettings, Users, Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/components/ui/admin-dashoard/dropdown-menu" // Ensure this path is correct
import { Input } from "@/app/components/ui/input"
import AdminSideNav from "@atoms/a-sidebar/admin-sidenav"; // Ensure this path is correct
import AdminNav from "@atoms/a-sidebar/admin-nav"; // Ensure this path is correct
import { useState } from "react"
import Modal from "@/app/components/ui/settings-modal"; // Import the Modal component
import SuccessModal from "@/app/components/ui/success-modal"; // Import the SuccessModal component
import Image from "next/image";

export default function Settings() {
  const [collapsed, setCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState("");

  // --- User Data (Example - Replace with actual data fetching/state) ---
  // In a real app, this data would likely come from an API or state management
  const [users, setUsers] = useState([
    { id: 1, fullname: 'Eleanor Pena', phone: '08178230133', email: 'eleanorpena@gmail.com', status: 'Active' },
    { id: 2, fullname: 'BillsOnMe', phone: '08178230133', email: 'billsonme@example.com', status: 'Disabled' },
    { id: 3, fullname: 'Ade ayah', phone: '08178230133', email: 'adeayah@example.com', status: 'Active' },
    { id: 4, fullname: 'Roya Aledei', phone: '08178230133', email: 'royaaledei@example.com', status: 'Active' },
  ]);
  // ---------------------------------------------------------------------


  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAddUserSubmit = () => {
    if (!firstName || !lastName || !email) {
      setError("Please fill in all fields.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");

    // --- Simulate adding a user (Update state) ---
    const newUser = {
      id: Date.now(), // Simple unique ID generation
      fullname: `${firstName} ${lastName}`,
      phone: 'N/A', // Add phone input if needed
      email: email,
      status: 'Active' // Default new users to Active
    };
    setUsers(prevUsers => [...prevUsers, newUser]);
    // ---------------------------------------------

    console.log("Adding user:", { firstName, lastName, email });
    setShowModal(false);
    setShowSuccessModal(true);
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleAddAnotherUser = () => {
    setShowSuccessModal(false);
    setShowModal(true);
  };

  // --- Functions to handle Enable/Disable (Example) ---
  const handleEnableUser = (userId: number) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, status: 'Active' } : user
      )
    );
    console.log(`Enabling user with ID: ${userId}`);
    // Add API call here in a real app
  };

  const handleDisableUser = (userId: number) => {
     setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, status: 'Disabled' } : user
      )
    );
    console.log(`Disabling user with ID: ${userId}`);
    // Add API call here in a real app
  };
  // ----------------------------------------------------


  return (
    <div className="min-h-screen flex bg-[#f0f0f0]">

      {/* Sidebar */}
      <AdminSideNav collapsed={collapsed} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden z-20">
        {/* Header */}
        <AdminNav />

        {/* Content */}
        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-[#e9e9e9]">
              <h1 className="text-xl font-semibold text-[#483D3D]">Admins</h1>
              <Button onClick={() => setShowModal(true)} className="bg-[#8a2be2] hover:bg-[#7a1bd2] text-white">
                <Plus size={16} className="mr-2" />
                Add New User
              </Button>
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
                  {/* Map over user data to generate rows */}
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{user.fullname}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`h-2 w-2 ${user.status === 'Active' ? 'bg-[#007600]' : 'bg-[#d90429]'} rounded-full mr-2`}></span>
                          <span className={`${user.status === 'Active' ? 'text-[#007600]' : 'text-[#d90429]'}`}>{user.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {/* Action Dropdown Menu for EVERY row */}
                        <DropdownMenu>
                          <DropdownMenuTrigger className="focus:outline-none p-1 rounded hover:bg-gray-100"> {/* Added padding/hover for better click area */}
                            <MoreVertical className="h-5 w-5 text-[#aaaaaa]" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              className="flex items-center gap-2 text-[#007600] cursor-pointer"
                              onClick={() => handleEnableUser(user.id)} // Add onClick handler
                              disabled={user.status === 'Active'} // Optionally disable if already active
                            >
                              <Image src="/images/approved-sign.svg" alt="Enable" width={16} height={16} />
                              <span>Enable user</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="flex items-center gap-2 text-[#d90429] cursor-pointer"
                              onClick={() => handleDisableUser(user.id)} // Add onClick handler
                              disabled={user.status === 'Disabled'} // Optionally disable if already disabled
                            >
                              <Image src="/images/disapproved-sign.svg" alt="Disable" width={16} height={16} />
                              <span>Disable user</span>
                            </DropdownMenuItem>
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

      {/* "Add New User" Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
         {/* ... (Modal content remains the same) ... */}
         <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 text-black">
          <h2 className="text-xl font-bold mb-6">Add New User</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First name</label>
              <Input
                placeholder="eg. john"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
              <Input
                placeholder="eg. doe" // Corrected placeholder
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <Input
                placeholder="e.g john@gmail.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
            </div>

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

            <Button
              className="w-full bg-[#8a2be2] hover:bg-[#7a1bd2] text-white mt-4"
              onClick={handleAddUserSubmit}
            >
              Add user
            </Button>
          </div>
        </div>
      </Modal>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal} // Changed to use the correct close handler
        onAddAnother={handleAddAnotherUser}
      
      />
    </div>
  )
}