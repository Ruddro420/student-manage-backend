import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

const SingleStudentDetails = () => {
    return (
        <div className="container px-6 mx-auto grid">
            <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Student Name
            </h2>
            {/* Module Base Data Show */}
            <div>
                <div className="p-3 border rounded-lg mb-2 mt-5 bg-[#1D2939] text-white">
                    <h1>মডিউল ১ </h1>
                </div>
                <div className="w-full overflow-hidden rounded-lg shadow-xs">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full whitespace-no-wrap">
                            <thead>
                                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                    <th className="px-4 py-3">এসাইনমেন্ট নাম</th>
                                    <th className="px-4 py-3">স্কোর</th>
                                    <th className="px-4 py-3">দেখুন</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                <tr className="text-gray-700 dark:text-gray-400">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center text-sm">
                                            <div>
                                                <p className="font-semibold">Ali</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        ১০
                                    </td>
                                    <Link className="px-4 py-3 text-sm flex items-center bg-[#F3F4F6] cursor-pointer w-1/3 rounded m-2 hover:bg-slate-400" to='/dashboard/single-student-details/'>
                                        <td >
                                            <div className="flex items-center">
                                                <span className="mr-1">চেক করুন</span>
                                                <Eye />
                                            </div>
                                        </td>
                                    </Link>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default SingleStudentDetails;