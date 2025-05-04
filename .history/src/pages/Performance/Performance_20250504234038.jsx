/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import AssingPerformance from "./AssingPerformance";
import ProgressBar from "./ProgressBar";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "lucide-react";

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
  const [sId, setSId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [batch, setBatch] = useState("");
  const [courses, setCourses] = useState([]);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    axios.get(`${BASE_URL}/course/data`).then((res) => {
      setCourses(res.data.courses);
    });
  }, [BASE_URL]);

  const onSubmit = (data) => {
    setSId(data.s_id);
    setCourseName(data.course_name);
    setBatch(data.batch_no);
  };

  useEffect(() => {
    if (!sId || !courseName || !batch) return;

    setLoading(true);

    const fetchData = async () => {
      try {
        const [assignmentSubmitted, courseAssignment, presence, payment, submittedAssignments, paymentHistory] = await Promise.all([
          axios.get(`${BASE_URL}/student/total/assingment/${sId}`),
          axios.get(`${BASE_URL}/student/total/assingment/course/${courseName}/${batch}`),
          axios.get(`${BASE_URL}/student/total/present/absent/${sId}`),
          axios.get(`${BASE_URL}/student/payment/${sId}`),
          axios.get(`${BASE_URL}/student/assingment/${sId}`),
          axios.get(`${BASE_URL}/student/payment/history/${sId}`),
        ]);

        setTotalAssignmentsSubmitted(assignmentSubmitted.data.total);
        setTotalCourseAssignment(courseAssignment.data.total);
        setTotalPresence(presence.data.total);
        setTotalPayment(payment.data.total);
        setAssinments(submittedAssignments.data);
        setPayments(paymentHistory.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sId, courseName, batch, BASE_URL]);

  return (
    <>
      <div className="container px-6 mx-auto grid">
        <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Performance
        </h2>
        <div className="flex mb-6 flex-1 lg:mr-32 ">
          <div className="rounded-md relative w-full  mr-6 focus-within:text-dark-blue-500">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block mt-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Course Name</span>
                    <select
                      {...register("course_name", { required: true })}
                      className="block w-full mt-1 text-sm form-select"
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
                      className="block w-full mt-1 text-sm form-input"
                      placeholder="Batch"
                      type="number"
                    />
                  </label>
                </div>
                <div>
                  <label className="block text-sm mt-4">
                    <span className="text-gray-700 dark:text-gray-400">Student ID</span>
                    <input
                      {...register("s_id", { required: true })}
                      className="block w-full mt-1 text-sm form-input"
                      placeholder="STU752918"
                      type="text"
                    />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="block w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700"
              >
                Find Student
              </button>
            </form>
          </div>
        </div>
      </div>

      {sId && (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Performance</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Present" value={totalPresence} color="blue" icon="fa-credit-card" />
            <StatCard title="Submitted Assignments" value={totalAssignmentsSubmitted} color="green" icon="fa-tasks" />
            <StatCard title="Total Assignments" value={totalCourseAssignment} color="purple" icon="fa-user-check" />
            <StatCard title="Total Payment" value={`${totalPayment} ৳`} color="yellow" icon="fa-chart-line" />
          </div>

          <DataTable title="Submitted Assignment Details" columns={["Assignment Name", "Module Name", "Marks"]} rows={assinments.map(a => [a.a_name, a.m_name, `${a.ex_1} / 10`])} />
          <DataTable title="Payment History" columns={["Date", "Amount"]} rows={payments.map(p => [p.date, `${p.payment} ৳`])} className="mt-10" />
        </div>
      )}
    </>
  );
};

const StatCard = ({ title, value, color, icon }) => (
  <div className={`bg-white rounded-xl shadow-md p-6 border-l-4 border-${color}-500`}>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 font-medium">{title}</p>
        <h2 className="text-3xl font-bold mt-2">{value}</h2>
      </div>
      <div className={`bg-${color}-100 p-3 rounded-lg`}>
        <i className={`fas ${icon} text-${color}-500 text-xl`}></i>
      </div>
    </div>
  </div>
);

const DataTable = ({ title, columns, rows, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-md overflow-hidden ${className}`}>
    <div className="px-6 py-4 border-b border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col, i) => (
              <th key={i} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default Performance;
