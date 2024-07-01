import { ArrowRightFromLine } from "lucide-react";
import { Link } from "react-router-dom";
import AddCourse from "./AddCourse";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { e2b_number, status } from "../../lib/bn";

const Courses = () => {
  const [courses, setCoures] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/courses").then((res) => {
      setCoures(res.data);
      setLoading(false);
    });
  }, [axiosSecure]);
  return (
    <div className="container px-6 mx-auto grid">
      <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        আমার কোর্সসমূহ
      </h2>
      {/* Add Course */}
      <AddCourse />
      <div className="grid gap-10 mb-8 md:grid-cols-2">
        {courses.map((course) => {
          return (
            <div
              key={course.id}
              className="max-w-md overflow-hidden rounded-lg  dark:bg-gray-800 bg-white shadow"
            >
              <div className="p-4">
                <div className="flex gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-500 px-2 py-1 text-xs font-semibold text-white mr-3">
                    ব্যাচ - {e2b_number(course.batch)}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-500 px-2 py-1 text-xs font-semibold text-white">
                    {status[course.status]}
                  </span>
                </div>
                <div className="mt-5">
                  <h3 className="text-xl font-medium dark:text-white text-gray-900 mt-5">
                   {course.title}
                  </h3>
                </div>
                <div>
                  <Link
                    to={`/dashboard/course-details/${course.id}`}
                    className="hover:bg-slate-500 w-full flex items-center justify-center bg-black text-white py-2 rounded-md mt-4"
                  >
                    এগিয়ে যাই <ArrowRightFromLine className="ml-3" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Courses;
