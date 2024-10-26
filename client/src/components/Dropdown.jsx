import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../global/axios";
import toast from "react-hot-toast";
import { clearAllPosts, userSignOutSuccess } from "../store/userSlice";
const Dropdown = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleSignOutUser = async () => {
    try {
      const { data } = await deleteUser(user?._id);
      toast.success(data);
      dispatch(userSignOutSuccess());
      dispatch(clearAllPosts())
      setIsOpen(!isOpen)
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div
      className="flex flex-row justify-evenly items-center border cursor-pointer border-blue-600 w-32 h-8 mx-4"
      onClick={handleToggle}
    >
      <div className="h-4 w-4 rounded-full bg-gray-400"></div>
      <div className="text-sm font-sans font-semibold text-gray-400">
        {user?.name}
      </div>
      <div className="w-0 h-0  border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[12px] border-t-gray-400 mt-1"></div>
      {isOpen && (
        <div className="fixed  inset-x-2 z-10 md:inset-x-auto md:mr-44 bg-gray-200 border  mt-48 w-96">
          <ul className="flex flex-col p-2 text-sm font-mono text-gray-500">
            <li className="p-1 cursor-default">
              Company Name : {user?.companyName}
            </li>
            <li className="p-1 cursor-default">
              Company Email : {user?.companyEmail}
            </li>
            <li className="p-1 cursor-default">
              Company Phone Number : {user?.phoneNumber}
            </li>
            <li
              className="bg-red-600 p-2 text-white text-center cursor-pointer"
              onClick={handleSignOutUser}
            >
              Sign Out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
