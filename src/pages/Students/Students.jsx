/* eslint-disable react/prop-types */
import { Check, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const Students = ({ data }) => {
  console.log(data);
  return (
    <>
      <div>
        <div className="p-3 border rounded-lg mb-2 mt-5 bg-[#1D2939] text-white">
          <h1>Students Details</h1>
        </div>
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-4 py-3">নাম</th>
                  <th className="px-4 py-3">ফোন</th>
                  <th className="px-4 py-3">দেখুন</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {data.students.map((item) => {
                  return (
                    <>
                      <tr
                        key={item.id}
                        className="text-gray-700 dark:text-gray-400"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center text-sm">
                            <div>
                              <p className="font-semibold">{item.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">{item.phone}</td>

                        <td className=" w-1/3">
                          <div className="flex gap-5">
                            <Link
                              className="px-4 py-3 text-sm flex items-center cursor-pointer rounded m-2 hover:bg-slate-400"
                              to="/dashboard/single-student-details/"
                            >
                              <div className="flex items-center">
                                <span className="mr-1">চেক করুন</span>
                                <Eye />
                              </div>
                            </Link>
                            {item.status == "pending" ? (
                              <div className="flex items-center bg-[#12b76A] text-white px-5 rounded-md my-3 cursor-pointer">
                                <span className="mr-1">এপ্রুভ করুন</span>
                                <Check />
                              </div>
                            ) : (
                              <div className="flex items-center bg-[#ff2ded] text-white px-5 rounded-md my-3 cursor-pointer">
                                <span className="mr-1">পেন্ডিং রাখুন</span>
                                <Check />
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Students;
