import { Container } from "reactstrap";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbarr";
import Footer from "../Footer/Footer";
import Content from "../content/Content";
import TableData from "./tables/TableView";
import { useUserAuth } from "../store/UserAuthContext";

const DashboardView = () => {

  return (
    <Container>
      <Sidebar>
        <Navbar />
        <Content>
          <TableData />
        </Content>
        <Footer />
      </Sidebar>
    </Container>
  );
};

export default DashboardView;
