import React from "react";
import { HiHome } from "react-icons/hi2";
import { Link } from "react-router-dom";
const JobPost = () => {
  return (
      <Link
        className=" w-44 h-8  ml-10 mt-12 border p-1 text-center bg-blue-600 text-white font-mono font-semibold text-sm rounded-md "
        to={"/interview"}
      >
        Create Interview
      </Link>
  );
};

export default JobPost;
