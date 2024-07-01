import axios from "axios";


const axiosSecure = axios.create({
    //baseURL: "https://student-management-server-soft.vercel.app/",
    baseURL: "http://192.168.0.102:3000/",
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