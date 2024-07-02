/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { Check, CheckCheckIcon, CheckCircle, Eye, X } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Students = ({ data, reloadData }) => {
  const statusHandler = (id, courseId) => {
    const axiosSecure = useAxiosSecure();

    const updateData = {
      studentId: id,
      courseId: courseId,
    };

    console.log(updateData);

    toast.promise(
      axiosSecure
        .post("/confirm", updateData)
        .then(() => reloadData())
        .then((data) => {
          console.log(data);
        }),
      {
        loading: "Updating...",
        success: "Update Successfully",
        error: "Faild Update",
      }
    );
  };
  console.log(data);
  return (
    <>
      <div>
        <div className="tooltip" data-tip="hello">
          <button className="btn">Hover me</button>
        </div>
        <div className="p-3 border rounded-lg mb-2 mt-5 bg-[#1D2939] text-white">
          <h1>Students Details</h1>
        </div>
        <div className="w-full px-1 overflow-hidden rounded-lg shadow-xs">
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
                {data.students.map((item) => (
                  <tr
                    key={item.id}
                    className="text-gray-700 dark:text-gray-400"
                  >
                    <td className="px-1 lg:px-4 py-3">
                      <div className="flex items-center text-sm">
                        <div className="w-32 lg:w-48">
                          <div className="font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap">
                            {item.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-1 lg:px-4 py-3 text-sm">{item.phone}</td>

                    <td className="w-1/3">
                      <div className="flex gap-5">
                        <Link
                          className="px-4 py-3 text-sm flex items-center cursor-pointer rounded m-2 hover:bg-slate-400"
                          to={`/dashboard/single-student-details/${item.id}`}
                        >
                          <div className="flex items-center">
                            <span className="mr-1 hidden lg:block">
                              চেক করুন
                            </span>
                            <Eye />
                          </div>
                        </Link>
                        {item.status === "pending" ? (
                          <div
                            onClick={() =>
                              statusHandler(item.id, item.courseId)
                            }
                            className="flex items-center bg-[#12b76A] text-white px-5 rounded-md my-3 cursor-pointer hover:bg-[black]"
                          >
                            <span className="mr-1 hidden lg:block text-sm lg:text-current">
                              এপ্রুভ করুন
                            </span>
                            <Check />
                          </div>
                        ) : (
                          <div
                            onClick={() =>
                              statusHandler(item.id, item.courseId)
                            }
                            className="flex items-center bg-[#ff2ded] text-white px-5 rounded-md my-3 cursor-pointer"
                          >
                            <span className="mr-1 text-sm lg:text-current hidden lg:block">
                              পেন্ডিং রাখুন
                            </span>
                            <X />
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Students;
