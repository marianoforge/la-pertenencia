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
        "flex flex-col sm:flex-row items-start gap-0 sm:h-[140px] lg:h-[150px] lg:w-[730px]",
        className,
      )}
    >
      {/* Image */}
      <img
        alt={imageAlt}
        className="w-full h-40 object-cover sm:w-40 sm:min-h-[160px] lg:w-56 lg:min-h-[180px]"
        src={image}
      />

      {/* Content */}
      <div className="w-full flex flex-col justify-start items-start gap-4 sm:gap-6 p-4 lg:p-5">
        {/* Title and Description */}
        <div className="flex flex-col justify-start items-start gap-1 sm:gap-2">
          <div className="text-neutral-900 text-sm font-semibold font-['Lora'] uppercase tracking-[3px] lg:text-base lg:tracking-[4px]">
            {title}
          </div>
          <div className="text-yellow-700 text-sm font-normal font-['Lora'] tracking-wide lg:text-base">
            {description}
          </div>
        </div>

        {/* Metadata */}
        <div className="flex justify-start items-start gap-1 lg:flex-row lg:gap-5">
          {/* Date and Time */}
          <div className="flex justify-start items-center gap-1">
            <svg
              className="w-4 h-4 lg:w-5 lg:h-5"
              fill="none"
              viewBox="0 0 20 20"
            >
              <rect
                fill="none"
                height="12"
                rx="1"
                stroke="#B45309"
                strokeWidth="1.5"
                width="14"
                x="3"
                y="4"
              />
              <path
                d="M8 2v4M12 2v4"
                stroke="#B45309"
                strokeLinecap="round"
                strokeWidth="1.5"
              />
              <path d="M3 8h14" stroke="#B45309" strokeWidth="1.5" />
            </svg>
            <div className="text-neutral-500 text-sm font-normal font-['Lora'] tracking-wide lg:text-base">
              {date}, {time}
            </div>
          </div>

          {/* Location */}
          <div className="flex justify-start items-center gap-1">
            <svg
              className="w-4 h-4 lg:w-5 lg:h-5"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 2C6.686 2 4 4.686 4 8c0 5.25 6 8 6 8s6-2.75 6-8c0-3.314-2.686-6-6-6z"
                fill="none"
                stroke="#B45309"
                strokeWidth="1.5"
              />
              <circle
                cx="10"
                cy="8"
                fill="none"
                r="2"
                stroke="#B45309"
                strokeWidth="1.5"
              />
            </svg>
            <div className="text-neutral-500 text-sm font-normal font-['Lora'] tracking-wide lg:text-base">
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
