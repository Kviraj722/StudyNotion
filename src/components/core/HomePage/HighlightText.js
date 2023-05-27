import React from "react";

const HighlightText = ({ text }) => {
  return <span className=" text-transparent bg-clip-text bg-gradient-to-br from-richblue-200 to-richblack-600"> {text}</span>;
};

export default HighlightText;
