import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { resetPassword } from "../services/operations/authAPI";
import { useLocation } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
function UpdatePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation;
  const { loading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const { password, confirmPassword } = formData;
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token));
  };
  return (
    <div>
      {loading ? (
        <div>Loading.....</div>
      ) : (
        <div>
          <h1>Choose new password </h1>
          <p>Almost done. Enter your new password and you are all set</p>
          <form onSubmit={handleOnSubmit}>
            <label>
              <p>New Password</p>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="confirm password"
                value={password}
                onChange={handleOnChange}
              />
              <span onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? (
                  <AiFillEyeInvisible fontSize={24} />
                ) : (
                  <AiFillEye fontSize={24} />
                )}
              </span>
            </label>
            <label>
              <p>Confirm New Password</p>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="confirm new password"
                value={confirmPassword}
                onChange={handleOnChange}
              />
              <span onClick={() => setShowConfirmPassword((prev) => !prev)}>
                {showPassword ? (
                  <AiFillEyeInvisible fontSize={24} />
                ) : (
                  <AiFillEye fontSize={24} />
                )}
              </span>
            </label>

            <button type="submit">Reset Password </button>
          </form>
          <div>
            <Link to="/login">
              <p>Back to Login</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdatePassword;
