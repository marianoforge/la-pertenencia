import React from "react";

import { cn } from "@/lib/utils";

interface EventCardProps {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  imageAlt: string;
  className?: string;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  description,
  date,
  time,
  location,
  image,
  imageAlt,
  className,
}) => {
  return (
    <div
      className={cn(
        "bg-neutral-50 rounded-lg outline outline-1 outline-offset-[-1px] outline-amber-300 overflow-hidden",
        // Mobile: layout vertical, SM+: layout horizontal
        "flex flex-col sm:flex-row items-start gap-0 sm:gap-5 md:gap-6 lg:gap-6",
        className,
      )}
    >
      {/* Image */}
      <img
        alt={imageAlt}
        className="w-full h-56 sm:w-28 sm:h-28 md:w-36 md:h-44 object-cover flex-shrink-0"
        src={image}
      />

      {/* Content */}
      <div className="w-full flex flex-col justify-start items-start gap-2 p-2.5 sm:p-0 sm:py-4 sm:pr-5 md:pr-7 lg:pr-0">
        {/* Title and Description */}
        <div className="pt-[5px] pb-3 flex flex-col justify-start items-start gap-4">
          <div className="text-neutral-900 text-sm md:text-base font-semibold font-['Lora'] uppercase tracking-[3.50px] md:tracking-[4px]">
            {title}
          </div>
          <div className="text-yellow-700 text-sm md:text-base font-normal font-['Lora'] tracking-wide sm:w-full md:w-[515px] lg:w-[515px]">
            {description}
          </div>
        </div>

        {/* Metadata */}
        <div className="pb-[5px] flex justify-start items-center gap-3 sm:gap-5 flex-wrap">
          {/* Date */}
          <div className="flex justify-start items-center gap-[5px]">
            <div className="w-5 h-5 relative">
              <div className="w-4 h-4 left-[3px] top-[3.74px] absolute outline outline-[1.65px] outline-offset-[-0.83px] outline-yellow-700" />
              <div className="w-4 h-0 left-[3px] top-[8.97px] absolute outline outline-[1.65px] outline-offset-[-0.83px] outline-yellow-700" />
              <div className="w-0 h-1 left-[14.33px] top-[2px] absolute outline outline-[1.65px] outline-offset-[-0.83px] outline-yellow-700" />
              <div className="w-0 h-1 left-[7.36px] top-[2px] absolute outline outline-[1.65px] outline-offset-[-0.83px] outline-yellow-700" />
            </div>
            <div className="text-neutral-500 text-xs md:text-base font-normal font-['Lora'] tracking-wide">
              {date}
            </div>
          </div>

          {/* Time */}
          <div className="flex justify-start items-center gap-[5px]">
            <div className="w-5 h-5 relative">
              <div className="w-4 h-4 left-[2px] top-[2.31px] absolute outline outline-[1.65px] outline-offset-[-0.83px] outline-yellow-700" />
              <div className="w-1 h-2 left-[10.99px] top-[5.90px] absolute outline outline-[1.65px] outline-offset-[-0.83px] outline-yellow-700" />
            </div>
            <div className="text-neutral-500 text-xs md:text-base font-normal font-['Lora'] tracking-wide">
              {time}
            </div>
          </div>

          {/* Location */}
          <div className="flex justify-start items-center gap-1">
            <div className="w-5 h-5 relative">
              <div className="w-3.5 h-5 left-[4px] top-[2.31px] absolute outline outline-[1.65px] outline-offset-[-0.83px] outline-yellow-700" />
              <div className="w-1.5 h-1.5 left-[8.52px] top-[6.83px] absolute outline outline-[1.65px] outline-offset-[-0.83px] outline-yellow-700" />
            </div>
            <div className="text-neutral-500 text-xs md:text-base font-normal font-['Lora'] tracking-wide">
              {location}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { EventCard };
export type { EventCardProps };
