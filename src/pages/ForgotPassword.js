import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useState from "react";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";

function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch;
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>{!emailSent ? "Reset your password" : "Check your email"}</h1>

          <p>
            {!emailSent
              ? "Have no fear. We'll email you instruction to reset your password. If you don't have access to your email we can try account recovery."
              : `We have sent the reset email link to ${email}`}
          </p>

          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label>
                <p>Email Address*</p>
                <input
                  type="email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </label>
            )}

            <button type="submit">
              {!emailSent ? "Reset Password" : "Resend Email"}
            </button>
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

export default ForgotPassword;
