import { Container } from "reactstrap";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbarr";
import Footer from "../Footer/Footer";
import Content from "../content/Content";

const SearchView = () => {
  return (
    <Container>
      <Sidebar>
        <Navbar />
        <Content className="h-screen">SearchView</Content>
        <Footer />
      </Sidebar>
    </Container>
  );
};

export default SearchView;
