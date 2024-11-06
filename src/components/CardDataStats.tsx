import React, { ReactNode } from "react";

interface CardDataStatsProps {
  title: string;
  total: string;
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
}) => {
  return (
    <div className="rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-lg  transition-colors duration-300">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 ">
        {children}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-3xl font-semibold text-gray-900 ">
            {total}
          </h4>
          <span className="text-md font-medium text-gray-500 ">
            {title}
          </span>
        </div>

        <span
          className={`flex items-center gap-1 text-md font-medium ${
            levelUp ? "text-green-500" : levelDown ? "text-red-500" : "text-gray-500"
          }`}
        >
          {rate}
          {levelUp && (
            <svg
              className="fill-current text-green-500"
              width="12"
              height="12"
              viewBox="0 0 10 10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 0l5 5H0l5-5z" />
            </svg>
          )}
          {levelDown && (
            <svg
              className="fill-current text-red-500"
              width="12"
              height="12"
              viewBox="0 0 10 10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 10L0 5h10L5 10z" />
            </svg>
          )}
        </span>
      </div>
    </div>
  );
};

export default CardDataStats;
