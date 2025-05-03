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
  
    </>
  );
};

export default SingleStudentDetails;
