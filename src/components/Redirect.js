import React from "react";

const Redirecting = props => {
  if (!props.to) throw new Error("No Link");
  window.location.assign(props.to);
  return <a href={props.to}>자동으로 리다이랙트되지 않는다면 클릭하세요</a>;
};

export default Redirecting;
