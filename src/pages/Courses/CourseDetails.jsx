import { useParams } from "react-router-dom";
import CourseTab from "./CourseTab";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const CourseDetails = () => {
    const params = useParams()
    const { id } = params
    const axiosSecure = useAxiosSecure()
    const [course, setCourese] = useState(null)

    useEffect(() => {
        axiosSecure.get(`/courses/${id}`)
            .then(res => {
                console.log(res.data)
                setCourese(res.data)
            })
        .then(res =>{
            // console.log(res.data)
            setCourese(res.data)
        })
    }, [axiosSecure, id])

    const updateData = () => {
        axiosSecure.get(`/courses/${id}`)
            .then(res => {
                console.log(res.data)
                setCourese(res.data)
            })
    }
    return (
        <>
            {course ? <div className="container px-6 mx-auto grid">
                <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                    {course.title}
                </h2>
                {/* Course Tab */}
                <CourseTab course={course} updateData={updateData} />
            </div> : <span>Loding....[Dev: Replace this with spinner]</span>}
        </>
    );
};

export default CourseDetails;