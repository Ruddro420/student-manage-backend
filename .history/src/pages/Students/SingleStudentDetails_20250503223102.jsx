import { Check, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spin from "../../components/Loader/Spin";
import axios from "axios";

const SingleStudentDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState();
  const [getData, setGetData] = useState(null);
  const { id } = useParams();

  /* Get Assignment Data */
  useEffect(() => {
    axios.get(`/student/ex_1/${id}`).then((res) => {
      setGetData(res.data.data);
    });
  }, [id]);

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
