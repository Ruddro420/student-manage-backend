import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import ProgressWindow from "../components/Loader/ProgressWindow";

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("user"));
    const loading = false; // Modify this if you have a real loading state

    if (loading) {
        return (
            <ProgressWindow>
                <progress className="progress w-56"></progress>
            </ProgressWindow>
        );
    }

    return user ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateRoute;
