/* eslint-disable react/prop-types */
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
const AddModule = ({courseId,updateData}) => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const { register, handleSubmit, reset } = useForm();
    // submit data
    const onSubmit = (data) => {
        axios.post(`${BASE_URL}/module/add`, {
            batch_no:courseId.batch_no,
            course_id:courseId.id,
            course_name:courseId.course_name,
            module_name: data.module_name,
            study_plan: data.study_plan,
        })
            .then(function () {
                toast.success('Added Successfully')
                updateData()
                reset()
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
                toast.error(error.message)
            });
    };
    // get data


    return (
        <div className="mb-10 dark:bg-gray-800 bg-white p-5 shadow-sm rounded">
            <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Add Module
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-10 mb-8 md:grid-cols-2">
                    <label className="block text-sm">
                        <span className="text-gray-700 dark:text-gray-400">Name</span>
                        <input
                            {...register("module_name", { required: true })}
                            className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                            placeholder="Module name"
                            type="text"
                            required
                            name="module_name"
                        />
                    </label>
                    <label className="block text-sm">
                        <span className="text-gray-700 dark:text-gray-400">Study Plan</span>
                        <input
                            {...register("study_plan", { required: true })}
                            className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                            placeholder="Study Plan"
                            required
                            type="text"
                            name="study_plan"
                        />
                    </label>
                </div>
                <button type="submit"
                    className="block px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 border border-transparent rounded-lg active:bg-purple-600 bg-[black] dark:bg-purple-700 dark:hover:bg-[black] hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                    Add Module
                </button>
            </form>

        </div>
    );
};

export default AddModule;