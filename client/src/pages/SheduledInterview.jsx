import React, { useRef, useState } from "react";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { useForm, FormProvider } from "react-hook-form";
import { Label, TextInput, Button, Textarea, Select } from "flowbite-react";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../global/axios";
import { useNavigate } from "react-router-dom";
import {
  createPostFailure,
  createPostStart,
  createPostSuccess,
} from "../store/userSlice";

const SheduledInterview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.user);
  const [emails, setEmails] = useState([]);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const experienceLevel = [
    "Fresher",
    "Less than 1 year",
    "1+",
    "2+",
    "3+",
    "4+",
    "5+",
    "6+",
  ];
  const formMethods = useForm();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    setValue,
  } = formMethods;

  const [description, setDescription] = useState("");
  const handelDescription = (e) => {
    setDescription(e.target.value);
    setValue("jobDescription", e.target.value);
  };
  const handleKeyDown = (e) => {
    setEmailErrorMsg("");
    if (e.key === "Enter" && e.target.value) {
      const email = e.target.value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email)) {
        let existEmail = emails.find(
          (presentEmail) => presentEmail.trim() === email.trim()
        );
        if (existEmail) {
          setEmailErrorMsg("You can't add same email multiple times");
          return;
        }
        setEmails([...emails, e.target.value]);
        e.target.value = "";
      } else {
        setEmailErrorMsg("Please enter a valid email address.");
      }
    }
  };
  const removeEmail = (removeEmail) => {
    setEmails(emails.filter((email) => email !== removeEmail));
  };

  setValue("candidateEmails", emails);
  const onSubmit = async (data) => {
    try {
      if (emails.length === 0) {
        setEmailErrorMsg("Please add atleast one email address");
        return;
      }
      dispatch(createPostStart());
      const { data: res } = await createPost(user, data);
      toast.success(res.msg);
      console.log(res.post);
      dispatch(createPostSuccess(res.post));
      formMethods.reset();
      setDescription("");
      setEmails([]);
      navigate("/jobposting");
    } catch (error) {
      dispatch(createPostFailure(error));
      toast.error(error?.response?.data);
      console.log(error);
    }
  };
  return (
    // <div className=" flex lg:flex-row lg:w-full">
    //   <FormProvider {...formMethods}>
    //     <form
    //       onSubmit={handleSubmit(onSubmit)}
    //       className="flex flex-col gap-2  lg:mr-80 lg:ml-36 lg:my-auto lg:mt-24 lg:gap-4"
    //     >
    // <div className="flex flex-col lg:flex-row  lg:gap-14 lg:items-center">
    //   <Label
    //     htmlFor="jobTitle"
    //     value="Job Title"
    //     className="lg:text-right lg:w-56 font-sans text-gray-900"
    //   />
    //   <div className="flex flex-col">
    //     <TextInput
    //       type="text"
    //       id="jobTitle"
    //       placeholder="Enter Job Title"
    //       className=" font-sans "
    //       {...register("jobTitle", {
    //         required: "Job Title is Required Field",
    //       })}
    //     />
    //     {errors.jobTitle && (
    //       <span className="text-sm font-mono text-red-500">
    //         {errors.jobTitle.message}
    //       </span>
    //     )}
    //   </div>
    // </div>
    // <div className="flex flex-col lg:flex-row  lg:gap-14 lg:items-center">
    //   <Label
    //     htmlFor="jobDescription"
    //     className="lg:text-right lg:w-56 font-sans text-gray-900"
    //     value="Job Description"
    //   />
    //   <div className="w-full flex flex-col">
    //     <Textarea
    //       id="jobDescription"
    //       placeholder="Enter Job Title"
    //       className="font-sans mr-10"
    //       rows={8}
    //       cols={20}
    //       {...register("jobDescription", {
    //         required: "Job Description is Required Field",
    //         validate: {
    //           minWords: (value) => {
    //             const wordCount = value.trim().split(/\s+/).length;
    //             return (
    //               wordCount >= 25 ||
    //               "Description must be atleast 25 words."
    //             );
    //           },
    //         },
    //         onChange: (e) => handelDescription(e),
    //       })}
    //     />
    //     {description && (
    //       <span className="text-green-500 text-sm font-sans">
    //         Word Count : {description.trim().split(/\s+/).length}
    //       </span>
    //     )}
    //     {errors.jobDescription && (
    //       <span className="font-mono text-red-500 text-sm">
    //         {errors.jobDescription.message}
    //       </span>
    //     )}
    //   </div>
    // </div>
    // <div className="flex flex-col lg:flex-row lg:gap-14 w-full lg:items-center">
    //   <Label
    //     htmlFor="experienceLevel"
    //     value="Experience Level"
    //     className="lg:text-right lg:w-56 font-sans text-gray-900"
    //   />
    //   <div className="flex w-full flex-col">
    //     <select
    //       id="experienceLevel"
    //       className="rounded-md border-gray-300
    //      bg-gray-50 font-sans text-gray-400"
    //       {...register("experienceLevel", {
    //         required: "Experience Level is Required Field",
    //       })}
    //     >
    //       <option value={"Select Experience Level"} disabled selected>
    //         Select Experience Level
    //       </option>
    //       {experienceLevel.map((level) => (
    //         <option value={level} key={level}>
    //           {level}
    //         </option>
    //       ))}
    //     </select>
    //     {errors.experienceLevel && (
    //       <span className="font-mono text-red-500 text-sm">
    //         {errors.experienceLevel.message}
    //       </span>
    //     )}
    //   </div>
    // </div>
    // <div className="flex flex-col lg:flex-row lg:gap-14 w-full lg:items-center">
    //   <Label
    //     htmlFor="emails"
    //     value="Emails"
    //     className="lg:text-right lg:w-56 font-sans text-gray-900"
    //   />
    //   <div className="">
    //     <TextInput
    //       type="email"
    //       id="emails"
    //       placeholder="Add Candidate"
    //       className="lg:w-full font-sans"
    //       onKeyDown={handleKeyDown}
    //     />
    //     {emails.length !== 0 && (
    //       <div className="flex flex-wrap my-2 gap-2 border rounded-md border-gray-400 px-2 py-1">
    //         {emails.map((email) => (
    //           <div
    //             className="flex flex-row border border-gray-400 items-center gap-2 rounded-full px-2"
    //             key={email}
    //           >
    //             <span className="h-3 w-3 rounded-full bg-gray-400"></span>

    //             <p className="text-gray-500 font-sans text-sm">{email}</p>
    //             <span
    //               onClick={() => removeEmail(email)}
    //               className="ml-1 cursor-pointer "
    //             >
    //               <RxCross2 size={15} />
    //             </span>
    //           </div>
    //         ))}
    //       </div>
    //     )}
    //     {emailErrorMsg && (
    //       <span className="font-mono text-red-500 text-sm">
    //         {emailErrorMsg}
    //       </span>
    //     )}
    //   </div>
    // </div>
    // <div className="flex flex-col lg:flex-row lg:gap-14 lg:items-center">
    //   <Label
    //     htmlFor="endDate"
    //     value="End Date"
    //     className="lg:text-right lg:w-56 font-sans text-gray-900"
    //   />
    //   <div className="w-full flex flex-col">
    //     <TextInput
    //       type="date"
    //       placeholder="Choose a date"
    //       {...register("interviewDate", {
    //         required: "This Field is Required",
    //       })}
    //     />
    //     {errors.interviewDate && (
    //       <span className="text-sm font-mono text-red-500">
    //         {errors.interviewDate.message}
    //       </span>
    //     )}
    //   </div>
    //         {/* <div className="w-full flex flex-row items-center justify-between border px-2 py-2 rounded-md">
    //           <span className="text-gray-400 font-sans">Select a Date</span>
    //           <input
    //           type="date"
    //           ref={dateRef}
    //           id="endDate"
    //           onChange={(e) => setDate(new Date(e.target.value))}
    //           style={{ display: 'none' }}
    //         />
    //           <span
    //             className="text-gray-400 cursor-pointer"
    //             onClick={() => {
    //               console.log('span click')
    //               dateRef?.current?.click()
    //             }}
    //           >
    //             {<MdDateRange />}
    //           </span>
    //         </div> */}
    //       </div>
    //       <div className="flex justify-end">
    //         <button
    //           type="submit"
    //           className="border px-7 py-1 rounded-md text-right bg-blue-700 text-white font-sans font-semibold"
    //         >
    //           Send
    //         </button>
    //       </div>
    //     </form>
    //   </FormProvider>
    // </div>
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex lg:mx-48 lg:mr-96 my-8 flex-col gap-2 mx-2 w-full mr-12 md:mr-20"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-14">
          <Label htmlFor="jobTitle" value="Job Title" className="w-full lg:w-40 lg:text-right" />
          <div className="flex flex-col lg:w-full">
            <TextInput
              type="text"
              id="jobTitle"
              placeholder="Enter Job Title"
              className=""
              {...register("jobTitle", {
                required: "Job Title is Required Field",
              })}
            />
            {errors.jobTitle && (
              <span className="text-sm font-mono text-red-500">
                {errors.jobTitle.message}
              </span>
            )}
          </div>
        </div>

        {loading && (
          <div className="fixed inset-0 bg-black opacity-70 cursor-not-allowed flex justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="spinner"></div>
              <span className="text-white text-xl font-mono">
                please wait...
              </span>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-14">
          <Label
            htmlFor="jobDescription"
            className="w-full lg:w-40 lg:text-right"
            value="Job Description"
          />
          <div className="flex flex-col lg:w-full">
            <Textarea
              id="jobDescription"
              placeholder="Enter Job Title"
              className=""
              rows={8}
              cols={20}
              {...register("jobDescription", {
                required: "Job Description is Required Field",
                validate: {
                  minWords: (value) => {
                    const wordCount = value.trim().split(/\s+/).length;
                    return (
                      wordCount >= 25 || "Description must be atleast 25 words."
                    );
                  },
                },
                onChange: (e) => handelDescription(e),
              })}
            />
            {description && (
              <span className="text-green-500 text-sm font-sans">
                Word Count : {description.trim().split(/\s+/).length}
              </span>
            )}
            {errors.jobDescription && (
              <span className="font-mono text-red-500 text-sm">
                {errors.jobDescription.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-14">
          <Label
            htmlFor="experienceLevel"
            value="Experience Level"
            className="w-full lg:w-40 lg:text-right"
          />
          <div className="flex flex-col lg:w-full">
            <select
              id="experienceLevel"
              className="rounded-md border-gray-300 bg-gray-50 font-sans text-gray-400"
              {...register("experienceLevel", {
                required: "Experience Level is Required Field",
              })}
            >
              <option value={"Select Experience Level"} disabled selected>
                Select Experience Level
              </option>
              {experienceLevel.map((level) => (
                <option value={level} key={level}>
                  {level}
                </option>
              ))}
            </select>
            {errors.experienceLevel && (
              <span className="font-mono text-red-500 text-sm">
                {errors.experienceLevel.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-14">
          <Label htmlFor="emails" value="Candidate Emails" className="w-full lg:w-40 lg:text-right" />
          <div className="flex flex-col lg:w-full">
            <TextInput
              type="email"
              id="emails"
              placeholder="Add Candidate"
              className=""
              disabled={loading}
              onKeyDown={handleKeyDown}
            />
            {emails.length !== 0 && (
              <div className="flex flex-wrap my-2 gap-2 border rounded-md border-gray-400 px-2 py-1">
                {emails.map((email) => (
                  <div
                    className="flex flex-row border border-gray-400 items-center gap-1 md:gap-2 rounded-full px-1 md:px-2"
                    key={email}
                  >
                    <span className="h-3 w-3 rounded-full bg-gray-400"></span>

                    <p className="text-gray-500 font-sans text-[8px] md:text-sm">
                      {email}
                    </p>
                    <span
                      onClick={() => removeEmail(email)}
                      className="ml-1 cursor-pointer "
                    >
                      <RxCross2 size={15} />
                    </span>
                  </div>
                ))}
              </div>
            )}
            {emailErrorMsg && (
              <span className="font-mono text-red-500 text-sm">
                {emailErrorMsg}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-14">
          <Label htmlFor="endDate" value="End Date" className="w-full lg:w-40 lg:text-right" />
          <div className="flex flex-col lg:w-full">
            <TextInput
              type="date"
              placeholder="Choose a date"
              disabled={loading}
              {...register("interviewDate", {
                required: "This Field is Required",
              })}
            />
            {errors.interviewDate && (
              <span className="text-sm font-mono text-red-500">
                {errors.interviewDate.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="border px-7 py-1 rounded-md text-right bg-blue-700 text-white font-sans font-semibold"
          >
            Send
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default SheduledInterview;
