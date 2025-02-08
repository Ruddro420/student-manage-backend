import { ArrowRightFromLine, Delete, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import AddCourse from "./AddCourse";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { e2b_number, status } from "../../lib/bn";
import toast from "react-hot-toast";

const Courses = () => {
  const [courses, setCoures] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/courses").then((res) => {
      setCoures(res.data);
      setLoading(false);
    });
  }, [axiosSecure]);

  const updateData = () => {
    axiosSecure.get("/courses").then((res) => {
      setCoures(res.data);
      setLoading(false);
    });
  };
  return (
    <div className="container px-6 mx-auto grid">
      <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        আমার কোর্সসমূহ
      </h2>
      {/* Add Course */}
      <AddCourse updateData={updateData} />
      <div className="grid gap-10 mb-8 md:grid-cols-3">
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
                <div className="flex items-center gap-2">
                  <Link
                    to={`/dashboard/course-details/${course.id}`}
                    className="w-full flex items-center justify-center hover:bg-slate-500 dark:hover:bg-black dark:bg-slate-500  bg-black text-white py-2 rounded-md"
                  >
                    এগিয়ে যাই <ArrowRightFromLine className="ml-3" />
                  </Link>
                  <button onClick={() => {
                    alert("Are you sure you want to delete this course?")
                    
                   toast.promise(
                     axiosSecure.delete(`/courses/${course.id}`).then((res) => {
                       updateData();
                     }),
                     {
                       loading: "Deleting...",
                       success: "Deleted successfully!",
                       error: "Error deleting course",
                     }
                   );
                  }} className="items-center flex w-full text-center justify-center hover:bg-red-500 dark:hover:bg-black dark:bg-red-500  bg-black text-white py-2 rounded-md"><Trash/></button>
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
