import { useState } from "react";
import Logo from "../../assets/acce.png";
import Arrow from "../../assets/arrow.png";
import Dashboardi from "../../assets/Dashboard.png";
import User from "../../assets/User.png";
import Search from "../../assets/Search.png";
import Settings from "../../assets/Setting.png";
import { Container, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";

const Dashboard = (props) => {
  const [open, setOpen] = useState(true);

  const menus = [
    { title: "Dashboard", src: Dashboardi, page: "/" },
    // { title: "Add Data", src: AddData, page: "/adddata" },
    // { title: "Search", src: Search, page: "/search" },
    // { title: "My Profile", src: User, page: "/myprofile" },
    // { title: "Settings ", src: Settings, page: "/settings" },
    // { title: "Logout", src: Logout },
  ];

  return (
    <Container>
      <div className="flex">
        <div
          className={` ${
            open ? "w-72" : "w-20 "
          } bg-gradient-to-tr from-green-500 to-red-500 p-5 pt-8 relative duration-300 overflow-hidden`}
        >
          <img
            src={Arrow}
            alt="arrow"
            className={`absolute cursor-pointer  top-9 w-10 border-black text-2xl bg-white
           border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          <div className="flex gap-x-4 items-center ml-14">
            <img
              src={Logo}
              alt="logo"
              className={`w-10 h-10 duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />
            <h1
              className={`text-white origin-left font-medium text-xl duration-200 ${
                !open && "scale-0"
              }`}
            >
              Accelerlab
            </h1>
          </div>
          <ul className="pt-6">
            {menus.map((menu, index) => (
              <NavItem>
                <NavLink
                  key={index}
                  tag={Link}
                  to={menu.page}
                  className="text-white flex items-center gap-x-4 cursor-pointer font-bold p-2 hover:bg-purple-300 rounded-md text-sm"
                >
                  <img src={menu.src} alt="menu" />
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {menu.title}
                  </span>
                </NavLink>
              </NavItem>
            ))}
          </ul>
        </div>
        <div className="flex-1">{props.children}</div>
      </div>
    </Container>
  );
};

export default Dashboard;
