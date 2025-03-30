"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  ChevronDown,
  LayoutGrid,
  MoreVertical,
  Search,
  Settings,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/admin-dashoard/dropdown-menu";
import { Avatar, AvatarFallback } from "@/app/components/ui/admin-dashoard/avatar";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import AdminSideNav from "@atoms/a-sidebar/admin-sidenav";
import AdminNav from "@atoms/a-sidebar/admin-nav";
import { useQuery } from "@apollo/client";
import { AppStatisticsDocument } from "@/app/services/graphl_generated"; // Adjust path as needed
import { Skeleton } from "@/app/components/ui/admin-dashoard/skeleton";
import Image from "next/image"; // Ensure Image is imported

// Helper function to calculate percentage change
const getPercentageChange = (current: number, previous: number): number => {
  if (previous === 0) {
    return current === 0 ? 0 : 100; // Avoid division by zero, return 100% if previous is 0 and current is not
  }
  return ((current - previous) / previous) * 100;
};

// Define the reusable Price Icon component as requested (optional, but good practice)
const PriceIcon = () => (
  <Image
    src="/images/price.svg"
    alt="Price Icon"
    width={16}
    height={16}
    className="ml-2" // Adjusted margin to ml-2 to match the original SVG spacing
    style={{ pointerEvents: "none" }} // Keep pointer-events none if needed
  />
);


