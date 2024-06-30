import { ArrowRightFromLine } from "lucide-react";
import { Link } from "react-router-dom";
import AddCourse from "./AddCourse";

const Courses = () => {
    return (
        <div className="container px-6 mx-auto grid">
            <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                আমার কোর্সসমূহ
            </h2>
            {/* Add Course */}
            <AddCourse />
            <div className="grid gap-10 mb-8 md:grid-cols-2">
                <div className="max-w-md overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-4">
                        <div className="flex gap-2 ">
                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-500 px-2 py-1 text-xs font-semibold text-white mr-3"> ব্যাচ ২ </span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-500 px-2 py-1 text-xs font-semibold text-white"> অনগোয়িং </span>
                        </div>
                        <div className="mt-5">
                            <h3 className="text-xl font-medium text-gray-900 mt-5">ওয়েব ডিজাইন (Web Design & Development)</h3>
                        </div>
                        <div>
                            <Link to='/dashboard/course-details' className="hover:bg-slate-500 w-full flex items-center justify-center bg-black text-white py-2 rounded-md mt-4">
                                এগিয়ে যাই <ArrowRightFromLine className="ml-3" />
                            </Link>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Courses;