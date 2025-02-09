/* eslint-disable react/prop-types */
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import AddAssingment from "../Module/AddAssingment";
import { dateFormat } from "../../lib/date";
import NoDataFound from "../../components/NoDataFound/NoDataFound";
import axios from "axios";
import { useEffect, useState } from "react";

const AllAssignments = ({ data }) => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [assingments,setAssingments] = useState([])
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    axios.get(`${BASE_URL}/assingment/data/${data.id}`).then((res) => {
        console.log(res);
        setAssingments(res.data.assingments);
        setLoading(false);
    });
}
useEffect(() => {
    loadData()
}, [data.id]);

  const { assignments } = data;
  return (
    <>
      <AddAssingment course={data} />
      {assingments?.length != 0 ? (
        <>
          <div className="module-container">
            <div className="p-3 border dark:bg-gray-800 rounded-lg mb-2 mt-5 bg-[#1D2939] text-white">
              <h1>{data.title}</h1>
            </div>
            <div className="w-full overflow-hidden rounded-lg shadow-xs">
              <div className="w-full overflow-x-auto">
                <table className="w-full whitespace-no-wrap table-fixed">
                  <thead>
                    <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                      <th className="px-4 py-3 w-1/3">শিরোনাম</th>
                      <th className="px-4 py-3 w-1/3">সময়</th>
                      <th className="px-4 py-3 w-1/3">দেখুন</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                    {assingments?.map((assignment) => (
                      <tr
                        key={assignment.id}
                        className="text-gray-700 dark:text-gray-400"
                      >
                        <td className="px-4 py-3 w-1/3">
                          <div className="flex items-center text-sm">
                            <div>
                              <p className="font-semibold">
                                {assignment.title}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {dateFormat(assignment.deadline)}
                        </td>
                        <Link to={`/dashboard/assingment/${assignment.id}`}>
                          <td className="px-4 py-3 text-sm flex items-center justify-between dark:bg-gray-800 dark:text-white border  bg-[#F3F4F6] cursor-pointer w-[90px] rounded m-2 hover:bg-slate-400">
                            <div className="flex items-center rk:text-white">
                              <span className="mr-1">দেখুন</span>
                              <Eye />
                            </div>
                          </td>
                        </Link>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <NoDataFound />
      )}
    </>
  );
};

export default AllAssignments;
