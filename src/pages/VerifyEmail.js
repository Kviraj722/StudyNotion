import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendOtp, signUp } from "../services/operations/authAPI";

function VerifyEmail() {
  const { signupData, loading } = useState((state) => state.auth);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, []);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      navigate,
    } = signupData;
    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };
  return (
    <div>
      {loading ? (
        <div>loading....</div>
      ) : (
        <div>
          <h1>verify Email</h1>
          <p>A verification code hase been sent to you. Enter the code below</p>
          <form onSubmit={handleOnSubmit}>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => <input {...props} />}
            />
            <button type="submit">Verify Email</button>
          </form>

          <div>
            <div>
              <Link to="/login">
                <p>Back to Login</p>
              </Link>
            </div>
            <button onClick={() => dispatch(sendOtp(signupData.email))}>
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
