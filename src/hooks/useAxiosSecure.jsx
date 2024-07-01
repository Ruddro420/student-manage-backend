import axios from "axios";


const axiosSecure = axios.create({
    baseURL: "https://student-management-server-soft.vercel.app/",
    headers: {
        'content-type': 'application/json'
    },
    withCredentials: true
})
console.log(import.meta.env.VITE_serverKey)


const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;