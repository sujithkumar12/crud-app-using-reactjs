import React from "react";
import { Container } from "reactstrap";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbarr";
import Footer from "../Footer/Footer";
import Content from "../content/Content";

const NotFound = () => {
  return (
    <Container>
      <Sidebar>
        {/* <Navbar /> */}
        <Content>
          <p className="text-center text-2xl font-bold h-screen">404 - Page Not Found</p>
        </Content>
        <Footer />
      </Sidebar>
    </Container>
  );
};

export default NotFound;
