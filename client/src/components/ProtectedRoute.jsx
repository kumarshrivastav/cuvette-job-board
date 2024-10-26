import React, { useEffect, useState } from "react";
import { checkSession, deleteUser } from "../global/axios";
import { useNavigate, Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAllPosts, setAuthenticated, userSignOutSuccess } from "../store/userSlice";
const ProtectedRoute = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(() => {
    const validateSession = async () => {
      try {
        const { data } = await checkSession();
        dispatch(setAuthenticated(data.valid));
        if (data.valid === false) {
          await deleteUser(user?._id);
          dispatch(userSignOutSuccess());
          dispatch(clearAllPosts())
        }
      } catch (error) {
        await deleteUser(user?._id);
        dispatch(userSignOutSuccess());
        dispatch(setAuthenticated(false));
        dispatch(clearAllPosts())
        console.log(error);
        navigate("/");
      }
    };
    validateSession();
  }, [isAuthenticated]);
  return isAuthenticated ? <Outlet /> : <Navigate to={"/"} />;
};

export default ProtectedRoute;
