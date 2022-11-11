import React from "react";

const Content = (props) => {
  return (
    <section className={`h-screen overflow-auto hero-section ${props.className}`}>
      {props.children}
    </section>
  );
};

export default Content;
