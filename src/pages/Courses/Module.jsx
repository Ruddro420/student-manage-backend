import { Link } from "react-router-dom";

const Module = () => {
    return (
        <div className="grid gap-10 mb-8 md:grid-cols-2">
            <Link to='#' className="w-full mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow m-5 border-2 border-[#E5E7EB] border-transparent hover:border-[#12B76A]">
                <div className="p-4">
                    <div className="flex justify-between items-center">
                        <div className="bg-[#12B76A] text-white px-3 py-1 text-center inline-block rounded-lg mb-3">
                            <h3 className="text-xl">মডিউল</h3>
                            <h2 className="text-xl font-extrabold">০</h2>
                        </div>
                        <div className="">
                            <span className="inline-flex items-center rounded-lg bg-blue-500 px-2 py-2 m-3 text-xs font-semibold text-white"> অনগোয়িং / ব্যাচ ২</span>
                            <span className="inline-flex items-center rounded-lg bg-[#9333EA] px-2 py-2 text-xs font-semibold text-white"> শনি,সোম,বুধ   </span>
                        </div>
                    </div>
                    <div className="mt-5">
                        <h3 className="text-2xl text-gray-900 mt-5 font-extrabold">শুরুর আগের শুরু</h3>
                    </div>
                    <div className="flex justify-between gap-5">
                        <Link to='/dashboard/course-details' className="w-full flex items-center justify-center bg-[#EAECF0] text-black py-2 rounded-md mt-4 font-semibold">
                            স্ট্যাডি প্লান
                        </Link>
                        <Link to='/dashboard/course-details' className="w-full flex items-center justify-center bg-[#FFF7E0] text-black py-2 rounded-md mt-4 font-semibold">
                            ক্লাস ফিডব্যাক
                        </Link>
                    </div>
                </div>
            </Link>
            <Link to='#' className="w-full mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow m-5 border-2 border-[#E5E7EB] border-transparent hover:border-[#12B76A]">
                <div className="p-4">
                    <div className="flex justify-between items-center">
                        <div className="bg-[#12B76A] text-white px-3 py-1 text-center inline-block rounded-lg mb-3">
                            <h3 className="text-xl">মডিউল</h3>
                            <h2 className="text-xl font-extrabold">০</h2>
                        </div>
                        <div className="">
                            <span className="inline-flex items-center rounded-lg bg-blue-500 px-2 py-2 m-3 text-xs font-semibold text-white"> অনগোয়িং / ব্যাচ ২</span>
                            <span className="inline-flex items-center rounded-lg bg-[#9333EA] px-2 py-2 text-xs font-semibold text-white"> শনি,সোম,বুধ   </span>
                        </div>
                    </div>
                    <div className="mt-5">
                        <h3 className="text-2xl text-gray-900 mt-5 font-extrabold">শুরুর আগের শুরু</h3>
                    </div>
                    <div className="flex justify-between gap-5">
                        <Link to='/dashboard/course-details' className="w-full flex items-center justify-center bg-[#EAECF0] text-black py-2 rounded-md mt-4 font-semibold">
                            স্ট্যাডি প্লান
                        </Link>
                        <Link to='/dashboard/course-details' className="w-full flex items-center justify-center bg-[#FFF7E0] text-black py-2 rounded-md mt-4 font-semibold">
                            ক্লাস ফিডব্যাক
                        </Link>
                    </div>
                </div>
            </Link>

        </div>
    );
};

export default Module;