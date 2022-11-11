import React from "react";
import { Container } from "reactstrap";
import Sidebarr from "../../Sidebar/Sidebar";
import Content from "../../content/Content";
import Footer from "../../Footer/Footer";
import Navbarr from "../../Navbar/Navbarr";
import EditForm from "./EditForm";

function AddData() {
  return (
    <Container>
      <Sidebarr>
        <Navbarr />
        <Content className="items-center justify-center overflow-hidden">
          <EditForm />
        </Content>
        <Footer />
      </Sidebarr>
    </Container>
  );
}

export default AddData;
