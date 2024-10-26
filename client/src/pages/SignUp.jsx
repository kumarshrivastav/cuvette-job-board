import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import SignUpFirstStep from "../components/SignUpFirstStep";
import SignUpSecondStep from "../components/SignUpSecondStep";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const SignUp = () => {
  const formMethods = useForm();
  const {isAuthenticated,loading}=useSelector(state=>state.user)
  const [signUpFirstStepSuccess, setSignUpFirstStepSuccess] = useState(false);
  const currentPath=window.location.pathname
    if(isAuthenticated && currentPath==="/"){
        return <Navigate to="/jobposting"/>
    }
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex flex-1">
        <p className="mx-4 my-auto text-justify md:mx-24 font-sans text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, impedit
          beatae nemo omnis nisi, neque aperiam, vel accusamus saepe blanditiis
          deserunt facilis. In blanditiis eos vitae cupiditate? Alias enim
          pariatur et minus amet fugiat sequi aut minima vero, quibusdam
          dignissimos.
        </p>
      </div>
      <div className="flex-1 ">
        <div className="mx-4 my-10 md:p-16 md:mx-14">
          <div className="border border-blue-500 p-10 rounded-lg">
            <div className="flex flex-col items-center mb-10">
              <h1 className="font-sans text-black font-semibold text-xl">
                Sign Up
              </h1>
              <p className="my-2 font-sans text-gray-400">
                Lorem ipsum dolor sit amet consectetur.
              </p>
            </div>
            {loading && (
              <div className="fixed inset-0 bg-black opacity-70 cursor-not-allowed flex justify-center items-center">
                <div className="flex flex-col justify-center items-center gap-2">
                <div className="spinner"></div>
                <span className="text-white text-xl font-mono">please wait...</span>
                </div>
              </div>
            )}
            <div>
              <FormProvider {...formMethods}>
                {signUpFirstStepSuccess ? (
                  <SignUpSecondStep setSignUpFirstStepSuccess={setSignUpFirstStepSuccess}/>
                ) : (
                  <SignUpFirstStep
                    setSignUpFirstStepSuccess={setSignUpFirstStepSuccess}
                  />
                )}
              </FormProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
