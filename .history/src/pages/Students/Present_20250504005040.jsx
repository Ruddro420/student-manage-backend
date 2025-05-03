/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import axios from "axios";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Present = ({ data, reloadData }) => {
    const [studentData, setStudentData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [attendanceStatus, setAttendanceStatus] = useState({});
    const [date, setDate] = useState('');
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const getStudentData = () => {
        axios
            .get(`${BASE_URL}/account/data`)
            .then(function (response) {
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
    };

    useEffect(() => {
        getStudentData();
    }, [BASE_URL, data.course_name, data.batch_no]);

    const presentData = (id, courseId) => {
        if (!date) {
            toast.error("Please select a date!");
            return;
        }

        axios
            .post(`${BASE_URL}/student/present/absent`, {
                s_id: id,
                date: date,
                status: 1,
            })
            .then((res) => {
                toast.success(id + " marked Present!");
                setAttendanceStatus(prev => ({ ...prev, [id]: 'present' }));
                getStudentData();
            })
            .catch((error) => {
                console.log(error);
                toast.error("Something went wrong!");
            });
    };

    const absentData = (id, courseId) => {
        if (!date) {
            toast.error("Please select a date!");
            return;
        }

        axios
            .post(`${BASE_URL}/student/present/absent`, {
                s_id: id,
                date: date,
                status: 0,
            })
            .then((res) => {
                toast.success(id + " marked Absent!");
                setAttendanceStatus(prev => ({ ...prev, [id]: 'absent' }));
                getStudentData();
            })
            .catch((error) => {
                console.log(error);
                toast.error("Something went wrong!");
            });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <div className="p-3 border rounded-lg mb-2 mt-5 bg-[#1D2939] text-white">
                    <h1>Students Details</h1>
                </div>
                <div>
                    <input
                        type="date"
                        className="border border-gray-300 rounded-md p-2 mb-4"
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
            </div>

            <div className="w-full px-1 overflow-hidden rounded-lg shadow-xs">
                <div className="w-full overflow-x-auto">
                    <table className="w-full whitespace-no-wrap">
                        <thead>
                            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                <th className="px-4 py-3">নাম</th>
                                <th className="px-4 py-3">ফোন</th>
                                <th className="px-4 py-3">অ্যাকশন</th>
                            </tr>
                        </thead>
                        {studentData?.student?.length > 0 && (
                            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                {studentData.student.map((item) => (
                                    <tr key={item.id} className="text-gray-700 dark:text-gray-400">
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
                                        <td className="w-1/3">
                                            <div className="flex gap-5">
                                                <button
                                                    onClick={() => presentData(item.ex_1, item.courseId)}
                                                    disabled={attendanceStatus[item.ex_1]}
                                                    className={`flex items-center px-5 rounded-md my-3 cursor-pointer p-2 
                                                        ${attendanceStatus[item.ex_1] === 'present'
                                                            ? 'bg-red-600 text-white'
                                                            : 'bg-[#ff2ded] text-white hover:bg-black'
                                                        }`}
                                                >
                                                    <span className="mr-1 hidden lg:block">Present</span>
                                                    <Check />
                                                </button>

                                                <button
                                                    onClick={() => absentData(item.ex_1, item.courseId)}
                                                    disabled={attendanceStatus[item.ex_1]}
                                                    className={`flex items-center px-5 rounded-md my-3 cursor-pointer p-2 
                                                        ${attendanceStatus[item.ex_1] === 'absent'
                                                            ? 'bg-red-600 text-white'
                                                            : 'bg-[#12b76A] text-white hover:bg-black'
                                                        }`}
                                                >
                                                    <span className="mr-1 hidden lg:block text-sm lg:text-current">Absent</span>
                                                    <X />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Present;
