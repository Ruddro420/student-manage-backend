import PropTypes from 'prop-types';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
const AddRecording = ({course}) => {
    const {id} = course
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
        toast.promise(axiosSecure.post('/recordings', payload).then((data)=>{
            console.log(data);
        }), {
            loading: 'Adding assignments...',
            success: 'Course added successfully',
            error: 'Failed to add course'
        })

    };

    return (
        <div className="mb-10 bg-white dark:bg-gray-800 p-5 shadow-sm rounded">
            <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Add Recordings
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-10 mb-8 md:grid-cols-5">
                <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Select Module</span>
                    <select
                     name="moduleId"
                        className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-select"
                    >
                       {course?.modules.map((module, index) => (
                            <option key={index} value={module.id}>{module.title}</option>
                        ))}
                    </select>
                </label>
                <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Class Type</span>
                    <select name='class_type'
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
                       name='title'
                        className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                        placeholder="Topics name"
                        type="text"
                    />
                </label>
                <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Video Link</span>
                    <input
                       name='link'
                        className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                        placeholder="Video Link"
                        type="url"
                    />
                </label>
                <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Date</span>
                    <input
                    name="date"
                        className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                        type="date"
                    />
                </label>
                </div>
                <button
                className="block px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-[black] border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
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