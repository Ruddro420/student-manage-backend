import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Spin from "../../components/Loader/Spin";
import axios from "axios";
import CourseTab from "./CourseTab";

const CourseDetails = () => {
  const params = useParams();
  const { id } = params;
  const [course, setCourese] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;


// load data
  useEffect(() => {
    axios.get(`${BASE_URL}/course/show/${id}`)
      .then((res) => {
        setCourese(res.data.course);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }, []);

  return (

    <>
      {course ? (
        <div className="container px- lg:px-6 mx-auto grid">
          <h2 className="my-6 lg:px-0 px-4 text-2xl font-semibold text-gray-700 dark:text-gray-200">
            {course.course_name}
          </h2>
          <CourseTab course={course} /* updateData={updateData} */ />
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
