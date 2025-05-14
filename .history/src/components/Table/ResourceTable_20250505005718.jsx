/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Eye, Trash2 } from "lucide-react";
import ResourcesModal from "../Modal/ResourcesModal";
import { useEffect, useState } from "react";
import AddResource from "../../pages/Module/AddResource";
import { dateFormat } from "../../lib/date";
import axios from "axios";
import NoDataFound from "../NoDataFound/NoDataFound";
import toast from "react-hot-toast";

const ResourceTable = ({ data, updateData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    axios.get(`${BASE_URL}/resource/data/${data.id}`)
      .then((res) => {
        setAssignments(res.data?.resource || []); // Ensure it's always an array
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching assignments:", error);
        setAssignments([]); // Set to empty array in case of an error
        setLoading(false);
      });
  };

  useEffect(() => {
    if (data?.id) {
      loadData();
    }
  }, [data?.id]);

  // Ensure `assignments` is an array before calling reduce
  const groupedAssignments = (assignments || []).reduce((acc, assignment) => {
    if (!acc[assignment.module_name]) {
      acc[assignment.module_name] = [];
    }
    acc[assignment.module_name].push(assignment);
    return acc;
  }, {});
  // Modal function
  const modalHandler = (id) => {
    setIsOpen(true);
    setModalData(id);
  };
  return (
    <>
      <AddResource course={data} updateData={loadData} />
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : Object.keys(groupedAssignments).length > 0 ? (
        <div className="module-container">
          {Object.entries(groupedAssignments).map(([moduleName, moduleAssignments]) => (
            <div key={moduleName} className="mb-5">
              {/* Module Title */}
              <div className="p-3 border dark:bg-gray-800 rounded-lg bg-[#1D2939] text-white">
                <h1>{moduleName}</h1>
              </div>

              {/* Assignments Table */}
              <div className="w-full overflow-hidden rounded-lg shadow-xs mt-3">
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
                      {moduleAssignments.map((assignment) => (
                        <tr key={assignment.id} className="text-gray-700 dark:text-gray-400">
                          <td className="px-4 py-3 w-1/3">
                            <p className="font-semibold">{assignment.name}</p>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {dateFormat(assignment.date)}
                          </td>
                          <td className="flex gap-5 w-1/3">
                            <button
                              className="px-2 py-3 text-sm flex items-center justify-between dark:bg-gray-800 dark:text-white border  bg-[#F3F4F6] cursor-pointer w-[100px] rounded m-2 hover:bg-slate-400"
                              onClick={() => modalHandler(assignment)}
                            >
                              <td>
                                <div className="flex items-center">
                                  <span className="mr-1">চেক করুন</span>
                                  <Eye />
                                </div>

                              </td>
                            </button>
                            <button
                              onClick={() => {
                                alert("Are you sure you want to delete this module?");

                                toast.promise(
                                  axios
                                    .delete(`/api/${assignment.id}`)
                                    .then(() => {
                                      updateData();
                                    }),
                                  {
                                    loading: "Deleting...",
                                    success: "Deleted successfully!",
                                    error: "Error deleting module",
                                  }
                                );
                              }}
                              className="px-2 py-3 text-sm flex items-center justify-between dark:bg-gray-800 dark:text-white border  bg-[#F3F4F6] cursor-pointer w-[100px] rounded m-2 hover:bg-slate-400"

                            >
                              <td>
                                <div className="flex items-center">
                                  <span className="mr-1">Delete</span>
                                  <Trash2 />
                                </div>

                              </td>
                            </button>

                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NoDataFound />
      )}
      <ResourcesModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalData={modalData}
      />

    </>
  );
};

export default ResourceTable;
