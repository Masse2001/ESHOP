import React, { useEffect } from "react";

const Button = (props) => {
  return (
      <div>
          <button type={props.type} className={props.classes} onClick={props.function}>
             {props.title}
        </button>
      </div>
  );
};

export default Button;
