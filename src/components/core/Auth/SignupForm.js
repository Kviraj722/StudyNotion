import React, { useState } from "react";
import { AiFillEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { ACCOUNT_TYPE } from "../../../utils/constant";
import Tab from "../../common/Tab";
import { setSignupData } from "../../../../src/slices/authSlice";
import { sendOtp } from "../../../services/operations/authAPI";
import { endpoints } from "../../../services/apis";
import VerifyEmail from "../../../pages/VerifyEmail"
import axios from "axios";

const SignupForm = () => {
  const otp = async () => {
    try {
      const data = await axios.post(endpoints.SENDOTP_API, formdata);
      console.log("data", data);
      if (!data.success) {
        throw new Error(data.message);
      }
      toast.success("OTP Sent Successfully");
      
      
      navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      toast.error("Could Not Send OTP");
    }
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formdata, setFormData] = useState({
    FirstName: "",
    lastName: "",
    Email: "",
    Password: "",
    confirmPassword: "",
  });
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
  const [showPassword, setShowPassword] = useState(false);
  const [ConfirmPassword, setConfirmPassword] = useState(false);

  const changeHandler = (event) => {
    setFormData((prevdata) => ({
      ...prevdata,
      [event.target.name]: event.target.value,
    }));
  };

  const { FirstName, lastName, Email, Password, confirmPassword } = formdata;

  const submitHandler = (event) => {
    event.preventDefault();
    otp();
    // if (Password !== confirmPassword) {
    //   toast.error("Password Do Not Match");
    //   return;
    // }

    // const signupData = {
    //   ...formdata,
    //   accountType,
    // };

    // dispatch(setSignupData(signupData));

    // // dispatch(sendOtp(formdata.Email, navigate));
    // console.log("Form data", formdata.Email);

    // setFormData({
    //   FirstName: "",
    //   lastName: "",
    //   email: "",
    //   password: "",
    //   confirmPassword: "",
    // });
    // setAccountType(ACCOUNT_TYPE.STUDENT);
  };

  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },

    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];

  return (
    <div>
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />

      <form onSubmit={submitHandler}>
        {/*firstname ans last name*/}

        <div className="flex gap-x-4 mt-[20px]">
          <label className="w-full ">
            <p className="text-[0.875rem] ml-4 text-richblack-5 mb-1 leading-[1.375rem]">
              First Name
              <sup className="text-[#EF476F]"> *</sup>
            </p>
            <input
              required
              value={formdata.FirstName}
              placeholder="Enter First Name"
              name="FirstName"
              type="text"
              onChange={changeHandler}
              className="input input-bordered input-success w-full max-w-xs"
            />
          </label>
          <label className="w-full ">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] ml-4">
              Last Name
              <sup className="text-[#EF476F]"> *</sup>
            </p>

            <input
              required
              value={formdata.lastName}
              placeholder="Enter Last Name"
              name="lastName"
              type="text"
              onChange={changeHandler}
              className="input input-bordered input-success w-full max-w-xs"
            />
          </label>
        </div>

        {/*email add*/}

        <div className="mt-[20px]">
          <label className="w-full ">
            <p className="text-[0.875rem] mb-1 ml-4 text-richblack-5 leading-[1.375rem]">
              Email
              <sup className="text-[#EF476F]"> *</sup>
            </p>
            <input
              required
              value={formdata.Email}
              placeholder="Enter Email Address"
              name="Email"
              type="Email"
              onChange={changeHandler}
              className="input input-bordered input-success w-full max-w-xs"
            />
          </label>
        </div>

        {/*phone number*/}

        {/*password and change password */}

        <div className="w-full flex gap-x-4 mt-[18px]">
          <label className="w-full">
            <p className="text-[0.875rem] ml-4 text-richblack-5 mb-1 leading-[1.375rem]">
              Password
              <sup className="text-[#EF476F]"> *</sup>
            </p>
            <div className="relative">
              <input
                required
                value={formdata.Password}
                placeholder="Enter Password"
                name="Password"
                type={showPassword ? "text" : "password"}
                onChange={changeHandler}
                className="relative input input-bordered input-success w-full max-w-xs"
              />

              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-[12px] top-4 cursor-pointer text-richblack-5 "
              >
                {setShowPassword ? <AiFillEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
          </label>

          <label className="w-full ">
            <p className="text-[0.875rem] ml-4 text-richblack-5 mb-1 leading-[1.375rem]">
              Confirm Password
              <sup className="text-[#EF476F]"> *</sup>
            </p>
            <div className="relative">
              <input
                required
                value={formdata.confirmPassword}
                placeholder="Enter Password"
                name="confirmPassword"
                type={ConfirmPassword ? "text" : "password"}
                onChange={changeHandler}
                className="relative input input-bordered input-success w-full max-w-xs"
              />

              <span
                onClick={() => setConfirmPassword((prev) => !prev)}
                className="absolute right-[12px] top-4 cursor-pointer text-richblack-5 "
              >
                {setConfirmPassword ? <AiFillEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
          </label>
        </div>

        {/*button*/}
        <div className="flex justify-center mt-10">
          <button class="btn btn-wide btn-primary">Create Account</button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
