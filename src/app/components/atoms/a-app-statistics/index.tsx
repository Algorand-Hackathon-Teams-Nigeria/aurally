"use client";
import React from "react";
import { useAppStatisticsQuery } from "@services/graphl_generated";

interface StatisticsProps {
  stat: string;
  desc: string;
}

const StatisticItem: React.FC<StatisticsProps> = ({ stat, desc }) => {
  return (
    <div className="flex flex-col items-center">
      <p className="font-bold text-2xl md:text-4xl">{stat}</p>
      <p className="text-white/70">{desc}</p>
    </div>
  );
};

const roundStat = (stat: number, suffix?: string): string => {
  return (Math.ceil(stat / 10) * 10).toString().concat(
    `${suffix ? suffix : ""}+`,
  );
};

const AppStatistics = () => {
  const { data } = useAppStatisticsQuery();

  return (
    <section
      id="app-statistics"
      className="w-full flex items-center p-4 md:p-0 justify-center mb-36"
    >
      <div className="flex items-center w-full flex-wrap rounded-md md:hidden gap-6 flex-col -translate-y-10 p-6 border-neutral-500/30 justify-evenly border bg-subBackground">
        <div className="flex items-center w-full justify-evenly">
          <StatisticItem
            stat={roundStat(data?.appStatistics.totalRegisteredUsers ?? 0)}
            desc="SIGNUPS"
          />
          <StatisticItem
            stat={roundStat(data?.appStatistics.totalCreators ?? 0)}
            desc="CREATORS"
          />
        </div>
        <div className="flex flex-col w-full justify-evenly gap-6 items-center">
          <StatisticItem
            stat={roundStat(
              (data?.appStatistics.totalSoundNfts ?? 0) +
              (data?.appStatistics.totalArtNfts ?? 0),
            )}
            desc="MINTED/PURCHASED NFTs"
          />
          <StatisticItem
            stat={roundStat(data?.appStatistics.totalPurchases ?? 0)}
            desc="TOTAL TRANSACTIONS"
          />
        </div>
      </div>
      <div className="hidden items-center w-full md:flex gap-4 p-6 border-neutral-500/30 justify-evenly border-y bg-subBackground">
        <StatisticItem
          stat={roundStat(data?.appStatistics.totalRegisteredUsers ?? 0)}
          desc="SIGNUPS"
        />
        <StatisticItem
          stat={roundStat(data?.appStatistics.totalCreators ?? 0)}
          desc="CREATORS"
        />
        <StatisticItem
          stat={roundStat(
            (data?.appStatistics.totalSoundNfts ?? 0) +
            (data?.appStatistics.totalArtNfts ?? 0),
          )}
          desc="MINTED/PURCHASED NFTs"
        />
        <StatisticItem
          stat={roundStat(data?.appStatistics.totalPurchases ?? 0)}
          desc="TOTAL TRANSACTIONS"
        />
      </div>
    </section>
  );
};

export default AppStatistics;
