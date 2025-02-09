/* eslint-disable react/prop-types */
import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
const AddRecording = ({ course, updateData }) => {
    const { id } = course;
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    // get module data
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit, reset } = useForm();

    const loadData = () => {
        axios.get(`${BASE_URL}/module/data/${id}`).then((res) => {
            console.log(res.data.modules);
            setModules(res.data.modules);
            setLoading(false);
        });
    }
    useEffect(() => {
        loadData()
    }, [id]);

    return (
        <div className="mb-10 bg-white dark:bg-gray-800 p-5 shadow-sm rounded">
            <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Add Recordings
            </h1>
            <form /* onSubmit={handleSubmit} */>
                <div className="grid gap-10 mb-8 md:grid-cols-5">
                    <label className="block text-sm">
                        <span className="text-gray-700 dark:text-gray-400">Select Module</span>
                        <select
                            required
                            name="moduleId"
                            className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-select"
                        >
                            {modules?.map((module, index) => (
                                <option key={index} value={module.module_name}>{module.module_name}</option>
                            ))}
                        </select>
                    </label>
                    <label className="block text-sm">
                        <span className="text-gray-700 dark:text-gray-400">Class Type</span>
                        <select name='class_type'
                            required
                            className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-select"
                        >
                            <option value="লাইভ ক্লাস">লাইভ ক্লাস</option>
                            <option value="সাপোর্ট ক্লাস">সাপোর্ট ক্লাস</option>
                            <option value="বোনাস ক্লাস">বোনাস ক্লাস</option>
                        </select>
                    </label>

                    <label className="block text-sm">
                        <span className="text-gray-700 dark:text-gray-400">Name</span>
                        <input
                            required
                            name='title'
                            className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                            placeholder="Topics name"
                            type="text"
                        />
                    </label>
                    <label className="block text-sm">
                        <span className="text-gray-700 dark:text-gray-400">Video Link</span>
                        <input
                            required
                            name='link'
                            className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                            placeholder="Video Link"
                            type="url"
                        />
                    </label>
                    <label className="block text-sm">
                        <span className="text-gray-700 dark:text-gray-400">Date</span>
                        <input
                            required
                            name="date"
                            className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                            type="date"
                        />
                    </label>
                </div>
                <button
                    className="block px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-[black] border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-[black] focus:outline-none focus:shadow-outline-purple">
                    Add Video
                </button>
            </form>

        </div>
    );
};

AddRecording.propTypes = {
    course: PropTypes.object.isRequired,
};

export default AddRecording;