import React from 'react'
import signupImage from "../../src/assets/Images/signup.webp"
import Template from '../../src/components/core/Auth/Template'
const Signup = () => {
  return (
    <div>
     <Template
       title="Join the millions learning to code with StudyNotion for free"
      desc1="Build skills for today, tomorrow, and beyond."
      desc2="Education to future-proof your career."
     image={signupImage}
     formtype="signup"
     />
    </div>
  )
}

export default Signup