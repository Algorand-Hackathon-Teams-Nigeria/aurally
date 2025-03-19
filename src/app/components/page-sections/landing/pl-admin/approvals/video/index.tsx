"use client"
import { ChevronDown, MoreVertical, Check, X } from "lucide-react"
import type React from "react"

import { Button } from "@/app/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/admin-dashoard/dropdown-menu"
import AdminSideNav from "@atoms/a-sidebar/admin-sidenav"
import AdminNav from "@atoms/a-sidebar/admin-nav"
import { useState } from "react"
import NFTMarketplace from "@page-sections/landing/pl-admin/approvals/music/pending"
import ApprovedNFTMarketplace from "@page-sections/landing/pl-admin/approvals/music/approved"
import DisapprovedNFTMarketplace from "@page-sections/landing/pl-admin/approvals/music/disapproved"
import Modal from "@/app/components/ui/modal" // Import the Modal component

// Define a type for selectedPage
type PageType = "pending" | "all" | "approved" | "disapproved" | null

export default function Video() {
  const [collapsed, setCollapsed] = useState(false)
  const [selectedPage, setSelectedPage] = useState<PageType>("all") // Default to 'all' to show table initially
  const [isPendingModalOpen, setIsPendingModalOpen] = useState(false)
  const [isApprovedModalOpen, setIsApprovedModalOpen] = useState(false)
  const [isDisapprovedModalOpen, setIsDisapprovedModalOpen] = useState(false)

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev)
  }

  const handleDropdownItemClick = (page: PageType, event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault() // Prevent default navigation behavior
    setSelectedPage(page)
    if (page === "pending") {
      setIsPendingModalOpen(true)
      setIsApprovedModalOpen(false)
      setIsDisapprovedModalOpen(false)
    } else if (page === "approved") {
      setIsApprovedModalOpen(true)
      setIsPendingModalOpen(false)
      setIsDisapprovedModalOpen(false)
    } else if (page === "disapproved") {
      setIsDisapprovedModalOpen(true)
      setIsPendingModalOpen(false)
      setIsApprovedModalOpen(false)
    } else if (page === "all") {
      setIsPendingModalOpen(false)
      setIsApprovedModalOpen(false)
      setIsDisapprovedModalOpen(false)
    }
  }

  const closePendingModal = () => setIsPendingModalOpen(false)
  const closeApprovedModal = () => setIsApprovedModalOpen(false)
  const closeDisapprovedModal = () => setIsDisapprovedModalOpen(false)

  return (
    <div className="flex h-screen bg-white relative">
      {" "}
      {/* Make root div relative for absolute positioning */}
      {/* Sidebar */}
      <div className="h-[100vh]">
        {" "}
        {/* Give sidebar a higher z-index */}
        <AdminSideNav collapsed={collapsed} toggleSidebar={toggleSidebar} />
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden z-20">
        {" "}
        {/* Give main content a higher z-index */}
        <AdminNav />
        {/* Content */}
        <main className="flex-1 overflow-auto bg-gray-50 ">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 flex justify-between items-center border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Created NFTs</h2>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center space-x-1">
                    <span>
                      {selectedPage === "pending"
                        ? "Pending Approval"
                        : selectedPage === "approved"
                          ? "Approved NFTs"
                          : selectedPage === "disapproved"
                            ? "Disapproved NFTs"
                            : selectedPage === "all"
                              ? "All NFTs"
                              : "All NFTs"}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40 bg-white border-none shadow-md">
                  <DropdownMenuItem onClick={(event) => handleDropdownItemClick("all", event)}>
                    All NFTs
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(event) => handleDropdownItemClick("approved", event)}>
                    All Videos
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(event) => handleDropdownItemClick("approved", event)}>
                    Approved
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(event) => handleDropdownItemClick("disapproved", event)}>
                    Disapproved
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(event) => handleDropdownItemClick("pending", event)}>
                    Pending Approval
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {selectedPage === "all" && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Creator
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          NFT Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Supply
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">More</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {nftData.map((nft, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{nft.creator}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{nft.nftName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{nft.supply}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{nft.description}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center">
                              {nft.price}
                              <svg
                                className="ml-1 h-4 w-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                  stroke="black"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M17 12L12 7L7 12"
                                  stroke="black"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M12 17V7"
                                  stroke="black"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-col">
                              <span
                                className={`inline-flex text-sm ${
                                  nft.status === "Approved"
                                    ? "text-green-600"
                                    : nft.status === "Disapproved"
                                      ? "text-red-600"
                                      : "text-gray-600"
                                }`}
                              >
                                {nft.status}
                              </span>
                              {nft.note && <span className="text-xs text-gray-400">{nft.note}</span>}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm">
                            <DropdownMenu>
                              <DropdownMenuTrigger className="focus:outline-none">
                                <MoreVertical className="h-5 w-5 text-[#aaaaaa]" />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem className="flex items-center gap-2 text-[#007600] cursor-pointer">
                                  <Check className="h-4 w-4" />
                                  <span>Approve</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2 text-[#d90429] cursor-pointer">
                                  <X className="h-4 w-4" />
                                  <span>Disapprove</span>
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
            )}
          </div>
        </main>
      </div>
      {/* Render NFTMarketplace Components in Modal */}
      <Modal isOpen={isPendingModalOpen} onClose={closePendingModal}>
        <NFTMarketplace onClose={closePendingModal} />
      </Modal>
      <Modal isOpen={isApprovedModalOpen} onClose={closeApprovedModal}>
        <ApprovedNFTMarketplace onClose={closeApprovedModal} />
      </Modal>
      <Modal isOpen={isDisapprovedModalOpen} onClose={closeDisapprovedModal}>
        <DisapprovedNFTMarketplace onClose={closeDisapprovedModal} />
      </Modal>
    </div>
  )
}

const nftData = [
  {
    creator: "Eleanor Pena",
    nftName: "Space Artist",
    supply: "1,000,000",
    description: "A music artist nft crea...",
    price: "8,000",
    status: "Pending Approval",
  },
  {
    creator: "Eleanor Pena",
    nftName: "Space Artist",
    supply: "1,000,000",
    description: "A music artist nft crea...",
    price: "Free",
    status: "Approved",
    note: "Video conversion pending",
  },
  {
    creator: "Eleanor Pena",
    nftName: "Space Artist",
    supply: "1,000,000",
    description: "A music artist nft crea...",
    price: "8,000",
    status: "Disapproved",
  },
  {
    creator: "Eleanor Pena",
    nftName: "Space Artist",
    supply: "1,000,000",
    description: "A music artist nft crea...",
    price: "8,000",
    status: "Approved",
    note: "Video conversion complete",
  },
  {
    creator: "Eleanor Pena",
    nftName: "Space Artist",
    supply: "1,000,000",
    description: "A music artist nft crea...",
    price: "Free",
    status: "Pending Approval",
  },
  {
    creator: "Eleanor Pena",
    nftName: "Space Artist",
    supply: "1,000,000",
    description: "A music artist nft crea...",
    price: "8,000",
    status: "Pending Approval",
  },
  {
    creator: "Eleanor Pena",
    nftName: "Space Artist",
    supply: "1,000,000",
    description: "A music artist nft crea...",
    price: "8,000",
    status: "Disapproved",
  },
  {
    creator: "Eleanor Pena",
    nftName: "Space Artist",
    supply: "1,000,000",
    description: "A music artist nft crea...",
    price: "8,000",
    status: "Pending Approval",
  },
]

