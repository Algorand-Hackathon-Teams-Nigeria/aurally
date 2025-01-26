import React from "react";

interface FeatureCircleProps {
  image: string;
  label: string;
  background: string;
}

const FeatureCircles: React.FC = () => {
  const features: FeatureCircleProps[] = [
    {
      image: "https://dashboard.codeparrot.ai/api/image/Z5MdXfA8XwfbJP_c/music-fe.png",
      label: "Music",
      background: "linear-gradient(180deg, rgba(226,43,204,1) 0%, rgba(251,176,59,1) 100%)",
    },
    {
      image: "https://dashboard.codeparrot.ai/api/image/Z5MdXfA8XwfbJP_c/events-2.png",
      label: "Events",
      background: "#34c759",
    },
    {
      image: "https://dashboard.codeparrot.ai/api/image/Z5MdXfA8XwfbJP_c/connect.png",
      label: "Connect",
      background: "#007aff",
    },
    {
      image: "https://dashboard.codeparrot.ai/api/image/Z5MdXfA8XwfbJP_c/earn-1.png",
      label: "Earn",
      background: "#8a2be2",
    },
    {
      image: "https://dashboard.codeparrot.ai/api/image/Z5MdXfA8XwfbJP_c/communit.png",
      label: "Community",
      background: "linear-gradient(180.28deg, rgba(210,140,117,1) 0.24%, rgba(239,181,70,1) 53.94%)",
    },
    {
      image: "https://dashboard.codeparrot.ai/api/image/Z5MdXfA8XwfbJP_c/merch-1.png",
      label: "Merch",
      background: "#8a2be2",
    },
  ];

  return (
    <div className="relative w-full h-[400px] flex justify-center items-center">
      {features.map((feature, index) => (
        <div
          key={index}
          className="absolute flex flex-col items-center"
          style={{
            top: `${Math.sin((index * Math.PI) / 3) * 175 + 200}px`, 
            left: `${Math.cos((index * Math.PI) / 3) * 175 + 200}px`, 
          }}
        >
          <div
            className="absolute top-0 w-[130px] h-[130px] rounded-full opacity-30"
            style={{ background: feature.background }}
          />
          <img
            src={feature.image}
            alt={feature.label}
            className="relative w-[115px] h-[115px] rounded-full object-cover mt-2" 
          />
          <div className="text-center font-bold text-[18px] mt-2 text-gray-200 opacity-70"> 
            {feature.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureCircles;
