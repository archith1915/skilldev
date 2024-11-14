import React from "react";

const Child = (props) => {
  return (
    <>
      <div>
        {Child} Name : {props.name} {props.age}
      </div>
    </>
  );
};

export default Child;
