/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { ArrowRightFromLine } from "lucide-react";
import { Link } from "react-router-dom";
import AddCourse from "./AddCourse";
import { Delete, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../../components/Loader/Loader";

const Courses = () => {
  const [courses, setCoures] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    axios.get(`${BASE_URL}/course/data`).then((res) => {
      setCoures(res.data.courses);
      setLoading(false);
    });
  }
  
  useEffect(() => {
    loadData()
  }, [loadData]);

  // delete data
  const deleteData = (id) => {
    if (window.confirm("Are you sure you want to delete this ?")) {
      axios.get(`${BASE_URL}/course/delete/${id}`).then(() => {
        setLoading(false);
        toast.success("Delete Successfully")
        loadData()
      })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }
  }

  return (
    <>
      {loading ? <Loader /> : (
        <div className="container px-6 mx-auto grid">
          <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
            আমার কোর্সসমূহ
          </h2>

          <AddCourse updateData={loadData} />
          <div className="grid gap-10 mb-8 md:grid-cols-3">
            {
              courses?.map(course => {
                return (

                  <div
                    key={course.id}
                    className="max-w-md overflow-hidden rounded-lg  dark:bg-gray-800 bg-white shadow"
                  >
                    <div className="p-4">
                      <div className="flex gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-500 px-2 py-1 text-xs font-bold text-white mr-3">
                          ব্যাচ - {course.batch_no}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-500 px-2 py-1 text-xs font-semibold text-white">
                          {course.batch_status}
                        </span>
                      </div>
                      <div className="mt-5">
                        <h3 className="text-xl font-medium dark:text-white text-gray-900 mt-5">
                          {course.course_name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/dashboard/course-details/${course.id}`}
                          className="w-full flex items-center justify-center hover:bg-slate-500 dark:hover:bg-black dark:bg-slate-500  bg-black text-white py-2 rounded-md"
                        >
                          এগিয়ে যাই <ArrowRightFromLine className="ml-3" />
                        </Link>
                        <button
                          onClick={() => deleteData(course.id)}
                          className="items-center flex w-full text-center justify-center hover:bg-red-500 dark:hover:bg-black dark:bg-red-500  bg-black text-white py-2 rounded-md"><Trash /></button>
                      </div>
                    </div>
                  </div>

                )
              })
            }
          </div>
        </div>
      )}
    </>
  );
};

export default Courses;
