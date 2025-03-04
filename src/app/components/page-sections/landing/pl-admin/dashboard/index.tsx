"use client"
import { Bell, ChevronDown, LayoutGrid, Settings, Users, FileText, BarChart3 } from "lucide-react"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { useAppStatisticsQuery, useRevenueOverTimeQuery, useUserStatisticsQuery } from "@/app/services/graphl_generated"
import { useState } from "react"
import { format } from "date-fns"
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Area } from "recharts"
import { Skeleton } from "@/app/components/ui/admin-dashoard/skeleton"
import { usePathname, useRouter } from "next/navigation"
import { BigLogo } from "@atoms/a-big-logo"

// Time period options for the graph
const TIME_PERIODS = {
  "1D": { days: 1 },
  "1W": { days: 7 },
  "1M": { days: 30 },
  "1Y": { days: 365 },
}

export default function Dashboard() {
  const router = useRouter()
  const pathname = usePathname()
  const [timePeriod, setTimePeriod] = useState<keyof typeof TIME_PERIODS>("1M")
  const [collapsed, setCollapsed] = useState(false)

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev)
  }

  // Fetch statistics
  const { data: statsData, loading: statsLoading } = useAppStatisticsQuery()

  // Fetch revenue data for the graph
  const { data: revenueData, loading: revenueLoading } = useRevenueOverTimeQuery({
    variables: {
      days: TIME_PERIODS[timePeriod].days,
    },
  })

  // Fetch user statistics
  const { data: userStatsData, loading: userStatsLoading } = useUserStatisticsQuery()

  // Format revenue data for the chart
  const chartData =
    revenueData?.revenueOverTime.map((item) => ({
      date: format(new Date(item.date), "MMM dd"),
      revenue: item.amount,
    })) || []

  // Calculate percentage changes
  const getPercentageChange = (current: number, previous: number) => {
    if (!previous) return 0
    return ((current - previous) / previous) * 100
  }

  const stats = statsData?.appStatistics
    ? {
      totalRevenue: 0, // No equivalent field in appStatistics, keeping as 0
      totalUsers: statsData.appStatistics.totalRegisteredUsers || 0,
      uploadedSongs: statsData.appStatistics.totalSoundNfts || 0,
      purchasedSongs: statsData.appStatistics.totalPurchases || 0,
      newUsers: 0, // No direct equivalent, keeping as 0
      creators: statsData.appStatistics.totalCreators || 0,
      previousTotalRevenue: 0,
      previousTotalUsers: 0,
      previousUploadedSongs: 0,
      previousPurchasedSongs: 0,
      previousNewUsers: 0,
      previousCreators: 0,
    }
    : {
      totalRevenue: 0,
      totalUsers: 0,
      uploadedSongs: 0,
      purchasedSongs: 0,
      newUsers: 0,
      creators: 0,
      previousTotalRevenue: 0,
      previousTotalUsers: 0,
      previousUploadedSongs: 0,
      previousPurchasedSongs: 0,
      previousNewUsers: 0,
      previousCreators: 0,
    };

  // Statistics cards data
  const statisticsCards = [
    {
      title: "Total Revenue",
      value: stats.totalRevenue,
      change: getPercentageChange(stats.totalRevenue, stats.previousTotalRevenue),
      icon: "dollar",
      bgColor: "bg-[#fef9ec]",
      iconColor: "#fbb03b",
    },
    {
      title: "Total Users",
      value: statsData?.appStatistics?.totalRegisteredUsers ?? 0,
      change: getPercentageChange(stats.totalUsers, stats.previousTotalUsers),
      icon: "users",
      bgColor: "bg-[#eff1fb]",
      iconColor: "#2f4dc4",
    },
    {
      title: "Uploaded Songs",
      value: statsData?.appStatistics?.totalSoundNfts ?? 0,
      change: getPercentageChange(stats.uploadedSongs, stats.previousUploadedSongs),
      icon: "music",
      bgColor: "bg-[#f0f5ea]",
      iconColor: "#669f2a",
    },
    {
      title: "Purchased songs",
      value: statsData?.appStatistics?.totalPurchases ?? 0,
      change: getPercentageChange(stats.purchasedSongs, stats.previousPurchasedSongs),
      icon: "shoppingCart",
      bgColor: "bg-[#eff1fb]",
      iconColor: "#2f4dc4",
    },
    {
      title: "New users",
      value: stats.newUsers,
      change: getPercentageChange(stats.newUsers, stats.previousNewUsers),
      icon: "userPlus",
      bgColor: "bg-[#fef9ec]",
      iconColor: "#fbb03b",
    },
    {
      title: "Creators",
      value: statsData?.appStatistics?.totalCreators ?? 0,
      change: getPercentageChange(stats.creators, stats.previousCreators),
      icon: "star",
      bgColor: "bg-[#feeceb]",
      iconColor: "#f04438",
    },
  ];


  return (
    <div className="flex h-screen bg-[#f5f5f5]">
      {/* Sidebar */}
      <div
        className={`bg-white border-r border-[#e9e9e9] flex flex-col transition-all duration-300 ${collapsed ? "w-16" : "w-64"
          }`}
      >
        <div className="p-4 flex justify-center">
          <BigLogo
            to="/admin"
            className={`transition-all duration-300 ${collapsed ? "w-8" : "w-68"}`}
            color="#8a2be2"
          />
        </div>

        <nav className="px-2 py-2">
          <div className="space-y-1">
            {[
              { title: "Dashboard", icon: LayoutGrid, path: "/" },
              { title: "Users", icon: Users, path: "/users" },
              { title: "Transactions", icon: BarChart3, path: "/transactions" },
              { title: "Settings", icon: Settings, path: "/settings" },
            ].map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className={`w-full justify-start flex items-center ${pathname === item.path ? "text-[#8a2be2] bg-[#eff1fb]" : "text-[#919191]"} font-medium`}
                onClick={() => {
                  if (item.title === "Dashboard") {
                    toggleSidebar()
                  } else {
                    router.push(item.path)
                  }
                }}
              >
                <item.icon className="mr-2 h-5 w-5" />
                {!collapsed && item.title}
              </Button>
            ))}

            {/* Approvals Dropdown */}
            {!collapsed && (
              <div>
                <Button variant="ghost" className="w-full justify-between text-[#919191] font-medium">
                  <span className="flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Approvals
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <div className="ml-9 mt-1 space-y-1">
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
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-[#e9e9e9] h-16 flex items-center px-6">
          <div className="flex-1 flex items-center">
            <div className="relative w-96">
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
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="h-6 w-6 text-[#919191]" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-[#ff0000] rounded-full"></span>
            </div>
            <div className="h-10 w-10 rounded-full bg-[#8a2be2] flex items-center justify-center">
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
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-4 gap-6">
            {/* Left side content (3/4 width) */}
            <div className="col-span-3">
              {/* First row of statistics cards */}
              <div className="grid grid-cols-3 gap-6 mb-6">
                {statsLoading
                  ? Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="bg-white rounded-lg p-5 shadow-sm">
                        <Skeleton className="h-8 w-8 rounded-full mb-4" />
                        <Skeleton className="h-6 w-24 mb-2" />
                        <Skeleton className="h-8 w-32" />
                      </div>
                    ))
                  : statisticsCards.slice(0, 3).map((card, index) => (
                    <div key={index} className="bg-white rounded-lg p-5 shadow-sm">
                      <div className="flex items-center mb-4">
                        <div className={`w-8 h-8 rounded-full ${card.bgColor} flex items-center justify-center mr-3`}>
                          {/* Render appropriate icon based on card.icon */}
                          {/* Icon rendering code remains the same */}
                          {card.icon === "dollar" && (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.31 11.14C10.54 10.69 9.97 10.2 9.97 9.47C9.97 8.63 10.76 8.04 12.07 8.04C13.45 8.04 13.97 8.7 14.01 9.68H15.72C15.67 8.34 14.85 7.11 13.23 6.71V5H10.9V6.69C9.39 7.01 8.18 7.99 8.18 9.5C8.18 11.29 9.67 12.19 11.84 12.71C13.79 13.17 14.18 13.86 14.18 14.58C14.18 15.11 13.79 15.97 12.08 15.97C10.48 15.97 9.85 15.25 9.76 14.33H8.04C8.14 16.03 9.4 16.99 10.9 17.3V19H13.24V17.33C14.76 17.04 15.98 16.17 15.98 14.56C15.97 12.36 14.07 11.6 12.31 11.14Z"
                                fill={card.iconColor}
                              />
                            </svg>
                          )}
                          {card.icon === "users" && (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                                stroke={card.iconColor}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z"
                                stroke={card.iconColor}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
                                stroke={card.iconColor}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M17 3.13C17.8604 3.35031 18.623 3.85071 19.1676 4.55232C19.7122 5.25392 20.0078 6.11683 20.0078 7.005C20.0078 7.89318 19.7122 8.75608 19.1676 9.45769C18.623 10.1593 17.8604 10.6597 17 10.88"
                                stroke={card.iconColor}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                          {card.icon === "music" && (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9 18V5L21 3V16"
                                stroke={card.iconColor}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M6 21C7.65685 21 9 19.6569 9 18C9 16.3431 7.65685 15 6 15C4.34315 15 3 16.3431 3 18C3 19.6569 4.34315 21 6 21Z"
                                stroke={card.iconColor}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M18 19C19.6569 19 21 17.6569 21 16C21 14.3431 19.6569 13 18 13C16.3431 13 15 14.3431 15 16C15 17.6569 16.3431 19 18 19Z"
                                stroke={card.iconColor}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                          {card.icon === "shoppingCart" && (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M2 3H4C4.21212 3 4.4202 3.08493 4.58579 3.23934C4.75138 3.39375 4.86667 3.60607 4.92857 3.84848L7.71429 15.3485C7.77619 15.5909 7.89148 15.8032 8.05707 15.9576C8.22266 16.112 8.43333 16.2273 8.64524 16.2892C8.85714 16.3511 9.07879 16.3511 9.29069 16.2892C9.50259 16.2273 9.71326 16.112 9.87885 15.9576C10.0444 15.8032 10.1597 15.5909 10.2216 15.3485L11.7784 9.04545C11.8403 8.80303 11.9556 8.59071 12.1212 8.4363C12.2868 8.28189 12.4974 8.16667 12.7093 8.10476C12.9212 8.04286 13.1429 8.04286 13.3548 8.10476C13.5667 8.16667 13.7774 8.28189 13.943 8.4363C14.1086 8.59071 14.2239 8.80303 14.2857 9.04545L15.7143 15.3485C15.7762 15.5909 15.8915 15.8032 16.0571 15.9576C16.2227 16.112 16.4333 16.2273 16.6452 16.2892C16.8571 16.3511 17.0788 16.3511 17.2907 16.2892C17.5026 16.2273 17.7133 16.112 17.8788 15.9576C18.0444 15.8032 18.1597 15.5909 18.2216 15.3485L20.9286 3.84848C20.9905 3.60607 21.1058 3.39375 21.2714 3.23934C21.437 3.08493 21.6479 3 21.8598 3H22"
                                stroke={card.iconColor}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M7 23C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21C6.44772 21 6 21.4477 6 22C6 22.5523 6.44772 23 7 23Z"
                                stroke={card.iconColor}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M19 23C19.5523 23 20 22.5523 20 22C20 21.4477 19.5523 21 19 21C18.4477 21 18 21.4477 18 22C18 22.5523 18.4477 23 19 23Z"
                                stroke={card.iconColor}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                          {card.icon === "userPlus" && (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                                stroke={card.iconColor}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z"
                                stroke={card.iconColor}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M20 8V14"
                                stroke={card.iconColor}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M23 11H17"
                                stroke={card.iconColor}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                          {card.icon === "star" && (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z"
                                stroke={card.iconColor}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88"
                                stroke={card.iconColor}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                        <span className="text-[#919191]">{card.title}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">{card.value.toLocaleString()}</div>
                        <div
                          className={`text-xs px-2 py-1 rounded ${card.change >= 0 ? "bg-[#f0f5ea] text-[#669f2a]" : "bg-[#feeceb] text-[#f04438]"
                            }`}
                        >
                          {card.change >= 0 ? "+" : ""}
                          {card.change.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
              </div>



              {/* Second row of statistics cards */}
              <div className="grid grid-cols-3 gap-6">
                {statsLoading
                  ? Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i + 3} className="bg-white rounded-lg p-5 shadow-sm">
                        <Skeleton className="h-8 w-8 rounded-full mb-4" />
                        <Skeleton className="h-6 w-24 mb-2" />
                        <Skeleton className="h-8 w-32" />
                      </div>
                    ))
                  : statisticsCards.slice(3).map((card, index) => (
                    <div key={index + 3} className="bg-white rounded-lg p-5 shadow-sm">
                      <div className="flex items-center mb-4">
                        <div className={`w-8 h-8 rounded-full ${card.bgColor} flex items-center justify-center mr-3`}>
                          {/* Render appropriate icon based on card.icon */}
                          {/* Icon rendering code remains the same */}
                          {card.icon === "dollar" && (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.31 11.14C10.54 10.69 9.97 10.2 9.97 9.47C9.97 8.63 10.76 8.04 12.07 8.04C13.45 8.04 13.97 8.7 14.01 9.68H15.72C15.67 8.34 14.85 7.11 13.23 6.71V5H10.9V6.69C9.39 7.01 8.18 7.99 8.18 9.5C8.18 11.29 9.67 12.19 11.84 12.71C13.79 13.17 14.18 13.86 14.18 14.58C14.18 15.11 13.79 15.97 12.08 15.97C10.48 15.97 9.85 15.25 9.76 14.33H8.04C8.14 16.03 9.4 16.99 10.9 17.3V19H13.24V17.33C14.76 17.04 15.98 16.17 15.98 14.56C15.97 12.36 14.07 11.6 12.31 11.14Z"
                                fill={card.iconColor}
                              />
                            </svg>
                          )}
                          {card.icon === "users" && (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                                stroke={card.iconColor}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z"
                                stroke={card.iconColor}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
                                stroke={card.iconColor}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M17 3.13C17.8604 3.35031 18.623 3.85071 19.1676 4.55232C19.7122 5.25392 20.0078 6.11683 20.0078 7.005C20.0078 7.89318 19.7122 8.75608 19.1676 9.45769C18.623 10.1593 17.8604 10.6597 17 10.88"
                                stroke={card.iconColor}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                          {card.icon === "music" && (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9 18V5L21 3V16"
                                stroke={card.iconColor}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M6 21C7.65685 21 9 19.6569 9 18C9 16.3431 7.65685 15 6 15C4.34315 15 3 16.3431 3 18C3 19.6569 4.34315 21 6 21Z"
                                stroke={card.iconColor}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M18 19C19.6569 19 21 17.6569 21 16C21 14.3431 19.6569 13 18 13C16.3431 13 15 14.3431 15 16C15 17.6569 16.3431 19 18 19Z"
                                stroke={card.iconColor}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                          {card.icon === "shoppingCart" && (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M2 3H4C4.21212 3 4.4202 3.08493 4.58579 3.23934C4.75138 3.39375 4.86667 3.60607 4.92857 3.84848L7.71429 15.3485C7.77619 15.5909 7.89148 15.8032 8.05707 15.9576C8.22266 16.112 8.43333 16.2273 8.64524 16.2892C8.85714 16.3511 9.07879 16.3511 9.29069 16.2892C9.50259 16.2273 9.71326 16.112 9.87885 15.9576C10.0444 15.8032 10.1597 15.5909 10.2216 15.3485L11.7784 9.04545C11.8403 8.80303 11.9556 8.59071 12.1212 8.4363C12.2868 8.28189 12.4974 8.16667 12.7093 8.10476C12.9212 8.04286 13.1429 8.04286 13.3548 8.10476C13.5667 8.16667 13.7774 8.28189 13.943 8.4363C14.1086 8.59071 14.2239 8.80303 14.2857 9.04545L15.7143 15.3485C15.7762 15.5909 15.8915 15.8032 16.0571 15.9576C16.2227 16.112 16.4333 16.2273 16.6452 16.2892C16.8571 16.3511 17.0788 16.3511 17.2907 16.2892C17.5026 16.2273 17.7133 16.112 17.8788 15.9576C18.0444 15.8032 18.1597 15.5909 18.2216 15.3485L20.9286 3.84848C20.9905 3.60607 21.1058 3.39375 21.2714 3.23934C21.437 3.08493 21.6479 3 21.8598 3H22"
                                stroke={card.iconColor}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M7 23C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21C6.44772 21 6 21.4477 6 22C6 22.5523 6.44772 23 7 23Z"
                                stroke={card.iconColor}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M19 23C19.5523 23 20 22.5523 20 22C20 21.4477 19.5523 21 19 21C18.4477 21 18 21.4477 18 22C18 22.5523 18.4477 23 19 23Z"
                                stroke={card.iconColor}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                          {card.icon === "userPlus" && (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                                stroke={card.iconColor}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z"
                                stroke={card.iconColor}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M20 8V14"
                                stroke={card.iconColor}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M23 11H17"
                                stroke={card.iconColor}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                          {card.icon === "star" && (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z"
                                stroke={card.iconColor}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88"
                                stroke={card.iconColor}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                        <span className="text-[#919191]">{card.title}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">{card.value.toLocaleString()}</div>
                        <div
                          className={`text-xs px-2 py-1 rounded ${card.change >= 0 ? "bg-[#f0f5ea] text-[#669f2a]" : "bg-[#feeceb] text-[#f04438]"
                            }`}
                        >
                          {card.change >= 0 ? "+" : ""}
                          {card.change.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
              </div>


              {/* Revenue Chart */}
              <div className="bg-white rounded-lg p-5 shadow-sm mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-medium">Overview</h2>
                  <div className="flex space-x-2">
                    {Object.keys(TIME_PERIODS).map((period) => (
                      <Button
                        key={period}
                        variant={period === timePeriod ? "default" : "outline"}
                        className={`h-8 px-3 text-xs ${period === timePeriod ? "bg-[#8a2be2] text-white hover:bg-[#7928c9]" : "text-[#919191]"
                          }`}
                        onClick={() => setTimePeriod(period as keyof typeof TIME_PERIODS)}
                      >
                        {period}
                      </Button>
                    ))}
                  </div>
                </div>
                {revenueLoading ? (
                  <Skeleton className="h-[300px] w-full" />
                ) : (
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={chartData}>
                        <defs>
                          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#8A2BE2" stopOpacity={0.4} />
                            <stop offset="100%" stopColor="#8A2BE2" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" axisLine={false} tickLine={false} dy={10} />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          dx={-10}
                          tickFormatter={(value) => `$${value.toLocaleString()}`}
                        />
                        <Tooltip
                          formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                          contentStyle={{
                            backgroundColor: "#fff",
                            border: "1px solid #e9e9e9",
                            borderRadius: "8px",
                            padding: "8px",
                          }}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="none" fill="url(#gradient)" fillOpacity={1} />
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          stroke="#8a2be2"
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 8 }}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>


            </div>

            {/* Right side content (1/4 width) - User Statistics */}
            <div className="col-span-1">
              <div className="bg-white rounded-lg p-5 shadow-sm h-full">
                <h2 className="text-lg font-medium mb-6">Users Statistics</h2>

                {userStatsLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-40 w-40 rounded-full mx-auto mb-6" />
                    {Array(4)
                      .fill(0)
                      .map((_, i) => (
                        <div key={i}>
                          <Skeleton className="h-4 w-24 mb-2" />
                          <Skeleton className="h-2 w-full" />
                        </div>
                      ))}
                  </div>
                ) : (
                  <>
                    <div className="flex justify-center mb-6">
                      <div className="relative w-40 h-40">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <circle cx="50" cy="50" r="45" fill="none" stroke="#e9e9e9" strokeWidth="10" />
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="#8a2be2"
                            strokeWidth="10"
                            strokeDasharray={`${2 * Math.PI * 45}`}
                            strokeDashoffset={
                              2 * Math.PI * 45 * (1 - (statsData?.appStatistics?.totalCreators || 0) / (statsData?.appStatistics?.totalRegisteredUsers || 1))
                            }
                            transform="rotate(-90 50 50)"
                          />
                          <text x="50" y="55" textAnchor="middle" fontSize="16" fontWeight="bold">
                            {statsData?.appStatistics?.totalRegisteredUsers.toLocaleString() || 0}
                          </text>
                        </svg>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[
                        { label: "Total users", value: statsData?.appStatistics?.totalRegisteredUsers || 0 },
                        { label: "Total creators", value: statsData?.appStatistics?.totalCreators || 0 },
                        { label: "Uploaded songs", value: statsData?.appStatistics?.totalSoundNfts || 0 },
                        { label: "Purchased songs", value: statsData?.appStatistics?.totalPurchases || 0 },
                      ].map((stat, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{stat.label}</span>
                          </div>
                          <div className="w-full bg-[#e9e9e9] rounded-full h-2">
                            <div
                              className="bg-[#8a2be2] h-2 rounded-full"
                              style={{
                                width: `${(stat.value / (statsData?.appStatistics?.totalRegisteredUsers || 1)) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}

