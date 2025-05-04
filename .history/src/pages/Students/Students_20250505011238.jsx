/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import axios from "axios";
import { Check, CheckCheckIcon, CheckCircle, Eye, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Students = ({ data, reloadData }) => {
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // update student status
  const statusHandler = (id, courseId) => {
    axios
      .post(`${BASE_URL}/student/update/status/${id}`)
      .then((res) => {
        toast.success("Student status updated successfully!");
        getStudentData();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong!");
      });
  };
  // update student status
  const statusPendingHandler = (id, courseId) => {
    axios
      .post(`${BASE_URL}/student/update/pending/status/${id}`)
      .then((res) => {
        toast.success("Student status updated successfully!");
        getStudentData();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong!");
      });
  };

  // Get student data
  const getStudentData = () => {
    axios
      .get(`${BASE_URL}/account/data`)
      .then(function (response) {
        console.log(response);

        // Filter students based on course_name and batch_no from props
        const filteredStudents = response.data.student.filter(student =>
          student.course_name === data.course_name &&
          student.batch_no === data.batch_no.toString()
        );

        setStudentData({ ...response.data, student: filteredStudents });
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  }


  // Get module data
  useEffect(() => {
    getStudentData();
  }, [BASE_URL, data.course_name, data.batch_no]);


  return (
    <>
      <div>
        <div className="p-3 border rounded-lg mb-2 mt-5 bg-[#1D2939] text-white">
          <h1>Students Details</h1>
        </div>
        <div className="w-full px-1 overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-4 py-3">নাম</th>
                  <th className="px-4 py-3">ফোন</th>
                  <th className="px-4 py-3">আইডি</th>
                  <th className="px-4 py-3">দেখুন</th>
                </tr>
              </thead>
              {studentData?.student?.length != 0 && (
                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                  {studentData?.student?.map((item) => (
                    <tr
                      key={item.id}
                      className="text-gray-700 dark:text-gray-400"
                    >
                      <td className="px-1 lg:px-4 py-3">
                        <div className="flex items-center text-sm">
                          <div className="w-32 lg:w-48">
                            <div className="font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap">
                              {item.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-1 lg:px-4 py-3 text-sm">
                        {item.phone}
                      </td>
                      <td className="px-1 lg:px-4 py-3 text-sm">
                        {item.ex_1}
                      </td>

                      <td className="w-1/3">
                        <div className="flex gap-5">
                          <Link
                            className="px-4 py-3 text-sm flex items-center cursor-pointer rounded m-2 hover:text-black hover:bg-slate-400 bg-[black] text-white"
                            to={`/dashboard/single-student-details/${item.ex_1}`}
                          >
                            <div className="flex items-center">
                              <span className="mr-1 hidden lg:block">
                                চেক করুন
                              </span>
                              <Eye />
                            </div>
                          </Link>
                          {item.status == 0 ? (
                            <div
                              onClick={() =>
                                statusHandler(item.id, item.courseId)
                              }
                              className="flex items-center bg-[#12b76A] text-white px-5 rounded-md my-3 cursor-pointer hover:bg-[black]"
                            >
                              <span className="mr-1 hidden lg:block text-sm lg:text-current">
                                এপ্রুভ করুন
                              </span>
                              <Check />
                            </div>
                          ) : (
                            <div
                              onClick={() =>
                                statusPendingHandler(item.id, item.courseId)
                              }
                              className="flex items-center bg-[#ff2ded] text-white px-5 rounded-md my-3 cursor-pointer"
                            >
                              <span className="mr-1 text-sm lg:text-current hidden lg:block">
                                পেন্ডিং রাখুন
                              </span>
                              <X />
                            </div>
                          )}
                        </div>
                        <span className="mt-3 text-sm lg:text-current items-center bg-black text-white px-5 rounded-md  cursor-pointer p-3">
                         Delete
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Students;
