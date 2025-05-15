/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Modal from "../../components/Modal/Modal";
import AddModule from "../Module/AddModule";
import { e2b_number, status } from "../../lib/bn";
import NoDataFound from "../../components/NoDataFound/NoDataFound";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../../components/Loader/Loader";

const Module = ({ data, updateData }) => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);


  // console.log(data);

  const loadData = () => {
    axios.get(`${BASE_URL}/module/data/${data.id}`).then((res) => {
      console.log(res);
      setModules(res.data.modules);
      setLoading(false);
    });
  }
  useMemo(() => {
    loadData()
  }, [loadData]);
  // delete module
  const deleteModule = (id) => {
    if (window.confirm("Are you sure you want to delete this module?")) {
      axios.get(`${BASE_URL}/module/delete/${id}`).then(() => {
        setLoading(false);
        toast.success("Delete Successfully")
        loadData();
        updateData();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }
  }


  return (
    <>
      {loading ? (<Loader />) : <>
        <AddModule courseId={data} updateData={loadData} />

        {modules?.length != 0 ? (
          <div className="grid gap-10 mb-8 md:grid-cols-3">
            {modules?.map((item, i) => (
              <div key={item.id}>
                <div className="w-full max-w-md overflow-hidden rounded-lg dark:bg-gray-800 dark:text-white bg-white shadow border-2 border-[#E5E7EB] border-transparent hover:border-[#12B76A] transition duration-300">
                  <div className="lg:p-4 p-4">
                    <div className="flex justify-between items-start">
                      <div className="bg-[#12B76A] text-white px-3 py-1 text-center inline-block rounded-lg mb-3">
                        <h3 className="text-xl">মডিউল </h3>
                        <h2 className="text-xl font-extrabold">
                          {e2b_number(i + 1)}
                        </h2>
                      </div>
                      <div>
                        <div className="bg-[#9333EA] text-white px-3 py-1 text-center inline-block rounded-lg mb-3">
                          {/*    <h3 className="text-xl">{item.days}</h3> */}
                          <h2 className="text-xl">{item.status == 1 ? 'Ongoing' : 'Finished'}</h2>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5">
                      <h3 className="text-2xl dark:text-white text-gray-900 mt-5 font-extrabold text-left">
                        {item.module_name}
                      </h3>
                    </div>
                    <div className="flex justify-between gap-5">
                      <button
                        /*  onClick={() => modalHandler(item)} */
                        className="w-full flex items-center justify-center bg-[#EAECF0] text-black py-2 rounded-md mt-4 font-semibold"
                      >
                        স্ট্যাডি প্লান
                      </button>
                      <Link
                        to={`/dashboard/class-summary/${item.id}?index=${i}`}
                        className="w-full flex items-center justify-center bg-[#FFF7E0] text-black py-2 rounded-md mt-4 font-semibold"
                      >
                        ক্লাস সামারী
                      </Link>
                      <button
                        onClick={() => { deleteModule(item.id) }}
                        className="w-full flex items-center justify-center bg-red-500 text-white py-2 rounded-md mt-4 font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* <Modal isOpen={isOpen} setIsOpen={setIsOpen} modalData={modalData} /> */}
          </div>
        ) : (
          <NoDataFound />
        )}

      </>}

    </>
  );
};

export default Module;
