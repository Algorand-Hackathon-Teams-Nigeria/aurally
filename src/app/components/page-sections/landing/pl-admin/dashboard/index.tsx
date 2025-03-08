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
import AdminSideNav from "@atoms/a-sidebar/admin-sidenav";
import AdminNav from "@atoms/a-sidebar/admin-nav";
import Image from "next/image";


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
      <AdminSideNav collapsed={collapsed} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <AdminNav />

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6"> {/* Modified grid-cols here for responsiveness */}
            {/* Left side content (3/4 width on medium screens and above) */}
            <div className="md:col-span-3"> {/* Modified col-span here for responsiveness */}
              {/* First row of statistics cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6 2xl:translate-y-[50px]"> {/* Modified grid-cols here for responsiveness */}
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
                      <div className="mb-4 flex flex-col items-start"> {/* Modified div here */}
                        <div className={`w-8 h-8 rounded-full ${card.bgColor} flex items-center justify-center mb-2`}> {/* Added mb-2 here for spacing */}
                          {/* Render appropriate icon based on card.icon */}
                          {/* Icon rendering code remains the same */}

                          {card.icon === "dollar" && (
                            <Image
                              src="/images/dollar.svg" // Path relative to the public folder
                              alt="Dollar Icon"
                              width={24} // Adjust the width
                              height={24} // Adjust the height
                              style={{ pointerEvents: "none" }}
                            />
                          )}

                          {card.icon === "users" && (
                            <Image
                              src="/images/users.svg" // Path relative to the public folder
                              alt="Users Icon"
                              width={24} // Adjust the width
                              height={24} // Adjust the height
                              style={{ pointerEvents: "none" }}
                            />
                          )}
                          {card.icon === "music" && (
                            <Image
                              src="/images/music.svg" // Path relative to the public folder
                              alt="Users Icon"
                              width={24} // Adjust the width
                              height={24} // Adjust the height
                              style={{ pointerEvents: "none" }}
                            />
                          )}

                        </div>
                        <span className="text-[#483D3D] font-bold">{card.title}</span>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 2xl:translate-y-[50px]"> {/* Modified grid-cols here for responsiveness */}
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
                      <div className="mb-4 flex flex-col items-start"> {/* Modified div here */}
                        <div className={`w-8 h-8 rounded-full  flex items-center justify-center mb-2`}> {/* Added mb-2 here for spacing */}
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
                            <Image
                              src="/images/users.svg" // Path relative to the public folder
                              alt="Users Icon"
                              width={24} // Adjust the width
                              height={24} // Adjust the height
                              style={{ pointerEvents: "none" }}
                            />
                          )}
                          {card.icon === "userPlus" && (
                            <Image
                              src="/images/user-plus.svg" // Path relative to the public folder
                              alt="Users Icon"
                              width={24} // Adjust the width
                              height={24} // Adjust the height
                              style={{ pointerEvents: "none" }}
                            />
                          )}
                          {card.icon === "star" && (
                            <Image
                              src="/images/creators.svg" // Path relative to the public folder
                              alt="Users Icon"
                              width={24} // Adjust the width
                              height={24} // Adjust the height
                              style={{ pointerEvents: "none" }}
                            />
                          )}
                        </div>
                        <span className="text-[#483D3D] font-bold">{card.title}</span>
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
              <div className="bg-white rounded-lg p-5 shadow-sm mb-6 2xl:mt-[70px] lg:mt-[30px]">

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
                  <div className="h-[300px] 2xl:h-[500px] ">
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

            {/* Right side content (1/4 width on medium screens and above) - User Statistics */}
<div className="md:col-span-1 w-full 2xl:h-[880px] 2xl:translate-y-[50px]"> {/* Modified col-span here for responsiveness */}
  <div className="bg-white rounded-lg p-5 shadow-sm h-full">
    <h2 className="text-lg font-medium mb-6">Users Statistics</h2>

    {userStatsLoading ? (
      <div className="space-y-6 flex flex-col items-center">
        <Skeleton className="h-64 w-64 rounded-full mb-8" />
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="w-full max-w-md">
              <Skeleton className="h-6 w-40 mb-3" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
      </div>
    ) : (
      <>
        <div className="flex justify-center mb-6">
          <div className="relative w-72 h-72 overflow-hidden">
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
              <text x="50" y="55" textAnchor="middle" fontSize="18" fontWeight="bold" className="truncate">
                {statsData?.appStatistics?.totalRegisteredUsers.toLocaleString() || 0}
              </text>
            </svg>
          </div>
        </div>

        <div className="space-y-5">
          {[
            { label: "Total users", value: statsData?.appStatistics?.totalRegisteredUsers || 0 },
            { label: "Total creators", value: statsData?.appStatistics?.totalCreators || 0 },
            { label: "Uploaded songs", value: statsData?.appStatistics?.totalSoundNfts || 0 },
            { label: "Purchased songs", value: statsData?.appStatistics?.totalPurchases || 0 },
          ].map((stat, index) => {
            const percentage = ((stat.value / (statsData?.appStatistics?.totalRegisteredUsers || 1)) * 100);
            return (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{stat.label}</span>
                  <span className="text-sm font-semibold">{stat.value.toLocaleString()}</span>
                </div>
                <div className="w-full bg-[#e9e9e9] rounded-full h-3">
                  <div
                    className="bg-[#8a2be2] h-3 rounded-full"
                    style={{
                      width: `${Math.min(percentage, 100)}%`,
                      transition: "width 0.5s ease-in-out"
                    }}
                  />
                </div>
              </div>
            );
          })}
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