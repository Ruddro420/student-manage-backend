import CourseTab from "./CourseTab";

const CourseDetails = () => {
    return (
        <div className="container px-6 mx-auto grid">
            <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                ওয়েব ডিজাইন (Web Design & Development)
            </h2>
            {/* Course Tab */}
            <CourseTab />
        </div>
    );
};

export default CourseDetails;