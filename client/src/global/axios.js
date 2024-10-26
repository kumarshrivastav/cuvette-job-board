import axios from "axios";
const backendURL = import.meta.env.VITE_API_BACKEND_URL;
const api = axios.create({ baseURL: backendURL, withCredentials: true });

export const userRegister = (data) => api.post("/api/auth/v1/register", data);
export const isVerifiedEmail = () => api.get("/api/auth/v1/isverifiedemail");
export const isVerifiedPhoneNumber = () =>
  api.get("/api/auth/v1/isverifiedphonenumber");
export const checkEmailOTP = (emailOTP) =>
  api.put("/api/auth/v1/checkemailotp", { emailOTP });
export const checkPhoneNumberOTP = (phoneNumberOTP) =>
  api.put("/api/auth/v1/checkphonenumberotp", { phoneNumberOTP });
export const checkSession=()=>api.get("/api/auth/v1/checksession")
export const deleteUser=(userId)=>api.delete(`/api/auth/v1/deleteuser/${userId}`)
export const createPost=(userBody,jobBody)=>api.post("/api/auth/v1/createpost",{userBody,jobBody})
