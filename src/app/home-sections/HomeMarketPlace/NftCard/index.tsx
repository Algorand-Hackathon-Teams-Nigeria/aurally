import { Button, Image } from "@mantine/core";
import Link from "next/link";
import { Suspense } from "react";
import { getCreator } from "@/app/services/queries";

type Prop = {
  data: SoundCardType;
};

export const NftCardLoader = () => {
  return (
    <div className="h-max rounded-lg bg-[#1e1e1e] border-[0.5px] border-[#444] overflow-hidden flex-1 shadow-md">
      <div className="w-full h-max pt-[75%] relative overflow-hidden">
        <div className="absolute inset-0 bg-white/[0.03] w-full  h-full" />
      </div>
      <div className="px-4 pb-3">
        <div className="flex justify-between items-center gap-1 mt-2.5 mb-3">
          <div className=" w-7/12 rounded-xl h-3.5 bg-white/[0.03]" />
          <div className=" w-2/12 rounded-xl h-[11px] bg-white/[0.03]" />
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 w-max">
            <div className="w-3.5 h-3.5 bg-white/[0.03] rounded-full shrink-0" />
            <div className=" w-14 rounded-xl h-2.5 bg-white/[0.03]" />
          </div>
          <div className=" w-3/12 rounded-xl h-3.5 bg-white/[0.03]" />
        </div>

        <div className="w-full h-9 rounded-lg bg-white/[0.03]" />
      </div>
    </div>
  );
};

const CreatorName = async ({ creator }: { creator: Promise<string> }) => {
  const data = await creator;
  return `@${data}`;
};

export const NftCard = ({ data }: Prop) => {
  const creator_promise = getCreator(data.creator.username ?? "");
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
              <Suspense fallback={<span>@</span>}>
                <CreatorName creator={creator_promise} />
              </Suspense>
            </div>
          </div>
          <div className="text-sm text-[#afafaf] shrink-0 font-[500]">
            {Number(data.price)} ALGO
          </div>
        </div>
        <Link href={`#`}>
          <Button variant="primary-full-sm" size="sm">
            Stream and Buy
          </Button>
        </Link>
      </div>
    </div>
  );
};
