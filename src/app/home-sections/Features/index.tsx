import { features } from "@/app/data";
import Image from "next/image";
import chat from "@/app/assets/chat-circle.svg";
import { IconWrapper } from "@/app/components/Icon";
import classes from "../../styles/landing.module.css";

const Features = () => {
  return (
    <div
      className="rounded-[20px] border border-primary px-[5%] sm:px-9 py-12 sm:py-14 relative z-[5]"
      id="features"
    >
      <h2
        className={`text-center text-3xl md:text-4xl lg:text-5xl font-bold ${classes.txt_grd2}`}
      >
        Features
      </h2>
      <div className="grid md:grid-cols-2 mt-8 sm:mt-14">
        {features.map(({ title, icon, desc }, index) => (
          <div
            key={index}
            className=" md:odd:border-r border-primary pb-12 md:odd:pr-6 md:even:pl-4 lg:odd:pr-16 lg:even:pl-16 flex gap-4 items-center sm:items-start"
          >
            {index === 3
              ? (
                <Image
                  alt="features"
                  src={chat}
                  className="max-w-[11.5vw] sm:max-w-[5rem] lg:max-w-[6.2rem] h-max"
                />
              )
              : (
                <IconWrapper
                  icon={icon}
                  wrapperClassName="text-[12.5vw] sm:text-[5rem] lg:text-[6.5rem] text-primary shrink-0"
                />
              )}
            <div>
              <div className="text-lg md:text-xl lg:text-2xl mb-7 font-bold">
                {title}
              </div>
              <div className="text-xs md:text-sm leading-normal">{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
