import React, { useEffect } from "react";

const Button = (props) => {
  return (
      <div>
          <button className={props.class}>{props.title}</button>
      </div>
  );
};

export default Button;