export default function AdminTransactions() {
  const [openApprovals, setOpenApprovals] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  const { loading: statsLoading, error: statsError, data: statsData } = useQuery(
    AppStatisticsDocument
  );

  useEffect(() => {
    if (statsError) {
      console.error("Error fetching app statistics:", statsError);
    }
  }, [statsError]);

  // Statistics cards data
  const statisticsCards = [
    {
      title: "Total Sound",
      value: statsData?.appStatistics?.totalSoundNfts ?? 0,
      change: 0, // Replace with actual change calculation if you have previous data
      icon: "music",
      bgColor: "bg-[#fef9ec]",
      iconColor: "#fbb03b",
    },
    {
      title: "Total Video",
      value: 0, // Replace with actual video count when available in your data
      change: 0, // Replace with actual change calculation if you have previous data
      icon: "video",
      bgColor: "bg-[#eff1fb]",
      iconColor: "#2f4dc4",
    },
    {
      title: "Total Album",
      value: 0, // Replace with actual album count when available in your data
      change: 0, // Replace with actual change calculation if you have previous data
      icon: "album",
      bgColor: "bg-[#f0f5ea]",
      iconColor: "#669f2a",
    },
    {
      title: "Total Art",
      value: statsData?.appStatistics?.totalArtNfts ?? 0,
      change: 0, // Replace with actual change calculation if you have previous data
      icon: "art",
      bgColor: "bg-[#eff1fb]",
      iconColor: "#2f4dc4",
    },
  ];

  return (
    <div className="flex h-screen bg-[#f0f0f0]">
      {/* Sidebar */}
      <AdminSideNav collapsed={collapsed} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <AdminNav />

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6 bg-[#f0f0f0]">
          {/* First row of statistics cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6 2xl:translate-y-[50px]">
            {statsLoading
              ? Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="bg-white rounded-lg p-5 shadow-sm">
                      <Skeleton className="h-8 w-8 rounded-full mb-4" />
                      <Skeleton className="h-6 w-24 mb-2" />
                      <Skeleton className="h-8 w-32" />
                    </div>
                  ))
              : statisticsCards.map((card, index) => (
                <div key={index} className="bg-white rounded-lg p-5 shadow-sm">
                <div className="mb-4 flex flex-col items-start">
                  {/* Increased container size w-16 h-16 */}
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-2`} // Increased size here
                  >
                    {/* Render appropriate icon based on card.icon */}
                    {card.icon === "music" && (
                      <Image
                        src="/images/trans-music.svg"
                        alt="Music Icon"
                        width={48} // Increased width
                        height={48} // Increased height
                        style={{ pointerEvents: "none" }}
                      />
                    )}
                    {card.icon === "video" && (
                      <Image
                        src="/images/trans-video.svg"
                        alt="Video Icon"
                        width={48} // Increased width
                        height={48} // Increased height
                        style={{ pointerEvents: "none" }}
                      />
                    )}
                    {card.icon === "album" && (
                      <Image
                        src="/images/trans-album.svg"
                        alt="Album Icon"
                        width={48} // Increased width
                        height={48} // Increased height
                        style={{ pointerEvents: "none" }}
                      />
                    )}
                    {card.icon === "art" && (
                      <Image
                        src="/images/trans-art.svg"
                        alt="Art Icon"
                        width={48} // Increased width
                        height={48} // Increased height
                        style={{ pointerEvents: "none" }}
                      />
                    )}
                  </div>
                  <span className="text-[#483D3D] font-bold">{card.title}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{card.value.toLocaleString()}</div>
                  <div
                    className={`text-xs px-2 py-1 rounded ${
                      card.change >= 0
                        ? "bg-[#f0f5ea] text-[#669f2a]"
                        : "bg-[#feeceb] text-[#f04438]"
                    }`}
                  >
                    {card.change >= 0 ? "+" : ""}
                    {card.change.toFixed(1)}%
                  </div>
                </div>
              </div>
                ))}
          </div>

          {/* Transactions Table */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between p-6 border-b border-[#e2e2e2]">
              <h2 className="text-xl font-semibold text-[#1e1e1e]">Transactions</h2>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    All Transactions
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>All Transactions</DropdownMenuItem>
                  <DropdownMenuItem>Sound Transactions</DropdownMenuItem>
                  <DropdownMenuItem>Video Transactions</DropdownMenuItem>
                  <DropdownMenuItem>Album Transactions</DropdownMenuItem>
                  <DropdownMenuItem>Art Transactions</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#f5f5f5]">
                    <th className="px-6 py-3 text-left text-sm font-medium text-[#1e1e1e]">
                      Asset
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-[#1e1e1e]">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-[#1e1e1e]">
                      Wallet address
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-[#1e1e1e]">
                      Transaction Date
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-[#1e1e1e]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e2e2]">
                  {/* --- Row 1 --- */}
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#007600]">
                      Video
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1e1e1e]">
                      <div className="flex items-center">
                        30.2
                        <PriceIcon /> {/* Use the PriceIcon component */}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1e1e1e]">
                      54QFA...XS1I567482df
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1e1e1e]">7/03/22</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-[#1e1e1e] hover:text-[#8a2be2]">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                  {/* --- Row 2 --- */}
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#cd0e0e]">
                      Sound
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1e1e1e]">
                      <div className="flex items-center">
                        30.2
                        <PriceIcon /> {/* Use the PriceIcon component */}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1e1e1e]">
                      54QFA...XS1I567482df
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1e1e1e]">7/03/22</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-[#1e1e1e] hover:text-[#8a2be2]">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                  {/* --- Row 3 --- */}
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#007600]">
                      Art
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1e1e1e]">
                      <div className="flex items-center">
                        30.2
                        <PriceIcon /> {/* Use the PriceIcon component */}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1e1e1e]">
                      54QFA...XS1I567482df
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1e1e1e]">7/03/22</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-[#1e1e1e] hover:text-[#8a2be2]">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                  {/* --- Row 4 --- */}
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#8a2be2]">
                      Album
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1e1e1e]">
                      <div className="flex items-center">
                        30.2
                        <PriceIcon /> {/* Use the PriceIcon component */}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1e1e1e]">
                      54QFA...XS1I567482df
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1e1e1e]">7/03/22</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-[#1e1e1e] hover:text-[#8a2be2]">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                  {/* --- Row 5 --- */}
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#007600]">
                      Video
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1e1e1e]">
                      <div className="flex items-center">
                        30.2
                         <PriceIcon /> {/* Use the PriceIcon component */}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1e1e1e]">
                      54QFA...XS1I567482df
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1e1e1e]">7/03/22</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-[#1e1e1e] hover:text-[#8a2be2]">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                  {/* --- Row 6 --- */}
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#cd0e0e]">
                      Album
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1e1e1e]">
                      <div className="flex items-center">
                        30.2
                        <PriceIcon /> {/* Use the PriceIcon component */}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1e1e1e]">
                      54QFA...XS1I567482df
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1e1e1e]">7/03/22</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-[#1e1e1e] hover:text-[#8a2be2]">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}