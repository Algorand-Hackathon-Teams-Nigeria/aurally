import Image from "next/image";
import { IconWrapper } from "@/app/components/Icon";
import Link from "next/link";
import { GetNftsQuery } from "@/app/services/graphl_generated";

type Prop = {
  data: GetNftsQuery["soundNfts"][number];
};

export const NftCardLoader = () => {
  return (
    <div className="w-full h-max rounded-lg bg-sub-bg border-[0.5px] border-[#444] overflow-hidden flex-1 shadow-md">
      <div className="w-full h-max pt-[75%] relative overflow-hidden">
        <div className="absolute inset-0 bg-white/[0.03] w-full  h-full shimmer before:animate-shimmer" />
      </div>
      <div className="px-4 pb-3">
        <div className="flex justify-between items-center gap-1 mt-2.5 mb-3">
          <div className=" w-7/12 rounded-xl h-3.5 bg-white/[0.03] shimmer-relative before:animate-shimmer" />
          <div className=" w-2/12 rounded-xl h-[11px] bg-white/[0.03] shimmer-relative before:animate-shimmer" />
        </div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 w-max">
            <div className="w-3.5 h-3.5 bg-white/[0.03] rounded-full shrink-0 shimmer-relative before:animate-shimmer" />
            <div className=" w-14 rounded-xl h-2.5 bg-white/[0.03] shimmer-relative before:animate-shimmer" />
          </div>
          <div className=" w-3/12 rounded-xl h-3.5 bg-white/[0.03] shimmer-relative before:animate-shimmer" />
        </div>

        <div className="w-full h-9 rounded-lg bg-white/[0.03] shimmer-relative before:animate-shimmer" />
      </div>
    </div>
  );
};

export const NftCard = ({ data }: Prop) => {
  return (
    <div
      title={data.title}
      className="h-max relative min-h-80 flex-1 shadow-md"
    >
      <Link className="h-full min-h-80" href={`${process.env.NEXT_PUBLIC_APP_URL}/single/${data.assetKey}`}>
        <Image
          width={570}
          height={610}
          unoptimized
          src={data.coverImageUrl}
          className="object-cover min-h-[320px] min-w-[273px] rounded-[10px] absolute inset-0 w-full h-full"
          alt={data.title}
        />
        <div className="absolute text-white/90 gap-2 flex bottom-2 left-2 w-full flex-col">
          <h4 className="font-bold bg-black/40 text-2xl p-1 px-4 max-w-[95%] text-ellipsis overflow-hidden w-fit rounded-full">
            {data.title}
          </h4>
          <span className="flex items-center gap-2 font-bold bg-black/40 p-0.5 px-2 max-w-[95%] text-ellipsis overflow-hidden w-fit rounded-full">
            <IconWrapper icon="cryptocurrency:algo" />
            <span>
              {data.price}
            </span>
          </span>
        </div>
      </Link>
    </div>
  );
};
