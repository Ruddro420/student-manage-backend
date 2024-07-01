/* eslint-disable react/prop-types */
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

// eslint-disable-next-line react/prop-types
const AddAssingment = ({course}) => {
    const {modules, id} = course
    const axiosSecure = useAxiosSecure()
    const handleSubmit = (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);
        let payload = Object.fromEntries(formdata.entries());
        payload = {
            ...payload,
            courseId: id,
        }
        console.log(payload);
        toast.promise(axiosSecure.post('/assignments', payload).then((data)=>{
            console.log(data);
        }), {
            loading: 'Adding assignments...',
            success: 'Course added successfully',
            error: 'Failed to add course'
        })

    };

    return (
        <div className="mb-10 dark:bg-gray-800 bg-white p-5 shadow-sm rounded">
            <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Add Assingment
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-5 mb-8 md:grid-cols-4">
                <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Select Module</span>
                    <select
                        required
                    name="moduleId"
                        className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-select"
                    >
                       
                        {modules.map(module => (
                            <option key={module.id} value={module.id}>{module.title}</option>
                        ))}
                    </select>
                </label>

                <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Name</span>
                    <input
                    name="title"
                        className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                        placeholder="Assingment name"
                        required
                        type="text"
                    />
                </label>
                <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Deadline</span>
                    <input
                        className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                        required
                        type="date"
                        name="deadline"
                    />
                </label>
                <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Important Link</span>
                    <input
                        className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                        placeholder="Important Link (optional)"
                        required
                        type="url"
                        name="link"
                    />
                </label>
                <div className="col-span-2">
                <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Assingment Details</span>
                    <textarea
                        className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-textarea"
                        placeholder="Enter assingment Details"
                        required
                        name="description"
                    ></textarea>
                </label>
            </div>
                </div>
            <button
                className="block px-4 py-2 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-[black] border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                Add Assingment
            </button>
            </form>
          
        </div>
    );
};

export default AddAssingment;