/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import AssingPerformance from "./AssingPerformance";
import ProgressBar from "./ProgressBar";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "lucide-react";

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
  const { register, handleSubmit, reset } = useForm();
  // Load course data
  useEffect(() => {
    axios.get(`${BASE_URL}/course/data`).then((res) => {
      setCourses(res.data.courses);
    });
  }, [BASE_URL]);

  // submit form data
  const onSubmit = (data) => {
    axios.post(`${BASE_URL}/create/account`, {
      // name: data.name,
      // email: data.email,
      // phone: data.phone,
      // course_name: data.course_name,
      // batch_no: data.batch_no,
      // admission_slip_no: data.admission_slip_no,
      // password: data.password,
      // ex_1: generateStudentId(),
    })
      .then(function () {
        // navigate("/");
      })

  };

  return (
    <div className="container px-6 mx-auto grid">
      <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        পারফর্মেন্স
      </h2>
      <div className="flex mb-6 flex-1 lg:mr-32 ">
        <div className=" rounded-md relative w-full  mr-6 focus-within:text-purple-500">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full grid grid-cols-3 gap-4">

            <div>
              <label className="block mt-4 text-sm">
                <span className="text-gray-700 dark:text-gray-400">Course Name</span>
                <select
                  {...register("course_name", { required: true })}
                  name="course_name"
                  className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                >
                  <option>Select Course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.course_name}>
                      {course.course_name}-{course.batch_no}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div>
              <label className="block text-sm mt-4">
                <span className="text-gray-700 dark:text-gray-400">Batch No.</span>
                <input
                  {...register("batch_no", { required: true })}
                  className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                  placeholder="Batch"
                  type="number"
                  name="batch_no"
                />
              </label>
            </div>

            <button
              type="submit"
              className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            >
              Create account
            </button>

          </form>
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
