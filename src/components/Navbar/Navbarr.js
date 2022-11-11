import React, { useState } from "react";
import { Container } from "reactstrap";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Navbarr.css";
import { useUserAuth } from "../store/UserAuthContext";

const Navbarr = () => {
  const [showMediaIcons, setshowMediaIcons] = useState(false);
  const { logOut } = useUserAuth();

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch(err) {
      console.log(err.message);
    }
  };

  return (
    <Container>
      <nav className="main-nav">
        <div className="logo flex justify-start space-x-1 items-center">
        </div>
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }
        >
          <ul className="flex justify-around items-end">
            <li className="cursor-pointer">
              <p onClick={handleLogOut}>Logout</p>
            </li>
          </ul>
        </div>
        <div className="social-media">
          <ul className="social-media-desktop"></ul>
          <div className="hamburger-menu">
            <a href="#" onClick={() => setshowMediaIcons(!showMediaIcons)}>
              <GiHamburgerMenu />
            </a>
          </div>
        </div>
      </nav>
    </Container>
  );
};

export default Navbarr;
