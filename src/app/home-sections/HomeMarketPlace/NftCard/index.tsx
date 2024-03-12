import { Button, Image } from "@mantine/core";
import Link from "next/link";

type Prop = {
  data: SoundCardType;
};

export const NftCardLoader = () => {
  return (
    <div className="h-max rounded-lg bg-[#1e1e1e] border-[0.5px] border-[#444] overflow-hidden flex-1 shadow-md relative">
      <div className="w-full h-max pt-[75%] relative overflow-hidden">
        <div className="absolute inset-0 bg-white/[0.03] w-full  h-full shimmer" />
      </div>
      <div className="px-4 pb-3">
        <div className="flex justify-between items-center gap-1 mt-2.5 mb-3">
          <div className=" w-7/12 rounded-xl h-3.5 bg-white/[0.03] relative shimmer overflow-hidden" />
          <div className=" w-2/12 rounded-xl h-[11px] bg-white/[0.03] relative shimmer overflow-hidden" />
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 w-max">
            <div className="w-3.5 h-3.5 bg-white/[0.03] rounded-full shrink-0 relative shimmer overflow-hidden" />
            <div className=" w-14 rounded-xl h-2.5 bg-white/[0.03] relative shimmer overflow-hidden" />
          </div>
          <div className=" w-3/12 rounded-xl h-3.5 bg-white/[0.03] relative shimmer overflow-hidden" />
        </div>
        <div className="w-full h-9 rounded-lg bg-white/[0.03] relative shimmer overflow-hidden" />
      </div>
    </div>
  );
};

export const NftCard = ({ data }: Prop) => {
  return (
    <div className="h-max rounded-lg bg-[#1e1e1e] border-[0.5px] border-[#444] overflow-hidden flex-1 shadow-md">
      <div className="w-full h-max pt-[75%] relative overflow-hidden">
        <Image
          src={data.coverImageUrl}
          className="object-cover object-top absolute inset-0 w-full h-full"
          alt={data.title}
          fit={"cover"}
        />
      </div>
      <div className="px-4 pb-3">
        <div className="flex justify-between items-center gap-1 mt-2.5 mb-1.5">
          <div className="text-[14.5px] font-bold truncate">{data.title}</div>
          <div className="text-[11px] text-[#afafaf] shrink-0">Bid</div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 min-w-0 flex-1">
            <div className="text-[11px] text-[#afafaf] truncate font-sans">
              <span>@{data.creator.username}</span>
            </div>
          </div>
          <div className="text-sm text-[#afafaf] shrink-0 font-[500]">
            {Number(data.price)} ALGO
          </div>
        </div>
        <Link
          title={data.title}
          href={`https://app.aurally.xyz/single/${data.assetKey}`}
          target="_blank"
          className="pointer-events-auto"
        >
          <Button variant="primary-full-sm" size="sm">
            Stream and Buy
          </Button>
        </Link>
      </div>
    </div>
  );
};
