import React, { useEffect, useState } from "react";
import { TextInput } from "flowbite-react";
import { CiUser } from "react-icons/ci";
import { LuPhone } from "react-icons/lu";
import { AiOutlineMail } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { PiUsersThreeLight } from "react-icons/pi";
import { userRegister } from "../global/axios";
import {useDispatch, useSelector} from "react-redux"
import { userRegisterFailure, userRegisterStart, userRegisterSuccess } from "../store/userSlice";
import toast from "react-hot-toast";
const SignUpFirstStep = ({ setSignUpFirstStepSuccess}) => {
  const {loading}=useSelector(state=>state.user)
  const formMethods = useForm();
  const dispatch=useDispatch()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = formMethods;
  const onSubmit = async (data) => {
    dispatch(userRegisterStart())
    try {
      const { data: res } = await userRegister(data);
      dispatch(userRegisterSuccess(res.user))
      setSignUpFirstStepSuccess(true);
    } catch (error) {
      dispatch(userRegisterFailure(error))
      toast.error(error?.response?.data)
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div>
        <TextInput
          type="text"
          placeholder="Name"
          disabled={loading}
          {...register("name", { required: "Name is Required" })}
          icon={CiUser}
        />
        {errors.name && (
          <span className="font-mono text-red-500">{errors.name.message}</span>
        )}
      </div>
      <div>
        <TextInput
          type="number"
          placeholder="Phone no."
          disabled={loading}
          {...register("phoneNumber", {
            required: "Phone Number is Required",
            minLength: {
              value: 10,
              message: "Phone number should not less than 10 characters",
            },
          })}
          icon={LuPhone}
        />
        {errors.phoneNumber && (
          <span className="font-mono text-red-500">
            {errors.phoneNumber.message}
          </span>
        )}
      </div>
      <div>
        <TextInput
          type="text"
          disabled={loading}
          placeholder="Company Name"
          {...register("companyName", {
            required: "Company Name is Required",
          })}
          icon={CiUser}
        />
        {errors.companyName && (
          <span className="font-mono text-red-500">
            {errors.companyName.message}
          </span>
        )}
      </div>
      <div>
        <TextInput
          type="email"
          disabled={loading}
          placeholder="Company Email"
          {...register("companyEmail", {
            required: "Company Email is Required",
          })}
          icon={AiOutlineMail}
        />
        {errors.companyEmail && (
          <span className="font-mono text-red-500">
            {errors.companyEmail.message}
          </span>
        )}
      </div>
      <div>
        <TextInput
          type="number"
          disabled={loading}
          min={10}
          placeholder="Employee Size"
          {...register("employeeSize", {
            required: "Employee Size is Required",
          })}
          icon={PiUsersThreeLight}
        />
        {errors.employeeSize && (
          <span className="font-mono text-red-500">
            {errors.employeeSize.message}
          </span>
        )}
      </div>
      
      <div className="flex flex-col">
        <p className="mx-auto text-center text-sm">
          By clicking on proceed you will accept our <br />
          <a href="#" className="text-blue-500">
            Terms
          </a>
          &nbsp;&&nbsp;
          <a href="#" className="text-blue-500">
            Conditions
          </a>
        </p>
        <button
          type="submit"
          className="border bg-blue-600 my-2 py-1 text-white font-mono rounded-lg"
        >
          Proceed
        </button>
      </div>
    </form>
  );
};

export default SignUpFirstStep;
