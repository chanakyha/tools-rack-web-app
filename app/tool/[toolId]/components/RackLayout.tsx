"use client";

import { useEffect } from "react";

interface RackLayoutProps {
  currentLocation: string;
}

export const RackLayout = ({ currentLocation }: RackLayoutProps) => {
  useEffect(() => {
    const element = document.getElementById(`rack-${currentLocation}`);
    if (element) {
      // Using parentElement to scroll the container instead of the whole page
      const container = document.querySelector(".rack-container");
      if (container) {
        const elementTop = element.offsetTop;
        const containerHeight = container.clientHeight;
        const scrollPosition =
          elementTop - containerHeight / 2 + element.clientHeight / 2;

        container.scrollTo({
          top: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  }, [currentLocation]);

  return (
    <div className="mb-8 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Rack Layout</h2>
        <div className="rack-container h-[600px] overflow-y-auto mb-4">
          <div className="flex justify-between gap-4">
            {/* Left side racks */}
            <div className="grid grid-cols-1 gap-4 flex-1">
              {Array.from({ length: 20 }, (_, i) => {
                const position = (40 - i).toString();
                const isCurrentLocation = position === currentLocation;
                return (
                  <div
                    key={position}
                    id={`rack-${position}`}
                    className={`
                      border-2 p-4 text-center rounded
                      ${
                        isCurrentLocation
                          ? "border-blue-500 bg-blue-100 animate-pulse"
                          : "border-gray-200"
                      }
                    `}
                  >
                    <span
                      className={`
                      font-medium
                      ${isCurrentLocation ? "text-blue-700" : "text-gray-700"}
                    `}
                    >
                      {position}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Center pathway with indicators */}
            <div className="flex flex-col w-24">
              <div className="flex-1 bg-gray-100 rounded-t-lg"></div>
              {/* Pathway indicators */}
              <div className="bg-gray-200 p-2 rounded-b-lg">
                <div className="flex justify-center items-center space-x-2">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-600">←</span>
                    <span className="text-xs text-gray-500 ml-1">21-40</span>
                  </div>
                  <div className="h-8 w-px bg-gray-300"></div>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 mr-1">1-20</span>
                    <span className="text-sm font-medium text-gray-600">→</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side racks */}
            <div className="grid grid-cols-1 gap-4 flex-1">
              {Array.from({ length: 20 }, (_, i) => {
                const position = (20 - i).toString();
                const isCurrentLocation = position === currentLocation;
                return (
                  <div
                    key={position}
                    id={`rack-${position}`}
                    className={`
                      border-2 p-4 text-center rounded
                      ${
                        isCurrentLocation
                          ? "border-blue-500 bg-blue-100 animate-pulse"
                          : "border-gray-200"
                      }
                    `}
                  >
                    <span
                      className={`
                      font-medium
                      ${isCurrentLocation ? "text-blue-700" : "text-gray-700"}
                    `}
                    >
                      {position}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Legend/Indicators */}
        <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 border-2 border-blue-500 bg-blue-100 rounded"></div>
            <span className="text-sm text-gray-600">Current Location</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-100 rounded"></div>
            <span className="text-sm text-gray-600">Pathway</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 border-2 border-gray-200 rounded"></div>
            <span className="text-sm text-gray-600">Rack Position</span>
          </div>
        </div>
      </div>
    </div>
  );
};
