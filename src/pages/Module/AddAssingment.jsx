
const AddAssingment = () => {
    return (
        <div className="mb-10 bg-white p-5 shadow-sm rounded">
            <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Add Assingment
            </h1>
            <div className="grid gap-10 mb-8 md:grid-cols-4">
                <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Select Module</span>
                    <select
                        className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-select"
                    >
                        <option value="শুরুর আগের শুরু">শুরুর আগের শুরু</option>
                        <option value="মধ্যবর্তী পরীক্ষা">মধ্যবর্তী পরীক্ষা</option>
                    </select>
                </label>

                <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Name</span>
                    <input
                        className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                        placeholder="Assingment name"
                        type="text"
                    />
                </label>
                <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Deadline</span>
                    <input
                        className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                        type="date"
                    />
                </label>
                <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Important Link</span>
                    <input
                        className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                        placeholder="Important Link (optional)"
                        type="url"
                    />
                </label>
            </div>
            <div className="grid gap-10 mb-8 md:grid-cols-1">
                <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Assingment Details</span>
                    <textarea
                        className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-textarea"
                        placeholder="Enter assingment Details"
                    ></textarea>
                </label>
            </div>
            <button
                className="block px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-[black] border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                Add Assingment
            </button>
        </div>
    );
};

export default AddAssingment;