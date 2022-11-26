import { Container } from "reactstrap";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbarr";
import Footer from "../Footer/Footer";
import Content from "../content/Content";
import TableData from "./tables/TableView";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardView = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <Container>
      <Sidebar>
        <Content>
          <TableData />
        </Content>
        <Footer />
      </Sidebar>
    </Container>
  );
};

export default DashboardView;
