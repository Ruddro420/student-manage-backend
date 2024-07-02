import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

// eslint-disable-next-line react/prop-types
const AddModule = ({courseId,updateData}) => {
     const axiosSecure = useAxiosSecure()

    const handleSubmit = (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);
        let payload = Object.fromEntries(formdata.entries());
        payload = {...payload, courseId};
        toast.promise(axiosSecure.post('/modules', payload).then(()=> updateData()), {
            loading: 'Adding module...',
            success: 'Module added successfully',
            error: 'Failed to add module'
        })
    }

    return (
        <div className="mb-10 dark:bg-gray-800 bg-white p-5 shadow-sm rounded">
            <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Add Module
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-10 mb-8 md:grid-cols-2">
                <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Name</span>
                    <input
                        className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                        placeholder="Module name"
                        type="text"
                        required
                        name="title"
                    />
                </label>
                <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Study Plan</span>
                    <input
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