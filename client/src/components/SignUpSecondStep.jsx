import { TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { LuPhone } from "react-icons/lu";
import { AiOutlineMail } from "react-icons/ai";
import { FcOk } from "react-icons/fc";
import toast from "react-hot-toast";

import {
  checkEmailOTP,
  checkPhoneNumberOTP,
  isVerifiedEmail,
  isVerifiedPhoneNumber,
} from "../global/axios";
import Timer from "./Timer";
import { useDispatch } from "react-redux";
import {
  setAuthenticated,
  userPhoneVerificationFailure,
  userPhoneVerificationStart,
  userPhoneVerificationSuccess,
} from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const SignUpSecondStep = ({setSignUpFirstStepSuccess}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEmailVerified, setIsEmailVerifed] = useState(false);
  const [emailOTP, setEmailOTP] = useState("");
  const [phoneOTP, setPhoneOTP] = useState("");
  const [isPhoneNuberVerified, setIsPhoneNuberVerified] = useState(false);
  const [phoneOtpVerified, setPhoneOtpVerified] = useState(false);
  const [emailOtpVerified, setEmailOtpVerified] = useState(false);
  // const [loading,setLoading]=useState(false)

  useEffect(() => {
    console.log(isEmailVerified);
    console.log(isPhoneNuberVerified);
    if (isEmailVerified && isPhoneNuberVerified) {
      dispatch(setAuthenticated(true));
      navigate("/jobposting");
    } else {
      dispatch(setAuthenticated(false));
      navigate("/");
    }
    const emailVerify = async () => {
      try {
        const { data } = await isVerifiedEmail();
        console.log(data);
        setIsEmailVerifed(data);
      } catch (error) {
        console.log(error?.response?.data?.message);
      }
    };
    const phoneNumberVerify = async () => {
      try {
        const { data } = await isVerifiedPhoneNumber();
        setIsPhoneNuberVerified(data);
      } catch (error) {
        console.log(error?.response?.data?.message);
      }
    };
    Promise.all([emailVerify(), phoneNumberVerify()]);
  }, [
    isEmailVerified,
    isPhoneNuberVerified,
    phoneOtpVerified,
    emailOtpVerified,
  ]);
  const handlePhoneOTP = async () => {
    dispatch(userPhoneVerificationStart());
    try {
      if (String(phoneOTP).length === 0) {
        return toast.error("please enter the phone otp");
      }
      if (String(phoneOTP).length < 6 || String(phoneOTP).length > 6) {
        return toast.error("phone OTP must be 6 characters");
      }
      const { data } = await checkPhoneNumberOTP(phoneOTP);
      dispatch(userPhoneVerificationSuccess(data.user));
      if (data?.phoneNumberVerified) {
        setPhoneOtpVerified(true);
        toast.success("Phone Number Verified");
      }
    } catch (error) {
      dispatch(userPhoneVerificationFailure(error));
      console.log(error?.response?.data);
      toast.error(error?.response?.data);
    }
  };
  const handleEmailOTP = async () => {
    dispatch(userPhoneVerificationStart());
    try {
      if (String(emailOTP).length === 0) {
        return toast.error("please enter the email otp");
      }
      if (String(emailOTP).length < 6 || String(emailOTP).length > 6) {
        return toast.error("email otp must be 6 characters");
      }
      const { data } = await checkEmailOTP(emailOTP);
      dispatch(userPhoneVerificationSuccess(data.user));
      if (data?.emailVerified) {
        setEmailOtpVerified(true);
        toast.success("Email Verified");
      }
    } catch (error) {
      dispatch(userPhoneVerificationFailure(error));
      console.log(error?.response?.data);
      toast.error(error?.response?.data);
    }
  };
  return (
    <div className="flex flex-col gap-6">
      <Timer setSignUpFirstStepSuccess={setSignUpFirstStepSuccess}/>
      <div className="flex flex-col">
        <div>
          <TextInput
            type="number"
            placeholder="Email OTP"
            icon={AiOutlineMail}
            value={emailOTP}
            disabled={isEmailVerified}
            rightIcon={isEmailVerified && FcOk}
            onChange={(e) => setEmailOTP(e.target.value)}
          />
        </div>
        <button
          onClick={handleEmailOTP}
          className="border mt-2 p-1 bg-blue-600 text-white font-mono rounded-lg"
        >
          Verify
        </button>
      </div>
      <div className="flex flex-col">
        <div>
          <TextInput
            type="number"
            placeholder="Mobile OTP"
            icon={LuPhone}
            value={phoneOTP}
            disabled={isPhoneNuberVerified}
            rightIcon={isPhoneNuberVerified && FcOk}
            onChange={(e) => setPhoneOTP(e.target.value)}
          />
        </div>
        <button
          onClick={handlePhoneOTP}
          className="border mt-2 p-1 bg-blue-600 text-white font-mono rounded-lg"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default SignUpSecondStep;
