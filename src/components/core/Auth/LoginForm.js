import { useState } from "react";
import { AiFillEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { login } from "../../../services/operations/authAPI";
import axios from "axios";
import { endpoints } from "../../../services/apis";
import { toast } from "react-hot-toast";
// import { Navigate } from "react-router-dom";
const LogInForm = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const changeHandler = (event) => {
    setFormData((prevdata) => ({
      ...prevdata,
      [event.target.name]: event.target.value,
    }));
  };
  const { email, password } = formData;
  const login = async () => {
    try {
      toast.loading("loading..")
      const Data = await axios.post(endpoints.LOGIN_API, formData);
      console.log("data", Data);
      toast.success("Login successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.log("Error", error);
      toast.dismiss(error.message);
    }
  };
  const submithandler = (event) => {
    event.preventDefault();
    // dispatch(login(email, password, navigate));
    login();
  };
  return (
    <form
      className="flex flex-col w-full gap-y-4 mt-6"
      onSubmit={submithandler}
    >
      <label className="w-full ">
        <p className="text-[0.875rem] text-richblack-5 mb-1 ml-4 leading-[1.375rem]">
          Email Address
          <sup className="text-[#EF476F]"> *</sup>
        </p>

        <input
          required
          value={email}
          placeholder="Enter Your Email"
          name="email"
          type="email"
          onChange={changeHandler}
          className="input input-bordered input-success w-full max-w-xs"
        />
      </label>
      <div>
        <label className="w-full relative">
          <p className="text-[0.875rem] text-richblack-5 mb-1 ml-4 leading-[1.375rem]">
            Password
            <sup className="text-[#EF476F]"> *</sup>
          </p>
          <div className="relative">
            <input
              required
              value={password}
              placeholder="Enter Password"
              name="password"
              type={showPassword ? "text" : "password"}
              onChange={changeHandler}
              className="relative input input-bordered input-success w-full max-w-xs"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-4 right-6 left-[290px] cursor-pointer text-richblack-5"
            >
              {setShowPassword ? <AiFillEyeInvisible /> : <AiOutlineEye />}
            </span>
            <Link to={"/forgot-password"}>
              <p className="text-center text-sm ml-8 mt-3 text-primary-focus">
                Forgot Password?
              </p>
            </Link>
          </div>
        </label>
      </div>
      <div className="flex justify-start mt-2">
        <button type="submit" class="btn btn-wide btn-primary">
          Sign In
        </button>
      </div>
    </form>
  );
};

export default LogInForm;
