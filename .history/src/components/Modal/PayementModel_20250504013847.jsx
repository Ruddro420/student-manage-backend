/* eslint-disable react/prop-types */

import { CircleCheck, Link, MousePointer } from "lucide-react";
import { dateFormat } from "../../lib/date";
import axios from "axios";
import toast from "react-hot-toast";

const PayementModel = ({ isOpen, setIsOpen, modalData }) => {
    console.log(modalData);
    
    // base url
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    // submit marks and feedback
    const marksHandler = (e) => {

        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        console.log(data,modalData);
        // Add your API call here to submit the data
        
        axios.post(`${BASE_URL}/student/update/marks/${modalData.id}`, data)
            .then(response => {
                toast.success("Marks and feedback submitted successfully!");
                setIsOpen(false); // Close the modal after submission
            })
            .catch(error => {
                toast.error("There was an error submitting the data!");
                console.error('There was an error!', error);
            });
        // Close the modal after submission
    };

    return (
        <div className="relative z-10">

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-[#1D2939] rounded-lg overflow-hidden shadow-xl transform transition-all max-w-md w-full p-4">
                        <div className="flex justify-between items-center pb-3">
                            <h3 className="text-xl font-semibold text-white">{modalData.name}</h3>
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

                                    {/* Marks */}
                                    <form onSubmit={marksHandler}>
                                        <div>
                                            <h2 className="text-xl">
                                                মার্ক এড করুন{" "} <br />
                                                <div className="mt-4">
                                                    <input
                                                        className="block w-full text-sm border-purple-400 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input text-black"
                                                        type="number"
                                                        placeholder="10 এর মধ্যে মার্ক এড করুন"
                                                        name="marks"
                                                        required
                                                    />
                                                </div>
                                            </h2>
                                            <h4 className="text-[#12B76A] mb-3 mt-5">ইন্সট্র্যাক্টর ফিডব্যাক</h4>
                                            <div className="mt-4">
                                                <textarea
                                                    className="block w-full text-sm border-purple-400 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input text-black"
                                                    type="text"
                                                    placeholder="Congratulations!! You have done very well. Keep up the good
                                        work. Wish you all the best."
                                                    name="feedback"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="bg-[#12B76A] text-white px-5 py-2 rounded flex items-center mt-5"
                                            rel="noreferrer"
                                        >
                                            <CircleCheck className="w-5 h-5" />
                                        </button>
                                    </form>

                                    <div className="mt-5">
                                        <label className="block text-sm">
                                            <div className="flex justify-between">
                                                <div><span className="text-[#12B76A] dark:text-gray-400"><b>আপনার লিংক</b></span></div>
                                                <div><h4> <b>টাইম : </b>  {dateFormat(modalData.created_at)} </h4></div>
                                            </div>
                                            <div className="flex items-center space-x-2 mt-3">
                                                <div className="bg-[#9333EA] text-white px-5 py-2 rounded">
                                                    <Link />
                                                </div>
                                                <input
                                                    className="block w-full text-sm border-purple-400 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input text-black"
                                                    type="url"
                                                    value={modalData.a_link}
                                                    disabled
                                                />
                                                <a
                                                    target="_blank"
                                                    href={modalData.a_link}
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

export default PayementModel;