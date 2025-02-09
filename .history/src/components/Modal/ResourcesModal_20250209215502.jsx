/* eslint-disable react/prop-types */

import { Link, MousePointer } from "lucide-react";
import { dateFormat } from "../../lib/date";

const ResourcesModal = ({ isOpen, setIsOpen, modalData }) => {
    return (
        <div className="relative z-10">

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-[#1D2939] rounded-lg overflow-hidden shadow-xl transform transition-all max-w-md w-full p-4">
                        <div className="flex justify-between items-center pb-3">
                            <h3 className="text-xl font-semibold">{modalData.heading}</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="">
                            <div className="col-span-1 bg-[#1D2939] text-white rounded">
                                <div>
                                    <h2 className="text-2xl"> আপনার <b className="bg-[#12B76A] text-white px-5 py-1 rounded">রিসোর্স</b></h2>
                                    <div className="mt-8">
                                        <h4 className="text-[#12B76A] mb-3">{modalData.title}</h4>
                                        <p>আপনার রিসোর্স সমূহ আপনি সবুজ রঙয়ের বাটনে ক্লিক করে ডাউনলোড করতে পারবেন !</p>
                                    </div>
                                    <div className="mt-5">
                                        <label className="block text-sm">
                                            <div className="flex justify-between">
                                                <div><span className="text-[#12B76A] dark:text-gray-400"><b>আপনার লিংক</b></span></div>
                                                <div><h4> <b>টাইম</b> {dateFormat(modalData.date)}</h4></div>
                                            </div>
                                            <div className="flex items-center space-x-2 mt-3">
                                                <div className="bg-[#9333EA] text-white px-5 py-2 rounded">
                                                    <Link />
                                                </div>
                                                <input
                                                    className="block w-full text-sm border-purple-400 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input text-black"
                                                    type="url"
                                                    value={modalData.link}
                                                    disabled
                                                />
                                                <a
                                                    target="_blank"
                                                    href={modalData.link}
                                                    className="bg-[#12B76A] text-white px-5 py-2 rounded flex items-center"
                                                    rel="noreferrer"
                                                >
                                                    <MousePointer className="w-5 h-5" />
                                                </a>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResourcesModal;