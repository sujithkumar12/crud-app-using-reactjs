import { Container } from "reactstrap";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbarr";
import Footer from "../Footer/Footer";
import Content from "../content/Content";

const UserProfile = () => {
  return (
    <Container>
      <Sidebar>
        <Navbar />
        <Content className="h-screen">User Profile</Content>
        <Footer />
      </Sidebar>
    </Container>
  );
};

export default UserProfile;
