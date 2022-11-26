import React from "react";

const Content = (props) => {
  return (
    <section className={`hero-section overflow-x-hidden overflow-y-hidden ${props.className}`}>
      {props.children}
    </section>
  );
};

export default Content;
