/* eslint-disable react/prop-types */
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

import axios from "axios";

import PayementModel from "../../components/Modal/PayementModel";

// eslint-disable-next-line react/prop-types
const Payment = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState();
    const [studentData, setStudentData] = useState([]);
    const [loading, setLoading] = useState(true);

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
    // Modal function
    const modalHandler = (id) => {
        setIsOpen(true);
        setModalData(id);
    };

    return (
        <>
            <div className="container px-6 mx-auto grid">
                <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                    <h1>Students Details</h1>
                </h2>

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
                                                <button
                                                    className="px-2 py-3 text-sm flex items-center justify-between dark:bg-gray-800 dark:text-white border  bg-[#F3F4F6] cursor-pointer w-[100px] rounded m-2 hover:bg-slate-400"
                                                    onClick={() => modalHandler(studentData.student)}
                                                >
                                                    <td>
                                                        <div className="flex items-center">
                                                            <span className="mr-1">চেক করুন</span>
                                                            <Eye />
                                                        </div>
                                                    </td>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>

                <PayementModel
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    modalData={modalData}
                />
            </div>
        </>
    );
};

export default Payment;
