/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import AssingPerformance from "./AssingPerformance";
import ProgressBar from "./ProgressBar";
import axios from "axios";

// Utility function to convert numbers to Bengali
const convertToBengali = (num) => {
  const bengaliNumerals = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num.toString().replace(/\d/g, (digit) => bengaliNumerals[digit]);
};

const Performance = () => {
  const [kcal, setKcal] = useState(80);
  const [steps, setSteps] = useState(60);
  const [km, setKm] = useState(90);

  const [courses, setCourses] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
   // Load course data
   useEffect(() => {
    axios.get(`${BASE_URL}/course/data`).then((res) => {
      setCourses(res.data.courses);
    });
  }, [BASE_URL]);

  return (
    <div className="container px-6 mx-auto grid">
      <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        পারফর্মেন্স
      </h2>
      <div className="flex mb-6 flex-1 lg:mr-32 ">
        <div className="border rounded-md relative w-full max-w-xl mr-6 focus-within:text-purple-500">
         {/*  <div className="absolute inset-y-0 flex items-center pl-2 ">
            <svg
              className="w-4 h-4 text-purple-500"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div> */}
          <input
            className="w-full pl-8 pr-2 text-sm text-gray-700  placeholder-gray-600 bg-gray-100 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 focus:text-black dark:text-white focus:placeholder-gray-500 focus:bg-white focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input"
            type="text"
            required
            placeholder="Search student by phone"
            aria-label="Search"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Side */}
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 justify-between ">
          <div className="mt-3">
            <AssingPerformance
              percentage={kcal}
              label={convertToBengali(kcal)}
              unit="%"
              color="#F97066"
              text="হোমওয়ার্ক"
            />
          </div>
          <div className="mt-3">
            <AssingPerformance
              percentage={km}
              label={convertToBengali(km)}
              unit="%"
              color="#FFA36F"
              text="ক্লাস পারফর্মেন্স"
            />
          </div>
          <div className="mt-3">
            <AssingPerformance
              percentage={steps}
              label={convertToBengali(steps)}
              unit="%"
              color="#FFAB00"
              text="এসাইনমেন্ট"
            />
          </div>
        </div>
        {/* Right Side */}
        <div className="shadow p-5 rounded-lg border-2 pb-12 lg:pb-8 mt-3 lg:mb-0 mb-8">
          <div className="mb-5 text-center">
            <h2 className="text-2xl text-[#FE8924] font-extrabold">
              বাহ! আপনি শিয়াল মামার মত এভারেজ।
            </h2>
            <p className="dark:text-white">
              নিজেকে আরেকটু আপগ্রেড করেন, আরেকটু পুশ করেন। আপনার পক্ষে সম্ভব
              বেস্ট হয়ে উঠা।
            </p>
          </div>
          <hr />
          <div className="flex gap-8 md:gap-0 lg:gap-0 justify-between mt-5 flex-wrap ">
            <div>
              <ProgressBar
                percentage={steps}
                color="#12B76A"
                text="সামগ্রিক প্রোগ্রেস"
                label={convertToBengali(steps)}
              />
            </div>
            <div>
              <ProgressBar
                percentage={km}
                color="#9333EA"
                text="ক্লাস উপস্থিতি"
                label={convertToBengali(steps)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;
