import React, { useEffect, useState } from "react";
import { deleteUser } from "../global/axios";
import { useDispatch,useSelector } from "react-redux";
import { userSignOutSuccess } from "../store/userSlice";

const Timer = ({setSignUpFirstStepSuccess}) => {
  const {user}=useSelector(state=>state.user)
  const [timeLeft, setTimeLeft] = useState(90);
  const dispatch=useDispatch()
  const handleReRegister = async () => {
    try {
      await deleteUser(user?._id);
      setTimeLeft(0);
      setSignUpFirstStepSuccess(false)
      dispatch(userSignOutSuccess())
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const id = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        clearInterval(id);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [timeLeft]);

  function TimeFormat(timeLeft) {
    const minute = Math.floor(timeLeft / 60);
    const second = timeLeft % 60;
    return `${String(minute).padStart(2, 0)}:${String(second).padStart(2, 0)}`;
  }
  return (
    <>
      {timeLeft > 0 ? (
        <div
          className={`flex flex-row ${
            timeLeft < 40 ? "text-red-500" : "text-green-600"
          } justify-end`}
        >
          {TimeFormat(timeLeft)}
        </div>
      ) : (
        <p className="font-sans text-sm text-gray-500">
          If Your OTP Expire any of them or both then{" "}
          <span className="text-blue-600 font-mono cursor-pointer" onClick={handleReRegister}>
            Re-Register
          </span>
        </p>
      )}
    </>
  );
};

export default Timer;
