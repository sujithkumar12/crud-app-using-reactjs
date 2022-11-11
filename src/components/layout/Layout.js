import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbarr";
import Footer from "../Footer/Footer";
import Content from "../content/Content";
import { Container } from "reactstrap";

const Layout = (props) => {
  return (
    <Container>
      <Sidebar>
        <Navbar />
        <Content>
          {props.children}
        </Content>
        <Footer />
      </Sidebar>
    </Container>
  );
};

export default Layout;
