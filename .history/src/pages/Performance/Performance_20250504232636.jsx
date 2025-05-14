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
  const [sId, setSId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [batch, setBatch] = useState("");

  // get course data
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
    setCourseName(data.course_name);
    setBatch(data.batch_no);

  };


  // Get module data
  useEffect(() => {

    /* total submited assignment */
    axios
      .get(`${BASE_URL}/student/total/assingment/${sId}`)
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
      .get(`${BASE_URL}/student/total/assingment/course/${courseName}/${batch}`)
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
      .get(`${BASE_URL}/student/total/present/absent/${sId}`)
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
      .get(`${BASE_URL}/student/payment/${sId}`)
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
      .get(`${BASE_URL}/student/assingment/${sId}`)
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
      .get(`${BASE_URL}/student/payment/history/${sId}`)
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
    <>

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

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">পারফর্মেন্স</h1>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 font-medium">Total Present</p>
                <h2 className="text-3xl font-bold mt-2">{totalPresence}</h2>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <i className="fas fa-credit-card text-blue-500 text-xl"></i>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-green-500 flex items-center">

              </span>

            </div>
          </div>


          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 font-medium">Total Submit Assignments</p>
                <h2 className="text-3xl font-bold mt-2">{totalAssignmentsSubmitted}</h2>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <i className="fas fa-tasks text-green-500 text-xl"></i>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-green-500 flex items-center">

              </span>

            </div>
          </div>


          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 font-medium">Total Course Assignments</p>
                <h2 className="text-3xl font-bold mt-2">{totalCourseAssignment}</h2>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <i className="fas fa-user-check text-purple-500 text-xl"></i>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-red-500 flex items-center">

              </span>

            </div>
          </div>


          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 font-medium">Total Payment</p>
                <h2 className="text-3xl font-bold mt-2">{totalPayment} ৳</h2>
                <div className="flex mt-1">
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star-half-alt text-yellow-400"></i>
                </div>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <i className="fas fa-chart-line text-yellow-500 text-xl"></i>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-green-500 flex items-center">

              </span>

            </div>
          </div>


        </div>



        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Submited Assignment Details</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>

                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {assinments.map((assignment, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">JD</div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{assignment.a_name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{assignment.m_name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{assignment.ex_1}</div>
                      <div className="text-sm text-gray-500">Out of 10</div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        {/* Payment History */}
        <div className="mt-10 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Payment History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ammount</th>

                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payments.map((payment, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">JD</div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{payment.date}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{payment.payment} ৳</div>
                    </td>

                  </tr>
                ))}

              </tbody>
            </table>
          </div>

        </div>


      </div>


    </>
  );
};

export default Performance;
