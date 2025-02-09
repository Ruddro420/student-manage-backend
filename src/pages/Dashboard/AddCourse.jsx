/* eslint-disable react/prop-types */
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const AddCourse = ({ updateData }) => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const { register, handleSubmit, reset } = useForm();

    // submit data
    const onSubmit = (data) => {
        axios.post(`${BASE_URL}/course/add`, {
            course_name: data.course_name,
            batch_no: data.batch_no,
            batch_status: data.batch_status,
        })
            .then(function (response) {
                console.log(response);
                updateData()
                toast.success('Added Successfully')
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
                Add Course
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="">
                <div className="grid gap-10 mb-8 md:grid-cols-3">
                    <label className="block text-sm">
                        <span className="text-gray-700 dark:text-gray-400">Name</span>
                        <input
                            {...register("course_name", { required: true })}
                            className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                            placeholder="Course name"
                            required
                            type="text"
                            name="course_name"
                        />
                    </label>
                    <label className="block text-sm">
                        <span className="text-gray-700 dark:text-gray-400">Batch No</span>
                        <input
                            {...register("batch_no", { required: true })}
                            className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                            placeholder="Batch No"
                            required
                            type="number"
                            name="batch_no"
                        />
                    </label>
                    <label className="block text-sm">
                        <span className="text-gray-700 dark:text-gray-400">Batch Status</span>
                        <select
                            {...register("batch_status", { required: true })}
                            required
                            name="batch_status"
                            className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-select"
                        >
                            <option value="ongoing">Ongoing</option>
                            <option value="finished">Finished</option>
                        </select>
                    </label>
                </div>
                <input
                    type="submit"
                    className="block px-4 py-2 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-[#12B76A] border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple" />
            </form>
        </div>
    );
};

export default AddCourse;