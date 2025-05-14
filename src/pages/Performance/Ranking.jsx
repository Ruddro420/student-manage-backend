/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import AssingPerformance from "./AssingPerformance";
import ProgressBar from "./ProgressBar";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "lucide-react";
import Loader from "../../components/Loader/Loader";

const convertToBengali = (num) => {
    const bengaliNumerals = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return num.toString().replace(/\d/g, (digit) => bengaliNumerals[digit]);
};

const Ranking = () => {
    const [courseLoading, setCourseLoading] = useState(true);
    const [loading, setLoading] = useState(null);
    const [courses, setCourses] = useState([]);

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const { register, handleSubmit } = useForm();
    const [ranks, setRanks] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/course/data`).then((res) => {
            setCourses(res.data.courses);
            setCourseLoading(false);
        });
    }, [BASE_URL]);/* -- */

    const onSubmit = (data) => {
        setLoading(true);
        const { course_name, batch_no } = data;
        axios
            .get(`${BASE_URL}/student/total/assingment/number/${course_name}/${batch_no}`)
            .then((res) => {
                setRanks(res.data);
                setLoading(false);
                console.log(ranks);

            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    };


    return (
        <>
            {courseLoading ? <Loader /> : <>
                <div className="container px-6 mx-auto grid">
                    <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                        Ranking
                    </h2>
                    <div className="flex mb-6 flex-1 lg:mr-32 ">
                        <div className="rounded-md relative w-full  mr-6 focus-within:text-dark-blue-500">
                            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block mt-4 text-sm">
                                            <span className="text-gray-700 dark:text-gray-400">Course Name</span>
                                            <select
                                                {...register("course_name", { required: true })}
                                                className="block w-full mt-1 text-sm form-select"
                                            >
                                                <option>Select Course</option>
                                                {courses?.map((course) => (
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
                                </div>

                                <button
                                    type="submit"
                                    className="block w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                                >
                                    View Ranks
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            
                {loading==true? <Loader/>: loading==null || ranks?.students?.length == 0?(<>
                <div className="container mx-auto px-6 py-8 text-center">
                    <h1 className="text-3xl font-bold text-white mb-8">No Data Found</h1>
                </div>
                
                </>): (
                    <div className="container mx-auto px-4 py-8">
                        <h1 className="text-3xl font-bold text-white mb-8">All Ranks</h1>

                        <DataTable title="Assignment Rankings" columns={["ID", "Name", "Total Number"]} rows={ranks?.students?.map(student => [student.s_id, student.s_name, student.total_ex_1])} className="mt-10" />
                    </div>
                )}
            </>}
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

export default Ranking;
