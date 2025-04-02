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
    if (!previous || previous === 0) return current === 0 ? 0 : 100; // Handle division by zero
    return ((current - previous) / previous) * 100
  }

  // Using optional chaining and nullish coalescing for safer access
  const appStats = statsData?.appStatistics;
  const stats = {
    totalRevenue: 0, // Still 0 as no direct data
    totalUsers: appStats?.totalRegisteredUsers ?? 0,
    uploadedSongs: appStats?.totalSoundNfts ?? 0,
    purchasedSongs: appStats?.totalPurchases ?? 0,
    newUsers: 0, // Still 0 as no direct data
    creators: appStats?.totalCreators ?? 0,
    // Note: Previous values are still hardcoded as 0. You'll need historical data for these.
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
      bgColor: "bg-[#fef9ec]", // Added background color
      iconColor: "#fbb03b",
      imageSrc: "/images/dollar.svg" // Added image source
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      change: getPercentageChange(stats.totalUsers, stats.previousTotalUsers),
      icon: "users",
      bgColor: "bg-[#eff1fb]", // Added background color
      iconColor: "#2f4dc4",
      imageSrc: "/images/users.svg" // Added image source
    },
    {
      title: "Uploaded Songs",
      value: stats.uploadedSongs,
      change: getPercentageChange(stats.uploadedSongs, stats.previousUploadedSongs),
      icon: "music",
      bgColor: "bg-[#f0f5ea]", // Added background color
      iconColor: "#669f2a",
      imageSrc: "/images/music.svg" // Added image source
    },
    {
      title: "Purchased songs",
      value: stats.purchasedSongs,
      change: getPercentageChange(stats.purchasedSongs, stats.previousPurchasedSongs),
      icon: "shoppingCart",
      bgColor: "bg-[#eff1fb]", // Added background color (assuming same as users based on original)
      iconColor: "#2f4dc4",
      imageSrc: "/images/users.svg" // Added image source (assuming path)
    },
    {
      title: "New users",
      value: stats.newUsers,
      change: getPercentageChange(stats.newUsers, stats.previousNewUsers),
      icon: "userPlus",
      bgColor: "bg-[#fef9ec]", // Added background color (assuming same as dollar based on original)
      iconColor: "#fbb03b",
      imageSrc: "/images/user-plus.svg" // Added image source
    },
    {
      title: "Creators",
      value: stats.creators,
      change: getPercentageChange(stats.creators, stats.previousCreators),
      icon: "star",
      bgColor: "bg-[#feeceb]", // Added background color
      iconColor: "#f04438",
      imageSrc: "/images/creators.svg" // Added image source
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
                      <div key={i} className="bg-white p-5 shadow-sm">
                        {/* Make Skeleton match the larger size */}
                        <Skeleton className="h-16 w-16 rounded-full mb-4" />
                        <Skeleton className="h-6 w-24 mb-2" />
                        <Skeleton className="h-8 w-32" />
                      </div>
                    ))
                  : statisticsCards.slice(0, 3).map((card, index) => (
                    <div key={index} className="bg-white p-5 shadow-sm">
                      <div className="mb-4 flex flex-col items-start">
                        {/* Increased container size w-16 h-16 and added bgColor */}
                        <div className={`w-16 h-16  flex items-center justify-center mb-2`}>
                          <Image
                            src={card.imageSrc} // Use imageSrc from card data
                            alt={`${card.title} Icon`}
                            width={48} // Increased width
                            height={48} // Increased height
                            style={{ pointerEvents: "none" }}
                          />
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
                         {/* Make Skeleton match the larger size */}
                        <Skeleton className="h-16 w-16 rounded-full mb-4" />
                        <Skeleton className="h-6 w-24 mb-2" />
                        <Skeleton className="h-8 w-32" />
                      </div>
                    ))
                  : statisticsCards.slice(3).map((card, index) => (
                    <div key={index + 3} className="bg-white rounded-lg p-5 shadow-sm">
                      <div className="mb-4 flex flex-col items-start">
                        {/* Increased container size w-16 h-16 and added bgColor */}
                        <div className={`w-16 h-16  flex items-center justify-center mb-2`}>
                          <Image
                              src={card.imageSrc} // Use imageSrc from card data
                              alt={`${card.title} Icon`}
                              width={48} // Increased width
                              height={48} // Increased height
                              style={{ pointerEvents: "none" }}
                            />
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
                  <h2 className="text-lg font-medium">Overview Chart</h2>
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
                              2 * Math.PI * 45 * (1 - (appStats?.totalCreators ?? 0) / (appStats?.totalRegisteredUsers || 1)) // Use appStats
                            }
                            transform="rotate(-90 50 50)"
                          />
                          <text x="50" y="55" textAnchor="middle" fontSize="18" fontWeight="bold" className="truncate">
                            {(appStats?.totalRegisteredUsers ?? 0).toLocaleString()} {/* Use appStats */}
                          </text>
                        </svg>
                      </div>
                    </div>

                    <div className="space-y-5">
                      {[
                        { label: "Total users", value: appStats?.totalRegisteredUsers ?? 0 }, // Use appStats
                        { label: "Total creators", value: appStats?.totalCreators ?? 0 }, // Use appStats
                        { label: "Uploaded songs", value: appStats?.totalSoundNfts ?? 0 }, // Use appStats
                        { label: "Purchased songs", value: appStats?.totalPurchases ?? 0 }, // Use appStats
                      ].map((stat, index) => {
                        const totalSum = // Use appStats for calculations
                          (appStats?.totalRegisteredUsers ?? 0) +
                          (appStats?.totalCreators ?? 0) +
                          (appStats?.totalSoundNfts ?? 0) +
                          (appStats?.totalPurchases ?? 0);

                        const percentage = ((stat.value / (totalSum || 1)) * 100); // Handle potential totalSum=0

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