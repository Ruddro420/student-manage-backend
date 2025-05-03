import { Check, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import ScoreModal from "../../components/Modal/ScoreModal";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spin from "../../components/Loader/Spin";

const SingleStudentDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState();
  const [getData, setGetData] = useState(null);
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  /* Get Assignment Data */
  useEffect(() => {
    axiosSecure.get(`/student/ex_1/${id}`).then((res) => {
      setGetData(res.data);
    });
  }, [axiosSecure, id]);

   console.log(getData);

  // Modal function
  const modalHandler = (data) => {
    setIsOpen(true);
    setModalData(data);
  };

  return (
    <>
   {getData ? <div className="container px-6 mx-auto grid">
      <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        {getData.email}
      </h2>
      {/* Module Base Data Show */}
      <div>
        <div className="p-3 border rounded-lg mb-2 mt-5 bg-[#1D2939] text-white">
          <h1>মডিউল ১ </h1>
        </div>
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-4 py-3">এসাইনমেন্ট নাম</th>
                  <th className="px-4 py-3">স্কোর</th>
                  <th className="px-4 py-3">দেখুন</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
               {getData.assignments.map((assingment)=>{
                return <tr key={assingment.id} className="text-gray-700 dark:text-gray-400">
                <td className="px-4 py-3">
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{assingment.assignment.title}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">{assingment.marks}</td>
                <button
                  onClick={() => modalHandler(assingment)}
                  className="px-2 py-3 text-sm flex items-center justify-center dark:bg-gray-800 dark:text-white border  bg-[#F3F4F6] cursor-pointer w-[100px] rounded m-2 hover:bg-slate-400"
                >
                  <td>
                    <div className="flex items-center">
                      <span className="mr-1">দেখুন</span>
                      <Eye />
                    </div>
                    
                  </td>
                </button>
                <td>{assingment.status ==="confirm" && <div className="flex items-center">
                      <span className="mr-1">Marked</span>
                      <Check />
                    </div>}</td>
              </tr>
               }) }
              </tbody>
            </table>
          </div>
        </div>
        <ScoreModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalData={modalData}
        />
      </div>
    </div> : <Spin/>}
    </>
  );
};

export default SingleStudentDetails;
