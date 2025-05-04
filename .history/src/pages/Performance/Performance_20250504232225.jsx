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

  const [totalAssignmentsSubmitted, setTotalAssignmentsSubmitted] = useState(0);
  const [totalCourseAssignment, setTotalCourseAssignment] = useState(0);
  const [totalPresence, setTotalPresence] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [assinments, setAssinments] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  // load course data
  // get data from 
  const [sId,setSId] = useState("");
  
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
    setSId(data.s_id);

  };


  // Get module data
  useEffect(() => {

    /* total submited assignment */
    axios
      .get(`${BASE_URL}/student/total/assingment/${student.ex_1}`)
      .then(function (response) {
        console.log(response);

        setTotalAssignmentsSubmitted(response.data.total);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });

    /* total assignment */
    axios
      .get(`${BASE_URL}/student/total/assingment/course/${student.course_name}/${student.batch_no}`)
      .then(function (response) {
        console.log(response);

        setTotalCourseAssignment(response.data.total);
        console.log(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });


    /* total present */
    axios
      .get(`${BASE_URL}/student/total/present/absent/${student.ex_1}`)
      .then(function (response) {
        console.log(response);

        setTotalPresence(response.data.total);
        console.log(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });

      /* Total Payment */
    axios
      .get(`${BASE_URL}/student/payment/${student.ex_1}`)
      .then(function (response) {
        console.log(response);

        setTotalPayment(response.data.total);
        console.log(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });

    axios
      .get(`${BASE_URL}/student/assingment/${student.ex_1}`)
      .then(function (response) {
        console.log(response);

        setAssinments(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });

    axios
      .get(`${BASE_URL}/student/payment/history/${student.ex_1}`)
      .then(function (response) {
        console.log(response);

        setPayments(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });



  }, [BASE_URL]);

  return (
    <div className="container px-6 mx-auto grid">
      <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        পারফর্মেন্স
      </h2>
      <div className="flex mb-6 flex-1 lg:mr-32 ">
        <div className=" rounded-md relative w-full  mr-6 focus-within:text-purple-500">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">

            <div className="search-controller grid grid-cols-3 gap-4">
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
              <div>
                <label className="block text-sm mt-4">
                  <span className="text-gray-700 dark:text-gray-400">Student ID</span>
                  <input
                    {...register("batch_no", { required: true })}
                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    placeholder="STU752918"
                    type="number"
                    name="s_id"
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            >
              Find Student
            </button>

          </form>
        </div>
      </div>
      
    </div>
  );
};

export default Performance;
