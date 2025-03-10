import { roadmaps, mobileRoadmaps } from "@/app/data";
import classes from "@styles/landing.module.css";
import BallGradient from "@components/BallGradient";

const RoadMap = () => {
  return (
    <div className="mb-36 relative translate-y-[-205px] lg:translate-y-[-370px]" id="road">
      <BallGradient
        topOrBottom="top-1/2 -translate-y-1/2"
        leftOrRight="left-1/2 -translate-x-1/2"
      />
      <h2
        className={`text-center text-3xl md:text-4xl lg:text-5xl xl:text-[4rem] font-bold mb-10 relative z-[5] ${classes.txt_grd2}`}
      >
        Our Roadmap
      </h2>
      <div className="hidden md:block relative z-[5]">
        {/* Desktop View */}
        <div className="grid grid-cols-roadmap items-center">
          <div className="pt-14" />
          <div
            className={`h-full bg-primary relative ${classes.roadmap_top}`}
          />
        </div>
        {roadmaps.map(({ title, desc }, index) => (
          <div key={index} className="grid grid-cols-roadmap items-center">
            {index % 2 !== 0 && (
              <>
                <div />
                <div className="h-full bg-primary relative" />
              </>
            )}
            <div>
              <div
                className={`flex gap-5 ${index % 2 !== 0 ? "justify-start" : "justify-end"}`}
              >
                {index % 2 !== 0 && <div className={classes.arrow_right} />}
                <div className="flex items-center">
                  {index % 2 === 0 && (
                    <div className="bg-primary w-10 h-10 lg:w-12 lg:h-12 rounded-l-full grid place-items-center shrink-0">
                      <span className="text-2xl lg:text-3xl font-bold -mr-1">
                        {index + 1}
                      </span>
                    </div>
                  )}
                  <div className="border border-borderColor p-4 rounded-[10px] max-w-[420px]">
                    <div className="font-bold mb-4">{title}</div>
                    <ul className="text-[13px] font-medium space-y-3 purple-disc list-disc marker:text-primary">
                      {desc.map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                  </div>
                  {index % 2 !== 0 && (
                    <div className="bg-primary w-10 h-10 lg:w-12 lg:h-12 rounded-r-full grid place-items-center shrink-0">
                      <span className="text-2xl lg:text-3xl font-bold -ml-1">
                        {index + 1}
                      </span>
                    </div>
                  )}
                </div>
                {index % 2 === 0 && <div className={classes.arrow_left} />}
              </div>
            </div>
            {index % 2 === 0 && (
              <>
                <div className="h-full bg-primary relative" />
                <div />
              </>
            )}
          </div>
        ))}
        <div className="grid grid-cols-roadmap items-center">
          <div className="pb-14" />
          <div
            className={`h-full bg-primary relative ${classes.roadmap_bottom}`}
          />
        </div>
      </div>
      <div className="w-full grid md:hidden grid-cols-1 items-start gap-8 pt-12 relative z-[5]">
        {/* Mobile View */}
        {mobileRoadmaps.map(({ title, desc }, index) => (
          <div key={index} className="flex gap-3 justify-start">
            <div className="bg-primary h-7 w-7 sm:w-8 sm:h-8 lg:w-12 lg:h-12 rounded-r-full grid place-items-center shrink-0">
              <span className="sm:text-xl lg:text-3xl font-bold -ml-1">
                {index + 1}
              </span>
            </div>
            <div className="border border-borderColor p-4 rounded-[10px] max-w-[420px]">
              <div className="font-bold mb-4">{title}</div>
              <ul className="text-xs font-medium space-y-2">
                {desc.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadMap;
