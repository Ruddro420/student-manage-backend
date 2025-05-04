/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const Performance = () => {
  const [totalAssignmentsSubmitted, setTotalAssignmentsSubmitted] = useState(0);
  const [totalCourseAssignment, setTotalCourseAssignment] = useState(0);
  const [totalPresence, setTotalPresence] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [assignments, setAssignments] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sId, setSId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [batch, setBatch] = useState("");
  const [courses, setCourses] = useState([]);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/course/data`)
      .then((res) => setCourses(res.data.courses))
      .catch((error) => console.error("Error fetching courses:", error));
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
        const [
          assignmentsSubmittedRes,
          courseAssignmentsRes,
          presenceRes,
          paymentRes,
          assignmentsRes,
          paymentsRes,
        ] = await Promise.all([
          axios.get(`${BASE_URL}/student/total/assignment/${sId}`),
          axios.get(`${BASE_URL}/student/total/assignment/course/${courseName}/${batch}`),
          axios.get(`${BASE_URL}/student/total/present/absent/${sId}`),
          axios.get(`${BASE_URL}/student/payment/${sId}`),
          axios.get(`${BASE_URL}/student/assignment/${sId}`),
          axios.get(`${BASE_URL}/student/payment/history/${sId}`),
        ]);

        setTotalAssignmentsSubmitted(assignmentsSubmittedRes.data.total);
        setTotalCourseAssignment(courseAssignmentsRes.data.total);
        setTotalPresence(presenceRes.data.total);
        setTotalPayment(paymentRes.data.total);
        setAssignments(assignmentsRes.data);
        setPayments(paymentsRes.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sId, courseName, batch, BASE_URL]);

  return (
    <div className="container px-6 mx-auto">
      <h2 className="my-6 text-2xl font-semibold text-gray-700">Performance</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-4 mb-6">
        <select {...register("course_name", { required: true })} defaultValue="">
          <option value="" disabled>Select Course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.course_name}>
              {course.course_name}-{course.batch_no}
            </option>
          ))}
        </select>

        <input {...register("batch_no", { required: true })} type="number" placeholder="Batch No" />
        <input {...register("s_id", { required: true })} type="text" placeholder="Student ID" />
        <button type="submit" className="col-span-3 bg-purple-600 text-white py-2 rounded">Find Student</button>
      </form>

      {sId && (
        loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded shadow p-4">
              <p>Total Present</p>
              <h3 className="text-xl font-bold">{totalPresence}</h3>
            </div>
            <div className="bg-white rounded shadow p-4">
              <p>Assignments Submitted</p>
              <h3 className="text-xl font-bold">{totalAssignmentsSubmitted}</h3>
            </div>
            <div className="bg-white rounded shadow p-4">
              <p>Course Assignments</p>
              <h3 className="text-xl font-bold">{totalCourseAssignment}</h3>
            </div>
            <div className="bg-white rounded shadow p-4">
              <p>Total Payment</p>
              <h3 className="text-xl font-bold">{totalPayment} ৳</h3>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Performance;
