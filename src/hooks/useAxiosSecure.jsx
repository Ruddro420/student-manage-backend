import axios from "axios";


const axiosSecure = axios.create({
    baseURL: "http://localhost:3000/",
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