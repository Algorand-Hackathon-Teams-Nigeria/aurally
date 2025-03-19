"use client";

import { Bell, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image"; // Import next/image

// Define the props interface
interface NFTMarketplaceProps {
  onClose: () => void;
}

// Modify the component definition
const DisapprovedNFTMarketplace: React.FC<NFTMarketplaceProps> = ({ onClose }) => {
  return (
    <div className="max-w-5xl p-6 flex items-center justify-center bg-[#EBEBEB] rounded-xl">
      {/* NFT Card */}
      <div className="rounded-xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* NFT Image */}
          <div>
            <Image
              src="/images/pending-image.svg"
              alt="NFT Image"
              width={400}  // Set appropriate width
              height={300}  // Set appropriate height
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>

          {/* NFT Details */}
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-gray-600 text-sm mb-1">Creator Name</h3>
              <h2 className="text-black text-2xl font-bold">Tayo Aina</h2>
            </div>

            <div>
              <h3 className="text-gray-600 text-sm mb-1">NFT Name</h3>
              <h2 className="text-black text-2xl font-bold">Incredible Music Festival</h2>
            </div>

            <div>
              <h3 className="text-gray-600 text-sm mb-1">Supply</h3>
              <h2 className="text-black text-2xl font-bold">120</h2>
            </div>

            <div>
              <h3 className="text-gray-600 text-sm mb-1">Description</h3>
              <p className="text-gray-800 text-sm">
                Lorem ipsum dolor sit amet consectetur. Ullamcorper auctor duis felis dui interdum eget proin
                pharetra. Id venenatis venenatis molestie vitae nisi sed cursus metus. Lectus maecenas a pulvinar
                netus. Tristique facilisi augue faucibus urna est nulla ac.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <h3 className="text-gray-600 text-sm mb-1">Price</h3>
                <h2 className="text-black text-2xl font-bold">Free</h2>
              </div>
              <div>
                <h3 className="text-gray-600 text-sm mb-1">Status</h3>
                <h2 className="text-red-600 text-2xl font-bold">Disapproved</h2> 
              </div>
            </div>

            <div className="flex gap-4 mt-2">
              <button className="px-6 py-3 bg-[#007600] text-white rounded-lg font-medium">Approve</button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button className="flex items-center gap-2 text-gray-600 hover:text-[#8a2be2] transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-[#8a2be2] transition-colors">
            <span>Next</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisapprovedNFTMarketplace;
