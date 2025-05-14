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

     // Ensure `assignments` is an array before calling reduce
     const groupedAssignments = (getData || []).reduce((acc, assignment) => {
        if (!acc[assignment.m_name]) {
            acc[assignment.m_name] = [];
        }
        acc[assignment.m_name].push(assignment);
        return acc;
    }, {});
    // Modal function
    const modalHandler = (id) => {
        setIsOpen(true);
        setModalData(id);
    };

    return (
        <>

        </>
    );
};

export default SingleStudentDetails;
