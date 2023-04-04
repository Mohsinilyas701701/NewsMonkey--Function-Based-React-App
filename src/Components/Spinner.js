import React from "react";
import spinnerImg from "../assets/Spinner.gif";

const Spinner = () => {
  return (
    <div className='d-flex justify-content-center my-5'>
      <img src={spinnerImg} alt='' />
    </div>
  );
};

export default Spinner;
