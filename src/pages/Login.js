import React from "react";
import login from "../../src/assets/Images/login.webp";
import Template from "../../src/components/core/Auth/Template";
const Login = () => {
  return (
    <div>
      <Template
        title="Welcome Back"
        desc1="Build skills for today, tomorrow, and beyond."
        desc2="Education to future-proof your career."
        image={login}
        formtype="login"
      />
    </div>
  );
};

export default Login;
