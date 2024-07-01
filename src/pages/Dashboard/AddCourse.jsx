import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddCourse = ({updateData}) => {
    const axiosSecure = useAxiosSecure()

    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);
        const payload = Object.fromEntries(formdata.entries());
        
        toast.promise(axiosSecure.post('/courses', payload).then(()=> updateData()), {
            loading: 'Adding course...',
            success: 'Course added successfully',
            error: 'Failed to add course'
        })

    };

    return (
        <div className="mb-10 dark:bg-gray-800 bg-white p-5 shadow-sm rounded">
            <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Add Course
            </h1>
            <form onSubmit={handleSubmit} className="">
                <div className="grid gap-10 mb-8 md:grid-cols-3">
                <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Name</span>
                    <input
                        className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                        placeholder="Course name"
                        type="text"
                        name="title"
                    />
                </label>
                <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Batch No</span>
                    <input
                        className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                        placeholder="Batch No"
                        type="number"
                        name="batch"
                    />
                </label>
                <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Batch Status</span>
                    <select
                        name="status"
                        className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-select"
                    >
                        <option value="ongoing">Ongoing</option>
                        <option value="finished">Finished</option>
                    </select>
                </label>
                </div>
                <button
                className="block px-4 py-2 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-[#12B76A] border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
               Add Course
            </button>
            </form>
          
        </div>
    );
};

export default AddCourse;