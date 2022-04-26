import React, { useEffect } from "react";
import Link from "next/link";
const TitleSection = (props) => {
  return (
      <div>
          <h2 className="title__section">{props.title}</h2>
      </div>
  );
};

export default TitleSection;
