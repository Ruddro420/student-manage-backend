import { useParams } from "react-router-dom";
import CourseTab from "./CourseTab";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import Spin from "../../components/Loader/Spin";

const CourseDetails = () => {
  const params = useParams();
  const { id } = params;
  const axiosSecure = useAxiosSecure();
  const [course, setCourese] = useState(null);

  useEffect(() => {
    axiosSecure
      .get(`/courses/${id}`)
      .then((res) => {
        console.log(res.data);
        setCourese(res.data);
      })
      .then((res) => {
        // console.log(res.data)
        setCourese(res.data);
      });
  }, [axiosSecure, id]);
  console.log(course)
  const updateData = () => {
    axiosSecure.get(`/courses/${id}`).then((res) => {
      console.log(res.data);
      setCourese(res.data);
    });
  };
  return (
    
    <>
      {course ? (
        <div className="container px- lg:px-6 mx-auto grid">
          <h2 className="my-6 lg:px-0 px-4 text-2xl font-semibold text-gray-700 dark:text-gray-200">
            {course.title}
          </h2>
          {/* Course Tab */}
          <CourseTab course={course} updateData={updateData} />
        </div>
      ) : (
        <span>
          <Spin />
        </span>
      )}
    </>
  );
};

export default CourseDetails;
