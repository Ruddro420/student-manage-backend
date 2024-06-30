
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CourseSummaryTab from "./CourseSummaryTab";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ClassSummary = () => {
    const id = useParams();
    const [data, setData] = useState([])
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        axiosSecure.get(`/courses/modules/${id.id}`)
            .then(res => {
                setData(res.data)
            })
    }, [axiosSecure, id])


    return (
        <>
            <div className="w-full overflow-hidden bg-white shadow border-2 border-[#E5E7EB] border-transparent">
                <div className="p-4">
                    <div className="flex items-center">
                        <div className="bg-[#12B76A] text-white px-3 py-1 text-center inline-block rounded-lg">
                            <h3 className="text-xl">মডিউল</h3>
                            <h2 className="text-xl font-extrabold">{data.id}</h2>
                        </div>
                        <div>
                            <h3 className="text-2xl text-gray-900 font-extrabold text-left ml-3">{data.title}</h3>
                        </div>
                    </div>
                </div>
            </div>
            {/* Study Plan */}
            <div>
                <h3 className="text-2xl text-gray-900 font-extrabold text-left ml-3 mt-5">স্টাডি প্ল্যান</h3>
            </div>
            {/* Course Summary Tab */}
            <CourseSummaryTab data={data} />
        </>
    );
};

export default ClassSummary;