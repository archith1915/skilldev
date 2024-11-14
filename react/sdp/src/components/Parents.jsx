import React from "react";
import Child from "./child";

const Parents = () => {
  return (
    <>
      <div>Parent</div>
      <Child name="john" age={30} />
    </>
  );
};

export default Parents;
