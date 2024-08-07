/* eslint-disable react/prop-types */
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const AddResource = ({ course, updateData }) => {
  const { id } = course;
  const axiosSecure = useAxiosSecure();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    let payload = Object.fromEntries(formdata.entries());
    payload = {
      ...payload,
      courseId: id,
    };
    console.log(payload);
    toast.promise(
      axiosSecure
        .post("/resources", payload)
        .then(() => updateData())
        .then((data) => {
          console.log(data);
        }),
      {
        loading: "Adding resources...",
        success: "Resources added successfully",
        error: "Failed to add resources",
      }
    );
  };
  return (
    <div className="mb-10 dark:bg-gray-800 bg-white p-5 shadow-sm rounded">
      <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
        Add Resource
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-10 mb-8 md:grid-cols-4">
          <label className="block text-sm">
            <span className="text-gray-700 dark:text-gray-400">
              Select Module
            </span>
            <select
              required
              name="moduleId"
              className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-select"
            >
              {course?.modules.map((module, index) => (
                <option key={index} value={module.id}>
                  {module.title}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm">
            <span className="text-gray-700 dark:text-gray-400">Name</span>
            <input
              className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
              placeholder="Resource name"
              required
              type="text"
              name="title"
            />
          </label>
          <label className="block text-sm">
            <span className="text-gray-700 dark:text-gray-400">
              Resource Link
            </span>
            <input
              className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
              placeholder="Video Link"
              required
              type="url"
              name="link"
            />
          </label>
          <label className="block text-sm">
            <span className="text-gray-700 dark:text-gray-400">Date</span>
            <input
              className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
              required
              type="date"
              name="date"
            />
          </label>
        </div>
        <button className="block px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-[black] border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-[black] focus:outline-none focus:shadow-outline-purple">
          Add Resource
        </button>
      </form>
    </div>
  );
};

export default AddResource;
