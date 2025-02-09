/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
const AddAssingment = ({ course, updateData }) => {
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

    console.log(modules);
    

    //submit data
    const onSubmit = (data) => {
        axios.post(`${BASE_URL}/assingment/add`, {
            course_name: modules.course_name,
            batch_no: modules.batch_no,
            module_name: data.module_name,
            course_id: modules.course_id,
            assing_name: data.assing_name,
            deadline: data.deadline,
            imLink: data.imLink,
            details: data.details,
        })
            .then(function () {
                toast.success('Added Successfully')
                //updateData()
                reset()
            })
            .catch(function (error) {
                console.log(error);
                toast.error(error.message)
            });

    };
    return (
        <div className="mb-10 dark:bg-gray-800 bg-white p-5 shadow-sm rounded">
            <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Add Assingment
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="grid gap-5 mb-8 md:grid-cols-4">
                    <label className="block text-sm">
                        <span className="text-gray-700 dark:text-gray-400">Select Module</span>
                        <select
                            {...register("module_name", { required: true })}
                            required
                            name="module_name"
                            className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-select"
                        >

                            {modules.map(module => (
                                <option key={module.id} value={module.module_name}>{module.module_name}</option>
                            ))}
                        </select>
                    </label>

                    <label className="block text-sm">
                        <span className="text-gray-700 dark:text-gray-400">Name</span>
                        <input
                            {...register("assing_name", { required: true })}
                            name="assing_name"
                            className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                            placeholder="Assingment name"
                            required
                            type="text"
                        />
                    </label>
                    <label className="block text-sm">
                        <span className="text-gray-700 dark:text-gray-400">Deadline</span>
                        <input
                            {...register("deadline", { required: true })}
                            className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                            required
                            type="date"
                            name="deadline"
                        />
                    </label>
                    <label className="block text-sm">
                        <span className="text-gray-700 dark:text-gray-400">Important Link</span>
                        <input
                            {...register("imLink", { required: false })}
                            className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                            placeholder="Important Link (optional)"

                            type="url"
                            name="imLink"
                        />
                    </label>
                    <div className="col-span-2">
                        <label className="block text-sm">
                            <span className="text-gray-700 dark:text-gray-400">Assingment Details</span>
                            <textarea
                                {...register("details", { required: true })}
                                className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-textarea"
                                placeholder="Enter assingment Details"
                                required
                                name="details"
                            ></textarea>
                        </label>
                    </div>
                </div>
                <button
                    type="submit"
                    className="block px-4 py-2 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-[black] border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-[black] focus:outline-none focus:shadow-outline-purple">
                    Add Assingment
                </button>
            </form>

        </div>
    );
};

export default AddAssingment;