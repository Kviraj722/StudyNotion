import React, { useState } from "react";
import { AiFillEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { ACCOUNT_TYPE } from "../../../utils/constant";
import Tab from "../../common/Tab";
import { setSignupData } from "../../../../src/slices/authSlice";
import { sendOtp } from "../../../services/operations/authAPI";


const SignupForm = () => {
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
    if (Password !== confirmPassword) {
      toast.error("Password Do Not Match");
      return;
    }

    const signupData = {
      ...formdata,
      accountType,
    };

    dispatch(setSignupData(signupData));

    dispatch(sendOtp(formdata.Email, navigate));

    setFormData({
      FirstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setAccountType(ACCOUNT_TYPE.STUDENT);
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
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              First Name
              <sup className="text-[#EF476F]"> *</sup>
            </p>
            <br />

            <input
              required
              value={formdata.FirstName}
              placeholder="Enter First Name"
              name="FirstName"
              type="text"
              onChange={changeHandler}
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] -mt-4 "
            />
          </label>
          <label className="w-full ">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Last Name
              <sup className="text-[#EF476F]"> *</sup>
            </p>
            <br />

            <input
              required
              value={formdata.lastName}
              placeholder="Enter Last Name"
              name="lastName"
              type="text"
              onChange={changeHandler}
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] -mt-4"
            />
          </label>
        </div>

        {/*email add*/}

        <div className="mt-[20px]">
          <label className="w-full ">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Email
              <sup className="text-[#EF476F]"> *</sup>
            </p>
            <br />

            <input
              required
              value={formdata.Email}
              placeholder="Enter Email Address"
              name="Email"
              type="Email"
              onChange={changeHandler}
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] -mt-6"
            />
          </label>
        </div>

        {/*phone number*/}

        {/*password and change password */}

        <div className="w-full flex gap-x-4 mt-[18px]">
          <label className="w-full ">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Password
              <sup className="text-[#EF476F]"> *</sup>
            </p>
            <br />

            <input
              required
              value={formdata.Password}
              placeholder="Enter Password"
              name="Password"
              type={showPassword ? "text" : "password"}
              onChange={changeHandler}
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] -mt-4 relative outline-none"
            />

            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute left-[24.5%] right-1/3 top-[83%] bottom-1/3 cursor-pointer text-richblack-5"
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiOutlineEye />}
            </span>
          </label>

          <label className="w-full ">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Confirm Password
              <sup className="text-[#EF476F]"> *</sup>
            </p>
            <br />

            <input
              required
              value={formdata.confirmPassword}
              placeholder="Enter Password"
              name="confirmPassword"
              type={ConfirmPassword ? "text" : "password"}
              onChange={changeHandler}
              className="relative bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] -mt-4 outline-none"
            />

            <span
              onClick={() => setConfirmPassword((prev) => !prev)}
              className="absolute left-[40%] right-[30%] top-[83%] bottom-1/3 cursor-pointer text-richblack-5 "
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiOutlineEye />}
            </span>
          </label>
        </div>

        {/*button*/}

        <button class="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6 w-[444px] ">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
