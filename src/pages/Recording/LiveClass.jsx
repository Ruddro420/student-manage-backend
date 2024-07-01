/* eslint-disable react/prop-types */
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import AddRecording from "../Module/AddRecording";
import PropTypes from 'prop-types';
import { dateFormat } from "../../lib/date";

const LiveClass = ({data,updateData}) => {
    
    return (
        <>
            <AddRecording updateData={updateData} course={data}/>
            {data.modules.map(module => (
                <div key={module.id}>
                    <div className="p-3 border rounded-lg mb-2 dark:bg-gray-800 mt-5 bg-[#1D2939] text-white">
                        <h1>{module.title}</h1>
                    </div>
                    {module.recordings.length > 0 ? <div className="w-full overflow-hidden rounded-lg shadow-xs">
                        <div className="w-full overflow-x-auto">
                            <table className="w-full whitespace-no-wrap">
                                <thead>
                                    <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                        <th className="px-4 py-3 w-1/2">শিরোনাম</th>
                                        <th className="px-4 py-3 w-1/4">সময়</th>
                                        <th className="px-4 py-3 w-1/4">দেখুন</th>
                                    </tr>
                                </thead>
                          <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                    {module.recordings.map(liveClass => (
                                        <tr key={liveClass.id} className="text-gray-700 dark:text-gray-400">
                                            <td className="px-4 py-3 w-1/2">
                                                <div className="flex items-center text-sm">
                                                    <div>
                                                        <p className="font-semibold">{liveClass.title}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm w-1/4">
                                                {dateFormat(liveClass.date)}
                                            </td>
                                            <Link to={`/dashboard/class-recording/${liveClass.id}`}>
                                                <td className="px-4 py-3 text-sm flex items-center dark:bg-gray-700 bg-[#F3F4F6] cursor-pointer w-1/3 rounded m-2 hover:bg-slate-400">
                                                    <div className="flex items-center">
                                                        <span className="mr-1">দেখুন</span>
                                                        <Play />
                                                    </div>
                                                </td>
                                            </Link>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>: <div className="dark:text-white text-center font-bold text-xl">No Videos!</div>}
                </div>
            ))}
        </>


    );
};


LiveClass.propTypes = {
    data: PropTypes.object.isRequired,
};

export default LiveClass;