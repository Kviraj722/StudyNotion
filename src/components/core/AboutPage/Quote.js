import React from "react";
import HighlightText from "../HomePage/HighlightText";

const Quote = () => {
  return (
    <div className="text-center w-[800px]">
    
      We are passionate about revolutionizing the way we learn. Our innovative
      platform
      <HighlightText text={"combines technology"} />
      <span className="text-brown-500"> expertise</span>, and community to
      create an
      <span className="text-brown-500">
        {" "}
        unparalleled educational experience.
      </span>
    </div>
  );
};

export default Quote;
