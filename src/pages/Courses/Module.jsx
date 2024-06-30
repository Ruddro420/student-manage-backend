/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import AddModule from "../Module/AddModule";

const Module = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState();
    // Loader state

    // Modal function
    const modalHandler = (id) => {
        setIsOpen(true);
        setModalData(id);
    };

    return (
        <>
            <AddModule />
            <div className="grid gap-10 mb-8 md:grid-cols-3">
                {(
                    data.map(item => (
                        <div key={item.id}>
                            <div className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow border-2 border-[#E5E7EB] border-transparent hover:border-[#12B76A] transition duration-300">
                                <div className="p-4">
                                    <div className="flex justify-between items-start">
                                        <div className="bg-[#12B76A] text-white px-3 py-1 text-center inline-block rounded-lg mb-3">
                                            <h3 className="text-xl">মডিউল</h3>
                                            <h2 className="text-xl font-extrabold">{item.count}</h2>
                                        </div>
                                        <div>
                                            <div className="bg-[#9333EA] text-white px-3 py-1 text-center inline-block rounded-lg mb-3">
                                                {/*    <h3 className="text-xl">{item.days}</h3> */}
                                                <h2 className="text-xl">{item.status}</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        <h3 className="text-2xl text-gray-900 mt-5 font-extrabold text-left">{item.heading}</h3>
                                    </div>
                                    <div className="flex justify-between gap-5">
                                        <button onClick={() => modalHandler(item)} className="w-full flex items-center justify-center bg-[#EAECF0] text-black py-2 rounded-md mt-4 font-semibold">
                                            স্ট্যাডি প্লান
                                        </button>
                                        <Link to={`/dashboard/class-summary/${item.id}`} className="w-full flex items-center justify-center bg-[#FFF7E0] text-black py-2 rounded-md mt-4 font-semibold">
                                            ক্লাস সামারী
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                <Modal isOpen={isOpen} setIsOpen={setIsOpen} modalData={modalData} />
            </div>
        </>
    );
};

export default Module;
