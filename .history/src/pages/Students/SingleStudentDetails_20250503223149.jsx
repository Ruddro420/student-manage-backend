import { Check, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spin from "../../components/Loader/Spin";
import axios from "axios";

const SingleStudentDetails = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState();
    const [getData, setGetData] = useState([]);
    const { id } = useParams();
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    /* Get Assignment Data */
    useEffect(() => {
        axios.get(`${BASE_URL}/student/ex_1/${id}`)
            .then((res) => {
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
